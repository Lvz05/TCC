// Disorder data
const disordersData = {
    depressao: {
        name: 'Depressão',
        description: 'A depressão é um transtorno mental caracterizado por tristeza persistente, perda de interesse em atividades e diversos sintomas emocionais e físicos.',
        symptoms: [
            'Tristeza profunda e persistente',
            'Perda de interesse ou prazer em atividades',
            'Alterações no sono (insônia ou sono excessivo)',
            'Fadiga e falta de energia',
            'Dificuldade de concentração',
            'Sentimentos de culpa ou inutilidade',
            'Alterações no apetite e peso'
        ],
        treatments: [
            'Psicoterapia (TCC, Terapia Interpessoal)',
            'Medicamentos antidepressivos (sob prescrição médica)',
            'Exercícios físicos regulares',
            'Estabelecimento de rotina saudável',
            'Técnicas de mindfulness e meditação',
            'Suporte social e grupos de apoio'
        ]
    },
    ansiedade: {
        name: 'Transtorno de Ansiedade',
        description: 'Caracterizado por preocupação excessiva, tensão e sintomas físicos que interferem nas atividades diárias.',
        symptoms: [
            'Preocupação constante e excessiva',
            'Inquietação e sensação de nervosismo',
            'Fadiga frequente',
            'Dificuldade de concentração',
            'Irritabilidade',
            'Tensão muscular',
            'Problemas de sono'
        ],
        treatments: [
            'Terapia Cognitivo-Comportamental (TCC)',
            'Técnicas de respiração e relaxamento',
            'Medicação ansiolítica (se necessário)',
            'Exercícios de mindfulness',
            'Atividade física regular',
            'Redução de cafeína e estimulantes'
        ]
    },
    panico: {
        name: 'Síndrome do Pânico',
        description: 'Transtorno caracterizado por ataques de pânico recorrentes e inesperados, com medo intenso e sintomas físicos.',
        symptoms: [
            'Palpitações e taquicardia',
            'Sudorese excessiva',
            'Tremores',
            'Sensação de falta de ar',
            'Dor ou desconforto no peito',
            'Tontura ou vertigem',
            'Medo de morrer ou perder o controle'
        ],
        treatments: [
            'Terapia Cognitivo-Comportamental',
            'Técnicas de exposição gradual',
            'Exercícios de respiração controlada',
            'Medicação (ISRS, benzodiazepínicos)',
            'Prática regular de relaxamento',
            'Evitar gatilhos conhecidos inicialmente'
        ]
    },
    ludopatia: {
        name: 'Ludopatia (Jogo Patológico)',
        description: 'Dependência de jogos de azar, caracterizada pela necessidade compulsiva de jogar apesar das consequências negativas.',
        symptoms: [
            'Preocupação constante com jogos',
            'Necessidade de apostar quantias crescentes',
            'Tentativas frustradas de parar de jogar',
            'Irritabilidade ao tentar reduzir o jogo',
            'Jogar para escapar de problemas',
            'Mentir sobre o comportamento de jogo',
            'Prejuízos financeiros e relacionais'
        ],
        treatments: [
            'Psicoterapia especializada em dependência',
            'Grupos de apoio (Jogadores Anônimos)',
            'Terapia Cognitivo-Comportamental',
            'Tratamento de condições coexistentes',
            'Bloqueio de acesso a locais de jogo',
            'Suporte familiar e financeiro'
        ]
    },
    bipolar: {
        name: 'Transtorno Bipolar',
        description: 'Caracterizado por alternância entre episódios de mania/hipomania e depressão.',
        symptoms: [
            'Episódios de euforia ou irritabilidade extrema',
            'Aumento de energia e atividade',
            'Diminuição da necessidade de sono',
            'Comportamentos impulsivos',
            'Episódios depressivos',
            'Mudanças drásticas de humor',
            'Pensamentos acelerados'
        ],
        treatments: [
            'Estabilizadores de humor',
            'Antipsicóticos (quando necessário)',
            'Psicoterapia',
            'Manutenção de rotina regular',
            'Monitoramento de humor',
            'Educação sobre o transtorno'
        ]
    },
    toc: {
        name: 'TOC (Transtorno Obsessivo-Compulsivo)',
        description: 'Caracterizado por pensamentos obsessivos e comportamentos compulsivos repetitivos.',
        symptoms: [
            'Pensamentos intrusivos e persistentes',
            'Rituais e comportamentos repetitivos',
            'Medo excessivo de contaminação',
            'Necessidade de simetria ou ordem',
            'Verificações constantes',
            'Ansiedade intensa',
            'Interferência nas atividades diárias'
        ],
        treatments: [
            'Terapia de Exposição e Prevenção de Resposta',
            'Terapia Cognitivo-Comportamental',
            'Medicação (ISRS em doses específicas)',
            'Técnicas de mindfulness',
            'Grupos de apoio',
            'Educação familiar'
        ]
    },
    'fobia-social': {
        name: 'Fobia Social',
        description: 'Medo intenso e persistente de situações sociais onde a pessoa pode ser avaliada ou julgada.',
        symptoms: [
            'Medo intenso de interações sociais',
            'Evitamento de situações sociais',
            'Ansiedade antecipatória',
            'Rubor facial',
            'Sudorese e tremores',
            'Dificuldade em falar em público',
            'Medo de ser humilhado'
        ],
        treatments: [
            'Terapia Cognitivo-Comportamental',
            'Exposição gradual a situações sociais',
            'Treinamento de habilidades sociais',
            'Medicação ansiolítica (se necessário)',
            'Técnicas de relaxamento',
            'Grupos terapêuticos'
        ]
    },
    tept: {
        name: 'TEPT (Transtorno de Estresse Pós-Traumático)',
        description: 'Desenvolve-se após exposição a evento traumático, causando revivência do trauma e evitamento.',
        symptoms: [
            'Flashbacks do evento traumático',
            'Pesadelos frequentes',
            'Evitamento de lembretes do trauma',
            'Hipervigilância',
            'Reações de sobressalto exageradas',
            'Pensamentos negativos persistentes',
            'Dificuldade de concentração'
        ],
        treatments: [
            'Terapia de Processamento Cognitivo',
            'EMDR (Dessensibilização e Reprocessamento)',
            'Terapia de Exposição Prolongada',
            'Medicação (ISRS, prazosin)',
            'Técnicas de regulação emocional',
            'Grupos de apoio para sobreviventes'
        ]
    }
};

// Get disorder ID from URL
const urlParams = new URLSearchParams(window.location.search);
const disorderId = urlParams.get('id');
const disorderDetail = document.getElementById('disorderDetail');

if (disorderDetail && disorderId && disordersData[disorderId]) {
    const disorder = disordersData[disorderId];
    
    disorderDetail.innerHTML = `
        <h1>${disorder.name}</h1>
        <p>${disorder.description}</p>
        
        <div class="detail-section">
            <h2>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                Sintomas
            </h2>
            <ul>
                ${disorder.symptoms.map(symptom => `
                    <li>
                        <div class="list-dot red"></div>
                        <span>${symptom}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
        
        <div class="detail-section">
            <h2>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2">
                    <path d="M12 2a10 10 0 0 1 10 10 4 4 0 0 1-5 5 4 4 0 0 1-5-5 4 4 0 0 1-5 5 4 4 0 0 1-5-5 10 10 0 0 1 10-10z"/>
                </svg>
                Tratamentos
            </h2>
            <ul>
                ${disorder.treatments.map(treatment => `
                    <li>
                        <div class="list-dot green"></div>
                        <span>${treatment}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
        
        <div class="important-note">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <div>
                <h3>Importante</h3>
                <p>Este conteúdo é informativo e não substitui avaliação profissional. Se você identifica esses sintomas, procure um profissional de saúde mental qualificado para diagnóstico e tratamento adequado.</p>
            </div>
        </div>
        
        <div class="action-buttons">
            <a href="emergency.html" class="btn" style="background: #ef4444; color: white; text-decoration: none;">
                Contatos de Emergência
            </a>
            <a href="community.html" class="btn btn-primary" style="text-decoration: none;">
                Comunidade
            </a>
        </div>
    `;
} else if (disorderDetail) {
    disorderDetail.innerHTML = `
        <div style="text-align: center; padding: 3rem;">
            <p style="color: #6b7280;">Transtorno não encontrado</p>
            <a href="disorders.html" class="btn btn-primary" style="margin-top: 1rem; text-decoration: none;">Voltar</a>
        </div>
    `;
}
