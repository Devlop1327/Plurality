// Historia Module
const Historia = {
    currentSection: 0,

    reset() {
        this.currentSection = 0;
    },

    render() {
        const events = quizData.historiaContent;
        const current = events[this.currentSection];

        let html = `
        <div class="max-w-7xl mx-auto px-8 py-12">
            <div class="mb-8">
                <h1 class="text-4xl font-bold text-[#7E57C2] dark:text-[#b39ddb] mb-2">Historia LGBTQ+</h1>
                <p class="text-slate-600 dark:text-slate-400">Conoce los hitos más importantes del movimiento LGBTQ+ global</p>
            </div>

            <!-- Timeline Progress -->
            <div class="mb-12">
                <div class="flex justify-between items-center mb-4">
                    <span class="text-sm font-semibold text-slate-700 dark:text-slate-300">Evento ${this.currentSection + 1}/${events.length}</span>
                </div>
            </div>

            <!-- Event Card -->
            <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-8">
                <div class="flex items-start gap-6 mb-6">
                    <div class="bg-purple-600 text-white rounded-full w-24 h-24 flex items-center justify-center flex-shrink-0">
                        <span class="text-3xl font-bold">${current.year}</span>
                    </div>
                    <div>
                        <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">${current.event}</h2>
                        <p class="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">${current.description}</p>
                    </div>
                </div>
            </div>

            <!-- Timeline Visualization -->
            <div class="bg-slate-100 dark:bg-slate-700 rounded-lg p-6 mb-8">
                <div class="flex gap-2 overflow-x-auto pb-2">
                    ${events.map((event, idx) => `
                        <button onclick="Historia.goToEvent(${idx})" 
                            class="px-4 py-2 rounded font-semibold whitespace-nowrap transition ${idx === this.currentSection
                ? 'bg-purple-600 text-white'
                : 'bg-slate-200 dark:bg-slate-600 text-slate-900 dark:text-white hover:bg-slate-300'
            }">
                            ${event.year}
                        </button>
                    `).join('')}
                </div>
            </div>

            <!-- Navigation -->
            <div class="flex gap-4 justify-center">
                ${this.currentSection > 0 ? `
                    <button class="flex items-center gap-2 px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition"
                        onclick="Historia.goToPrevious()">
                        <span class="material-symbols-outlined text-xl">arrow_back</span> Anterior
                    </button>
                ` : ''}
                
                ${this.currentSection < events.length - 1 ? `
                    <button class="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
                        onclick="Historia.goToNext()">
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
        if (this.currentSection < quizData.historiaContent.length - 1) {
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
    },

    goToEvent(idx) {
        this.currentSection = idx;
        app.render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};
