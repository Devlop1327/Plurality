// Decision Simulator Module
const Simulador = {
    started: false,
    currentScenarioIdx: 0,
    responses: [],
    totalScore: 0,
    scenariosList: [],
    validationError: '',

    reset() {
        this.started = false;
        this.currentScenarioIdx = 0;
        this.responses = [];
        this.totalScore = 0;
        this.scenariosList = [];
        this.validationError = '';
    },

    render() {
        if (!this.started) {
            return this.renderStartScreen();
        }

        if (this.currentScenarioIdx >= this.scenariosList.length) {
            return this.renderResults();
        }

        const scenario = this.scenariosList[this.currentScenarioIdx];
        const progress = Math.round(((this.currentScenarioIdx + 1) / this.scenariosList.length) * 100);

        return `
        <div class="page-transition max-w-3xl mx-auto px-8 py-12">
            <!-- Progress -->
            <div class="mb-8">
                <div class="flex justify-between items-center mb-3">
                    <h2 class="text-2xl font-headline font-bold">Simulador de Empatía</h2>
                    <span class="text-sm font-semibold text-slate-600 dark:text-slate-400">Escenario ${this.currentScenarioIdx + 1}/${this.scenariosList.length}</span>
                </div>
                <div class="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div class="progress-bar" style="width: ${progress}%"></div>
                </div>
            </div>

            <!-- Scenario Card -->
            <div class="bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/20 dark:to-secondary/20 rounded-2xl p-8 mb-8 border-2 border-primary/20 dark:border-primary/40">
                <div class="flex gap-4 mb-4">
                    <span class="material-symbols-outlined text-4xl text-primary">lightbulb</span>
                    <h3 class="text-xl font-headline font-bold flex items-center">Escenario</h3>
                </div>
                <p class="text-lg leading-relaxed">"${scenario.scenario}"</p>
            </div>

            <!-- Choices -->
            <div class="space-y-4 mb-8">
                <h3 class="font-semibold text-lg">¿Cómo responderías?</h3>
                ${scenario.choices.map((choice, idx) => this.renderChoice(choice, idx)).join('')}
            </div>

            <button onclick="Simulador.reset(); Simulador.refresh();" class="flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600 hover:shadow-md transition-all">
                <span class="material-symbols-outlined text-xl">arrow_back</span>
                Volver al inicio
            </button>
        </div>
        `;
    },

    renderStartScreen() {
        return `
        <div class="page-transition max-w-xl mx-auto px-8 py-12 text-center">
            <div class="bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-2xl p-8 mb-8">
                <span class="material-symbols-outlined text-6xl text-primary mb-4">favorite</span>
                <h1 class="text-3xl font-headline font-bold mb-4">Simulador de Empatía</h1>
                <p class="text-slate-600 dark:text-slate-400 mb-6">Ponte en los zapatos de otros compañeros y decide cómo actuar ante diferentes situaciones escolares cotidianas.</p>
                
                <div class="text-left mb-6">
                    <label for="num-scenarios" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">¿Con cuántos escenarios quieres jugar hoy? (De 1 a 10)</label>
                    <input type="number" id="num-scenarios" min="1" max="10" value="5" class="w-full px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:border-primary focus:outline-none transition-colors">
                    ${this.validationError ? `<p class="text-red-500 text-sm mt-2 font-semibold flex items-center gap-1"><span class="material-symbols-outlined text-base">error</span>${this.validationError}</p>` : ''}
                </div>

                <button onclick="Simulador.submitStart()" class="w-full flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 hover:shadow-lg transition-all">
                    Comenzar juego
                    <span class="material-symbols-outlined">play_arrow</span>
                </button>
            </div>
            
            <button onclick="app.navigateTo('dashboard')" class="flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600 hover:shadow-md transition-all mx-auto">
                <span class="material-symbols-outlined text-xl">arrow_back</span>
                Volver al panel
            </button>
        </div>
        `;
    },

    submitStart() {
        const input = document.getElementById('num-scenarios');
        if (!input) return;
        const val = parseInt(input.value);
        if (isNaN(val) || val < 1 || val > 10) {
            this.validationError = 'El número de escenarios debe ser un valor entre 1 y 10.';
            this.refresh();
        } else {
            this.validationError = '';
            this.started = true;
            // Mezclar y tomar los escenarios seleccionados
            const shuffled = [...quizData.scenarioDecisions].sort(() => 0.5 - Math.random());
            this.scenariosList = shuffled.slice(0, val);
            this.currentScenarioIdx = 0;
            this.responses = [];
            this.totalScore = 0;
            this.refresh();
        }
    },

    renderChoice(choice, idx) {
        const color = 'slate-200 dark:border-slate-700';
        const hoverColor = 'hover:border-primary/50';

        return `
        <button onclick="Simulador.chooseOption(${idx})" 
                class="w-full text-left p-6 rounded-lg border-2 border-${color} ${hoverColor} bg-white dark:bg-slate-800 transition-all hover:shadow-md">
            <div class="flex justify-between items-start gap-4">
                <div class="flex-1">
                    <p class="font-semibold text-base leading-relaxed text-slate-800 dark:text-slate-100">${choice.text}</p>
                </div>
            </div>
        </button>
        `;
    },

    chooseOption(idx) {
        const scenario = this.scenariosList[this.currentScenarioIdx];
        const choice = scenario.choices[idx];

        this.responses.push({
            scenarioId: scenario.id,
            chosenIdx: idx,
            impact: choice.impact,
            points: choice.points
        });

        this.totalScore += choice.points;
        this.currentScenarioIdx++;

        this.refresh();
    },

    renderResults() {
        const maxScore = this.scenariosList.length * 10;
        const percentage = Math.round((this.totalScore / maxScore) * 100);

        Storage.updateModuleProgress('simulador', 100);
        Storage.addGamePoints(this.totalScore);

        let message = '';
        if (percentage >= 80) {
            message = '¡Excelente empatía! Demuestras una gran comprensión de la importancia del apoyo inclusivo.';
        } else if (percentage >= 60) {
            message = '¡Buen trabajo! Estás en el camino correcto para ser un aliado inclusivo.';
        } else {
            message = 'Hay oportunidades para crecer. Sigue aprendiendo sobre la inclusión y la empatía.';
        }

        return `
        <div class="page-transition max-w-2xl mx-auto px-8 py-12 text-center">
            <div class="bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-2xl p-12 mb-8">
                <span class="material-symbols-outlined text-6xl text-primary mb-4">favorite</span>
                <h1 class="text-4xl font-headline font-bold mb-4">¡Simulador Completado!</h1>
                <p class="text-3xl font-bold text-primary mb-2">${percentage}%</p>
                <p class="text-lg text-slate-600 dark:text-slate-400 mb-4">${this.totalScore}/${maxScore} puntos</p>
                <p class="text-base leading-relaxed text-on-surface mb-4">"${message}"</p>
                <p class="text-2xl font-bold text-secondary">+${this.totalScore} puntos de logro</p>
            </div>

            <div class="space-y-4">
                <button onclick="Simulador.reset(); Simulador.refresh()" class="w-full flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 hover:shadow-lg transition-all">
                    <span class="material-symbols-outlined text-xl">replay</span>
                    Intentar de Nuevo
                </button>
                <button onclick="app.navigateTo('dashboard')" class="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600 hover:shadow-md transition-all">
                    <span class="material-symbols-outlined text-xl">arrow_back</span>
                    Volver al Inicio
                </button>
            </div>
        </div>
        `;
    },

    refresh() {
        document.getElementById('app-container').innerHTML = this.render();
    }
};
