// Storage Module - Handles LocalStorage
const Storage = {
    // Progress keys
    PROGRESS_KEY: 'plurality_progress',
    DARK_MODE_KEY: 'plurality_dark_mode',
    GAME_SCORE_KEY: 'plurality_game_score',
    QUIZ_RESULTS_KEY: 'plurality_quiz_results',
    USER_NAME_KEY: 'plurality_user_name',

    // Initialize storage
    init() {
        if (!localStorage.getItem(this.PROGRESS_KEY)) {
            this.saveProgress({
                educativo: 0,
                juegos: 0,
                simulador: 0,
                evaluacion: 0,
                totalPoints: 0
            });
        }
        // Asegurar que dark mode está desactivado por defecto
        if (localStorage.getItem(this.DARK_MODE_KEY) === null) {
            this.saveDarkMode(false);
        }
    },

    // Progress Management
    saveProgress(progress) {
        localStorage.setItem(this.PROGRESS_KEY, JSON.stringify(progress));
    },

    getProgress() {
        const progress = localStorage.getItem(this.PROGRESS_KEY);
        return progress ? JSON.parse(progress) : {};
    },

    updateModuleProgress(module, percentage) {
        const progress = this.getProgress();
        progress[module] = Math.min(percentage, 100);
        this.saveProgress(progress);
    },

    getTotalProgress() {
        const progress = this.getProgress();
        const modules = ['educativo', 'juegos', 'simulador', 'evaluacion'];
        const total = modules.reduce((sum, m) => sum + (progress[m] || 0), 0);
        return Math.round(total / modules.length);
    },

    // Game Score Management
    saveGameScore(score) {
        localStorage.setItem(this.GAME_SCORE_KEY, JSON.stringify(score));
    },

    getGameScore() {
        const score = localStorage.getItem(this.GAME_SCORE_KEY);
        return score ? JSON.parse(score) : { points: 0, level: 1 };
    },

    addGamePoints(points) {
        const score = this.getGameScore();
        score.points += points;
        score.level = Math.floor(score.points / 50) + 1;
        this.saveGameScore(score);
        return score;
    },

    // Quiz Results
    saveQuizResult(module, result) {
        const results = this.getQuizResults();
        if (!results[module]) {
            results[module] = [];
        }
        results[module].push({
            ...result,
            date: new Date().toISOString()
        });
        localStorage.setItem(this.QUIZ_RESULTS_KEY, JSON.stringify(results));
    },

    getQuizResults() {
        const results = localStorage.getItem(this.QUIZ_RESULTS_KEY);
        return results ? JSON.parse(results) : {};
    },

    // Dark Mode
    saveDarkMode(isDark) {
        localStorage.setItem(this.DARK_MODE_KEY, JSON.stringify(isDark));
        this.applyDarkMode(isDark);
    },

    getDarkMode() {
        const mode = localStorage.getItem(this.DARK_MODE_KEY);
        return mode !== null ? JSON.parse(mode) : false;
    },

    applyDarkMode(isDark) {
        const html = document.documentElement;
        if (isDark) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    },

    // User Name
    saveUserName(name) {
        localStorage.setItem(this.USER_NAME_KEY, name);
    },

    getUserName() {
        return localStorage.getItem(this.USER_NAME_KEY) || 'Estudiante';
    },

    // Clear All Data
    resetAll() {
        localStorage.removeItem(this.PROGRESS_KEY);
        localStorage.removeItem(this.GAME_SCORE_KEY);
        localStorage.removeItem(this.QUIZ_RESULTS_KEY);
        this.init();
    }
};

// Initialize on load
Storage.init();
Storage.applyDarkMode(Storage.getDarkMode());
