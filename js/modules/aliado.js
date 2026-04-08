// Aliado Module
const Aliado = {
    currentStep: 0,

    reset() {
        this.currentStep = 0;
    },

    render() {
        const steps = quizData.aliadoContent;
        const current = steps[this.currentStep];

        let html = `
        <div class="max-w-7xl mx-auto px-8 py-12">
            <div class="mb-8">
                <h1 class="text-4xl font-bold text-[#7E57C2] dark:text-[#b39ddb] mb-2">Cómo ser un Aliado</h1>
                <p class="text-slate-600 dark:text-slate-400">Aprende los pasos para ser un aliado efectivo de la comunidad LGBTQ+</p>
            </div>

            <!-- Progress Bar -->
            <div class="mb-8">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-sm font-semibold text-slate-700 dark:text-slate-300">Paso ${this.currentStep + 1}/${steps.length}</span>
                </div>
                <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                    <div class="bg-purple-600 h-3 rounded-full transition-all duration-300" style="width: ${((this.currentStep + 1) / steps.length) * 100}%"></div>
                </div>
            </div>

            <!-- Step Content -->
            <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-8">
                <div class="flex items-start gap-6 mb-6">
                    <div class="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                        <span class="text-2xl font-bold">${this.currentStep + 1}</span>
                    </div>
                    <div>
                        <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">${current.step}</h2>
                        <p class="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">${current.description}</p>
                    </div>
                </div>

                <!-- Tips -->
                <div class="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded">
                    <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-3">Consejos prácticos:</h3>
                    <ul class="space-y-2">
                        ${current.tips.map(tip => `
                            <li class="flex items-start gap-3">
                                <span class="material-symbols-outlined text-green-600 flex-shrink-0 mt-1">check_circle</span>
                                <span class="text-slate-700 dark:text-slate-300">${tip}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>

            <!-- Step Indicators -->
            <div class="flex justify-center gap-2 mb-8 flex-wrap">
                ${steps.map((step, idx) => `
                    <button onclick="Aliado.goToStep(${idx})"
                        class="w-10 h-10 rounded-full font-semibold transition ${idx === this.currentStep
                ? 'bg-purple-600 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-300'
            }">
                        ${idx + 1}
                    </button>
                `).join('')}
            </div>

            <!-- Navigation -->
            <div class="flex gap-4 justify-center">
                ${this.currentStep > 0 ? `
                    <button class="flex items-center gap-2 px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition"
                        onclick="Aliado.goToPrevious()">
                        <span class="material-symbols-outlined text-xl">arrow_back</span> Anterior
                    </button>
                ` : ''}
                
                ${this.currentStep < steps.length - 1 ? `
                    <button class="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
                        onclick="Aliado.goToNext()">
                        Siguiente <span class="material-symbols-outlined text-xl">arrow_forward</span>
                    </button>
                ` : `
                    <button class="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                        onclick="app.navigateTo('dashboard')">
                        <span class="material-symbols-outlined text-xl">check_circle</span> ¡Listo para ser Aliado!
                    </button>
                `}
            </div>
        </div>
        `;

        return html;
    },

    goToNext() {
        if (this.currentStep < quizData.aliadoContent.length - 1) {
            this.currentStep++;
            app.render();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    },

    goToPrevious() {
        if (this.currentStep > 0) {
            this.currentStep--;
            app.render();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    },

    goToStep(idx) {
        this.currentStep = idx;
        app.render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};
