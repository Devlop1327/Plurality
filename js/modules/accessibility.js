// Accessibility Manager - Alto Contraste y Tamaño de Fuente
const AccessibilityManager = {
    CONTRAST_CLASS: 'high-contrast',
    FONT_SIZE_KEY: 'plurality-font-size',
    CONTRAST_KEY: 'plurality-high-contrast',

    init() {
        console.log('[AccessibilityManager] init');
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
            // ensure inline styles are applied when loading stored preference
            this.addInlineContrastStyles();
            this.updateContrastButtonState(true);
        } else {
            // ensure no leftover inline styles or classes remain
            this.removeInlineContrastStyles();
            try { document.documentElement.classList.remove(this.CONTRAST_CLASS); } catch(e){}
            try { document.body.classList.remove(this.CONTRAST_CLASS); } catch(e){}
            document.querySelectorAll('.' + this.CONTRAST_CLASS).forEach(el => el.classList.remove(this.CONTRAST_CLASS));
            this.updateContrastButtonState(false);
        }

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

        // Listener para el botón de alto contraste (evita depender de inline onclick)
        const contrastBtn = document.getElementById('contrast-btn');
        console.log('[AccessibilityManager] contrastBtn=', contrastBtn);
        if (contrastBtn) {
            contrastBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleContrast();
            });
        }
        // Delegated listener as a fallback if element is replaced or rendered later
        document.addEventListener('click', (e) => {
            const c = e.target.closest ? e.target.closest('#contrast-btn') : null;
            if (c) {
                e.preventDefault();
                this.toggleContrast();
            }
        });

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
        console.log('[AccessibilityManager] autoCycleActive=', this.autoCycleActive);
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
        console.log('[AccessibilityManager] toggleContrast, currentlyEnabled=', isEnabled);

        if (isEnabled) {
            // remove class from common root elements
            try { document.documentElement.classList.remove(this.CONTRAST_CLASS); } catch(e){}
            try { document.body.classList.remove(this.CONTRAST_CLASS); } catch(e){}
            // also remove from any other element that might have been tagged
            document.querySelectorAll('.' + this.CONTRAST_CLASS).forEach(el => el.classList.remove(this.CONTRAST_CLASS));
            // remove inline styles if present
            this.removeInlineContrastStyles();
            // ensure localStorage cleared
            localStorage.setItem(this.CONTRAST_KEY, 'false');
            this.updateContrastButtonState(false);
            console.log('[AccessibilityManager] contrast disabled — cleaned up');
        } else {
            document.body.classList.add(this.CONTRAST_CLASS);
            try { document.documentElement.classList.add(this.CONTRAST_CLASS); } catch(e){}
            // inject inline styles to force contrast in environments where CSS classes may be overridden
            this.addInlineContrastStyles();
            localStorage.setItem(this.CONTRAST_KEY, 'true');
            this.updateContrastButtonState(true);
            // verify applied
            const applied = document.body.classList.contains(this.CONTRAST_CLASS) && !!document.getElementById('hc-inline-styles');
            console.log('[AccessibilityManager] contrast enabled, applied=', applied);
            if (!applied) {
                console.warn('[AccessibilityManager] fallback: re-applying inline styles and classes');
                try { document.documentElement.classList.add(this.CONTRAST_CLASS); } catch(e){}
                try { document.body.classList.add(this.CONTRAST_CLASS); } catch(e){}
                this.removeInlineContrastStyles();
                this.addInlineContrastStyles();
                // final fallback: apply inline style properties with !important to html/body
                try {
                    document.documentElement.style.setProperty('background-color', '#000', 'important');
                    document.documentElement.style.setProperty('color', '#fff', 'important');
                    document.body.style.setProperty('background-color', '#000', 'important');
                    document.body.style.setProperty('color', '#fff', 'important');
                    document.documentElement.setAttribute('data-hc-inline-attr', '1');
                    document.body.setAttribute('data-hc-inline-attr', '1');
                    console.log('[AccessibilityManager] applied inline style properties as final fallback');
                } catch(e) { console.error('[AccessibilityManager] final fallback failed', e); }
            }
        }
    },

    addInlineContrastStyles() {
        if (document.getElementById('hc-inline-styles')) return;
        const css = `
/* Inline high contrast override */
html, body, header, footer, nav, main, section, .bg-white, .bg-slate-50, .bg-slate-100 { background-color: #000 !important; color: #fff !important; }
* { color: #fff !important; border-color: #fff !important; }
button, a, input, select, textarea { background-color: #000 !important; color: #fff !important; border: 2px solid #fff !important; }
button:hover, a:hover { background-color: #fff !important; color: #000 !important; }
.text-slate-600, .text-slate-700, .text-slate-900, .dark\\:text-slate-300, .dark\\:text-slate-400 { color: #fff !important; }
.bg-\\[\\#7E57C2\\], .bg-purple-100, .dark\\:bg-purple-900 { background-color: #ff0 !important; color: #000 !important; }
`;
        const st = document.createElement('style');
        st.id = 'hc-inline-styles';
        st.appendChild(document.createTextNode(css));
        document.head.appendChild(st);
    },

    removeInlineContrastStyles() {
        // remove inline style element if present
        const st = document.getElementById('hc-inline-styles');
        if (st && st.parentNode) st.parentNode.removeChild(st);
        // remove classes from root/body and any elements
        try { document.documentElement.classList.remove(this.CONTRAST_CLASS); } catch(e){}
        try { document.body.classList.remove(this.CONTRAST_CLASS); } catch(e){}
        document.querySelectorAll('.' + this.CONTRAST_CLASS).forEach(el => el.classList.remove(this.CONTRAST_CLASS));
        // update localStorage
        try { localStorage.setItem(this.CONTRAST_KEY, 'false'); } catch(e){}
        // force a quick reflow to ensure styles are recomputed
        try { void document.body.offsetHeight; } catch(e){}
        // remove inline style properties fallback if previously applied
        try {
            if (document.documentElement.getAttribute('data-hc-inline-attr')) {
                document.documentElement.style.removeProperty('background-color');
                document.documentElement.style.removeProperty('color');
                document.documentElement.removeAttribute('data-hc-inline-attr');
            }
            if (document.body.getAttribute('data-hc-inline-attr')) {
                document.body.style.removeProperty('background-color');
                document.body.style.removeProperty('color');
                document.body.removeAttribute('data-hc-inline-attr');
            }
        } catch(e) {}
    },

    updateContrastButtonState(isEnabled) {
        const btn = document.getElementById('contrast-btn');
        if (btn) {
            if (isEnabled) {
                btn.classList.add('bg-purple-100', 'dark:bg-purple-900');
                btn.classList.remove('bg-slate-100', 'dark:bg-slate-700');
                btn.setAttribute('aria-pressed','true');
                btn.title = 'Desactivar Alto Contraste';
            } else {
                btn.classList.remove('bg-purple-100', 'dark:bg-purple-900');
                btn.classList.add('bg-slate-100', 'dark:bg-slate-700');
                btn.setAttribute('aria-pressed','false');
                btn.title = 'Activar Alto Contraste';
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
