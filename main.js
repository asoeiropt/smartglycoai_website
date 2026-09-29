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

// --- INTERVIEW MODAL CONTROLLER ---
const interviewData = {
    patient: {
        title: "Interview 1: Patient with Type 1 Diabetes",
        subtitle: "Participant: João Silva (24 years old, diagnosed 6 years ago)",
        content: `
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><strong>Interviewer:</strong> "João, can you describe your biggest difficulty when managing your insulin and meals on a daily basis?"</div>
            <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"><strong>João:</strong> "Honestly, it's eating outside. When I'm at home, I weigh everything. But when I'm at a restaurant with friends, guessing the carbohydrates in a pasta dish or a sauce is pure guesswork. I either guess wrong and end up with high blood sugar, or I take too much insulin and crash."</div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><strong>Interviewer:</strong> "How do you feel about your current CGM sensor alarms during the night?"</div>
            <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"><strong>João:</strong> "Nighttime is the most stressful part. I wake up multiple times worried about dropping too low while sleeping. A system that could proactively warn me or prevent those drops based on my dinner would give me immense peace of mind."</div>
        `
    },
    doctor: {
        title: "Interview 2: Endocrinologist",
        subtitle: "Participant: Dr. Sofia (Endocrinologist with 15+ years of experience)",
        content: `
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><strong>Interviewer:</strong> "Dr. Sofia, what do you usually find missing in the data patients bring to routine consultations?"</div>
            <div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg"><strong>Dr. Sofia:</strong> "Patients often bring disjointed logs—glucose numbers in one app, food logs written on notes or forgotten entirely. Without a reliable correlation between what they ate and how their glucose reacted, it's very hard to adjust basal insulin ratios safely."</div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><strong>Interviewer:</strong> "Would an automated computer vision meal logger integrated with historical trends be useful in a clinical setting?"</div>
            <div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg"><strong>Dr. Sofia:</strong> "Extremely. If the platform presents clean monthly graphs highlighting recurring hypoglycemic patterns tied to specific meal times, consultations become much more objective and efficient."</div>
        `
    },
    nurse: {
        title: "Interview 3: Diabetes Educator",
        subtitle: "Participant: Tiago (Specialized Nurse in Diabetes Education)",
        content: `
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><strong>Interviewer:</strong> "Tiago, what is the main hurdle for newly diagnosed patients when learning diabetes management?"</div>
            <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"><strong>Tiago:</strong> "The cognitive overload. People leave the hospital overwhelmed with math ratios, correction factors, and carb counting tables. Many give up logging within the first month because manual apps are too tedious."</div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><strong>Interviewer:</strong> "How important is interface simplicity for adherence?"</div>
            <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"><strong>Tiago:</strong> "It's everything. If taking a picture of a meal replaces three minutes of manual searching in a food database, adherence will skyrocket. Simplicity saves lives in chronic disease management."</div>
        `
    }
};

function openInterviewModal(type) {
    const modal = document.getElementById('interview-modal');
    const titleEl = document.getElementById('modal-title');
    const subtitleEl = document.getElementById('modal-subtitle');
    const contentEl = document.getElementById('modal-content');

    if (interviewData[type]) {
        titleEl.innerText = interviewData[type].title;
        subtitleEl.innerText = interviewData[type].subtitle;
        contentEl.innerHTML = interviewData[type].content;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Impede o fundo de fazer scroll
    }
}

function closeInterviewModal() {
    const modal = document.getElementById('interview-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Restaura o scroll
    }
}

// Fechar modal ao clicar fora do cartão
window.addEventListener('click', (e) => {
    const modal = document.getElementById('interview-modal');
    if (e.target === modal) {
        closeInterviewModal();
    }
});

// Fechar com a tecla ESC
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeInterviewModal();
    }
});

// On page load, apply the saved theme and initialize animations (if present)
document.addEventListener('DOMContentLoaded', () => {
    // Theme Initialization
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
        updateThemeIcons(true);
    } else {
        updateThemeIcons(false);
    }

    // AOS Initialization (runs only if the AOS library is loaded on the page, e.g., index.html)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            duration: 800,
            offset: 50
        });
    }
});