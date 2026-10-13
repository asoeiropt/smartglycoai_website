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

// =========================================================================
// AI MEAL SIMULATOR LOGIC (Para o index.html)
// =========================================================================

// Base de dados simulada para os pratos
const mealDatabase = {
    pasta: {
        icon: '🍝',
        name: 'Italian Pasta',
        carbs: 65,
        glucose: 110,
        dose: 4.0,
        color: 'text-blue-400',
        bg: 'bg-blue-900/30'
    },
    apple: {
        icon: '🍎',
        name: 'Fresh Apple',
        carbs: 15,
        glucose: 95,
        dose: 1.0,
        color: 'text-green-400',
        bg: 'bg-green-900/30'
    },
    steak: {
        icon: '🥩',
        name: 'Steak & Rice',
        carbs: 45,
        glucose: 115,
        dose: 3.0,
        color: 'text-red-400',
        bg: 'bg-red-900/30'
    }
};

function runSimulation(mealKey) {
    const screen = document.getElementById('sim-screen');
    const meal = mealDatabase[mealKey];
    
    if (!screen || !meal) return;

    // 1. Estado de Análise (Scanning) com Animação
    screen.innerHTML = `
        <div class="relative">
            <div class="text-6xl mb-4 animate-bounce">${meal.icon}</div>
            <!-- Laser Effect -->
            <div class="absolute top-0 left-0 w-full h-1 bg-blue-500 shadow-[0_0_8px_2px_rgba(59,130,246,0.8)] animate-[ping_1.5s_ease-in-out_infinite]"></div>
        </div>
        <h3 class="text-blue-400 font-bold text-lg mb-1 animate-pulse">Analyzing Image...</h3>
        <p class="text-gray-400 text-sm">Computer Vision running</p>
    `;

    // 2. Esperar 1.8 segundos e mostrar o resultado final
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
    }, 1800); // 1.8 segundos de "análise"
}