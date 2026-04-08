// Main App Controller
const app = {
    currentModule: 'dashboard',

    init() {
        console.log('Plurality App iniciada');
        Storage.init();
        this.render();
        this.setupNavigation();
    },

    navigateTo(module) {
        this.currentModule = module;
        this.render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    render() {
        let content = '';

        switch (this.currentModule) {
            case 'dashboard':
                Educativo.reset();
                content = Dashboard.render();
                break;
            case 'educativo':
                content = Educativo.render();
                break;
            case 'inclusion':
                content = Inclusion.render();
                break;
            case 'derechos':
                content = Derechos.render();
                break;
            case 'historia':
                content = Historia.render();
                break;
            case 'aliado':
                content = Aliado.render();
                break;
            case 'juegos':
                content = Juegos.render();
                break;
            case 'simulador':
                Simulador.reset();
                content = Simulador.render();
                break;
            case 'evaluacion':
                Evaluacion.reset();
                content = Evaluacion.render();
                break;
            default:
                content = Dashboard.render();
        }

        const container = document.getElementById('app-container');
        container.innerHTML = content;
    },

    setupNavigation() {
        // Update nav links based on current module
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('text-[#7E57C2]', 'border-b-2', 'border-[#7E57C2]', 'pb-1', 'font-bold');
            link.classList.add('text-slate-600', 'dark:text-slate-400', 'hover:text-[#7E57C2]');
        });

        // Highlight current module
        const moduleMap = {
            'educativo': 0,
            'juegos': 1,
            'simulador': 2,
            'evaluacion': 3
        };

        if (moduleMap[this.currentModule] !== undefined) {
            const links = document.querySelectorAll('nav a[onclick]');
            if (links[moduleMap[this.currentModule]]) {
                links[moduleMap[this.currentModule]].classList.add('text-[#7E57C2]', 'border-b-2', 'border-[#7E57C2]', 'pb-1', 'font-bold');
            }
        }
    },

    toggleDarkMode() {
        const isDark = Storage.getDarkMode();
        Storage.saveDarkMode(!isDark);
        console.log('Dark mode toggled:', !isDark);
    }
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init());
} else {
    app.init();
}
