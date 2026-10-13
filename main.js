// Toggle mobile menu visibility
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

// Toggle Dark Mode
function toggleDarkMode() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcons(isDark);
}

// Update theme icons (Moon/Sun) across all pages
function updateThemeIcons(isDark) {
    const iconContent = isDark ? '☀️' : '🌙';
    
    const iconDesktop = document.getElementById('theme-icon-desktop');
    const iconMobile = document.getElementById('theme-icon-mobile');
    const iconSingle = document.getElementById('theme-icon'); // Used on Stage pages
    
    if (iconDesktop) iconDesktop.innerText = iconContent;
    if (iconMobile) iconMobile.innerText = iconContent;
    if (iconSingle) iconSingle.innerText = iconContent;
}

// --- SCRIPTS DE CONTROLO DOS MODAIS (Página da App) ---
function openVersionModal() {
    const modal = document.getElementById('version-modal');
    if(modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeVersionModal() {
    const modal = document.getElementById('version-modal');
    if(modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Adicionado o parâmetro 'event' para não dar erro no stopPropagation
function openLightbox(event, imageUrl) {
    if(event) event.stopPropagation(); 
    const imgEl = document.getElementById('lightbox-img');
    const modal = document.getElementById('lightbox-modal');
    if(imgEl && modal) {
        imgEl.src = imageUrl;
        modal.classList.remove('hidden');
    }
}

function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if(modal) {
        modal.classList.add('hidden');
    }
}

// Gestão de cliques fora de qualquer modal
window.addEventListener('click', (e) => {
    const versionModal = document.getElementById('version-modal');
    const lightboxModal = document.getElementById('lightbox-modal');
    
    if (e.target === versionModal) closeVersionModal();
    if (e.target === lightboxModal) closeLightbox();
});

// Fechar modais com a tecla ESC
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeVersionModal();
        closeLightbox();
    }
});


// =========================================================================
// INICIALIZAÇÃO AUTOMÁTICA (Sem depender do DOMContentLoaded)
// =========================================================================

// 1. Iniciar Tema (Dark/Light)
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
    updateThemeIcons(true);
} else {
    document.documentElement.classList.remove('dark');
    updateThemeIcons(false);
}

// 2. Iniciar Animações (AOS)
if (typeof AOS !== 'undefined') {
    AOS.init({
        once: true,
        duration: 800,
        offset: 50
    });
}