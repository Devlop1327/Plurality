// Interactive Components - Trivia y Muro de Compromisos
const InteractiveComponents = {
    // ========== TRIVIA ==========
    trivia: {
        currentQuestion: 0,
        answered: false,
        questions: [
            {
                question: "¿Dónde se encuentran realmente las barreras para el aprendizaje?",
                options: [
                    "Exclusivamente en las limitaciones físicas o cognitivas del estudiante.",
                    "En el sistema educativo, los currículos rígidos y el entorno social.",
                    "Únicamente en la falta de recursos económicos de las familias."
                ],
                correct: 1
            },
            {
                question: "¿Qué significa educar en la diversidad?",
                options: [
                    "Enseñar a todos exactamente lo mismo y con el mismo método.",
                    "Crear salones especiales y separados para quienes tienen dificultades.",
                    "Construir ambientes flexibles adaptando las estrategias a las necesidades de cada estudiante."
                ],
                correct: 2
            },
            {
                question: "Según los criterios de inclusión, ¿qué es la \"Equidad\"?",
                options: [
                    "Dar a todos exactamente lo mismo.",
                    "Dar a cada estudiante los apoyos específicos que requiere para alcanzar sus metas.",
                    "Evaluar a todos con el mismo examen estandarizado."
                ],
                correct: 1
            }
        ],

        render() {
            const current = this.questions[this.currentQuestion];
            let html = `
            <div class="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 mb-8">
                <div class="mb-6">
                    <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Trivia Rápida: Inclusión</h3>
                    <div class="flex gap-2 mb-4">
                        ${this.questions.map((_, idx) => `
                            <div class="h-2 flex-1 rounded-full ${idx <= this.currentQuestion ? 'bg-purple-600' : 'bg-slate-300 dark:bg-slate-600'}"></div>
                        `).join('')}
                    </div>
                    <p class="text-sm text-slate-600 dark:text-slate-400">Pregunta ${this.currentQuestion + 1} de ${this.questions.length}</p>
                </div>

                <h4 class="text-xl font-semibold text-slate-900 dark:text-white mb-6">${current.question}</h4>

                <div class="space-y-3 mb-6">
                    ${current.options.map((option, idx) => `
                        <button class="w-full p-4 text-left rounded-lg border-2 transition-all font-medium
                            ${!this.answered ? 'border-slate-300 dark:border-slate-600 hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 cursor-pointer' : ''}
                            ${this.answered && idx === current.correct ? 'border-green-600 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' : ''}
                            ${this.answered && idx !== current.correct && idx === InteractiveComponents.trivia.selectedAnswer ? 'border-red-600 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300' : ''}
                            ${this.answered && idx !== current.correct && idx !== InteractiveComponents.trivia.selectedAnswer ? 'border-slate-300 dark:border-slate-600 opacity-50' : ''}
                            text-slate-900 dark:text-white"
                            onclick="InteractiveComponents.trivia.selectAnswer(${idx})"
                            ${this.answered ? 'disabled' : ''}>
                            ${option}
                            ${this.answered && idx === current.correct ? '<span class="material-symbols-outlined inline-block ml-2">check_circle</span>' : ''}
                            ${this.answered && idx === InteractiveComponents.trivia.selectedAnswer && idx !== current.correct ? '<span class="material-symbols-outlined inline-block ml-2">cancel</span>' : ''}
                        </button>
                    `).join('')}
                </div>

                ${this.answered ? `
                    <div class="p-4 rounded-lg mb-6 ${InteractiveComponents.trivia.selectedAnswer === current.correct ? 'bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600' : 'bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600'}">
                        <p class="font-semibold ${InteractiveComponents.trivia.selectedAnswer === current.correct ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}">
                            ${InteractiveComponents.trivia.selectedAnswer === current.correct ? '¡Correcto! 🎉' : 'Respuesta incorrecta 😢'}
                        </p>
                    </div>
                    
                    ${this.currentQuestion < this.questions.length - 1 ? `
                        <button onclick="InteractiveComponents.trivia.nextQuestion()" 
                            class="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition">
                            Siguiente Pregunta →
                        </button>
                    ` : `
                        <button onclick="InteractiveComponents.trivia.reset()" 
                            class="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">
                            Reintentar Trivia
                        </button>
                    `}
                ` : ''}
            </div>
            `;
            return html;
        },

        selectAnswer(index) {
            if (!this.answered) {
                this.selectedAnswer = index;
                this.answered = true;
                app.render();
            }
        },

        nextQuestion() {
            if (this.currentQuestion < this.questions.length - 1) {
                this.currentQuestion++;
                this.answered = false;
                this.selectedAnswer = null;
                app.render();
                setTimeout(() => {
                    document.querySelector('.trivia-container')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        },

        reset() {
            this.currentQuestion = 0;
            this.answered = false;
            this.selectedAnswer = null;
            app.render();
        }
    },

    // ========== MURO DE COMPROMISOS ==========
    muro: {
        STORAGE_KEY: 'plurality-compromisos',
        compromisosList: null,
        loading: false,

        render() {
            if (this.compromisosList === null && !this.loading) {
                this.loadCompromisosOnline();
                return `
                <div class="max-w-7xl mx-auto px-8 py-12 text-center">
                    <div class="flex flex-col items-center justify-center py-12">
                        <span class="material-symbols-outlined text-5xl text-purple-600 animate-spin">sync</span>
                        <p class="text-slate-600 dark:text-slate-400 mt-4 font-semibold">Cargando compromisos del muro...</p>
                    </div>
                </div>
                `;
            }

            const compromisos = this.compromisosList || [];
            
            let html = `
            <div class="max-w-7xl mx-auto px-8 py-12">
                <h2 class="text-3xl font-bold text-[#7E57C2] dark:text-[#b39ddb] mb-2">Muro de Compromisos por la Inclusión</h2>
                <p class="text-slate-600 dark:text-slate-400 mb-8">Comparte tu compromiso personal con la inclusión y la diversidad</p>

                <!-- Formulario -->
                <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-8">
                    <form onsubmit="InteractiveComponents.muro.submitCompromiso(event)" class="space-y-4">
                        <div>
                            <label for="nombre" class="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Tu Nombre</label>
                            <input type="text" id="nombre" placeholder="Escribe tu nombre" required
                                class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600">
                        </div>
                        <div>
                            <label for="compromiso" class="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Mi Compromiso</label>
                            <textarea id="compromiso" placeholder="Escribe tu compromiso con la inclusión..." required rows="3"
                                class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"></textarea>
                        </div>
                        <button type="submit" class="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition flex items-center justify-center gap-2">
                            <span class="material-symbols-outlined">check</span>
                            Publicar Compromiso
                        </button>
                    </form>
                </div>

                <!-- Grid de Compromisos -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${compromisos.length > 0 ? compromisos.map((comp, idx) => `
                        <div class="bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-xl p-6 shadow-md hover:shadow-lg transition transform hover:scale-105 sticky-note">
                            <div class="flex justify-between items-start mb-3">
                                <h4 class="font-bold text-slate-900 dark:text-white text-lg">${this.escapeHtml(comp.nombre)}</h4>
                                <button onclick="InteractiveComponents.muro.deleteCompromiso(${idx})" 
                                    class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition"
                                    title="Eliminar">
                                    <span class="material-symbols-outlined text-lg">close</span>
                                </button>
                            </div>
                            <p class="text-slate-800 dark:text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">${this.escapeHtml(comp.compromiso)}</p>
                            <p class="text-xs text-slate-600 dark:text-slate-400 mt-3 pt-3 border-t border-yellow-300 dark:border-yellow-800/50">${comp.fecha}</p>
                        </div>
                    `).join('') : `
                        <div class="col-span-full text-center py-12">
                            <p class="text-slate-600 dark:text-slate-400">Aún no hay compromisos. ¡Sé el primero en compartir el tuyo!</p>
                        </div>
                    `}
                </div>
            </div>
            `;
            return html;
        },

        async loadCompromisosOnline() {
            this.loading = true;
            try {
                const res = await fetch('/api/compromisos');
                if (res.ok) {
                    const result = await res.json();
                    this.compromisosList = result.data || [];
                } else {
                    console.error('Failed to load commitments online, falling back to local storage.');
                    this.compromisosList = this.loadCompromisosFallback();
                }
            } catch (err) {
                console.error('Network error loading commitments, falling back to local storage.', err);
                this.compromisosList = this.loadCompromisosFallback();
            } finally {
                this.loading = false;
                app.render();
            }
        },

        loadCompromisosFallback() {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        },

        async submitCompromiso(event) {
            event.preventDefault();
            
            const nombre = document.getElementById('nombre').value.trim();
            const compromiso = document.getElementById('compromiso').value.trim();

            if (!nombre || !compromiso) return;

            const ahora = new Date();
            const fecha = ahora.toLocaleDateString('es-ES', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
            });

            const newItem = { nombre, compromiso, fecha };

            // Optimistic update
            if (this.compromisosList === null) this.compromisosList = [];
            this.compromisosList.unshift(newItem);
            app.render();

            try {
                const res = await fetch('/api/compromisos', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newItem)
                });
                if (!res.ok) {
                    throw new Error('Failed to save online');
                }
            } catch (err) {
                console.error('Error saving online, saving to local storage instead:', err);
                const fallbackList = this.loadCompromisosFallback();
                fallbackList.unshift(newItem);
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(fallbackList));
            } finally {
                const nameInput = document.getElementById('nombre');
                const compInput = document.getElementById('compromiso');
                if (nameInput) nameInput.value = '';
                if (compInput) compInput.value = '';
                this.loadCompromisosOnline();
            }
        },

        async deleteCompromiso(index) {
            if (!confirm('¿Estás seguro de que deseas eliminar este compromiso?')) return;

            if (this.compromisosList) {
                this.compromisosList.splice(index, 1);
                app.render();
            }

            try {
                const res = await fetch(`/api/compromisos?index=${index}`, {
                    method: 'DELETE'
                });
                if (!res.ok) {
                    throw new Error('Failed to delete online');
                }
            } catch (err) {
                console.error('Error deleting online, deleting from local storage:', err);
                const fallbackList = this.loadCompromisosFallback();
                fallbackList.splice(index, 1);
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(fallbackList));
            } finally {
                this.loadCompromisosOnline();
            }
        },

        escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
    }
};
