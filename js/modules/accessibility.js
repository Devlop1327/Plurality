// Accessibility Manager - Alto Contraste y Tamaño de Fuente
const AccessibilityManager = {
    CONTRAST_CLASS: 'high-contrast',
    FONT_SIZE_KEY: 'plurality-font-size',
    CONTRAST_KEY: 'plurality-high-contrast',

    init() {
        this.loadSettings();
        this.setupListeners();
        this.ensureDefaultState();
    },

    loadSettings() {
        // Cargar alto contraste
        const contrastEnabled = localStorage.getItem(this.CONTRAST_KEY) === 'true';
        if (contrastEnabled) {
            document.body.classList.add(this.CONTRAST_CLASS);
            try { document.documentElement.classList.add(this.CONTRAST_CLASS); } catch(e){}
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

        // Listener para el botón de alto contraste (evita depender de inline onclick)
        const contrastBtn = document.getElementById('contrast-btn');
        if (contrastBtn) {
            contrastBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleContrast();
            });
        }

        // Panel collapse/expand toggle (small circular button)
        this.panel = document.getElementById('accessibility-panel');
        this.toggleBtn = document.getElementById('accessibility-toggle');
        this.panelContent = this.panel ? this.panel.querySelector('.panel-content') : null;

        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                // Evitar que el click burbujee al panel padre y provoque un segundo toggle
                if (e.stopPropagation) e.stopPropagation();
                this.handleUserInteraction();
                this.togglePanel();
            });
        }

        if (this.panel) {
            // Clicking the panel header area toggles
            this.panel.addEventListener('click', (e) => {
                // ignore clicks that interact with inner controls (they will call handleUserInteraction themselves)
                if (e.target.closest('#contrast-btn') || e.target.closest('#font-size-slider') || e.target.closest('#accessibility-toggle')) return;
                this.handleUserInteraction();
                this.togglePanel();
            });

            // Any pointer interaction counts as user activity
            ['pointerenter','pointerdown','focusin'].forEach(ev => {
                this.panel.addEventListener(ev, (evt) => {
                    this.handleUserInteraction();
                });
            });
        }

        // Start the automatic collapse/expand cycle depending on panel attribute
        this.autoCycleInterval = null;
        // default allow automatic cycling unless `data-autocycle="false"` is present
        const autoAttr = this.panel ? this.panel.getAttribute('data-autocycle') : null;
        this.autoCycleActive = (autoAttr === 'false') ? false : true;
        if (this.autoCycleActive) this.startAutoCycle();
    },

    ensureDefaultState() {
        // ensure panel exists
        if (!this.panel) this.panel = document.getElementById('accessibility-panel');
        if (!this.panel) return;

        const defaultState = this.panel.getAttribute('data-default-state');
        // default to collapsed unless explicitly set to 'expanded'
        if (defaultState === 'expanded') {
            this.panel.classList.remove('accessibility-collapsed');
        } else {
            if (!this.panel.classList.contains('accessibility-collapsed')) {
                this.panel.classList.add('accessibility-collapsed');
            }
        }
    },

    toggleContrast() {
        const isEnabled = document.body.classList.contains(this.CONTRAST_CLASS);

        if (isEnabled) {
            document.body.classList.remove(this.CONTRAST_CLASS);
            try { document.documentElement.classList.remove(this.CONTRAST_CLASS); } catch(e){}
            localStorage.setItem(this.CONTRAST_KEY, 'false');
            this.updateContrastButtonState(false);
        } else {
            document.body.classList.add(this.CONTRAST_CLASS);
            try { document.documentElement.classList.add(this.CONTRAST_CLASS); } catch(e){}
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
    ,

    // Panel control methods
    togglePanel() {
        if (!this.panel) return;
        const isCollapsed = this.panel.classList.toggle('accessibility-collapsed');
        // show/hide content handled by CSS (visibility of the toggle button via CSS rules)
    },

    startAutoCycle() {
        // Cycle collapsed <-> expanded every 5s when active
        if (this.autoCycleInterval) clearInterval(this.autoCycleInterval);
        this.autoCycleInterval = setInterval(() => {
            if (!this.autoCycleActive) return;
            // toggle panel state
            if (this.panel) this.panel.classList.toggle('accessibility-collapsed');
        }, 5000);
    },

    stopAutoCycle() {
        this.autoCycleActive = false;
        if (this.autoCycleInterval) {
            clearInterval(this.autoCycleInterval);
            this.autoCycleInterval = null;
        }
    },

    // Pause auto cycle temporarily on user interaction
    handleUserInteraction() {
        // stop automatic cycling for 30s, then resume
        this.autoCycleActive = false;
        if (this._autoCycleResumeTimeout) clearTimeout(this._autoCycleResumeTimeout);
        this._autoCycleResumeTimeout = setTimeout(() => {
            this.autoCycleActive = true;
            // ensure interval is running
            if (!this.autoCycleInterval) this.startAutoCycle();
        }, 30000);
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
