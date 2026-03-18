// Seleciona o formulário de cadastro
const cadastroForm = document.getElementById('loginForm');

if (cadastroForm) {
    cadastroForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede a página de recarregar

        // Pegamos os campos de senha para comparar
        const senha = document.getElementById('password').value;
        const confirmaSenha = document.getElementById('confirm-password').value;

        if (senha !== confirmaSenha) {
            alert("As senhas não coincidem! Tente novamente.");
            return; // Para a execução aqui
        }

        // Se chegou aqui, as senhas são iguais!
        alert("Cadastro realizado com sucesso! Redirecionando para o login...");
        
        // Manda para a página de LOGIN
        window.location.href = 'index.html'; 
    });
}