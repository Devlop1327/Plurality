// Dashboard Module
const Dashboard = {
    render() {
        const progress = Storage.getProgress();
        const totalProgress = Storage.getTotalProgress();
        const gameScore = Storage.getGameScore();
        const userName = Storage.getUserName();

        return `
        <div class="page-transition">
            <!-- Hero Section -->
            <section class="bg-gradient-to-br from-primary-container to-secondary-container py-20 px-8">
                <div class="max-w-7xl mx-auto text-center text-white">
                    <h1 class="text-5xl font-headline font-bold mb-4">¡Bienvenido, ${userName}!</h1>
                    <p class="text-xl opacity-90">Descubre, aprende y celebra la diversidad y la inclusión</p>
                </div>
            </section>

            <!-- Progress Overview -->
            <section class="max-w-7xl mx-auto px-8 py-16">
                <h2 class="text-3xl font-headline font-bold mb-8">Tu Progreso General</h2>
                
                <!-- Overall Progress -->
                <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-8 border border-slate-200 dark:border-slate-700">
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-lg font-semibold">Avance Total</span>
                        <span class="text-2xl font-bold text-primary">${totalProgress}%</span>
                    </div>
                    <div class="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-4 overflow-hidden">
                        <div class="progress-bar" style="width: ${totalProgress}%"></div>
                    </div>
                </div>

                <!-- Module Cards -->
                <div class="grid md:grid-cols-2 gap-6 mb-12">
                    <!-- Aprende -->
                    <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all cursor-pointer" onclick="app.navigateTo('educativo')">
                        <div class="flex items-start justify-between mb-4">
                            <h3 class="text-2xl font-headline font-bold">Aprende</h3>
                            <span class="material-symbols-outlined text-4xl text-primary">school</span>
                        </div>
                        <p class="text-slate-600 dark:text-slate-400 mb-4">Explora temas sobre género, identidad, orientación sexual y diversidad</p>
                        <div class="flex justify-between items-center">
                            <span class="text-sm font-semibold">${progress.educativo || 0}%</span>
                            <div class="w-32 bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                                <div class="progress-bar" style="width: ${progress.educativo || 0}%"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Juega -->
                    <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all cursor-pointer" onclick="app.navigateTo('juegos')">
                        <div class="flex items-start justify-between mb-4">
                            <h3 class="text-2xl font-headline font-bold">Juega</h3>
                            <span class="material-symbols-outlined text-4xl text-secondary-container">gamepad</span>
                        </div>
                        <p class="text-slate-600 dark:text-slate-400 mb-4">Participa en quizzes rápidos y juegos interactivos</p>
                        <div class="flex justify-between items-center">
                            <span class="text-sm font-semibold">${progress.juegos || 0}%</span>
                            <span class="text-lg font-bold text-secondary">${gameScore.points} pts</span>
                        </div>
                    </div>

                    <!-- Empatiza -->
                    <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all cursor-pointer" onclick="app.navigateTo('simulador')">
                        <div class="flex items-start justify-between mb-4">
                            <h3 class="text-2xl font-headline font-bold">Empatiza</h3>
                            <span class="material-symbols-outlined text-4xl text-tertiary">favorite</span>
                        </div>
                        <p class="text-slate-600 dark:text-slate-400 mb-4">Simula escenarios y toma decisiones empáticas</p>
                        <div class="flex justify-between items-center">
                            <span class="text-sm font-semibold">${progress.simulador || 0}%</span>
                            <div class="w-32 bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                                <div class="progress-bar" style="width: ${progress.simulador || 0}%"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Evalúate -->
                    <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all cursor-pointer" onclick="app.navigateTo('evaluacion')">
                        <div class="flex items-start justify-between mb-4">
                            <h3 class="text-2xl font-headline font-bold">Evalúate</h3>
                            <span class="material-symbols-outlined text-4xl text-primary">quiz</span>
                        </div>
                        <p class="text-slate-600 dark:text-slate-400 mb-4">Completa la evaluación final y visualiza tus logros</p>
                        <div class="flex justify-between items-center">
                            <span class="text-sm font-semibold">${progress.evaluacion || 0}%</span>
                            <div class="w-32 bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                                <div class="progress-bar" style="width: ${progress.evaluacion || 0}%"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-4 justify-center">
                    <button onclick="app.navigateTo('educativo')" class="flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 hover:shadow-lg hover:scale-105 transition-all">
                        <span class="material-symbols-outlined text-xl">school</span>
                        Comenzar a Aprender
                    </button>
                    <button onclick="Storage.resetAll(); location.reload()" class="flex items-center gap-2 bg-red-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-600 transition-all">
                        <span class="material-symbols-outlined text-xl">refresh</span>
                        Reiniciar Progreso
                    </button>
                </div>
            </section>
        </div>
        `;
    }
};
