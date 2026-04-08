// Puntos Module - Displays game points and achievements
const Puntos = {
    render() {
        const progress = Storage.getProgress();
        const gameScore = Storage.getGameScore();
        const gamePoints = progress.gamePoints || {};
        const totalPoints = progress.totalPoints || 0;

        // Calculate totals
        const gamePointsTotal = Object.values(gamePoints).reduce((a, b) => a + b, 0);

        // Game types with display info
        const games = [
            { key: 'quiz', name: '📝 Quiz Rápido', icon: 'quiz', color: 'purple' },
            { key: 'trivia', name: '⚡ Trivia Rápido', icon: 'bolt', color: 'blue' },
            { key: 'quiensoy', name: '❓ ¿Quién Soy?', icon: 'help', color: 'pink' },
            { key: 'matching', name: '🔗 Emparejamiento', icon: 'link', color: 'green' },
            { key: 'categorizacion', name: '📂 Categorización', icon: 'category', color: 'amber' },
            { key: 'verdaderofalso', name: '✓ Verdadero/Falso', icon: 'done_all', color: 'indigo' }
        ];

        // Module progress
        const modules = [
            { key: 'educativo', name: '📚 Aprende', icon: 'school' },
            { key: 'juegos', name: '🎮 Juega', icon: 'games' },
            { key: 'simulador', name: '🤝 Empatiza', icon: 'diversity_3' },
            { key: 'evaluacion', name: '📊 Evalúate', icon: 'assessment' }
        ];

        return `
        <div class="max-w-7xl mx-auto px-8 py-12">
            <!-- Header -->
            <div class="mb-12">
                <h1 class="text-5xl font-black text-slate-900 dark:text-white mb-3">Mis Puntos 🏆</h1>
                <p class="text-lg text-slate-600 dark:text-slate-400">Ve tu progreso y logros en la app</p>
            </div>

            <!-- Total Score Card -->
            <div class="bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-yellow-600 dark:to-orange-600 rounded-3xl p-12 mb-12 shadow-2xl">
                <div class="grid md:grid-cols-3 gap-8 text-center">
                    <div>
                        <p class="text-yellow-100 text-sm font-semibold mb-2">PUNTOS TOTALES</p>
                        <p class="text-5xl font-black text-white">${totalPoints}</p>
                    </div>
                    <div>
                        <p class="text-yellow-100 text-sm font-semibold mb-2">NIVEL</p>
                        <p class="text-5xl font-black text-white">${gameScore.level}</p>
                    </div>
                    <div>
                        <p class="text-yellow-100 text-sm font-semibold mb-2">PRÓXIMO NIVEL EN</p>
                        <p class="text-3xl font-black text-white">${50 - (gameScore.points % 50)} pts</p>
                    </div>
                </div>
            </div>

            <!-- Game Points -->
            <div class="mb-12">
                <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                    <span class="material-symbols-outlined text-4xl">videogame_asset</span>
                    Puntos por Juego
                </h2>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${games.map(game => {
            const points = gamePoints[game.key] || 0;
            const colorClasses = {
                purple: 'from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20 border-purple-300 dark:border-purple-600',
                blue: 'from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 border-blue-300 dark:border-blue-600',
                pink: 'from-pink-100 to-pink-50 dark:from-pink-900/30 dark:to-pink-800/20 border-pink-300 dark:border-pink-600',
                green: 'from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 border-green-300 dark:border-green-600',
                amber: 'from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/20 border-amber-300 dark:border-amber-600',
                indigo: 'from-indigo-100 to-indigo-50 dark:from-indigo-900/30 dark:to-indigo-800/20 border-indigo-300 dark:border-indigo-600'
            };
            return `
                            <div class="bg-gradient-to-br ${colorClasses[game.color]} border-2 rounded-2xl p-6">
                                <div class="flex items-center justify-between mb-4">
                                    <h3 class="text-lg font-bold text-slate-900 dark:text-white">${game.name}</h3>
                                    <span class="material-symbols-outlined text-2xl">${game.icon}</span>
                                </div>
                                <div class="flex items-end justify-between">
                                    <div>
                                        <p class="text-sm text-slate-600 dark:text-slate-400 mb-1">Puntos</p>
                                        <p class="text-4xl font-black text-slate-900 dark:text-white">${points}</p>
                                    </div>
                                    ${points > 0 ? `
                                        <div class="text-right">
                                            <p class="text-xs text-green-600 dark:text-green-400 font-bold">✓ Completado</p>
                                        </div>
                                    ` : `
                                        <div class="text-right">
                                            <p class="text-xs text-slate-500 dark:text-slate-400">Sin intentar</p>
                                        </div>
                                    `}
                                </div>
                            </div>
                        `;
        }).join('')}
                </div>
            </div>

            <!-- Module Progress -->
            <div class="mb-12">
                <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                    <span class="material-symbols-outlined text-4xl">trending_up</span>
                    Progreso por Módulo
                </h2>
                <div class="grid md:grid-cols-2 gap-8">
                    ${modules.map(mod => {
            const prog = progress[mod.key] || 0;
            const progressColor = prog === 100 ? 'bg-green-500' : prog > 50 ? 'bg-blue-500' : prog > 0 ? 'bg-yellow-500' : 'bg-slate-300';
            return `
                            <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
                                <div class="flex items-center justify-between mb-4">
                                    <h3 class="text-xl font-bold text-slate-900 dark:text-white">${mod.name}</h3>
                                    <span class="text-3xl">${prog === 100 ? '✓' : '◌'}</span>
                                </div>
                                <div class="mb-3">
                                    <div class="flex justify-between items-center mb-2">
                                        <span class="text-sm font-semibold text-slate-600 dark:text-slate-400">Progreso</span>
                                        <span class="text-lg font-bold text-slate-900 dark:text-white">${prog}%</span>
                                    </div>
                                    <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                                        <div class="${progressColor} h-full rounded-full transition-all" style="width: ${prog}%"></div>
                                    </div>
                                </div>
                                <p class="text-xs text-slate-600 dark:text-slate-400">${prog === 100 ? '¡Módulo completado!' :
                    prog > 0 ? `${prog}% completado` :
                        'Aún no iniciado'
                }</p>
                            </div>
                        `;
        }).join('')}
                </div>
            </div>

            <!-- Stats Summary -->
            <div class="bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 mb-12">
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Resumen General</h2>
                <div class="grid md:grid-cols-4 gap-6">
                    <div class="text-center">
                        <p class="text-slate-600 dark:text-slate-400 text-sm font-semibold mb-2">Juegos Jugados</p>
                        <p class="text-4xl font-black text-slate-900 dark:text-white">
                            ${games.filter(g => (gamePoints[g.key] || 0) > 0).length}
                        </p>
                    </div>
                    <div class="text-center">
                        <p class="text-slate-600 dark:text-slate-400 text-sm font-semibold mb-2">Puntos Ganados</p>
                        <p class="text-4xl font-black text-slate-900 dark:text-white">${totalPoints}</p>
                    </div>
                    <div class="text-center">
                        <p class="text-slate-600 dark:text-slate-400 text-sm font-semibold mb-2">Progreso Promedio</p>
                        <p class="text-4xl font-black text-slate-900 dark:text-white">
                            ${Math.round(modules.reduce((sum, m) => sum + (progress[m.key] || 0), 0) / modules.length)}%
                        </p>
                    </div>
                    <div class="text-center">
                        <p class="text-slate-600 dark:text-slate-400 text-sm font-semibold mb-2">Nivel Actual</p>
                        <p class="text-4xl font-black text-slate-900 dark:text-white">${gameScore.level}</p>
                    </div>
                </div>
            </div>

            <!-- Back Button -->
            <button onclick="app.navigateTo('dashboard')" class="flex items-center gap-2 px-8 py-4 rounded-full font-semibold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600 transition-all hover:shadow-lg">
                <span class="material-symbols-outlined text-xl">arrow_back</span>
                Volver al Dashboard
            </button>
        </div>
        `;
    }
};
