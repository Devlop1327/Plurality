// Games Module
const Juegos = {
    gameType: 'menu', // menu, quiz, matching
    currentQuestionIdx: 0,
    score: 0,
    correctAnswers: 0,
    matchingPairs: {
        conceptos: [
            { id: 1, term: "Cisgénero", definition: "La identidad de género coincide con el sexo asignado" },
            { id: 2, term: "Transgénero", definition: "La identidad de género difiere del sexo asignado" },
            { id: 3, term: "No Binario", definition: "Identidad que no es exclusivamente hombre ni mujer" },
            { id: 4, term: "Bisexual", definition: "Atracción hacia múltiples géneros" }
        ],
        matched: []
    },

    renderMenu() {
        return `
        <div class="page-transition max-w-4xl mx-auto px-8 py-12">
            <h1 class="text-4xl font-headline font-bold mb-4">Centro de Juegos</h1>
            <p class="text-lg text-slate-600 dark:text-slate-400 mb-12">¡Pon a prueba tus conocimientos de forma divertida!</p>

            <div class="grid md:grid-cols-2 gap-8">
                <!-- Quick Quiz -->
                <div class="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-2xl p-8 border border-primary/20 dark:border-primary/40 hover:shadow-lg hover:scale-105 transition-all cursor-pointer" 
                     onclick="Juegos.startQuiz()">
                    <span class="material-symbols-outlined text-5xl text-primary mb-4">quiz</span>
                    <h2 class="text-2xl font-headline font-bold mb-3">Quiz Rápido</h2>
                    <p class="text-slate-600 dark:text-slate-400 mb-4">Responde preguntas de selección múltiple y gana puntos.</p>
                    <div class="flex items-center gap-2 text-sm font-semibold text-primary">
                        Jugar <span class="material-symbols-outlined">arrow_forward</span>
                    </div>
                </div>

                <!-- Matching Game -->
                <div class="bg-gradient-to-br from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 rounded-2xl p-8 border border-secondary/20 dark:border-secondary/40 hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
                     onclick="Juegos.startMatching()">
                    <span class="material-symbols-outlined text-5xl text-secondary mb-4">memory</span>
                    <h2 class="text-2xl font-headline font-bold mb-3">Emparejamiento</h2>
                    <p class="text-slate-600 dark:text-slate-400 mb-4">Relaciona conceptos con sus definiciones correctas.</p>
                    <div class="flex items-center gap-2 text-sm font-semibold text-secondary">
                        Jugar <span class="material-symbols-outlined">arrow_forward</span>
                    </div>
                </div>
            </div>

            <div class="mt-8">
                <button onclick="app.navigateTo('dashboard')" class="flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600 hover:shadow-md transition-all">
                    <span class="material-symbols-outlined text-xl">arrow_back</span>
                    Volver
                </button>
            </div>
        </div>
        `;
    },

    renderQuiz() {
        const question = quizData.gameQuizzes[this.currentQuestionIdx];
        const progress = Math.round(((this.currentQuestionIdx + 1) / quizData.gameQuizzes.length) * 100);

        return `
        <div class="page-transition max-w-2xl mx-auto px-8 py-12">
            <!-- Progress -->
            <div class="mb-8">
                <div class="flex justify-between items-center mb-3">
                    <span class="font-semibold">Pregunta ${this.currentQuestionIdx + 1}/${quizData.gameQuizzes.length}</span>
                    <span class="text-lg font-bold text-primary">${this.score} pts</span>
                </div>
                <div class="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div class="progress-bar" style="width: ${progress}%"></div>
                </div>
            </div>

            <!-- Question -->
            <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-8 border border-slate-200 dark:border-slate-700">
                <h2 class="text-2xl font-headline font-bold mb-8">${question.question}</h2>

                <!-- Options -->
                <div class="space-y-4">
                    ${question.options.map((option, idx) => `
                        <button onclick="Juegos.answerQuestion(${idx})" 
                                class="w-full text-left p-4 rounded-lg border-2 border-outline/20 dark:border-slate-700 hover:border-primary/50 dark:hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-primary/10 transition-all">
                            <span class="font-semibold">${option}</span>
                        </button>
                    `).join('')}
                </div>
            </div>

            <button onclick="Juegos.backToMenu()" class="flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600 hover:shadow-md transition-all">
                <span class="material-symbols-outlined text-xl">arrow_back</span>
                Volver al Menú
            </button>
        </div>
        `;
    },

    renderMatching() {
        return `
        <div class="page-transition max-w-2xl mx-auto px-8 py-12">
            <h1 class="text-3xl font-headline font-bold mb-2">Emparejamiento</h1>
            <p class="text-slate-600 dark:text-slate-400 mb-8">Arrastra los conceptos a sus definiciones correctas</p>

            <div class="grid md:grid-cols-2 gap-8 mb-8">
                <!-- Conceptos -->
                <div class="space-y-4">
                    <h3 class="font-semibold text-lg mb-4">Conceptos</h3>
                    ${this.matchingPairs.conceptos.map(item => `
                        <div class="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 cursor-move hover:shadow-md transition-all"
                             draggable="true"
                             ondragstart="Juegos.dragStart(event, ${item.id})">
                            <span class="font-semibold">${item.term}</span>
                        </div>
                    `).join('')}
                </div>

                <!-- Definiciones -->
                <div class="space-y-4">
                    <h3 class="font-semibold text-lg mb-4">Definiciones</h3>
                    ${this.matchingPairs.conceptos.map((item, idx) => `
                        <div class="bg-white dark:bg-slate-800 rounded-lg p-4 border-2 border-dashed border-outline/30 dark:border-slate-700 min-h-20 transition-all"
                             ondragover="event.preventDefault()"
                             ondrop="Juegos.dropItem(event, ${item.id})">
                            <span class="text-slate-600 dark:text-slate-400">${item.definition}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <button onclick="Juegos.backToMenu()" class="flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600 hover:shadow-md transition-all">
                <span class="material-symbols-outlined text-xl">arrow_back</span>
                Volver al Menú
            </button>
        </div>
        `;
    },

    render() {
        switch (this.gameType) {
            case 'quiz':
                return this.renderQuiz();
            case 'matching':
                return this.renderMatching();
            default:
                return this.renderMenu();
        }
    },

    startQuiz() {
        this.gameType = 'quiz';
        this.currentQuestionIdx = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.refresh();
    },

    startMatching() {
        this.gameType = 'matching';
        this.refresh();
    },

    answerQuestion(idx) {
        const question = quizData.gameQuizzes[this.currentQuestionIdx];
        if (idx === question.correct) {
            this.score += 10;
            this.correctAnswers++;
        }

        if (this.currentQuestionIdx < quizData.gameQuizzes.length - 1) {
            this.currentQuestionIdx++;
            this.refresh();
        } else {
            this.showResults();
        }
    },

    showResults() {
        const total = quizData.gameQuizzes.length;
        const percentage = Math.round((this.correctAnswers / total) * 100);

        Storage.addGamePoints(this.score);
        Storage.updateModuleProgress('juegos', Math.min(Storage.getProgress().juegos + 25, 100));

        const html = `
        <div class="page-transition max-w-2xl mx-auto px-8 py-12 text-center">
            <div class="bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-2xl p-12 mb-8">
                <span class="material-symbols-outlined text-6xl text-primary mb-4">celebration</span>
                <h1 class="text-4xl font-headline font-bold mb-4">¡Completado!</h1>
                <p class="text-3xl font-bold text-primary mb-2">${percentage}%</p>
                <p class="text-lg text-slate-600 dark:text-slate-400">${this.correctAnswers}/${total} respuestas correctas</p>
                <p class="text-2xl font-bold text-secondary mt-4">+${this.score} puntos</p>
            </div>

            <div class="space-y-4">
                <button onclick="Juegos.startQuiz()" class="w-full flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 hover:shadow-lg transition-all">
                    <span class="material-symbols-outlined text-xl">replay</span>
                    Intentar de Nuevo
                </button>
                <button onclick="Juegos.gameType = 'menu'; Juegos.refresh()" class="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600 hover:shadow-md transition-all">
                    <span class="material-symbols-outlined text-xl">arrow_back</span>
                    Volver al Menú
                </button>
            </div>
        </div>
        `;
        document.getElementById('app-container').innerHTML = html;
    },

    dragStart(e, id) {
        e.dataTransfer.setData('conceptId', id);
    },

    dropItem(e, definitionId) {
        e.preventDefault();
        const conceptId = parseInt(e.dataTransfer.getData('conceptId'));
        alert('¡Emparejado! Concepto con definición');
        // In a full implementation, this would validate and track matches
    },

    backToMenu() {
        this.gameType = 'menu';
        this.refresh();
    },

    refresh() {
        document.getElementById('app-container').innerHTML = this.render();
    }
};
