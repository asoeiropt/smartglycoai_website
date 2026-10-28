// =========================================================================
// NAVEGAÇÃO E TEMA
// =========================================================================

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


// =========================================================================
// SCRIPTS DE CONTROLO DOS MODAIS (Versões, Lightbox e QR Code)
// =========================================================================

function openVersionModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeVersionModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

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

function openQRModal() {
    const modal = document.getElementById('qr-modal');
    const content = document.getElementById('qr-modal-content');
    if(modal && content) {
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            content.classList.remove('scale-95');
        }, 10);
    }
}

function closeQRModal() {
    const modal = document.getElementById('qr-modal');
    const content = document.getElementById('qr-modal-content');
    if(modal && content) {
        modal.classList.add('opacity-0');
        content.classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }
}

// Gestão de cliques fora de qualquer modal
window.addEventListener('click', (e) => {
    // Procura todos os modais de versão na página
    const versionModals = document.querySelectorAll('.version-modal');
    const lightboxModal = document.getElementById('lightbox-modal');
    const qrModal = document.getElementById('qr-modal');
    
    // Fecha o modal de versão específico em que se clicou fora
    versionModals.forEach(modal => {
        if (e.target === modal) closeVersionModal(modal.id);
    });
    
    if (e.target === lightboxModal) closeLightbox();
    if (e.target === qrModal) closeQRModal();
});

// Fechar modais com a tecla ESC
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Fecha todos os modais de versão que não estejam escondidos
        const openVersionModals = document.querySelectorAll('.version-modal:not(.hidden)');
        openVersionModals.forEach(modal => closeVersionModal(modal.id));
        
        closeLightbox();
        closeQRModal();
    }
});


// =========================================================================
// AI MEAL SIMULATOR LOGIC (Para o index.html)
// =========================================================================

const mealDatabase = {
    pasta: { icon: '🍝', name: 'Italian Pasta', carbs: 65, glucose: 110, dose: 4.0, color: 'text-blue-400', bg: 'bg-blue-900/30' },
    apple: { icon: '🍎', name: 'Fresh Apple', carbs: 15, glucose: 95, dose: 1.0, color: 'text-green-400', bg: 'bg-green-900/30' },
    steak: { icon: '🥩', name: 'Steak & Rice', carbs: 45, glucose: 115, dose: 3.0, color: 'text-red-400', bg: 'bg-red-900/30' }
};

function runSimulation(mealKey) {
    const screen = document.getElementById('sim-screen');
    const meal = mealDatabase[mealKey];
    
    if (!screen || !meal) return;

    screen.innerHTML = `
        <div class="relative">
            <div class="text-6xl mb-4 animate-bounce">${meal.icon}</div>
            <div class="absolute top-0 left-0 w-full h-1 bg-blue-500 shadow-[0_0_8px_2px_rgba(59,130,246,0.8)] animate-[ping_1.5s_ease-in-out_infinite]"></div>
        </div>
        <h3 class="text-blue-400 font-bold text-lg mb-1 animate-pulse">Analyzing Image...</h3>
        <p class="text-gray-400 text-sm">Computer Vision running</p>
    `;

    setTimeout(() => {
        screen.innerHTML = `
            <div class="w-full text-left bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-lg animate-in zoom-in duration-300">
                <div class="flex items-center gap-3 border-b border-gray-700 pb-3 mb-3">
                    <div class="text-3xl ${meal.bg} p-2 rounded-lg">${meal.icon}</div>
                    <div>
                        <div class="text-gray-400 text-xs uppercase tracking-wider font-bold">Detected Meal</div>
                        <div class="text-white font-bold text-lg">${meal.name}</div>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="bg-gray-900 rounded-lg p-2 text-center">
                        <div class="text-gray-500 text-xs uppercase">Est. Carbs</div>
                        <div class="${meal.color} font-bold text-xl">${meal.carbs}g</div>
                    </div>
                    <div class="bg-gray-900 rounded-lg p-2 text-center">
                        <div class="text-gray-500 text-xs uppercase">CGM Trend</div>
                        <div class="text-white font-bold text-xl">${meal.glucose} <span class="text-xs font-normal text-gray-500">mg/dL ➔</span></div>
                    </div>
                </div>

                <div class="bg-blue-600 text-white rounded-lg p-3 text-center flex items-center justify-between">
                    <span class="text-sm font-semibold">Suggested Bolus</span>
                    <span class="font-extrabold text-xl">${meal.dose} U</span>
                </div>
            </div>
        `;
    }, 1800);
}


// =========================================================================
// SCROLL TO TOP BUTTON LOGIC
// =========================================================================

// Criar botão dinamicamente
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
// Adiciona as classes Tailwind para o botão flutuante
scrollTopBtn.className = 'fixed bottom-6 right-6 w-12 h-12 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center text-xl transition-all transform scale-0 opacity-0 z-50 focus:outline-none';
document.body.appendChild(scrollTopBtn);

// Mostrar ou ocultar com base no scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        scrollTopBtn.classList.remove('scale-0', 'opacity-0');
        scrollTopBtn.classList.add('scale-100', 'opacity-100');
    } else {
        scrollTopBtn.classList.add('scale-0', 'opacity-0');
        scrollTopBtn.classList.remove('scale-100', 'opacity-100');
    }
});

// Ação de clique para subir suavemente
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// =========================================================================
// INICIALIZAÇÃO AUTOMÁTICA
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