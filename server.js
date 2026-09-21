const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
app.use(express.json());
app.use(cors());

// CHAVE SECRETA: Usada para criptografar os tokens JWT
const JWT_SECRET = "ChaveSecretaDoMeuTCC2026";

// LISTA DE PALAVRAS CENSURADAS (O seu Bot de Moderação)
const palavrasBanidas = ["spam", "ofensa1", "ofensa2", "linkmalicioso"];

// CONFIGURAÇÃO DE CONEXÃO COM O SEU BANCO DO WORKBENCH
const dbConfig = {
  host: "localhost",
  user: "root", // Usuário padrão do MySQL
  password: "Luc@sv0504", // COLOQUE A SUA SENHA DO WORKBENCH AQUI
  database: "TCC", // Nome do seu banco de dados
  port: 3306, // <--- Garante a conexão com o MySQL
};

const pool = mysql.createPool(dbConfig);

// MIDDLEWARE: Proteção e extração de dados do Token enviado pelo HTML
function verificarToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Pega o token após "Bearer "

  if (!token)
    return res
      .status(401)
      .json({ erro: "Acesso negado. Token não fornecido." });

  try {
    const dadosDoToken = jwt.verify(token, JWT_SECRET);
    req.usuario = dadosDoToken; // Contém: id, nome, tipo ('user' ou 'admin')
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ erro: "Sessão inválida ou expirada. Faça login novamente." });
  }
}

// =========================================================================
// 1. ROTA DE LOGIN (Suporta Usuários comuns e Voluntários/Admins)
// =========================================================================
app.post("/api/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Primeiro, tenta buscar na tabela de Usuários comuns
    const [usuarios] = await pool.query(
      "SELECT * FROM Usuario WHERE email_Usuario = ? AND senha_usuario = ?",
      [email, senha],
    );

    if (usuarios.length > 0) {
      const user = usuarios[0];
      const token = jwt.sign(
        { id: user.id_usuario, nome: user.nome_usuario, tipo: "user" },
        JWT_SECRET,
        { expiresIn: "12h" },
      );
      return res.json({ token, tipo: "user", nome: user.nome_usuario });
    }

    // Se não achar, tenta buscar na tabela de Voluntarios (Admins)
    const [voluntarios] = await pool.query(
      "SELECT * FROM Voluntarios WHERE email_adm = ? AND senha_adm = ?",
      [email, senha],
    );

    if (voluntarios.length > 0) {
      const admin = voluntarios[0];
      const token = jwt.sign(
        { id: admin.id_usuario_adm, nome: admin.nome_usuario, tipo: "admin" },
        JWT_SECRET,
        { expiresIn: "12h" },
      );
      return res.json({ token, tipo: "admin", nome: admin.nome_usuario });
    }

    // Se não encontrar em nenhuma das tabelas
    return res.status(400).json({ erro: "E-mail ou senha incorretos." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ erro: "Erro ao processar o login no banco de dados." });
  }
});

// =========================================================================
// 2. ROTA DA COMUNIDADE: Criar uma Publicação (Com o Bot de Censura)
// =========================================================================
app.post("/api/comunidade", verificarToken, async (req, res) => {
  const { titulo, conteudo } = req.body;
  const usuarioLogado = req.usuario;

  if (!titulo || !conteudo) {
    return res
      .status(400)
      .json({ erro: "Título e Conteúdo são obrigatórios." });
  }

  // BOT DE MODERAÇÃO: Passa o filtro de censura no Título e no Conteúdo
  let tituloFiltrado = titulo;
  let conteudoFiltrado = conteudo;

  palavrasBanidas.forEach((palavra) => {
    const regex = new RegExp(palavra, "gi");
    tituloFiltrado = tituloFiltrado.replace(regex, "*".repeat(palavra.length));
    conteudoFiltrado = conteudoFiltrado.replace(
      regex,
      "*".repeat(palavra.length),
    );
  });

  try {
    const dataAtual = new Date();

    // Se quem está postando for Usuário comum
    if (usuarioLogado.tipo === "user") {
      await pool.query(
        "INSERT INTO comunidade (id_usuario, id_usuario_adm, titulo, conteudo, data_publicacao, curtidas, comentarios) VALUES (?, NULL, ?, ?, ?, 0, 0)",
        [usuarioLogado.id, tituloFiltrado, conteudoFiltrado, dataAtual],
      );
    }
    // Se quem está postando for Voluntário (Admin)
    else {
      await pool.query(
        "INSERT INTO comunidade (id_usuario, id_usuario_adm, titulo, conteudo, data_publicacao, curtidas, comentarios) VALUES (NULL, ?, ?, ?, ?, 0, 0)",
        [usuarioLogado.id, tituloFiltrado, conteudoFiltrado, dataAtual],
      );
    }

    return res.status(201).json({
      mensagem: "Publicação compartilhada com sucesso na comunidade!",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ erro: "Erro técnico ao salvar a publicação." });
  }
  // No seu server.js
  app.get("/api/comunidade", async (req, res) => {
    try {
      const query = `
      SELECT
          c.id_publicacao AS id,
          c.titulo AS title,
          c.conteudo AS content,
          c.data_publicacao AS timestamp,
          c.curtidas AS likes,
          c.comentarios AS comments,
          COALESCE(u.nome_usuario, v.nome_usuario) AS author
      FROM comunidade c
      LEFT JOIN Usuario u ON c.id_usuario = u.id_usuario
      LEFT JOIN Voluntarios v ON c.id_usuario_adm = v.id_usuario_adm
      ORDER BY c.data_publicacao DESC
    `;

      const [rows] = await pool.query(query);
      res.json(rows); // Envia os dados encontrados para quem chamou a API
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ erro: "Erro ao buscar publicações da comunidade." });
    }
  });
});

// =========================================================================
// 3. ROTA DA COMUNIDADE: Listar todas as Publicações
// =========================================================================
app.get("/api/comunidade", async (req, res) => {
  try {
    // Coleta as publicações fazendo LEFT JOIN com as duas tabelas para descobrir o nome do autor (seja user ou admin)
    const querySQL = `
            SELECT 
                c.id_publicacao, 
                c.titulo, 
                c.conteudo, 
                c.data_publicacao,
                COALESCE(u.nome_usuario, v.nome_usuario) AS autor,
                CASE WHEN c.id_usuario_adm IS NOT NULL THEN 'Voluntário/Admin' ELSE 'Membro' END AS tipo_autor
            FROM comunidade c
            LEFT JOIN Usuario u ON c.id_usuario = u.id_usuario
            LEFT JOIN Voluntarios v ON c.id_usuario_adm = v.id_usuario_adm
            ORDER BY c.data_publicacao DESC
        `;

    const [publicacoes] = await pool.query(querySQL);
    return res.json(publicacoes);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ erro: "Erro ao buscar as publicações da comunidade." });
  }
});

// =========================================================================
// 4. ROTA EXCLUSIVA ADMIN (VOLUNTÁRIOS): Deletar posts inadequados
// =========================================================================
app.delete("/api/admin/comunidade/:id", verificarToken, async (req, res) => {
  const usuarioLogado = req.usuario;
  const idPublicacao = req.params.id;

  // Impede a ação imediatamente se não for um voluntário/admin cadastrado
  if (usuarioLogado.tipo !== "admin") {
    return res.status(403).json({
      erro: "Acesso proibido. Apenas voluntários administradores podem remover conteúdos.",
    });
  }

  try {
    const [resultado] = await pool.query(
      "DELETE FROM comunidade WHERE id_publicacao = ?",
      [idPublicacao],
    );

    if (resultado.affectedRows === 0) {
      return res
        .status(404)
        .json({ erro: "Essa publicação não foi encontrada no banco." });
    }

    return res.json({
      mensagem: `A publicação ID ${idPublicacao} foi removida com sucesso pelo moderador.`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao tentar deletar o post." });
  }
});

// Inicialização do Servidor na porta 3000
app.listen(3000, () => {
  console.log(
    "Servidor do TCC rodando na porta 3000 e totalmente integrado ao MySQL!",
  );
});
// =========================================================================
// 5. ROTA DE CADASTRO DE NOVOS USUÁRIOS
// =========================================================================
app.post("/api/cadastro", async (req, res) => {
  const { nome, email, telefone, senha } = req.body;

  // 1. Verifica se a pessoa preencheu tudo
  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ erro: "Preencha todos os campos obrigatórios." });
  }

  try {
    // 2. Verifica se o e-mail já existe no banco
    const [usuarioExistente] = await pool.query(
      "SELECT * FROM Usuario WHERE email_usuario = ?",
      [email],
    );

    if (usuarioExistente.length > 0) {
      return res.status(400).json({ erro: "Este e-mail já está em uso!" });
    }

    // 3. Salva o usuário no banco (ajuste 'telefone_usuario' se a coluna no MySQL tiver outro nome)
    await pool.query(
      "INSERT INTO Usuario (nome_usuario, email_usuario, telefone_usuario, senha_usuario) VALUES (?, ?, ?, ?)",
      [nome, email, telefone, senha],
    );

    return res
      .status(201)
      .json({ mensagem: "Cadastro realizado com sucesso!" });
  } catch (error) {
    console.error("Erro no cadastro:", error);
    return res.status(500).json({ erro: "Erro ao salvar no banco de dados." });
  }
});
