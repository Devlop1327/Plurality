// Decision Simulator Module
const Simulador = {
    currentScenarioIdx: 0,
    responses: [],
    totalScore: 0,

    render() {
        if (this.currentScenarioIdx >= quizData.scenarioDecisions.length) {
            return this.renderResults();
        }

        const scenario = quizData.scenarioDecisions[this.currentScenarioIdx];
        const progress = Math.round(((this.currentScenarioIdx + 1) / quizData.scenarioDecisions.length) * 100);

        return `
        <div class="page-transition max-w-3xl mx-auto px-8 py-12">
            <!-- Progress -->
            <div class="mb-8">
                <div class="flex justify-between items-center mb-3">
                    <h2 class="text-2xl font-headline font-bold">Simulador de Empatía</h2>
                    <span class="text-sm font-semibold text-slate-600 dark:text-slate-400">Escenario ${this.currentScenarioIdx + 1}/${quizData.scenarioDecisions.length}</span>
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

            <button onclick="app.navigateTo('dashboard')" class="flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600 hover:shadow-md transition-all">
                <span class="material-symbols-outlined text-xl">arrow_back</span>
                Volver
            </button>
        </div>
        `;
    },

    renderChoice(choice, idx) {
        let color = 'outline/10';
        let hoverColor = 'hover:border-primary/50';

        if (choice.impact === 'Positive') {
            color = 'secondary/20';
            hoverColor = 'hover:border-secondary/50';
        } else if (choice.impact === 'Negative') {
            color = 'error/20';
            hoverColor = 'hover:border-error/50';
        }

        return `
        <button onclick="Simulador.chooseOption(${idx})" 
                class="w-full text-left p-6 rounded-lg border-2 border-${color} dark:border-${color.replace('/20', '/40')} ${hoverColor} bg-white dark:bg-slate-800 transition-all hover:shadow-md">
            <div class="flex justify-between items-start gap-4">
                <div class="flex-1">
                    <p class="font-semibold text-base leading-relaxed">${choice.text}</p>
                </div>
                <div class="text-right flex-shrink-0">
                    <span class="inline-block px-3 py-1 rounded-full text-xs font-bold ${this.getImpactBadgeClass(choice.impact)}">
                        ${choice.impact === 'Positive' ? '✓ Positivo' : choice.impact === 'Negative' ? '✗ Negativo' : '◈ Neutral'}
                    </span>
                </div>
            </div>
            <p class="text-sm text-slate-600 dark:text-slate-400 mt-2">+${choice.points} puntos</p>
        </button>
        `;
    },

    getImpactBadgeClass(impact) {
        if (impact === 'Positive') return 'bg-secondary/30 text-on-secondary';
        if (impact === 'Negative') return 'bg-error/30 text-on-error';
        return 'bg-tertiary/30 text-on-tertiary';
    },

    chooseOption(idx) {
        const scenario = quizData.scenarioDecisions[this.currentScenarioIdx];
        const choice = scenario.choices[idx];

        this.responses.push({
            scenarioId: scenario.id,
            chosenIdx: idx,
            impact: choice.impact,
            points: choice.points
        });

        this.totalScore += choice.points;
        this.currentScenarioIdx++;

        if (this.currentScenarioIdx < quizData.scenarioDecisions.length) {
            this.refresh();
        } else {
            this.refresh();
        }
    },

    renderResults() {
        const maxScore = quizData.scenarioDecisions.length * 10;
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

    reset() {
        this.currentScenarioIdx = 0;
        this.responses = [];
        this.totalScore = 0;
    },

    refresh() {
        document.getElementById('app-container').innerHTML = this.render();
    }
};
