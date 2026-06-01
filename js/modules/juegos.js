// Games Module
const Juegos = {
    gameType: 'menu', // menu, quiz, matching, rompecabezas
    currentQuestionIdx: 0,
    currentItemIdx: 0,
    score: 0,
    correctAnswers: 0,
    hintsShown: 0,
    memoryCards: [],
    currentMemoryPairs: [],
    memoryDeckTitle: '',
    selectedCards: [],
    revealedCards: new Set(),
    matchesFound: 0,
    attempts: 0,
    memoryLocked: false,
    draggingItem: null, // Store dragging item data
    matchingPairs: {
        conceptos: [
            { id: 1, term: "Cisgénero", definition: "La identidad de género coincide con el sexo asignado" },
            { id: 2, term: "Transgénero", definition: "La identidad de género difiere del sexo asignado" },
            { id: 3, term: "No Binario", definition: "Identidad que no es exclusivamente hombre ni mujer" },
            { id: 4, term: "Bisexual", definition: "Atracción hacia múltiples géneros" }
        ],
        matched: []
    },

    shuffleArray(array) {
        const result = [...array];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    },

    renderMenu() {
        return `
        <div class="page-transition max-w-6xl mx-auto px-8 py-12">
            <h1 class="text-4xl font-headline font-bold mb-4">Centro de Juegos</h1>
            <p class="text-lg text-slate-600 dark:text-slate-400 mb-12">¡Pon a prueba tus conocimientos de forma divertida! Elige tu juego favorito.</p>

            <div class="grid md:grid-cols-3 gap-6">
                <!-- Quick Quiz -->
                <div class="bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700 hover:shadow-lg hover:scale-105 transition-all cursor-pointer" 
                     onclick="Juegos.startQuiz()">
                    <span class="material-symbols-outlined text-4xl text-purple-600 mb-3">quiz</span>
                    <h2 class="text-xl font-bold mb-2 text-slate-900 dark:text-white">Quiz Rápido</h2>
                    <p class="text-sm text-slate-600 dark:text-slate-400">Responde preguntas de selección múltiple.</p>
                </div>

                <!-- Trivia Rápido -->
                <div class="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700 hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
                     onclick="Juegos.startTriviRapido()">
                    <span class="material-symbols-outlined text-4xl text-blue-600 mb-3">bolt</span>
                    <h2 class="text-xl font-bold mb-2 text-slate-900 dark:text-white">Trivia Rápido</h2>
                    <p class="text-sm text-slate-600 dark:text-slate-400">Contesta preguntas en menos tiempo.</p>
                </div>

                <!-- ¿Quién Soy? -->
                <div class="bg-gradient-to-br from-pink-100 to-pink-50 dark:from-pink-900/30 dark:to-pink-800/20 rounded-xl p-6 border border-pink-200 dark:border-pink-700 hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
                     onclick="Juegos.startQuienSoy()">
                    <span class="material-symbols-outlined text-4xl text-pink-600 mb-3">help</span>
                    <h2 class="text-xl font-bold mb-2 text-slate-900 dark:text-white">¿Quién Soy?</h2>
                    <p class="text-sm text-slate-600 dark:text-slate-400">Adivina qué identidad o concepto soy.</p>
                </div>

                <!-- Matching Game -->
                <div class="bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-700 hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
                     onclick="Juegos.startMatching()">
                    <span class="material-symbols-outlined text-4xl text-green-600 mb-3">link</span>
                    <h2 class="text-xl font-bold mb-2 text-slate-900 dark:text-white">Emparejamiento</h2>
                    <p class="text-sm text-slate-600 dark:text-slate-400">Relaciona conceptos con definiciones.</p>
                </div>

                <!-- Memory Pro -->
                <div class="bg-gradient-to-br from-cyan-100 to-cyan-50 dark:from-cyan-900/30 dark:to-cyan-800/20 rounded-xl p-6 border border-cyan-200 dark:border-cyan-700 hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
                     onclick="Juegos.startMemory()">
                    <span class="material-symbols-outlined text-4xl text-cyan-600 mb-3">grid_view</span>
                    <h2 class="text-xl font-bold mb-2 text-slate-900 dark:text-white">Encuentra la Pareja</h2>
                    <p class="text-sm text-slate-600 dark:text-slate-400">Memoria pro con pares de términos y definiciones.</p>
                </div>

                <!-- Categorización -->
                <div class="bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/20 rounded-xl p-6 border border-amber-200 dark:border-amber-700 hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
                     onclick="Juegos.startCategorizacion()">
                    <span class="material-symbols-outlined text-4xl text-amber-600 mb-3">category</span>
                    <h2 class="text-xl font-bold mb-2 text-slate-900 dark:text-white">Categorización</h2>
                    <p class="text-sm text-slate-600 dark:text-slate-400">Clasifica elementos en categorías.</p>
                </div>

                <!-- Puzzle Rompecabezas -->
                <div class="bg-gradient-to-br from-fuchsia-100 to-fuchsia-50 dark:from-fuchsia-900/30 dark:to-fuchsia-800/20 rounded-xl p-6 border border-fuchsia-200 dark:border-fuchsia-700 hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
                     onclick="Juegos.startRompecabezas()">
                    <span class="material-symbols-outlined text-4xl text-fuchsia-600 mb-3">puzzle</span>
                    <h2 class="text-xl font-bold mb-2 text-slate-900 dark:text-white">Rompecabezas</h2>
                    <p class="text-sm text-slate-600 dark:text-slate-400">Completa frases clave sobre diversidad e inclusión.</p>
                </div>

                <!-- Palabras Clave -->
                <div class="bg-gradient-to-br from-indigo-100 to-indigo-50 dark:from-indigo-900/30 dark:to-indigo-800/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-700 hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
                     onclick="Juegos.startPalabrasClaves()">
                    <span class="material-symbols-outlined text-4xl text-indigo-600 mb-3">done_all</span>
                    <h2 class="text-xl font-bold mb-2 text-slate-900 dark:text-white">Verdadero/Falso</h2>
                    <p class="text-sm text-slate-600 dark:text-slate-400">Determina si las afirmaciones son correctas.</p>
                </div>
            </div>

            <div class="mt-12">
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
        const connections = this.matchingDataSet || quizData.conexionesConceptos[0].connections;
        const leftItems = connections.map(c => c.left);
        const allFilled = Object.keys(this.matchedPairs).length === connections.length;

        return `
        <div class="page-transition max-w-4xl mx-auto px-8 py-12">
            <div class="mb-8">
                <h1 class="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Emparejamiento</h1>
                <p class="text-slate-600 dark:text-slate-400 mb-4">Arrastra cada concepto a su definición correcta</p>
                <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div class="bg-purple-600 h-2 rounded-full transition-all" style="width: ${Object.keys(this.matchedPairs).length / connections.length * 100}%"></div>
                </div>
                <p class="text-sm text-slate-600 dark:text-slate-400 mt-2">${Object.keys(this.matchedPairs).length}/${connections.length} parejas emparejadas</p>
            </div>

            <div class="grid md:grid-cols-2 gap-8 mb-8">
                <!-- Left Column: Items to Drag -->
                <div>
                    <h3 class="font-bold text-lg mb-4 text-slate-900 dark:text-white">Conceptos</h3>
                    <div class="space-y-3">
                        ${leftItems.map(item => `
                            <div class="bg-gradient-to-r from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20 rounded-lg p-4 border-2 border-purple-300 dark:border-purple-600 cursor-move hover:shadow-lg transition-all transform hover:scale-105"
                                 draggable="true"
                                 ondragstart="Juegos.dragStart(event, '${item}')">
                                <span class="font-semibold text-slate-900 dark:text-white">${item}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Right Column: Drop Zones -->
                <div>
                    <h3 class="font-bold text-lg mb-4 text-slate-900 dark:text-white">Definiciones</h3>
                    <div class="space-y-3">
                        ${connections.map(conn => {
            const droppedItem = this.matchedPairs[conn.right];
            return `
                                <div class="rounded-lg p-4 border-2 transition-all min-h-20 flex flex-col justify-center ${droppedItem
                    ? 'bg-slate-100 dark:bg-slate-700 border-slate-400 dark:border-slate-600'
                    : 'bg-white dark:bg-slate-800 border-dashed border-slate-300 dark:border-slate-600'
                }"
                                     ondragover="event.preventDefault()"
                                     ondrop="Juegos.dropMatching(event, '${conn.right}', '${conn.left}')">
                                    <p class="text-xs text-slate-500 dark:text-slate-400 mb-1">Definición:</p>
                                    <p class="text-slate-700 dark:text-slate-300 font-semibold text-sm">${conn.right}</p>
                                    ${droppedItem ? `
                                        <div class="mt-3 pt-3 border-t border-slate-400 dark:border-slate-600">
                                            <p class="text-xs text-slate-500 dark:text-slate-400 mb-1">Concepto:</p>
                                            <p class="text-slate-900 dark:text-white font-bold">${droppedItem}</p>
                                        </div>
                                    ` : ''}
                                </div>
                            `;
        }).join('')}
                    </div>
                </div>
            </div>

            <div class="flex gap-4 justify-center">
                <button onclick="Juegos.backToMenu()" class="flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600 transition">
                    <span class="material-symbols-outlined text-xl">arrow_back</span>
                    Volver al Menú
                </button>
                ${allFilled ? `
                    <button onclick="Juegos.showResultsMatching()" class="flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-green-600 text-white hover:bg-green-700 transition">
                        <span class="material-symbols-outlined text-xl">check_circle</span>
                        Ver Resultados
                    </button>
                ` : `
                    <button disabled class="flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-gray-400 text-white cursor-not-allowed opacity-50">
                        <span class="material-symbols-outlined text-xl">check_circle</span>
                        Ver Resultados (${Object.keys(this.matchedPairs).length}/${connections.length})
                    </button>
                `}
            </div>
        </div>
        `;
    },

    renderMemory() {
        const cardCount = this.memoryCards.length;
        const progress = Math.round((this.matchesFound / (cardCount / 2)) * 100);

        return `
        <div class="page-transition max-w-6xl mx-auto px-8 py-12">
            <div class="mb-8">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 class="text-3xl font-bold mb-2 text-slate-900 dark:text-white">${this.memoryDeckTitle || 'Encuentra la Pareja'}</h1>
                        <p class="text-slate-600 dark:text-slate-400">Gira las cartas y encuentra el par correcto de términos y definiciones.</p>
                    </div>
                    <div class="grid grid-cols-3 gap-3 text-center">
                        <div class="rounded-2xl bg-slate-100 dark:bg-slate-800 p-4">
                            <p class="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mb-2">Aciertos</p>
                            <p class="text-2xl font-bold text-slate-900 dark:text-white">${this.matchesFound}</p>
                        </div>
                        <div class="rounded-2xl bg-slate-100 dark:bg-slate-800 p-4">
                            <p class="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mb-2">Intentos</p>
                            <p class="text-2xl font-bold text-slate-900 dark:text-white">${this.attempts}</p>
                        </div>
                        <div class="rounded-2xl bg-slate-100 dark:bg-slate-800 p-4">
                            <p class="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mb-2">Puntos</p>
                            <p class="text-2xl font-bold text-fuchsia-600">${this.score}</p>
                        </div>
                    </div>
                </div>

                <div class="mt-6 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div class="bg-cyan-600 h-2 rounded-full transition-all" style="width: ${progress}%"></div>
                </div>
                <p class="text-sm text-slate-600 dark:text-slate-400 mt-2">${this.matchesFound}/${cardCount / 2} pares encontrados</p>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
                ${this.memoryCards.map((card, idx) => {
            const isFlipped = this.revealedCards.has(idx) || this.selectedCards.includes(idx);
            return `
                    <button onclick="Juegos.flipMemoryCard(${idx})" class="relative min-h-[220px] rounded-3xl border-2 transition-all ${isFlipped ? 'bg-white dark:bg-slate-800 border-cyan-300 dark:border-cyan-600 shadow-2xl' : 'bg-slate-900 dark:bg-slate-950 border-slate-700 hover:border-cyan-400'} px-6 py-5 overflow-hidden ${this.memoryLocked ? 'cursor-not-allowed' : 'cursor-pointer'}" ${this.memoryLocked ? 'disabled' : ''}>
                        <div class="absolute inset-0 flex items-center justify-center text-center p-4 ${isFlipped ? 'text-slate-900 dark:text-white' : 'text-cyan-100 dark:text-cyan-200'} font-semibold text-base leading-8">
                            ${isFlipped ? card.label : '🚀'}
                        </div>
                    </button>
                `;
        }).join('')}
            </div>

            <div class="flex flex-col md:flex-row gap-4 justify-center">
                <button onclick="Juegos.startMemory()" class="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-purple-600 border border-purple-700 text-white shadow-lg hover:bg-purple-700 transition-all">
                    <span class="material-symbols-outlined">restart_alt</span>
                    Reiniciar Juego
                </button>
                <button onclick="Juegos.gameType = 'menu'; Juegos.refresh()" class="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600 transition-all">
                    <span class="material-symbols-outlined">arrow_back</span>
                    Volver al Menú
                </button>
            </div>
        </div>
        `;
    },

    showResultsMemory() {
        const totalPairs = this.currentMemoryPairs.length || quizData.memoryPairs.length;
        const percentage = Math.round((this.matchesFound / totalPairs) * 100);

        Storage.addGamePoints(this.score, 'memory');
        Storage.updateModuleProgress('juegos', Math.min(Storage.getProgress().juegos + 25, 100));

        const html = `
        <div class="page-transition max-w-2xl mx-auto px-8 py-12 text-center">
            <div class="bg-gradient-to-br from-cyan-100 to-cyan-50 dark:from-cyan-900/30 dark:to-cyan-800/20 rounded-2xl p-12 mb-8">
                <span class="material-symbols-outlined text-6xl text-cyan-600 mb-4 block">celebration</span>
                <h1 class="text-4xl font-bold mb-4 text-slate-900 dark:text-white">¡Parejas encontradas!</h1>
                <p class="text-3xl font-bold text-cyan-600 mb-2">${percentage}%</p>
                <p class="text-lg text-slate-600 dark:text-slate-400">${this.matchesFound}/${totalPairs} pares correctos</p>
                <p class="text-2xl font-bold text-slate-900 dark:text-white mt-4">+${this.score} puntos</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button onclick="Juegos.startMemory()" class="w-full flex items-center justify-center gap-2 bg-cyan-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-cyan-700 transition-all hover:shadow-lg">
                    <span class="material-symbols-outlined text-xl">replay</span>
                    Intentar de Nuevo
                </button>
                <button onclick="Juegos.gameType = 'menu'; Juegos.refresh()" class="w-full flex items-center justify-center gap-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white px-6 py-3 rounded-full font-semibold transition-all hover:shadow-lg">
                    <span class="material-symbols-outlined text-xl">arrow_back</span>
                    Volver al Menú
                </button>
            </div>
        </div>
        `;

        document.getElementById('app-container').innerHTML = html;
    },

    renderTrivia() {
        const question = quizData.triviaRapido[this.currentQuestionIdx];
        const progress = Math.round(((this.currentQuestionIdx + 1) / quizData.triviaRapido.length) * 100);

        return `
        <div class="page-transition max-w-2xl mx-auto px-8 py-12">
            <div class="mb-8">
                <div class="flex justify-between items-center mb-3">
                    <span class="font-semibold">Pregunta ${this.currentQuestionIdx + 1}/${quizData.triviaRapido.length}</span>
                    <span class="text-lg font-bold text-purple-600">${this.score} pts</span>
                </div>
                <div class="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                    <div class="bg-purple-600 h-2 rounded-full transition-all" style="width: ${progress}%"></div>
                </div>
            </div>

            <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-8">
                <h2 class="text-2xl font-bold mb-6 text-slate-900 dark:text-white">${question.question}</h2>
                <p class="text-sm text-slate-600 dark:text-slate-400 mb-6 italic">Pista: ${question.hint}</p>
                
                <input type="text" id="trivia-answer" placeholder="Escribe tu respuesta..." 
                    class="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-700 mb-6 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    onkeyup="if(event.key === 'Enter') Juegos.checkTrivia()">

                <button onclick="Juegos.checkTrivia()" class="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
                    Verificar Respuesta
                </button>
            </div>

            <button onclick="Juegos.backToMenu()" class="flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600">
                <span class="material-symbols-outlined text-xl">arrow_back</span>
                Volver al Menú
            </button>
        </div>
        `;
    },

    renderQuienSoy() {
        const question = quizData.quienSoy[this.currentQuestionIdx];
        const progress = Math.round(((this.currentQuestionIdx + 1) / quizData.quienSoy.length) * 100);

        return `
        <div class="page-transition max-w-2xl mx-auto px-8 py-12">
            <div class="mb-8">
                <div class="flex justify-between items-center mb-3">
                    <span class="font-semibold">Pregunta ${this.currentQuestionIdx + 1}/${quizData.quienSoy.length}</span>
                    <span class="text-lg font-bold text-pink-600">${this.score} pts</span>
                </div>
                <div class="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                    <div class="bg-pink-600 h-2 rounded-full transition-all" style="width: ${progress}%"></div>
                </div>
            </div>

            <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-8">
                <h2 class="text-2xl font-bold mb-6 text-slate-900 dark:text-white">${question.description}</h2>

                <div class="space-y-3 mb-8">
                    ${question.options.map((option, idx) => `
                        <button onclick="Juegos.answerQuienSoy(${idx})" 
                            class="w-full text-left bg-slate-100 dark:bg-slate-700 hover:bg-pink-100 dark:hover:bg-pink-900/30 px-4 py-3 rounded-lg font-semibold transition">
                            ${option}
                        </button>
                    `).join('')}
                </div>
            </div>

            <button onclick="Juegos.backToMenu()" class="flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600">
                <span class="material-symbols-outlined text-xl">arrow_back</span>
                Volver al Menú
            </button>
        </div>
        `;
    },

    renderCategorizacion() {
        const game = quizData.categorizacion[this.currentQuestionIdx];
        const progress = Math.round(((this.currentQuestionIdx + 1) / quizData.categorizacion.length) * 100);

        const getCategories = () => {
            const categories = [...new Set(game.items.map(item => item.category))];
            return categories;
        };

        const categories = getCategories();
        if (!this.currentItemIdx) this.currentItemIdx = 0;
        const item = game.items[this.currentItemIdx];

        return `
        <div class="page-transition max-w-2xl mx-auto px-8 py-12">
            <div class="mb-8">
                <div class="flex justify-between items-center mb-3">
                    <span class="font-semibold">Juego ${this.currentQuestionIdx + 1}/${game.items.length}</span>
                    <span class="text-lg font-bold text-amber-600">${this.score} pts</span>
                </div>
                <div class="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                    <div class="bg-amber-600 h-2 rounded-full transition-all" style="width: ${progress}%"></div>
                </div>
            </div>

            <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-8">
                <h2 class="text-2xl font-bold mb-2 text-slate-900 dark:text-white">${game.title}</h2>
                <p class="text-slate-600 dark:text-slate-400 mb-8">💡 Selecciona la categoría correcta para este elemento</p>

                <!-- Item to Categorize -->
                <div class="bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/20 rounded-lg p-8 mb-8 text-center border-2 border-amber-300 dark:border-amber-600">
                    <p class="text-sm text-amber-700 dark:text-amber-300 mb-3">Elemento:</p>
                    <h3 class="text-4xl font-bold text-amber-900 dark:text-amber-100">${item.text}</h3>
                </div>

                <!-- Category Options -->
                <div class="space-y-3">
                    <p class="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">¿A qué categoría pertenece?</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        ${categories.map(cat => `
                            <button onclick="Juegos.selectCategory('${cat}')" 
                                    class="bg-white dark:bg-slate-700 border-2 border-amber-300 dark:border-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/30 hover:border-amber-600 dark:hover:border-amber-500 p-4 rounded-lg font-semibold text-slate-900 dark:text-white transition-all transform hover:scale-105">
                                ${cat}
                            </button>
                        `).join('')}
                    </div>
                </div>
                </div>
            </div>

            <button onclick="Juegos.backToMenu()" class="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600">
                <span class="material-symbols-outlined text-xl">arrow_back</span>
                Volver al Menú
            </button>
        </div>
        `;
    },

    dragStart(event) {
        // Deprecated - no longer used for click-to-select interface
    },

    dragEnd(event) {
        // Deprecated - no longer used for click-to-select interface
    },

    selectCategory(selectedCategory) {
        const game = quizData.categorizacion[this.currentQuestionIdx];
        const item = game.items[this.currentItemIdx];
        const correctCategory = item.category;

        console.log('selectCategory:', { item: item.text, selected: selectedCategory, correct: correctCategory });

        // Check if selection is correct
        if (selectedCategory === correctCategory) {
            this.score += 20;
            this.correctAnswers++;
            console.log('✓ Correct!');
        } else {
            console.log('✗ Incorrect');
        }

        // Move to next item
        this.currentItemIdx++;
        if (this.currentItemIdx >= game.items.length) {
            this.currentItemIdx = 0;
            this.showResultsCategorizacion();
        } else {
            this.refresh();
        }
    },

    dropCategoria(event, category) {
        // Deprecated - no longer used for click-to-select interface
    },

    verificarCategorizacion() {
        // Deprecated - moved to selectCategory
    },

    showResultsCategorizacion() {
        const game = quizData.categorizacion[this.currentQuestionIdx];
        const total = game.items.length;
        const percentage = Math.round((this.correctAnswers / total) * 100);

        Storage.addGamePoints(this.score);

        const html = `
        <div class="page-transition max-w-2xl mx-auto px-8 py-12 text-center">
            <div class="bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/20 rounded-2xl p-12 mb-8">
                <span class="material-symbols-outlined text-6xl text-amber-600 mb-4 block">celebration</span>
                <h1 class="text-4xl font-bold mb-4 text-slate-900 dark:text-white">¡Categorización Completada!</h1>
                <p class="text-3xl font-bold text-amber-600 mb-2">${percentage}%</p>
                <p class="text-lg text-slate-600 dark:text-slate-400">${this.correctAnswers}/${total} juegos correctos</p>
                <p class="text-2xl font-bold text-slate-900 dark:text-white mt-4">+${this.score} puntos</p>
            </div>

            <button onclick="Juegos.startCategorizacion()" class="w-full flex items-center justify-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-amber-700 mb-4 transition">
                <span class="material-symbols-outlined">replay</span> Intentar de Nuevo
            </button>
            <button onclick="Juegos.gameType = 'menu'; Juegos.refresh()" class="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-300 transition">
                <span class="material-symbols-outlined">arrow_back</span> Volver al Menú
            </button>
        </div>
        `;
        document.getElementById('app-container').innerHTML = html;
    },

    renderPalabrasClaves() {
        const item = quizData.verdaderoFalso[this.currentQuestionIdx];
        const progress = Math.round(((this.currentQuestionIdx + 1) / quizData.verdaderoFalso.length) * 100);

        return `
        <div class="page-transition max-w-2xl mx-auto px-8 py-12">
            <div class="mb-8">
                <div class="flex justify-between items-center mb-3">
                    <span class="font-semibold">Pregunta ${this.currentQuestionIdx + 1}/${quizData.verdaderoFalso.length}</span>
                    <span class="text-lg font-bold text-indigo-600">${this.score} pts</span>
                </div>
                <div class="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                    <div class="bg-indigo-600 h-2 rounded-full transition-all" style="width: ${progress}%"></div>
                </div>
            </div>

            <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-8">
                <!-- Statement Display -->
                <div class="bg-gradient-to-br from-indigo-100 to-indigo-50 dark:from-indigo-900/30 dark:to-indigo-800/20 rounded-xl p-10 mb-8 border-2 border-indigo-300 dark:border-indigo-600">
                    <p class="text-center text-2xl font-bold text-indigo-900 dark:text-indigo-100 leading-relaxed">${item.statement}</p>
                </div>

                <!-- True/False Buttons -->
                <div class="grid grid-cols-2 gap-4 mb-8">
                    <button onclick="Juegos.answerVerdaderoFalso(true)" class="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-6 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition transform hover:scale-105 shadow-lg">
                        <span class="material-symbols-outlined text-3xl">done</span>
                        VERDADERO
                    </button>
                    <button onclick="Juegos.answerVerdaderoFalso(false)" class="bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-6 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition transform hover:scale-105 shadow-lg">
                        <span class="material-symbols-outlined text-3xl">close</span>
                        FALSO
                    </button>
                </div>
            </div>

            <button onclick="Juegos.backToMenu()" class="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600 transition">
                <span class="material-symbols-outlined text-xl">arrow_back</span>
                Volver al Menú
            </button>
        </div>
        `;
    },

    renderRompecabezas() {
        const item = this.rompecabezasDeck[this.currentQuestionIdx];
        const progress = Math.round(((this.currentQuestionIdx + 1) / this.rompecabezasDeck.length) * 100);

        return `
        <div class="page-transition max-w-2xl mx-auto px-8 py-12">
            <div class="mb-8">
                <div class="flex justify-between items-center mb-3">
                    <span class="font-semibold">Rompecabezas ${this.currentQuestionIdx + 1}/${this.rompecabezasDeck.length}</span>
                    <span class="text-lg font-bold text-fuchsia-600">${this.score} pts</span>
                </div>
                <div class="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                    <div class="bg-fuchsia-600 h-2 rounded-full transition-all" style="width: ${progress}%"></div>
                </div>
            </div>

            <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-8 border border-fuchsia-200 dark:border-fuchsia-700">
                <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-4">${item.title}</h2>
                <p class="text-lg text-slate-600 dark:text-slate-400 mb-8">${item.question}</p>

                <div class="grid grid-cols-1 gap-4">
                    ${item.options.map((option, idx) => `
                        <button onclick="Juegos.answerRompecabezas(${idx})" 
                                class="w-full text-left bg-fuchsia-50 dark:bg-fuchsia-950/20 hover:bg-fuchsia-100 dark:hover:bg-fuchsia-900/40 px-4 py-4 rounded-2xl border border-fuchsia-200 dark:border-fuchsia-700 font-semibold text-slate-900 dark:text-white transition-all hover:shadow-lg">
                            ${option}
                        </button>
                    `).join('')}
                </div>

                <div class="mt-8 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <div class="flex flex-col gap-4">
                        <button onclick="Juegos.showHintRompecabezas()" class="w-full inline-flex items-center justify-center gap-2 rounded-full bg-fuchsia-600 hover:bg-fuchsia-700 text-slate-100 dark:text-white px-5 py-3 font-semibold transition-all ${this.hintsShown >= item.hints.length ? 'opacity-60 cursor-not-allowed pointer-events-none' : ''}">
                            <span class="material-symbols-outlined">lightbulb</span>
                            ${this.hintsShown >= item.hints.length ? 'No hay más pistas' : 'Mostrar pista'}
                        </button>
                        ${this.hintsShown > 0 ? `
                            <div class="rounded-xl p-4 bg-white dark:bg-slate-800 border border-fuchsia-200 dark:border-fuchsia-700 text-slate-700 dark:text-slate-200">
                                <p class="font-semibold mb-2">Pista ${this.hintsShown}/${item.hints.length}</p>
                                <p>${item.hints[this.hintsShown - 1]}</p>
                            </div>
                        ` : `
                            <p class="text-sm text-slate-600 dark:text-slate-400">Usa la pista si necesitas ayuda para completar la frase.</p>
                        `}
                    </div>
                </div>
            </div>

            <button onclick="Juegos.backToMenu()" class="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600 transition">
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
            case 'trivia':
                return this.renderTrivia();
            case 'quiensoy':
                return this.renderQuienSoy();
            case 'categorizacion':
                return this.renderCategorizacion();
            case 'palabrasclave':
                return this.renderPalabrasClaves();
            case 'rompecabezas':
                return this.renderRompecabezas();
            case 'memory':
                return this.renderMemory();
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
        this.currentQuestionIdx = 0;
        this.score = 0;
        this.correctAnswers = 0;
        let connections = [...quizData.conexionesConceptos[0].connections];
        // Shuffle using Fisher-Yates algorithm
        for (let i = connections.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [connections[i], connections[j]] = [connections[j], connections[i]];
        }
        this.matchingDataSet = connections;
        this.matchedPairs = {};
        this.refresh();
    },

    startMemory() {
        this.gameType = 'memory';
        this.score = 0;
        this.correctAnswers = 0;
        this.attempts = 0;
        this.matchesFound = 0;
        this.memoryLocked = false;
        this.selectedCards = [];
        this.revealedCards = new Set();

        const decks = quizData.memoryDecks || [];
        const selectedDeck = decks.length ? decks[Math.floor(Math.random() * decks.length)] : null;
        const pairsSource = selectedDeck ? selectedDeck.pairs : quizData.memoryPairs.map(pair => ({ term: pair.term, definition: pair.definition }));

        this.currentMemoryPairs = pairsSource;
        this.memoryDeckTitle = selectedDeck ? selectedDeck.title : 'Encuentra la Pareja';

        const pairs = pairsSource.map((pair, index) => ({
            pairId: index,
            type: 'term',
            label: pair.term,
            content: pair.term
        })).concat(pairsSource.map((pair, index) => ({
            pairId: index,
            type: 'definition',
            label: pair.definition,
            content: pair.definition
        })));

        this.memoryCards = this.shuffleArray(pairs);
        this.refresh();
    },

    flipMemoryCard(idx) {
        if (this.memoryLocked || this.revealedCards.has(idx) || this.selectedCards.includes(idx)) {
            return;
        }

        this.selectedCards.push(idx);
        this.refresh();

        if (this.selectedCards.length === 2) {
            this.checkMemoryPair();
        }
    },

    checkMemoryPair() {
        const [firstIdx, secondIdx] = this.selectedCards;
        const firstCard = this.memoryCards[firstIdx];
        const secondCard = this.memoryCards[secondIdx];

        this.attempts++;

        if (firstCard.pairId === secondCard.pairId && firstCard.type !== secondCard.type) {
            this.score += 20;
            this.correctAnswers++;
            this.matchesFound++;
            this.revealedCards.add(firstIdx);
            this.revealedCards.add(secondIdx);
            this.selectedCards = [];

            if (this.matchesFound === this.currentMemoryPairs.length) {
                this.showResultsMemory();
            } else {
                this.refresh();
            }
        } else {
            this.memoryLocked = true;
            setTimeout(() => {
                this.selectedCards = [];
                this.memoryLocked = false;
                this.refresh();
            }, 900);
        }
    },

    startTriviRapido() {
        this.gameType = 'trivia';
        this.currentQuestionIdx = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.refresh();
    },

    startQuienSoy() {
        this.gameType = 'quiensoy';
        this.currentQuestionIdx = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.refresh();
    },

    startCategorizacion() {
        this.gameType = 'categorizacion';
        this.currentQuestionIdx = 0;
        this.currentItemIdx = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.refresh();
    },

    startPalabrasClaves() {
        this.gameType = 'palabrasclave';
        this.currentQuestionIdx = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.refresh();
    },

    startRompecabezas() {
        this.gameType = 'rompecabezas';
        this.currentQuestionIdx = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.hintsShown = 0;
        this.rompecabezasDeck = this.shuffleArray(quizData.rompeacabezas.map(item => ({
            ...item,
            options: this.shuffleArray([...item.options]),
            hints: [...item.hints]
        })));
        this.refresh();
    },

    answerRompecabezas(idx) {
        const item = this.rompecabezasDeck[this.currentQuestionIdx];
        if (item.options[idx] === item.answer) {
            this.score += 15;
            this.correctAnswers++;
        }

        if (this.currentQuestionIdx < this.rompecabezasDeck.length - 1) {
            this.currentQuestionIdx++;
            this.hintsShown = 0;
            this.refresh();
        } else {
            this.showResultsRompecabezas();
        }
    },

    showHintRompecabezas() {
        const item = this.rompecabezasDeck[this.currentQuestionIdx];
        if (!item.hints || this.hintsShown >= item.hints.length) return;
        this.hintsShown++;
        this.refresh();
    },

    showResultsRompecabezas() {
        const total = this.rompecabezasDeck.length;
        const percentage = Math.round((this.correctAnswers / total) * 100);

        Storage.addGamePoints(this.score, 'rompecabezas');
        Storage.updateModuleProgress('juegos', Math.min(Storage.getProgress().juegos + 20, 100));

        const html = `
        <div class="page-transition max-w-2xl mx-auto px-8 py-12 text-center">
            <div class="bg-gradient-to-br from-fuchsia-100 to-fuchsia-50 dark:from-fuchsia-900/30 dark:to-fuchsia-800/20 rounded-2xl p-12 mb-8">
                <span class="material-symbols-outlined text-6xl text-fuchsia-600 mb-4 block">celebration</span>
                <h1 class="text-4xl font-bold mb-4 text-slate-900 dark:text-white">¡Rompecabezas Completado!</h1>
                <p class="text-3xl font-bold text-fuchsia-600 mb-2">${percentage}%</p>
                <p class="text-lg text-slate-600 dark:text-slate-400">${this.correctAnswers}/${total} respuestas correctas</p>
                <p class="text-2xl font-bold text-slate-900 dark:text-white mt-4">+${this.score} puntos</p>
            </div>

            <div class="space-y-4">
                <button onclick="Juegos.startRompecabezas()" class="w-full flex items-center justify-center gap-2 bg-fuchsia-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-fuchsia-700 transition-all hover:shadow-lg">
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

    answerVerdaderoFalso(userAnswer) {
        const item = quizData.verdaderoFalso[this.currentQuestionIdx];
        const isCorrect = userAnswer === item.answer;

        if (isCorrect) {
            this.score += 10;
            this.correctAnswers++;
        }

        if (this.currentQuestionIdx < quizData.verdaderoFalso.length - 1) {
            this.currentQuestionIdx++;
            this.refresh();
        } else {
            this.showResultsVerdaderoFalso();
        }
    },

    showResultsVerdaderoFalso() {
        const total = quizData.verdaderoFalso.length;
        const percentage = Math.round((this.correctAnswers / total) * 100);

        Storage.addGamePoints(this.score, 'verdaderofalso');
        Storage.updateModuleProgress('juegos', Math.min(Storage.getProgress().juegos + 25, 100));

        const html = `
        <div class="page-transition max-w-2xl mx-auto px-8 py-12 text-center">
            <div class="bg-gradient-to-br from-indigo-100 to-indigo-50 dark:from-indigo-900/30 dark:to-indigo-800/20 rounded-2xl p-12 mb-8">
                <span class="material-symbols-outlined text-6xl text-indigo-600 mb-4 block">celebration</span>
                <h1 class="text-4xl font-bold mb-4 text-slate-900 dark:text-white">¡Verdadero/Falso Completado!</h1>
                <p class="text-3xl font-bold text-indigo-600 mb-2">${percentage}%</p>
                <p class="text-lg text-slate-600 dark:text-slate-400">${this.correctAnswers}/${total} respuestas correctas</p>
                <p class="text-2xl font-bold text-slate-900 dark:text-white mt-4">+${this.score} puntos</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button onclick="Juegos.startPalabrasClaves()" class="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-semibold transition-all hover:shadow-lg">
                    <span class="material-symbols-outlined text-xl">replay</span>
                    Intentar de Nuevo
                </button>
                <button onclick="Juegos.gameType = 'menu'; Juegos.refresh()" class="w-full flex items-center justify-center gap-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white px-6 py-3 rounded-full font-semibold transition-all hover:shadow-lg">
                    <span class="material-symbols-outlined text-xl">arrow_back</span>
                    Volver al Menú
                </button>
            </div>
        </div>
        `;
        document.getElementById('app-container').innerHTML = html;
    },

    showResults() {
        const total = quizData.gameQuizzes.length;
        const percentage = Math.round((this.correctAnswers / total) * 100);

        Storage.addGamePoints(this.score, 'quiz');
        Storage.updateModuleProgress('juegos', Math.min(Storage.getProgress().juegos + 25, 100));

        const html = `
        <div class="page-transition max-w-2xl mx-auto px-8 py-12 text-center">
            <div class="bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20 rounded-2xl p-12 mb-8">
                <span class="material-symbols-outlined text-6xl text-purple-600 mb-4 block">celebration</span>
                <h1 class="text-4xl font-bold mb-4 text-slate-900 dark:text-white">¡Quiz Completado!</h1>
                <p class="text-3xl font-bold text-purple-600 mb-2">${percentage}%</p>
                <p class="text-lg text-slate-600 dark:text-slate-400">${this.correctAnswers}/${total} respuestas correctas</p>
                <p class="text-2xl font-bold text-slate-900 dark:text-white mt-4">+${this.score} puntos</p>
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

    dragStart(event, conceptName) {
        event.dataTransfer.effectAllowed = 'copy';
        event.dataTransfer.setData('text/plain', conceptName);
    },

    dropMatching(event, definition, conceptName) {
        event.preventDefault();
        const draggedConcept = event.dataTransfer.getData('text/plain');

        // Check if this author/concept is already placed elsewhere
        const alreadyPlaced = Object.values(this.matchedPairs).includes(draggedConcept);

        if (alreadyPlaced) {
            // Count how many times this author/concept appears in the original data
            const occurrences = this.matchingDataSet.filter(c => c.left === draggedConcept).length;

            // Only allow if there are multiple occurrences
            if (occurrences === 1) {
                // Don't allow placement
                return;
            }
        }

        // If we get here, allow the placement
        this.matchedPairs[definition] = draggedConcept;
        this.refresh();
    },

    showResultsMatching() {
        const connections = this.matchingDataSet || quizData.conexionesConceptos[0].connections;
        let correctCount = 0;
        const results = [];

        // Validar parejas
        connections.forEach(conn => {
            const droppedValue = this.matchedPairs[conn.right];
            const isCorrect = droppedValue === conn.left;
            if (isCorrect) correctCount++;
            results.push({ left: conn.left, right: conn.right, dropped: droppedValue, isCorrect });
        });

        this.correctAnswers = correctCount;
        this.score = correctCount * 20;
        const total = connections.length;
        const percentage = Math.round((correctCount / total) * 100);

        Storage.addGamePoints(this.score, 'matching');
        Storage.updateModuleProgress('juegos', Math.min(Storage.getProgress().juegos + 25, 100));

        const html = `
        <div class="page-transition max-w-4xl mx-auto px-8 py-12">
            <div class="text-center mb-12">
                <div class="bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 rounded-2xl p-12 mb-8">
                    <span class="material-symbols-outlined text-6xl text-green-600 mb-4 block">celebration</span>
                    <h1 class="text-4xl font-bold mb-4 text-slate-900 dark:text-white">¡Emparejamiento Completado!</h1>
                    <p class="text-3xl font-bold text-green-600 mb-2">${percentage}%</p>
                    <p class="text-lg text-slate-600 dark:text-slate-400">${correctCount}/${total} parejas correctas</p>
                    <p class="text-2xl font-bold text-slate-900 dark:text-white mt-4">+${this.score} puntos</p>
                </div>
            </div>

            <!-- Detailed Results -->
            <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-8">
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Detalles de Parejas</h2>
                <div class="space-y-4">
                    ${results.map(r => `
                        <div class="flex items-start gap-4 p-4 rounded-lg border-2 transition-all ${r.isCorrect
                ? 'bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-600'
                : 'bg-red-50 dark:bg-red-900/20 border-red-500 dark:border-red-600'
            }">
                            <div class="flex-1">
                                <div class="flex items-center gap-2 mb-2">
                                    <span class="font-semibold text-slate-900 dark:text-white">${r.left}</span>
                                    ${r.isCorrect
                ? '<span class="material-symbols-outlined text-green-600 text-lg">check_circle</span>'
                : '<span class="material-symbols-outlined text-red-600 text-lg">cancel</span>'}
                                </div>
                                <p class="text-sm text-slate-600 dark:text-slate-400">Correcto: <strong>${r.right}</strong></p>
                                ${!r.isCorrect ? `<p class="text-sm text-slate-600 dark:text-slate-400 mt-1">Tu respuesta: <strong>${r.dropped || 'Vacío'}</strong></p>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button onclick="Juegos.startMatching()" class="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-all hover:shadow-lg">
                    <span class="material-symbols-outlined text-xl">replay</span>
                    Intentar de Nuevo
                </button>
                <button onclick="Juegos.gameType = 'menu'; Juegos.refresh()" class="w-full flex items-center justify-center gap-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white px-6 py-3 rounded-full font-semibold transition-all hover:shadow-lg">
                    <span class="material-symbols-outlined text-xl">arrow_back</span>
                    Volver al Menú
                </button>
            </div>
        </div>
        `;
        document.getElementById('app-container').innerHTML = html;
    },

    backToMenu() {
        this.gameType = 'menu';
        this.refresh();
    },

    checkTrivia() {
        const input = document.getElementById('trivia-answer').value.toLowerCase().trim();
        const question = quizData.triviaRapido[this.currentQuestionIdx];
        const answer = question.answer.toLowerCase();

        if (input === answer || input.includes(answer) || answer.includes(input)) {
            this.score += 15;
            this.correctAnswers++;
        }

        this.currentQuestionIdx++;
        if (this.currentQuestionIdx >= quizData.triviaRapido.length) {
            this.showResultsTrivia();
        } else {
            this.refresh();
        }
    },

    answerQuienSoy(idx) {
        const question = quizData.quienSoy[this.currentQuestionIdx];
        if (question.options[idx] === question.answer) {
            this.score += 10;
            this.correctAnswers++;
        }

        this.currentQuestionIdx++;
        if (this.currentQuestionIdx >= quizData.quienSoy.length) {
            this.showResultsQuienSoy();
        } else {
            this.refresh();
        }
    },

    showResultsTrivia() {
        const total = quizData.triviaRapido.length;
        const percentage = Math.round((this.correctAnswers / total) * 100);

        Storage.addGamePoints(this.score, 'trivia');
        Storage.updateModuleProgress('juegos', Math.min(Storage.getProgress().juegos + 25, 100));

        const html = `
        <div class="page-transition max-w-2xl mx-auto px-8 py-12 text-center">
            <div class="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 rounded-2xl p-12 mb-8">
                <span class="material-symbols-outlined text-6xl text-blue-600 mb-4 block">celebration</span>
                <h1 class="text-4xl font-bold mb-4 text-slate-900 dark:text-white">¡Trivia Completada!</h1>
                <p class="text-3xl font-bold text-blue-600 mb-2">${percentage}%</p>
                <p class="text-lg text-slate-600 dark:text-slate-400">${this.correctAnswers}/${total} respuestas correctas</p>
                <p class="text-2xl font-bold text-slate-900 dark:text-white mt-4">+${this.score} puntos</p>
            </div>

            <div class="space-y-4">
                <button onclick="Juegos.startTriviRapido()" class="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all hover:shadow-lg">
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

    showResultsQuienSoy() {
        const total = quizData.quienSoy.length;
        const percentage = Math.round((this.correctAnswers / total) * 100);

        Storage.addGamePoints(this.score, 'quiensoy');
        Storage.updateModuleProgress('juegos', Math.min(Storage.getProgress().juegos + 25, 100));

        const html = `
        <div class="page-transition max-w-2xl mx-auto px-8 py-12 text-center">
            <div class="bg-gradient-to-br from-pink-100 to-pink-50 dark:from-pink-900/30 dark:to-pink-800/20 rounded-2xl p-12 mb-8">
                <span class="material-symbols-outlined text-6xl text-pink-600 mb-4 block">celebration</span>
                <h1 class="text-4xl font-bold mb-4 text-slate-900 dark:text-white">¡Adivinaste!</h1>
                <p class="text-3xl font-bold text-pink-600 mb-2">${percentage}%</p>
                <p class="text-lg text-slate-600 dark:text-slate-400">${this.correctAnswers}/${total} adivinanzas correctas</p>
                <p class="text-2xl font-bold text-slate-900 dark:text-white mt-4">+${this.score} puntos</p>
            </div>

            <div class="space-y-4">
                <button onclick="Juegos.startQuienSoy()" class="w-full flex items-center justify-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-700 transition-all hover:shadow-lg">
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

    refresh() {
        document.getElementById('app-container').innerHTML = this.render();
    },

    nextQuestion() {
        if (this.gameType === 'categorizacion') {
            if (this.currentQuestionIdx < quizData.categorizacion.length - 1) {
                this.currentQuestionIdx++;
                this.score += 10;
                this.refresh();
            } else {
                this.showResults();
            }
        }
    },

    checkPalabra() {
        const input = document.getElementById('palabra-answer');
        const palabra = quizData.palabrasClaves[this.currentQuestionIdx];
        const respuesta = input.value.toLowerCase().trim();

        if (respuesta === palabra.answer.toLowerCase()) {
            this.score += 10;
            this.correctAnswers++;
            input.classList.add('border-green-500', 'bg-green-50');
            input.classList.remove('focus:ring-indigo-600');
            setTimeout(() => {
                if (this.currentQuestionIdx < quizData.palabrasClaves.length - 1) {
                    this.currentQuestionIdx++;
                    this.hintsShown = 1;
                    this.refresh();
                } else {
                    this.showResults();
                }
            }, 1000);
        } else {
            input.classList.add('border-red-500', 'bg-red-50');
            input.classList.remove('focus:ring-indigo-600');
            setTimeout(() => {
                input.classList.remove('border-red-500', 'bg-red-50');
                input.value = '';
            }, 1000);
        }
    },

    showNextHint() {
        if (this.hintsShown < 3) {
            this.hintsShown++;
            this.refresh();
        }
    }
};
