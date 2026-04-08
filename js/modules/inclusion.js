// Inclusión Module
const Inclusion = {
    currentSection: 0,

    reset() {
        this.currentSection = 0;
    },

    render() {
        const sections = quizData.inclusionContent;
        const current = sections[this.currentSection];

        let html = `
        <div class="max-w-7xl mx-auto px-8 py-12">
            <div class="mb-8">
                <h1 class="text-4xl font-bold text-[#7E57C2] dark:text-[#b39ddb] mb-2">Inclusión</h1>
                <p class="text-slate-600 dark:text-slate-400">Conoce cómo crear espacios inclusivos con autores como Sally Subiratz</p>
            </div>

            <!-- Progress Bar -->
            <div class="mb-8">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-sm font-semibold text-slate-700 dark:text-slate-300">Progreso: ${this.currentSection + 1}/${sections.length}</span>
                </div>
                <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div class="bg-purple-600 h-2 rounded-full" style="width: ${((this.currentSection + 1) / sections.length) * 100}%"></div>
                </div>
            </div>

            <!-- Content Card -->
            <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-8">
                <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-4">${current.title}</h2>
                <p class="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-6">${current.content}</p>
                
                <div class="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600 p-4 rounded mb-6">
                    <p class="text-sm text-slate-600 dark:text-slate-300"><strong>Autor:</strong> ${current.author}</p>
                    <p class="text-sm text-slate-600 dark:text-slate-300 mt-2">"${current.context}"</p>
                </div>
            </div>

            <!-- Navigation -->
            <div class="flex gap-4 justify-center">
                ${this.currentSection > 0 ? `
                    <button class="flex items-center gap-2 px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition"
                        onclick="Inclusion.goToPrevious()">
                        <span class="material-symbols-outlined text-xl">arrow_back</span> Anterior
                    </button>
                ` : ''}
                
                ${this.currentSection < sections.length - 1 ? `
                    <button class="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
                        onclick="Inclusion.goToNext()">
                        Siguiente <span class="material-symbols-outlined text-xl">arrow_forward</span>
                    </button>
                ` : `
                    <button class="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                        onclick="app.navigateTo('dashboard')">
                        <span class="material-symbols-outlined text-xl">check_circle</span> Completado
                    </button>
                `}
            </div>
        </div>
        `;

        return html;
    },

    goToNext() {
        if (this.currentSection < quizData.inclusionContent.length - 1) {
            this.currentSection++;
            app.render();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    },

    goToPrevious() {
        if (this.currentSection > 0) {
            this.currentSection--;
            app.render();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
};
