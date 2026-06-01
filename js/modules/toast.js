// Simple Toast notifications
const Toast = {
    containerId: 'pl-toasts',

    ensureContainer() {
        let c = document.getElementById(this.containerId);
        if (!c) {
            c = document.createElement('div');
            c.id = this.containerId;
            c.style.position = 'fixed';
            c.style.right = '20px';
            c.style.bottom = '20px';
            c.style.zIndex = 9999;
            c.style.display = 'flex';
            c.style.flexDirection = 'column';
            c.style.gap = '8px';
            document.body.appendChild(c);
        }
        return c;
    },

    show(title, message, opts = {}) {
        const c = this.ensureContainer();
        const el = document.createElement('div');
        el.style.minWidth = '260px';
        el.style.maxWidth = '360px';
        el.style.padding = '12px 14px';
        el.style.borderRadius = '12px';
        el.style.boxShadow = '0 6px 18px rgba(15,23,42,0.12)';
        el.style.background = 'linear-gradient(180deg,#ffffff,#f8fafc)';
        el.style.color = '#0f172a';
        el.style.fontFamily = 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif';

        if (document.documentElement.classList.contains('dark')) {
            el.style.background = 'linear-gradient(180deg,#0b1220,#0b1326)';
            el.style.color = '#e6eef8';
            el.style.boxShadow = '0 6px 18px rgba(2,6,23,0.6)';
        }

        const titleEl = document.createElement('div');
        titleEl.style.fontWeight = '700';
        titleEl.style.marginBottom = '6px';
        titleEl.textContent = title;

        const msgEl = document.createElement('div');
        msgEl.style.fontSize = '13px';
        msgEl.style.opacity = '0.95';
        msgEl.textContent = message;

        el.appendChild(titleEl);
        el.appendChild(msgEl);

        c.appendChild(el);

        // Auto remove
        const duration = opts.duration || 4000;
        setTimeout(() => {
            el.style.transition = 'opacity 240ms ease, transform 240ms ease';
            el.style.opacity = '0';
            el.style.transform = 'translateX(12px)';
            setTimeout(() => el.remove(), 260);
        }, duration);

        return el;
    }
};

window.Toast = Toast;
