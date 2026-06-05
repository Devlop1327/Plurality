// Accessibility Manager - Alto Contraste y Tamaño de Fuente
const AccessibilityManager = {
    CONTRAST_CLASS: 'high-contrast',
    FONT_SIZE_KEY: 'plurality-font-size',
    CONTRAST_KEY: 'plurality-high-contrast',

    init() {
        this.loadSettings();
        this.setupListeners();
    },

    loadSettings() {
        // Cargar alto contraste
        const contrastEnabled = localStorage.getItem(this.CONTRAST_KEY) === 'true';
        if (contrastEnabled) {
            document.body.classList.add(this.CONTRAST_CLASS);
            this.updateContrastButtonState(true);
        }

        // Cargar tamaño de fuente
        const fontSize = localStorage.getItem(this.FONT_SIZE_KEY);
        if (fontSize) {
            this.applyFontSize(parseInt(fontSize));
        }
    },

    setupListeners() {
        // Listener para el slider de fuente
        const slider = document.getElementById('font-size-slider');
        if (slider) {
            slider.addEventListener('input', (e) => {
                this.setFontSize(e.target.value);
            });
        }

        // Listener para el botón de alto contraste (evita depender de inline onclick)
        const contrastBtn = document.getElementById('contrast-btn');
        if (contrastBtn) {
            contrastBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleContrast();
            });
        }
    },

    toggleContrast() {
        const isEnabled = document.body.classList.contains(this.CONTRAST_CLASS);
        
        if (isEnabled) {
            document.body.classList.remove(this.CONTRAST_CLASS);
            localStorage.setItem(this.CONTRAST_KEY, 'false');
            this.updateContrastButtonState(false);
        } else {
            document.body.classList.add(this.CONTRAST_CLASS);
            localStorage.setItem(this.CONTRAST_KEY, 'true');
            this.updateContrastButtonState(true);
        }
    },

    updateContrastButtonState(isEnabled) {
        const btn = document.getElementById('contrast-btn');
        if (btn) {
            if (isEnabled) {
                btn.classList.add('bg-purple-100', 'dark:bg-purple-900');
                btn.classList.remove('bg-slate-100', 'dark:bg-slate-700');
            } else {
                btn.classList.remove('bg-purple-100', 'dark:bg-purple-900');
                btn.classList.add('bg-slate-100', 'dark:bg-slate-700');
            }
        }
    },

    setFontSize(size) {
        size = parseInt(size);
        localStorage.setItem(this.FONT_SIZE_KEY, size.toString());
        this.applyFontSize(size);
    },

    applyFontSize(size) {
        // Base es 16px, convertir a rem
        const remSize = size / 16;
        document.documentElement.style.fontSize = remSize + 'rem';
        
        // Actualizar display
        const display = document.getElementById('font-size-value');
        if (display) {
            display.textContent = size + 'px';
        }

        // Actualizar slider
        const slider = document.getElementById('font-size-slider');
        if (slider) {
            slider.value = size;
        }
    }
};

// Inicializar cuando carga el DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => AccessibilityManager.init());
} else {
    AccessibilityManager.init();
}

// Hacer accesible desde `window` para handlers inline y entornos bundle/Module
try {
    window.AccessibilityManager = AccessibilityManager;
} catch (e) {
    // en entornos sin window (SSR) ignorar
}
