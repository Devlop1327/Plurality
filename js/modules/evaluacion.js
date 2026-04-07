// Final Evaluation Module
const Evaluacion = {
    currentQuestionIdx: 0,
    selectedAnswers: [],
    score: 0,
    isEvaluating: false,

    render() {
        if (this.isEvaluating) {
            return this.renderEvaluation();
        }

        if (this.currentQuestionIdx >= quizData.eduQuestions.length) {
            return this.renderFinalResults();
        }

        const question = quizData.eduQuestions[this.currentQuestionIdx];
        const progress = Math.round(((this.currentQuestionIdx + 1) / quizData.eduQuestions.length) * 100);

        return `
        <div class="page-transition max-w-2xl mx-auto px-8 py-12">
            <!-- Header -->
            <div class="mb-8">
                <h1 class="text-3xl font-headline font-bold mb-4">Evaluación Final</h1>
                <p class="text-slate-600 dark:text-slate-400 mb-6">Demuestra lo que has aprendido sobre género, orientación sexual y diversidad</p>
                
                <!-- Progress -->
                <div class="flex justify-between items-center mb-3">
                    <span class="font-semibold">Pregunta ${this.currentQuestionIdx + 1}/${quizData.eduQuestions.length}</span>
                </div>
                <div class="w-full bg-surface-variant rounded-full h-2 overflow-hidden">
                    <div class="progress-bar" style="width: ${progress}%"></div>
                </div>
            </div>

            <!-- Question -->
            <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-8 border border-slate-200 dark:border-slate-700">
                <h2 class="text-xl font-headline font-bold mb-6">${question.question}</h2>

                <!-- Options -->
                <div class="space-y-4">
                    ${question.options.map((option, idx) => `
                        <label class="flex gap-4 p-4 rounded-lg border-2 border-outline/20 dark:border-slate-700 hover:border-primary/50 dark:hover:border-primary/50 cursor-pointer transition-all">
                            <input type="radio" 
                                   name="answer" 
                                   value="${idx}" 
                                   onchange="Evaluacion.selectedAnswers[${this.currentQuestionIdx}] = ${idx}; Evaluacion.updateButtonState()"
                                   class="mt-1">
                            <span class="font-semibold">${option}</span>
                        </label>
                    `).join('')}
                </div>
            </div>

            <!-- Navigation -->
            <div class="flex gap-4 justify-between">
                ${this.currentQuestionIdx > 0 ? `
                    <button onclick="Evaluacion.previousQuestion()" class="flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600 hover:shadow-md transition-all">
                        <span class="material-symbols-outlined text-xl">arrow_back</span>
                        Anterior
                    </button>
                ` : `<div></div>`}
                
                <button id="nextBtn" onclick="Evaluacion.nextQuestion()" 
                        class="flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg transition-all disabled disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled>
                    ${this.currentQuestionIdx < quizData.eduQuestions.length - 1 ? `Siguiente <span class="material-symbols-outlined text-xl">arrow_forward</span>` : `Finalizar <span class="material-symbols-outlined text-xl">done_all</span>`}
                </button>
            </div>
        </div>
        `;
    },

    renderEvaluation() {
        const progress = Math.round(((this.currentQuestionIdx + 1) / quizData.eduQuestions.length) * 100);

        return `
        <div class="page-transition max-w-2xl mx-auto px-8 py-12 text-center">
            <span class="material-symbols-outlined text-6xl text-primary animate-spin mb-4" style="animation: spin 2s linear infinite;">
                process
            </span>
            <h1 class="text-3xl font-headline font-bold mb-4">Evaluando tus respuestas...</h1>
            <p class="text-slate-600 dark:text-slate-400 mb-6">Por favor espera un momento</p>
            
            <div class="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                <div class="progress-bar" style="width: ${progress}%"></div>
            </div>
        </div>

        <style>
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        </style>
        `;
    },

    renderFinalResults() {
        // Calculate score
        this.score = 0;
        this.selectedAnswers.forEach((answer, idx) => {
            if (answer === quizData.eduQuestions[idx].correct) {
                this.score++;
            }
        });

        const total = quizData.eduQuestions.length;
        const percentage = Math.round((this.score / total) * 100);
        const achievements = this.getAchievements(percentage);

        Storage.updateModuleProgress('evaluacion', 100);
        Storage.saveQuizResult('evaluacion', {
            score: this.score,
            total: total,
            percentage: percentage,
            achievements: achievements
        });

        return `
        <div class="page-transition max-w-3xl mx-auto px-8 py-12">
            <!-- Results Card -->
            <div class="bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-2xl p-12 mb-8 text-center border-2 border-primary/20 dark:border-primary/40">
                <span class="material-symbols-outlined text-6xl text-primary mb-4">trophy</span>
                <h1 class="text-4xl font-headline font-bold mb-2">¡Evaluación Completada!</h1>
                <p class="text-3xl font-bold text-primary mb-2">${percentage}%</p>
                <p class="text-lg text-slate-600 dark:text-slate-400 mb-2">${this.score}/${total} respuestas correctas</p>
            </div>

            <!-- Achievements -->
            <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-8 border border-slate-200 dark:border-slate-700">
                <h2 class="text-2xl font-headline font-bold mb-6 flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">emoji_events</span>
                    Logros Desbloqueados
                </h2>
                
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    ${achievements.map(achievement => `
                        <div class="text-center">
                            <div class="text-4xl mb-2">${achievement.icon}</div>
                            <p class="font-semibold text-sm">${achievement.name}</p>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Progress Summary -->
            <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-8 border border-slate-200 dark:border-slate-700">
                <h2 class="text-2xl font-headline font-bold mb-6">Resumen de Avance</h2>
                
                <div class="space-y-6">
                    <div>
                        <div class="flex justify-between mb-2">
                            <span>Módulo Educativo</span>
                            <span class="font-bold text-primary">${Storage.getProgress().educativo || 0}%</span>
                        </div>
                        <div class="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                            <div class="progress-bar" style="width: ${Storage.getProgress().educativo || 0}%"></div>
                        </div>
                    </div>

                    <div>
                        <div class="flex justify-between mb-2">
                            <span>Centro de Juegos</span>
                            <span class="font-bold text-primary">${Storage.getProgress().juegos || 0}%</span>
                        </div>
                        <div class="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                            <div class="progress-bar" style="width: ${Storage.getProgress().juegos || 0}%"></div>
                        </div>
                    </div>

                    <div>
                        <div class="flex justify-between mb-2">
                            <span>Simulador de Empatía</span>
                            <span class="font-bold text-primary">${Storage.getProgress().simulador || 0}%</span>
                        </div>
                        <div class="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                            <div class="progress-bar" style="width: ${Storage.getProgress().simulador || 0}%"></div>
                        </div>
                    </div>

                    <div>
                        <div class="flex justify-between mb-2">
                            <span>Evaluación Final</span>
                            <span class="font-bold text-primary">100%</span>
                        </div>
                        <div class="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                            <div class="progress-bar" style="width: 100%"></div>
                        </div>
                    </div>
                </div>

                <div class="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                    <div class="flex justify-between items-center">
                        <span class="font-semibold">Progreso General</span>
                        <span class="text-2xl font-bold text-primary">${Storage.getTotalProgress()}%</span>
                    </div>
                </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-4 justify-center">
                <button onclick="Evaluacion.reset(); Evaluacion.refresh()" class="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 hover:shadow-lg transition-all">
                    <span class="material-symbols-outlined text-xl">replay</span>
                    Intentar de Nuevo
                </button>
                <button onclick="app.navigateTo('dashboard')" class="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600 hover:shadow-md transition-all">
                    <span class="material-symbols-outlined text-xl">arrow_back</span>
                    Volver al Inicio
                </button>
            </div>
        </div>
        `;
    },

    getAchievements(percentage) {
        const achievements = [
            { name: 'Iniciado', icon: '🎯', minScore: 0 }
        ];

        if (percentage >= 40) achievements.push({ name: 'Aprendiz', icon: '📚', minScore: 40 });
        if (percentage >= 60) achievements.push({ name: 'Aventajado', icon: '⭐', minScore: 60 });
        if (percentage >= 80) achievements.push({ name: 'Experto', icon: '🏆', minScore: 80 });
        if (percentage >= 100) achievements.push({ name: 'Maestro', icon: '👑', minScore: 100 });

        return achievements;
    },

    nextQuestion() {
        if (this.selectedAnswers[this.currentQuestionIdx] === undefined) return;

        if (this.currentQuestionIdx < quizData.eduQuestions.length - 1) {
            this.currentQuestionIdx++;
            this.refresh();
        } else {
            this.isEvaluating = true;
            this.refresh();
            setTimeout(() => {
                this.isEvaluating = false;
                this.currentQuestionIdx = quizData.eduQuestions.length;
                this.refresh();
            }, 2000);
        }
    },

    previousQuestion() {
        if (this.currentQuestionIdx > 0) {
            this.currentQuestionIdx--;
            this.refresh();
        }
    },

    updateButtonState() {
        const btn = document.getElementById('nextBtn');
        if (btn) {
            if (this.selectedAnswers[this.currentQuestionIdx] !== undefined) {
                btn.disabled = false;
                btn.classList.remove('opacity-50', 'cursor-not-allowed');
                btn.classList.add('bg-primary');
            }
        }
    },

    reset() {
        this.currentQuestionIdx = 0;
        this.selectedAnswers = [];
        this.score = 0;
        this.isEvaluating = false;
    },

    refresh() {
        document.getElementById('app-container').innerHTML = this.render();
        setTimeout(() => this.updateButtonState(), 100);
    }
};
