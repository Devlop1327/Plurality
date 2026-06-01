// Medallero Module
const Medallero = {
    getRequirementText(id) {
        switch (id) {
            case 'aliado_pro':
                return 'Requisito: Alcanzar 100 XP';
            case 'experto_identidad':
                return 'Requisito: Completar al menos 50% del módulo "Aprende"';
            case 'guardian_inclusion':
                return 'Requisito: Completar al menos 50% del módulo "Juega"';
            case 'lider_global':
                return 'Requisito: Alcanzar 100% de progreso total';
            default:
                return 'Requisito: Cumplir condiciones del curso';
        }
    },

    render() {
        const badges = Storage.getBadges();
        return `
        <div class="page-transition max-w-6xl mx-auto px-8 py-12">
            <h1 class="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Medallero</h1>

            <p class="text-slate-600 dark:text-slate-400 mb-8">Aquí puedes ver todas las medallas disponibles y sus descripciones. Las medallas desbloqueadas incluyen acciones para descargar un certificado o compartir tu logro.</p>

            <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                ${badges.map(b => {
                    const requirement = Medallero.getRequirementText(b.id);
                    return `
                    <div class="rounded-2xl p-6 bg-white dark:bg-slate-800 border ${b.unlocked ? 'border-slate-200 dark:border-slate-700' : 'border-dashed border-slate-200 dark:border-slate-700 opacity-60'}">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">${b.unlocked ? '🏅' : '🔒'}</div>
                            <div>
                                <div class="font-semibold text-slate-900 dark:text-white">${b.title}</div>
                                <div class="text-xs text-slate-500 dark:text-slate-400">${b.unlocked ? b.desc : requirement}</div>
                            </div>
                        </div>

                        <div class="mt-4">
                            ${b.unlocked ? `
                                <button onclick="Medallero.downloadCertificate('${b.id}')" class="w-full bg-purple-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-purple-700">Descargar Certificado</button>
                            ` : `
                                <button disabled class="w-full bg-gray-200 text-gray-500 px-4 py-2 rounded-full font-semibold cursor-not-allowed">Bloqueada</button>
                            `}
                        </div>
                    </div>
                `}).join('')}
            </div>

            <div class="mt-8">
                <button onclick="app.navigateTo('dashboard')" class="flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600 transition-all">
                    <span class="material-symbols-outlined text-xl">arrow_back</span>
                    Volver al Dashboard
                </button>
            </div>
        </div>
        `;
    },

    downloadCertificate(badgeId) {
        // Simple placeholder action: generate a small certificate text file and trigger download
        const badges = Storage.getBadges();
        const badge = badges.find(b => b.id === badgeId);
        if (!badge || !badge.unlocked) return;

        const profile = Storage.getUserProfile();
        const content = `Certificado - ${badge.title}\n\nOtorgado a: ${profile.name}\nNivel: ${profile.level}\nXP: ${profile.xp} XP\nFecha: ${new Date().toLocaleDateString()}`;
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${badge.title.replace(/\s+/g,'_')}_certificado.txt`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }
};
