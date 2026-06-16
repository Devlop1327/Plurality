// Accessibility Manager - Tamaño de Fuente
const AccessibilityManager = {
    FONT_SIZE_KEY: 'plurality-font-size',

    init() {
        console.log('[AccessibilityManager] init');
        this.loadSettings();
        this.setupListeners();
    },

    loadSettings() {
        // Cargar tamaño de fuente
        const fontSize = localStorage.getItem(this.FONT_SIZE_KEY);
        if (fontSize) {
            this.applyFontSize(parseInt(fontSize));
        }
    },

    setupListeners() {
        console.log('[AccessibilityManager] setupListeners start');
        // Listener para el slider de fuente
        const slider = document.getElementById('font-size-slider');
        if (slider) {
            // throttle updates to avoid heavy reflows while dragging
            let debounceId = null;
            slider.addEventListener('input', (e) => {
                const val = e.target.value;
                const display = document.getElementById('font-size-value');
                if (display) display.textContent = val + 'px';
                if (debounceId) clearTimeout(debounceId);
                debounceId = setTimeout(() => {
                    this.setFontSize(val);
                    debounceId = null;
                }, 100);
            });
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
