// =========================================================================
// 0. ESTILOS DINÂMICOS (Preloader, Spotlight, 3D Tilt & Esconder Barra GT)
// =========================================================================
const customStyles = document.createElement('style');
customStyles.innerHTML = `
    /* Preloader Pequeno para navegação */
    #sg-preloader {
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #f9fafb;
        transition: opacity 0.4s ease, visibility 0.4s ease;
    }
    html.dark #sg-preloader {
        background-color: #111827;
    }
    #sg-preloader.fade-out {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
    }

    /* Efeito Spotlight & 3D Tilt nos Cartões Bento */
    .spotlight-card {
        position: relative;
        overflow: hidden;
        transform-style: preserve-3d;
        will-change: transform;
    }
    .spotlight-card::before {
        content: "";
        position: absolute;
        inset: 0;
        background: radial-gradient(
            380px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(59, 130, 246, 0.16),
            transparent 45%
        );
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
        z-index: 1;
        border-radius: inherit;
    }
    html.dark .spotlight-card::before {
        background: radial-gradient(
            380px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(96, 165, 250, 0.18),
            transparent 45%
        );
    }
    .spotlight-card:hover::before {
        opacity: 1;
    }

    /* Esconder completamente o banner/tooltips nativos do Google Translate */
    .goog-te-banner-frame.skiptranslate,
    .goog-te-gadget-icon,
    #goog-gt-tt,
    .goog-te-balloon-frame,
    .VIpgJd-ZVi9od-ORHb-OEVmcd,
    .VIpgJd-ZVi9od-aZ2wEe-wOHMyf {
        display: none !important;
        visibility: hidden !important;
    }
    body {
        top: 0px !important;
    }
    .goog-text-highlight {
        background-color: transparent !important;
        box-shadow: none !important;
    }
`;
document.head.appendChild(customStyles);


// =========================================================================
// 1. NAVEGAÇÃO, IDIOMA (EN / PT-PT) E TEMA (System / Light / Dark)
// =========================================================================

const THEME_ICONS_SVG = {
    system: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`,
    light:  `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>`,
    dark:   `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>`
};

const GLOBE_ICON_SVG = `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20"></path><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`;

function getCurrentLang() {
    return localStorage.getItem('sg_lang') || 'en';
}

function setGoogTransCookie(lang) {
    const domain = window.location.hostname;
    if (lang === 'pt') {
        document.cookie = `googtrans=/en/pt; path=/`;
        if (domain && domain !== 'localhost') {
            document.cookie = `googtrans=/en/pt; path=/; domain=.${domain}`;
        }
    } else {
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        if (domain && domain !== 'localhost') {
            document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain}`;
        }
    }
}

function applyNativePTTranslations(lang) {
    if (lang !== 'pt') return;

    const ptMap = {
        'Human-Computer Interaction': 'Interação Pessoa-Máquina',
        'Group 6': 'Grupo 6',
        'Glossary': 'Glossário',
        'The Team': 'A Equipa',
        'Back to Menu': 'Voltar ao Menu',
        'Project Portal': 'Portal do Projeto',
        'Tracking of development phases, design, and interface evaluation for the SmartGlycoAI project.': 'Acompanhamento das fases de desenvolvimento, design e avaliação da interface do projeto SmartGlycoAI.',
        'Watch App Showreel': 'Ver Vídeo de Apresentação',
        'Video': 'Vídeo',
        'Quick walkthrough of SmartGlycoAI features': 'Demonstração rápida das funcionalidades do SmartGlycoAI',
        'SmartGlycoAI — App Showreel': 'SmartGlycoAI — Vídeo de Apresentação',
        'Project Milestone Progress': 'Progresso dos Marcos do Projeto',
        'Stage 4 finished • Stage 5 (Heuristic Evaluation) currently active': 'Fase 4 concluída • Fase 5 (Avaliação Heurística) atualmente ativa',
        '80% Completed': '80% Concluído',
        'Phase 1': 'Fase 1',
        'Phase 2': 'Fase 2',
        'Stage 1': 'Fase 1',
        'Stage 2': 'Fase 2',
        'Stage 3': 'Fase 3',
        'Stage 4': 'Fase 4',
        'Stage 5': 'Fase 5',
        'Stage 6': 'Fase 6',
        'Project Proposal': 'Proposta de Projeto',
        'User and Task Analysis': 'Análise de Utilizadores e Tarefas',
        '1st Prototype (Mock-up)': '1.º Protótipo (Mock-up)',
        'Computational Prototype': 'Protótipo Computacional',
        'Heuristic Evaluation': 'Avaliação Heurística',
        'Evaluation Results': 'Resultados da Avaliação',
        'View report': 'Ver relatório',
        'Available soon': 'Disponível em breve',
        'Mandatory: Presentation': 'Obrigatório: Apresentação',
        'Deliverables': 'Entregáveis',
        'Documentation': 'Documentação',
        'Prototype': 'Protótipo',
        'Try Live Demo': 'Testar Demo',
        'System': 'Sistema',
        'Light': 'Claro',
        'Dark': 'Escuro'
    };

    document.querySelectorAll('a, button, span, h1, h2, h3, h4, p, div').forEach(el => {
        if (el.children.length === 0) {
            const raw = el.textContent.trim();
            if (ptMap[raw]) {
                el.textContent = ptMap[raw];
            }
        }
    });
}

function loadGoogleTranslateEngine() {
    if (getCurrentLang() !== 'pt') return;
    if (document.getElementById('google_translate_element')) return;

    const gtDiv = document.createElement('div');
    gtDiv.id = 'google_translate_element';
    gtDiv.className = 'hidden';
    document.body.appendChild(gtDiv);

    window.googleTranslateElementInit = function () {
        if (window.google && window.google.translate) {
            new window.google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'pt',
                autoDisplay: false
            }, 'google_translate_element');
        }
    };

    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);
}

function setLanguagePreference(lang) {
    const prevLang = getCurrentLang();
    localStorage.setItem('sg_lang', lang);
    setGoogTransCookie(lang);

    if (prevLang !== lang) {
        window.location.reload();
    }
}

function initLanguageDropdown(themeWrapper) {
    if (!themeWrapper || document.getElementById('sg-lang-wrapper')) return;

    const currentLang = getCurrentLang();
    const langCodeLabel = currentLang === 'pt' ? 'PT' : 'EN';

    const langWrapper = document.createElement('div');
    langWrapper.id = 'sg-lang-wrapper';
    langWrapper.className = 'relative inline-block';

    const triggerBtn = document.createElement('button');
    triggerBtn.type = 'button';
    triggerBtn.setAttribute('aria-label', 'Select Language');
    triggerBtn.className = 'h-9 px-3 rounded-full bg-gray-100/80 dark:bg-gray-700/70 hover:bg-gray-200/80 dark:hover:bg-gray-600/80 border border-gray-200/80 dark:border-gray-600/70 flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-gray-200 transition focus:outline-none';
    triggerBtn.innerHTML = `${GLOBE_ICON_SVG}<span>${langCodeLabel}</span>`;

    const dropdown = document.createElement('div');
    dropdown.id = 'sg-lang-dropdown';
    dropdown.className = 'hidden absolute right-0 mt-2.5 w-52 rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border border-gray-200/90 dark:border-gray-700/90 p-1.5 z-[60] transition-all';

    const langs = [
        { code: 'en', label: 'English' },
        { code: 'pt', label: 'Português (Portugal)' }
    ];

    dropdown.innerHTML = langs.map(item => {
        const isSelected = currentLang === item.code;
        return `
            <button type="button" data-lang-code="${item.code}" class="sg-lang-option w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-left">
                <span class="${isSelected ? 'font-bold text-gray-900 dark:text-white' : ''}">${item.label}</span>
                <span class="text-rose-500 font-extrabold text-sm ${isSelected ? '' : 'opacity-0'}">✓</span>
            </button>
        `;
    }).join('');

    langWrapper.appendChild(triggerBtn);
    langWrapper.appendChild(dropdown);

    themeWrapper.parentNode.insertBefore(langWrapper, themeWrapper);

    triggerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const themeDrop = document.getElementById('sg-theme-dropdown');
        if (themeDrop) themeDrop.classList.add('hidden');
        dropdown.classList.toggle('hidden');
    });

    dropdown.querySelectorAll('.sg-lang-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const selectedCode = btn.getAttribute('data-lang-code');
            dropdown.classList.add('hidden');
            setLanguagePreference(selectedCode);
        });
    });

    document.addEventListener('click', (e) => {
        if (!langWrapper.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

function applyThemePreference(mode) {
    const html = document.documentElement;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = mode === 'dark' || (mode === 'system' && prefersDark);

    html.classList.toggle('dark', isDark);

    if (mode === 'system') {
        localStorage.removeItem('theme');
    } else {
        localStorage.setItem('theme', mode);
    }

    updateThemeIcons(isDark, mode);
}

function updateThemeIcons(isDark, mode = localStorage.getItem('theme') || 'system') {
    const triggerIcon = isDark ? THEME_ICONS_SVG.dark : THEME_ICONS_SVG.light;

    ['theme-icon-desktop', 'theme-icon-mobile', 'theme-icon'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = triggerIcon;
    });

    document.querySelectorAll('.sg-theme-option').forEach(opt => {
        const isSelected = opt.getAttribute('data-theme-mode') === mode;
        const check = opt.querySelector('.sg-theme-check');
        const label = opt.querySelector('.sg-theme-label');

        if (check) check.classList.toggle('opacity-0', !isSelected);
        if (label) {
            label.classList.toggle('font-bold', isSelected);
            label.classList.toggle('text-gray-900', isSelected);
            label.classList.toggle('dark:text-white', isSelected);
        }
    });
}

function initThemeDropdown() {
    const triggerBtn = document.querySelector('button[onclick*="toggleDarkMode"]');
    if (!triggerBtn || document.getElementById('sg-theme-dropdown')) return;

    const isPT = getCurrentLang() === 'pt';

    triggerBtn.removeAttribute('onclick');
    triggerBtn.className = 'w-9 h-9 rounded-full bg-gray-100/80 dark:bg-gray-700/70 hover:bg-gray-200/80 dark:hover:bg-gray-600/80 border border-gray-200/80 dark:border-gray-600/70 flex items-center justify-center text-gray-700 dark:text-gray-200 transition focus:outline-none';

    const wrapper = document.createElement('div');
    wrapper.className = 'relative inline-block';
    triggerBtn.parentNode.insertBefore(wrapper, triggerBtn);
    wrapper.appendChild(triggerBtn);

    const dropdown = document.createElement('div');
    dropdown.id = 'sg-theme-dropdown';
    dropdown.className = 'hidden absolute right-0 mt-2.5 w-44 rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border border-gray-200/90 dark:border-gray-700/90 p-1.5 z-[60] transition-all';

    const options = [
        { mode: 'system', label: isPT ? 'Sistema' : 'System', icon: THEME_ICONS_SVG.system },
        { mode: 'light',  label: isPT ? 'Claro'   : 'Light',  icon: THEME_ICONS_SVG.light },
        { mode: 'dark',   label: isPT ? 'Escuro'  : 'Dark',   icon: THEME_ICONS_SVG.dark }
    ];

    dropdown.innerHTML = options.map(opt => `
        <button type="button" data-theme-mode="${opt.mode}" class="sg-theme-option w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-left">
            <span class="flex items-center gap-2.5">
                <span class="text-gray-500 dark:text-gray-400">${opt.icon}</span>
                <span class="sg-theme-label">${opt.label}</span>
            </span>
            <span class="sg-theme-check text-rose-500 font-extrabold text-sm opacity-0">✓</span>
        </button>
    `).join('');

    wrapper.appendChild(dropdown);

    triggerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const langDrop = document.getElementById('sg-lang-dropdown');
        if (langDrop) langDrop.classList.add('hidden');
        dropdown.classList.toggle('hidden');
    });

    dropdown.querySelectorAll('.sg-theme-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const mode = btn.getAttribute('data-theme-mode');
            applyThemePreference(mode);
            dropdown.classList.add('hidden');
        });
    });

    document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (!localStorage.getItem('theme')) {
            applyThemePreference('system');
        }
    });

    const currentMode = localStorage.getItem('theme') || 'system';
    applyThemePreference(currentMode);

    initLanguageDropdown(wrapper);
}

function toggleDarkMode() {
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    applyThemePreference(isCurrentlyDark ? 'light' : 'dark');
}


// =========================================================================
// 2. CONTROLO DOS MODAIS, SHOWREEL VÍDEO E LIGHTBOX COM SETAS
// =========================================================================

let currentGallery = [];
let currentImageIndex = 0;

function openVersionModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeVersionModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function ensureLightboxControls() {
    const modal = document.getElementById('lightbox-modal');
    if (!modal || document.getElementById('lb-prev')) return;

    const container = modal.querySelector('div');
    if (!container) return;

    const prevBtn = document.createElement('button');
    prevBtn.id = 'lb-prev';
    prevBtn.innerHTML = '&#10094;';
    prevBtn.className = 'fixed left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-800/80 hover:bg-blue-600 text-white text-xl font-bold flex items-center justify-center transition shadow-xl border border-gray-600 z-[70]';
    prevBtn.onclick = (e) => prevLightboxImage(e);

    const nextBtn = document.createElement('button');
    nextBtn.id = 'lb-next';
    nextBtn.innerHTML = '&#10095;';
    nextBtn.className = 'fixed right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-800/80 hover:bg-blue-600 text-white text-xl font-bold flex items-center justify-center transition shadow-xl border border-gray-600 z-[70]';
    nextBtn.onclick = (e) => nextLightboxImage(e);

    const counter = document.createElement('div');
    counter.id = 'lb-counter';
    counter.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900/90 text-white text-xs font-bold px-4 py-1.5 rounded-full border border-gray-700 tracking-wider z-[70]';

    modal.appendChild(prevBtn);
    modal.appendChild(nextBtn);
    modal.appendChild(counter);
}

function updateLightboxView() {
    const imgEl = document.getElementById('lightbox-img');
    const counterEl = document.getElementById('lb-counter');
    const prevBtn = document.getElementById('lb-prev');
    const nextBtn = document.getElementById('lb-next');

    if (imgEl && currentGallery.length > 0) {
        imgEl.src = currentGallery[currentImageIndex];
    }

    if (counterEl) {
        if (currentGallery.length > 1) {
            counterEl.innerText = `${currentImageIndex + 1} / ${currentGallery.length}`;
            counterEl.classList.remove('hidden');
            if (prevBtn) prevBtn.classList.remove('hidden');
            if (nextBtn) nextBtn.classList.remove('hidden');
        } else {
            counterEl.classList.add('hidden');
            if (prevBtn) prevBtn.classList.add('hidden');
            if (nextBtn) nextBtn.classList.add('hidden');
        }
    }
}

function openLightbox(event, imageUrl) {
    if (event) event.stopPropagation();
    const modal = document.getElementById('lightbox-modal');
    if (!modal) return;

    ensureLightboxControls();

    const activeModal = document.querySelector('.version-modal:not(.hidden)');
    if (activeModal) {
        const imgs = Array.from(activeModal.querySelectorAll('img'));
        currentGallery = imgs.map(img => img.getAttribute('src'));
        currentImageIndex = currentGallery.indexOf(imageUrl);
        if (currentImageIndex === -1) currentImageIndex = 0;
    } else {
        currentGallery = [imageUrl];
        currentImageIndex = 0;
    }

    updateLightboxView();
    modal.classList.remove('hidden');
}

function prevLightboxImage(event) {
    if (event) event.stopPropagation();
    if (currentGallery.length <= 1) return;
    currentImageIndex = (currentImageIndex - 1 + currentGallery.length) % currentGallery.length;
    updateLightboxView();
}

function nextLightboxImage(event) {
    if (event) event.stopPropagation();
    if (currentGallery.length <= 1) return;
    currentImageIndex = (currentImageIndex + 1) % currentGallery.length;
    updateLightboxView();
}

function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function openQRModal() {
    const modal = document.getElementById('qr-modal');
    const content = document.getElementById('qr-modal-content');
    if (modal && content) {
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
    if (modal && content) {
        modal.classList.add('opacity-0');
        content.classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }
}

function openShowreelModal() {
    const modal = document.getElementById('showreel-modal');
    const content = document.getElementById('showreel-modal-content');
    const video = document.getElementById('showreel-video');
    if (!modal || !content) return;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        content.classList.remove('scale-95');
        if (video) {
            video.currentTime = 0;
            video.play().catch(() => {});
        }
    }, 10);
}

function closeShowreelModal() {
    const modal = document.getElementById('showreel-modal');
    const content = document.getElementById('showreel-modal-content');
    const video = document.getElementById('showreel-video');
    if (!modal || !content) return;

    if (video) video.pause();
    modal.classList.add('opacity-0');
    content.classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 300);
}

window.addEventListener('click', (e) => {
    const versionModals = document.querySelectorAll('.version-modal');
    const lightboxModal = document.getElementById('lightbox-modal');
    const qrModal = document.getElementById('qr-modal');
    const showreelModal = document.getElementById('showreel-modal');
    
    versionModals.forEach(modal => {
        if (e.target === modal) closeVersionModal(modal.id);
    });
    
    if (e.target === lightboxModal) closeLightbox();
    if (e.target === qrModal) closeQRModal();
    if (e.target === showreelModal) closeShowreelModal();
});

window.addEventListener('keydown', (e) => {
    const lightboxModal = document.getElementById('lightbox-modal');
    const isLightboxOpen = lightboxModal && !lightboxModal.classList.contains('hidden');

    if (e.key === 'Escape') {
        if (isLightboxOpen) {
            closeLightbox();
            return;
        }
        const openVersionModals = document.querySelectorAll('.version-modal:not(.hidden)');
        openVersionModals.forEach(modal => closeVersionModal(modal.id));
        closeQRModal();
        closeShowreelModal();
    } else if (isLightboxOpen && e.key === 'ArrowLeft') {
        prevLightboxImage();
    } else if (isLightboxOpen && e.key === 'ArrowRight') {
        nextLightboxImage();
    }
});


// =========================================================================
// 3. EFEITO SPOTLIGHT + 3D TILT NOS CARTÕES BENTO
// =========================================================================

function initSpotlightAndTilt() {
    const cards = document.querySelectorAll('.glow-blue, .glow-green, .glow-purple, .glow-amber, .glow-rose');

    cards.forEach(card => {
        card.classList.add('spotlight-card');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            if (rect.width <= 600) {
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}


// =========================================================================
// 4. BOTÕES "NEXT / PREVIOUS STAGE" AUTOMÁTICOS
// =========================================================================

function initStageNavigation() {
    if (document.getElementById('stage-nav-container')) return;

    const isPT = getCurrentLang() === 'pt';

    const stages = [
        { file: 'stage1.html', label: isPT ? 'Fase 1' : 'Stage 1', title: isPT ? 'Proposta de Projeto' : 'Problem & User Research' },
        { file: 'stage2.html', label: isPT ? 'Fase 2' : 'Stage 2', title: isPT ? 'Análise de Utilizadores e Tarefas' : 'Architecture & Low-Fi' },
        { file: 'stage3.html', label: isPT ? 'Fase 3' : 'Stage 3', title: isPT ? '1.º Protótipo Interativo' : 'Interactive Prototype' },
        { file: 'stage4.html', label: isPT ? 'Fase 4' : 'Stage 4', title: isPT ? 'Protótipo Funcional' : 'Functional Prototype' },
        { file: 'stage5.html', label: isPT ? 'Fase 5' : 'Stage 5', title: isPT ? 'Avaliação Heurística' : 'Heuristic Evaluation' },
        { file: 'app.html',    label: isPT ? 'Arquitetura' : 'Architecture', title: isPT ? 'Arquitetura e Tech Stack' : 'App Architecture & Stack' }
    ];

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const currentIndex = stages.findIndex(s => s.file === currentPath);

    if (currentIndex === -1) return;

    const prevStage = currentIndex > 0 ? stages[currentIndex - 1] : null;
    const nextStage = currentIndex < stages.length - 1 ? stages[currentIndex + 1] : null;

    const mainEl = document.querySelector('main');
    if (!mainEl) return;

    const navSection = document.createElement('section');
    navSection.id = 'stage-nav-container';
    navSection.className = 'max-w-6xl mx-auto px-4 pt-8 pb-4';

    navSection.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-gray-200 dark:border-gray-800">
            ${prevStage ? `
                <a href="${prevStage.file}" class="spotlight-card flex items-center justify-between p-6 rounded-[2rem] bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 hover:border-blue-500 dark:hover:border-blue-500 shadow-sm hover:shadow-xl transition-all group">
                    <div class="flex items-center gap-4">
                        <span class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center font-bold group-hover:bg-blue-600 group-hover:text-white group-hover:-translate-x-1 transition-all">←</span>
                        <div>
                            <div class="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">${isPT ? 'Anterior' : 'Previous'} (${prevStage.label})</div>
                            <div class="text-base font-bold text-gray-900 dark:text-white">${prevStage.title}</div>
                        </div>
                    </div>
                </a>
            ` : `
                <a href="index.html" class="spotlight-card flex items-center justify-between p-6 rounded-[2rem] bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 hover:border-blue-500 dark:hover:border-blue-500 shadow-sm hover:shadow-xl transition-all group">
                    <div class="flex items-center gap-4">
                        <span class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center font-bold group-hover:bg-blue-600 group-hover:text-white group-hover:-translate-x-1 transition-all">🏠</span>
                        <div>
                            <div class="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">${isPT ? 'Visão Geral' : 'Overview'}</div>
                            <div class="text-base font-bold text-gray-900 dark:text-white">${isPT ? 'Voltar ao Menu Principal' : 'Back to Main Menu'}</div>
                        </div>
                    </div>
                </a>
            `}

            ${nextStage ? `
                <a href="${nextStage.file}" class="spotlight-card flex items-center justify-between p-6 rounded-[2rem] bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 hover:border-blue-500 dark:hover:border-blue-500 shadow-sm hover:shadow-xl transition-all text-right group">
                    <div class="w-full flex items-center justify-end gap-4">
                        <div>
                            <div class="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">${isPT ? 'Seguinte' : 'Next'} (${nextStage.label})</div>
                            <div class="text-base font-bold text-gray-900 dark:text-white">${nextStage.title}</div>
                        </div>
                        <span class="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold group-hover:bg-blue-600 group-hover:text-white group-hover:translate-x-1 transition-all">→</span>
                    </div>
                </a>
            ` : `
                <a href="index.html" class="spotlight-card flex items-center justify-between p-6 rounded-[2rem] bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 hover:border-blue-500 dark:hover:border-blue-500 shadow-sm hover:shadow-xl transition-all text-right group">
                    <div class="w-full flex items-center justify-end gap-4">
                        <div>
                            <div class="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">${isPT ? 'Concluído' : 'Completed'}</div>
                            <div class="text-base font-bold text-gray-900 dark:text-white">${isPT ? 'Voltar ao Início' : 'Return to Home'}</div>
                        </div>
                        <span class="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold group-hover:bg-blue-600 group-hover:text-white group-hover:translate-x-1 transition-all">🏠</span>
                    </div>
                </a>
            `}
        </div>
    `;

    mainEl.appendChild(navSection);
}


// =========================================================================
// 5. AI MEAL SIMULATOR & COPIAR COMANDO DO TERMINAL
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

function copyTerminalCommand(btn, commandText) {
    if (!navigator.clipboard) return;

    navigator.clipboard.writeText(commandText).then(() => {
        const originalHTML = btn.innerHTML;
        btn.innerHTML = getCurrentLang() === 'pt' ? 'Copiado! ✓' : 'Copied! ✓';
        btn.classList.add('!bg-emerald-600', '!text-white', '!border-emerald-500');

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.remove('!bg-emerald-600', '!text-white', '!border-emerald-500');
        }, 1800);
    });
}


// =========================================================================
// 6. SCROLL TO TOP BUTTON LOGIC
// =========================================================================

const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'fixed bottom-6 right-6 w-12 h-12 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center text-xl transition-all transform scale-0 opacity-0 z-50 focus:outline-none';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        scrollTopBtn.classList.remove('scale-0', 'opacity-0');
        scrollTopBtn.classList.add('scale-100', 'opacity-100');
    } else {
        scrollTopBtn.classList.add('scale-0', 'opacity-0');
        scrollTopBtn.classList.remove('scale-100', 'opacity-100');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// =========================================================================
// 7. GLOSSÁRIO INTERATIVO (Pesquisa + Filtros por Categoria)
// =========================================================================

let currentGlossaryCategory = 'all';

function setGlossaryFilter(category) {
    currentGlossaryCategory = category;

    document.querySelectorAll('.glossary-filter-btn').forEach(btn => {
        const isActive = btn.getAttribute('data-filter') === category;
        if (isActive) {
            btn.className = 'glossary-filter-btn px-4 py-2 rounded-full text-xs font-bold transition bg-blue-600 text-white shadow-sm';
        } else {
            btn.className = 'glossary-filter-btn px-4 py-2 rounded-full text-xs font-bold transition bg-gray-100 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600';
        }
    });

    filterGlossary();
}

function filterGlossary() {
    const input = document.getElementById('glossary-search');
    const clearBtn = document.getElementById('glossary-clear');
    const emptyState = document.getElementById('glossary-empty');
    if (!input) return;

    const query = input.value.trim().toLowerCase();
    if (clearBtn) {
        clearBtn.classList.toggle('hidden', query.length === 0);
    }

    const cards = document.querySelectorAll('.glossary-card');
    let visibleMedical = 0;
    let visibleHci = 0;

    cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const text = card.innerText.toLowerCase();
        const matchesCategory = currentGlossaryCategory === 'all' || cat === currentGlossaryCategory;
        const matchesQuery = !query || text.includes(query);

        if (matchesCategory && matchesQuery) {
            card.classList.remove('hidden');
            if (cat === 'medical') visibleMedical++;
            if (cat === 'hci') visibleHci++;
        } else {
            card.classList.add('hidden');
        }
    });

    const secMedical = document.getElementById('section-medical');
    const secHci = document.getElementById('section-hci');
    if (secMedical) secMedical.classList.toggle('hidden', visibleMedical === 0);
    if (secHci) secHci.classList.toggle('hidden', visibleHci === 0);
    if (emptyState) emptyState.classList.toggle('hidden', (visibleMedical + visibleHci) > 0);
}

function clearGlossarySearch() {
    const input = document.getElementById('glossary-search');
    if (input) {
        input.value = '';
        filterGlossary();
        input.focus();
    }
}

function resetGlossaryFilters() {
    const input = document.getElementById('glossary-search');
    if (input) input.value = '';
    setGlossaryFilter('all');
}


// =========================================================================
// 8. BADGE DE ÚLTIMA ATUALIZAÇÃO (Apenas no Footer)
// =========================================================================

function formatRelativeTime(isoDateString) {
    const isPT = getCurrentLang() === 'pt';
    const updatedDate = new Date(isoDateString);
    const now = new Date();
    const diffSeconds = Math.floor((now - updatedDate) / 1000);

    if (diffSeconds < 60) return isPT ? 'Atualizado agora mesmo' : 'Updated just now';
    
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return isPT ? `Atualizado há ${diffMinutes} m` : `Updated ${diffMinutes} m ago`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return isPT ? `Atualizado há ${diffHours} h` : `Updated ${diffHours} h ago`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return isPT ? 'Atualizado há 1 dia' : 'Updated 1 day ago';
    if (diffDays < 30) return isPT ? `Atualizado há ${diffDays} dias` : `Updated ${diffDays} days ago`;

    const diffMonths = Math.floor(diffDays / 30);
    if (isPT) {
        return diffMonths === 1 ? 'Atualizado há 1 mês' : `Atualizado há ${diffMonths} meses`;
    }
    return diffMonths === 1 ? 'Updated 1 month ago' : `Updated ${diffMonths} months ago`;
}

async function initLastUpdatedBadges() {
    const labels = document.querySelectorAll('.sg-last-updated-label');
    if (labels.length === 0) return;

    const repoOwner = 'asoeiropt';
    const repoName = 'smartglycoai_website';
    const cacheKey = 'sg_site_last_commit_date';
    const cacheTimeKey = 'sg_site_last_commit_checked';

    try {
        const cachedDate = sessionStorage.getItem(cacheKey);
        const lastChecked = Number(sessionStorage.getItem(cacheTimeKey) || 0);

        if (cachedDate && (Date.now() - lastChecked) < 5 * 60 * 1000) {
            const text = formatRelativeTime(cachedDate);
            labels.forEach(el => { el.textContent = text; });
            return;
        }

        const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/commits?per_page=1`);
        if (!response.ok) return;

        const data = await response.json();
        const commitDate = data?.[0]?.commit?.committer?.date;
        if (commitDate) {
            sessionStorage.setItem(cacheKey, commitDate);
            sessionStorage.setItem(cacheTimeKey, String(Date.now()));
            const text = formatRelativeTime(commitDate);
            labels.forEach(el => { el.textContent = text; });
        }
    } catch (err) {
        // Fallback silencioso
    }
}


// =========================================================================
// 9. FOOTER PROFISSIONAL UNIFICADO (Bento Glassmorphism Card)
// =========================================================================

function initUnifiedFooter() {
    const footer = document.querySelector('footer');
    if (!footer || footer.dataset.unified === 'true') return;

    const isPT = getCurrentLang() === 'pt';

    footer.dataset.unified = 'true';
    footer.className = 'px-3 sm:px-4 pt-12 pb-8 mt-12 transition-colors duration-300';

    footer.innerHTML = `
        <div class="max-w-7xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-lg border border-gray-200/80 dark:border-gray-700/80 rounded-3xl sm:rounded-[2.2rem] p-6 sm:p-10 transition-colors duration-300">
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-8 border-b border-gray-200/80 dark:border-gray-700/80">
                
                <div class="lg:col-span-5 flex flex-col items-start">
                    <a href="index.html" class="flex items-center gap-3 mb-3 group">
                        <div class="w-10 h-10 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
                            <img src="img/logo.jpeg" alt="SmartGlycoAI" class="w-full h-full object-cover">
                        </div>
                        <div>
                            <span class="text-lg font-extrabold text-blue-600 dark:text-blue-400 tracking-tight group-hover:opacity-80 transition block leading-tight">SmartGlycoAI</span>
                            <span class="text-[9px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold block">${isPT ? 'Interação Pessoa-Máquina' : 'Human-Computer Interaction'}</span>
                        </div>
                    </a>
                    <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-4 max-w-sm">
                        ${isPT
                            ? 'Sistema inteligente de apoio à decisão na Diabetes Tipo 1 que integra visão computacional para estimativa de hidratos de carbono, telemetria CGM e cálculo personalizado de insulina.'
                            : 'AI-assisted Type 1 Diabetes decision-support system integrating computer vision carbohydrate estimation, CGM telemetry, and personalized insulin dosing.'}
                    </p>
                    <div class="flex flex-wrap gap-2 text-[11px] font-semibold">
                        <span class="px-3 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/50">NOVA FCT</span>
                        <span class="px-3 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700/70 dark:text-gray-300 border border-gray-200/60 dark:border-gray-600/50">${isPT ? 'Grupo 6 • Turno P1' : 'Group 6 • Lab P1'}</span>
                        <span class="px-3 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700/70 dark:text-gray-300 border border-gray-200/60 dark:border-gray-600/50">Prof. Teresa Romão</span>
                    </div>
                </div>

                <div class="lg:col-span-3">
                    <h4 class="text-xs font-extrabold uppercase tracking-wider text-gray-900 dark:text-white mb-3.5">${isPT ? 'Entregáveis' : 'Deliverables'}</h4>
                    <ul class="space-y-2.5 text-xs font-medium text-gray-600 dark:text-gray-400">
                        <li><a href="stage1.html" class="hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>${isPT ? 'Fase 1 • Proposta de Projeto' : 'Stage 1 • Project Proposal'}</a></li>
                        <li><a href="stage2.html" class="hover:text-emerald-600 dark:hover:text-emerald-400 transition flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>${isPT ? 'Fase 2 • Análise de Utilizadores' : 'Stage 2 • User & Task Analysis'}</a></li>
                        <li><a href="stage3.html" class="hover:text-amber-600 dark:hover:text-amber-400 transition flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>${isPT ? 'Fase 3 • 1.º Protótipo' : 'Stage 3 • 1st Prototype'}</a></li>
                        <li><a href="stage4.html" class="hover:text-purple-600 dark:hover:text-purple-400 transition flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-purple-500"></span>${isPT ? 'Fase 4 • Protótipo Funcional' : 'Stage 4 • Functional Prototype'}</a></li>
                        <li><a href="stage5.html" class="hover:text-rose-600 dark:hover:text-rose-400 transition flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>${isPT ? 'Fase 5 • Avaliação Heurística' : 'Stage 5 • Heuristic Evaluation'}</a></li>
                        <li class="text-gray-400 dark:text-gray-500 flex items-center gap-2 cursor-default"><span class="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600"></span>${isPT ? 'Fase 6 • Resultados (Em breve)' : 'Stage 6 • Evaluation Results (Soon)'}</li>
                    </ul>
                </div>

                <div class="lg:col-span-2">
                    <h4 class="text-xs font-extrabold uppercase tracking-wider text-gray-900 dark:text-white mb-3.5">${isPT ? 'Documentação' : 'Documentation'}</h4>
                    <ul class="space-y-2.5 text-xs font-medium text-gray-600 dark:text-gray-400">
                        <li><a href="ui-ux.html" class="hover:text-blue-600 dark:hover:text-blue-400 transition">UI / UX Design</a></li>
                        <li><a href="app.html" class="hover:text-blue-600 dark:hover:text-blue-400 transition">Tech Stack</a></li>
                        <li><a href="glossary.html" class="hover:text-blue-600 dark:hover:text-blue-400 transition">${isPT ? 'Glossário' : 'Glossary'}</a></li>
                        <li><a href="developers.html" class="hover:text-blue-600 dark:hover:text-blue-400 transition">${isPT ? 'A Equipa' : 'The Team'}</a></li>
                    </ul>
                </div>

                <div class="lg:col-span-2 flex flex-col justify-between">
                    <div>
                        <h4 class="text-xs font-extrabold uppercase tracking-wider text-gray-900 dark:text-white mb-3.5">${isPT ? 'Protótipo' : 'Prototype'}</h4>
                        <div class="space-y-2.5">
                            <a href="stage4.html" class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-sm">
                                <span>📱</span> ${isPT ? 'Testar Demo' : 'Try Live Demo'}
                            </a>
                            <a href="https://github.com/asoeiropt/IPM-6-APP" target="_blank" class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-700/80 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-xs font-bold border border-gray-200/80 dark:border-gray-600 transition">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path></svg>
                                ${isPT ? 'Repositório GitHub' : 'GitHub Repo'}
                            </a>
                        </div>
                    </div>
                </div>

            </div>

            <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-400">
                <p>&copy; 2026 SmartGlycoAI • NOVA School of Science and Technology (NOVA FCT)</p>
                <div class="flex items-center gap-2 bg-gray-100/80 dark:bg-gray-900/60 px-3 py-1.5 rounded-full border border-gray-200/70 dark:border-gray-700/70">
                    <span class="relative flex h-2.5 w-2.5">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span class="sg-last-updated-label font-semibold text-gray-600 dark:text-gray-300">${isPT ? 'Fase 2 • Fase 5 Ativa' : 'Phase 2 • Stage 5 Active'}</span>
                </div>
            </div>

        </div>
    `;
}


// =========================================================================
// 10. INICIALIZAÇÃO ÚNICA (Splash Screen "Magic Move", Preloader & Barra)
// =========================================================================

function animateMilestoneBar() {
    const bar = document.getElementById('milestone-progress-bar');
    if (bar) {
        const target = bar.getAttribute('data-target') || '80%';
        requestAnimationFrame(() => {
            setTimeout(() => {
                bar.style.width = target;
            }, 150);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const currentLang = getCurrentLang();
    setGoogTransCookie(currentLang);

    initThemeDropdown();
    const initialMode = localStorage.getItem('theme') || 'system';
    applyThemePreference(initialMode);

    initStageNavigation();
    initSpotlightAndTilt();
    initUnifiedFooter();
    initLastUpdatedBadges();

    if (currentLang === 'pt') {
        applyNativePTTranslations('pt');
        loadGoogleTranslateEngine();
    }

    const splashScreen = document.getElementById('splash-screen');
    const splashText = document.getElementById('splash-text');
    const splashLogo = document.getElementById('splash-logo');
    const headerLogo = document.getElementById('header-logo');

    const hasSeenSplash = sessionStorage.getItem('smartGlycoSplashSeen');

    function runMiniPreloader() {
        const preloader = document.createElement('div');
        preloader.id = 'sg-preloader';
        preloader.innerHTML = `
            <div class="relative flex items-center justify-center mb-3">
                <div class="absolute w-20 h-20 rounded-full border-4 border-blue-500/30 border-t-blue-600 animate-spin"></div>
                <img src="img/logo.jpeg" alt="SmartGlycoAI" class="w-14 h-14 rounded-full object-cover shadow-md">
            </div>
            <span class="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 animate-pulse">
                SmartGlycoAI
            </span>
        `;
        document.body.prepend(preloader);

        let finished = false;
        const finishLoad = () => {
            if (finished) return;
            finished = true;
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => preloader.remove(), 450);
                if (typeof AOS !== 'undefined') {
                    AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 50 });
                }
                animateMilestoneBar();
            }, 350);
        };

        if (document.readyState === 'complete') {
            finishLoad();
        } else {
            window.addEventListener('load', finishLoad);
        }
    }

    if (splashScreen && headerLogo && splashLogo && !hasSeenSplash) {
        sessionStorage.setItem('smartGlycoSplashSeen', 'true');

        setTimeout(() => {
            if (splashText) {
                splashText.classList.remove('opacity-100');
                splashText.classList.add('opacity-0');
            }
        }, 1000);

        setTimeout(() => {
            const targetRect = headerLogo.getBoundingClientRect();
            const splashRect = splashLogo.getBoundingClientRect();
            
            const deltaX = (targetRect.left + targetRect.width / 2) - (splashRect.left + splashRect.width / 2);
            const deltaY = (targetRect.top + targetRect.height / 2) - (splashRect.top + splashRect.height / 2);
            const scale = targetRect.width / splashRect.width;

            splashLogo.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scale})`;
            splashLogo.classList.remove('border-2', 'border-blue-500', 'shadow-[0_0_30px_rgba(59,130,246,0.3)]');
            splashLogo.classList.add('border-gray-200', 'dark:border-gray-700');

            splashScreen.classList.remove('bg-gray-900');
            splashScreen.classList.add('bg-transparent', 'pointer-events-none');
        }, 1500);

        setTimeout(() => {
            splashScreen.classList.add('hidden');
            if (typeof AOS !== 'undefined') {
                AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 50 });
            }
            animateMilestoneBar();
        }, 2500);
    } else {
        if (splashScreen) {
            splashScreen.style.display = 'none';
        }
        runMiniPreloader();
    }
});