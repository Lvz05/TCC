// Login Form
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        window.location.href = 'index2.html';
    });
}

// Panic Button
const panicButton = document.getElementById('panicButton');
const panicModal = document.getElementById('panicModal');
const closeModal = document.getElementById('closeModal');

if (panicButton && panicModal) {
    panicButton.addEventListener('click', () => {
        panicModal.classList.add('active');
    });
}

if (closeModal && panicModal) {
    closeModal.addEventListener('click', () => {
        panicModal.classList.remove('active');
    });

    panicModal.addEventListener('click', (e) => {
        if (e.target === panicModal) {
            panicModal.classList.remove('active');
        }
    });
}

// Community Page
const newPostBtn = document.getElementById('newPostBtn');
const newPostForm = document.getElementById('newPostForm');
const cancelPostBtn = document.getElementById('cancelPostBtn');
const postForm = document.getElementById('postForm');
const postsContainer = document.getElementById('postsContainer');

// Sample posts
let posts = [
    {
        id: 1,
        author: 'Ana Silva',
        title: 'Compartilhando minha jornada com ansiedade',
        content: 'Hoje completei 30 dias de terapia e estou me sentindo muito melhor. Queria compartilhar que buscar ajuda foi a melhor decisão que tomei...',
        likes: 24,
        comments: 8,
        timestamp: '2h atrás'
    },
    {
        id: 2,
        author: 'Carlos Mendes',
        title: 'Dicas de respiração que me ajudaram',
        content: 'Descobri uma técnica de respiração 4-7-8 que tem me ajudado muito nos momentos de crise. Queria compartilhar com vocês...',
        likes: 42,
        comments: 15,
        timestamp: '5h atrás'
    },
    {
        id: 3,
        author: 'Maria Costa',
        title: 'Livros que mudaram minha perspectiva',
        content: 'Queria recomendar alguns livros sobre mindfulness que realmente fizeram diferença na minha vida...',
        likes: 18,
        comments: 6,
        timestamp: '1 dia atrás'
    }
];

function renderPosts() {
    if (!postsContainer) return;

    postsContainer.innerHTML = posts.map(post => `
        <div class="post-card">
            <div class="post-header">
                <div class="post-avatar">${post.author.charAt(0)}</div>
                <div>
                    <div class="post-info">
                        <h3>${post.author}</h3>
                    </div>
                    <div class="post-time">${post.timestamp}</div>
                </div>
            </div>
            <h3 class="post-title">${post.title}</h3>
            <p class="post-content">${post.content}</p>
            <div class="post-actions">
                <button class="post-action">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    <span>${post.likes}</span>
                </button>
                <button class="post-action">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    <span>${post.comments}</span>
                </button>
                <button class="post-action">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                    <span>Compartilhar</span>
                </button>
            </div>
        </div>
    `).join('');
}

if (newPostBtn && newPostForm) {
    newPostBtn.addEventListener('click', () => {
        newPostForm.style.display = 'block';
    });
}

if (cancelPostBtn && newPostForm) {
    cancelPostBtn.addEventListener('click', () => {
        newPostForm.style.display = 'none';
        postForm.reset();
    });
}

if (postForm) {
    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('postTitle').value;
        const content = document.getElementById('postContent').value;

        const newPost = {
            id: posts.length + 1,
            author: 'Você',
            title: title,
            content: content,
            likes: 0,
            comments: 0,
            timestamp: 'Agora'
        };

        posts.unshift(newPost);
        renderPosts();
        newPostForm.style.display = 'none';
        postForm.reset();
    });
}

renderPosts();

// Journal Page
const newEntryBtn = document.getElementById('newEntryBtn');
const newEntryForm = document.getElementById('newEntryForm');
const cancelEntryBtn = document.getElementById('cancelEntryBtn');
const entryForm = document.getElementById('entryForm');
const journalEntries = document.getElementById('journalEntries');

let selectedMood = '';
let entries = [
    {
        id: 1,
        date: '2025-03-17',
        mood: '😊',
        content: 'Hoje tive uma sessão de terapia muito produtiva. Me senti ouvido e compreendido. Estou animado com o progresso que estou fazendo.'
    },
    {
        id: 2,
        date: '2025-03-15',
        mood: '😐',
        content: 'Dia normal. Consegui completar minhas tarefas, mas ainda sinto um pouco de ansiedade ao pensar no futuro.'
    },
    {
        id: 3,
        date: '2025-03-13',
        mood: '😔',
        content: 'Dia difícil. Tive alguns pensamentos negativos, mas lembrei das técnicas de respiração e consegui me acalmar.'
    }
];

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
    });
}

function renderEntries() {
    if (!journalEntries) return;

    if (entries.length === 0) {
        journalEntries.innerHTML = `
            <div class="card" style="text-align: center; padding: 3rem;">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="2" style="margin: 0 auto 1rem;">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <p style="color: #9ca3af;">Nenhuma anotação ainda. Comece seu diário!</p>
            </div>
        `;
        return;
    }

    journalEntries.innerHTML = entries.map(entry => `
        <div class="journal-entry">
            <div class="entry-header">
                <div class="entry-mood">
                    <span class="entry-mood-emoji">${entry.mood}</span>
                    <div class="entry-date">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        <span>${formatDate(entry.date)}</span>
                    </div>
                </div>
                <div class="entry-actions">
                    <button class="entry-action-btn" title="Editar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                    <button class="entry-action-btn" onclick="deleteEntry(${entry.id})" title="Excluir">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                    </button>
                </div>
            </div>
            <p class="entry-content">${entry.content}</p>
        </div>
    `).join('');
}

function deleteEntry(id) {
    entries = entries.filter(entry => entry.id !== id);
    renderEntries();
}

if (newEntryBtn && newEntryForm) {
    newEntryBtn.addEventListener('click', () => {
        newEntryForm.style.display = 'block';
    });
}

if (cancelEntryBtn && newEntryForm) {
    cancelEntryBtn.addEventListener('click', () => {
        newEntryForm.style.display = 'none';
        entryForm.reset();
        selectedMood = '';
        document.querySelectorAll('.mood-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
    });
}

// Mood selection
document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedMood = btn.getAttribute('data-mood');
    });
});

if (entryForm) {
    entryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!selectedMood) {
            alert('Por favor, selecione como você está se sentindo');
            return;
        }

        const content = document.getElementById('entryContent').value;
        const today = new Date().toISOString().split('T')[0];

        const newEntry = {
            id: entries.length + 1,
            date: today,
            mood: selectedMood,
            content: content
        };

        entries.unshift(newEntry);
        renderEntries();
        newEntryForm.style.display = 'none';
        entryForm.reset();
        selectedMood = '';
        document.querySelectorAll('.mood-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
    });
}

renderEntries();
