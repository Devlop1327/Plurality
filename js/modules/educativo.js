// Educational Module
const Educativo = {
    currentSection: 0,
    sections: [
        {
            title: "Género vs Sexo",
            content: `
                <div class="space-y-6">
                    <h2 class="text-3xl font-headline font-bold">¿Cuál es la diferencia?</h2>
                    
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="bg-primary/10 dark:bg-primary/20 rounded-xl p-6 border-l-4 border-primary">
                            <h3 class="text-xl font-headline font-bold mb-3">Sexo</h3>
                            <ul class="space-y-2 text-sm">
                                <li>✓ Características biológicas</li>
                                <li>✓ Cromosomas (XX, XY)</li>
                                <li>✓ Órganos reproductivos</li>
                                <li>✓ Asignado al nacer</li>
                            </ul>
                        </div>
                        
                        <div class="bg-secondary/10 dark:bg-secondary/20 rounded-xl p-6 border-l-4 border-secondary">
                            <h3 class="text-xl font-headline font-bold mb-3">Género</h3>
                            <ul class="space-y-2 text-sm">
                                <li>✓ Identidad personal interna</li>
                                <li>✓ Cómo te sientes y identificas</li>
                                <li>✓ Expresión personal</li>
                                <li>✓ Puede coincidir o no con el sexo</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="bg-white dark:bg-slate-800 rounded-xl p-6">
                        <p class="text-lg"><strong>Recuerda:</strong> El sexo es biológico, el género es una experiencia personal y social. Una persona puede haber sido asignada un sexo al nacer pero identificarse con un género diferente.</p>
                    </div>
                </div>
            `
        },
        {
            title: "Identidad de Género",
            content: `
                <div class="space-y-6">
                    <h2 class="text-3xl font-headline font-bold">Entendiendo la Identidad de Género</h2>
                    
                    <p class="text-lg">La identidad de género es cómo te identificas internamente, independientemente de tu sexo asignado al nacer.</p>
                    
                    <div class="space-y-4">
                        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                            <h3 class="font-bold mb-2">Cisgénero</h3>
                            <p class="text-slate-600 dark:text-slate-400">Persona cuya identidad de género coincide con el sexo asignado al nacer.</p>
                        </div>
                        
                        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                            <h3 class="font-bold mb-2">Transgénero</h3>
                            <p class="text-slate-600 dark:text-slate-400">Persona cuya identidad de género difiere del sexo asignado al nacer.</p>
                        </div>
                        
                        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                            <h3 class="font-bold mb-2">No Binario</h3>
                            <p class="text-slate-600 dark:text-slate-400">Persona cuya identidad de género no se ajusta exclusivamente a hombre o mujer.</p>
                        </div>
                        
                        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                            <h3 class="font-bold mb-2">Genderfluid</h3>
                            <p class="text-slate-600 dark:text-slate-400">Persona cuya identidad de género fluctúa entre diferentes géneros.</p>
                        </div>
                    </div>
                </div>
            `
        },
        {
            title: "Orientación Sexual",
            content: `
                <div class="space-y-6">
                    <h2 class="text-3xl font-headline font-bold">El Espectro de la Atracción</h2>
                    
                    <p class="text-lg">La orientación sexual se refiere a la atracción romántica o sexual hacia otras personas.</p>
                    
                    <div class="bg-gradient-to-r from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30 rounded-xl p-8 mb-6">
                        <p class="text-center text-sm font-semibold mb-4">Un Continuo, No Dos Extremos</p>
                        <div class="flex justify-between text-xs font-semibold">
                            <span>100% Heterosexual</span>
                            <span>Espectro</span>
                            <span>100% Homosexual</span>
                        </div>
                    </div>
                    
                    <div class="grid space-y-4">
                        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                            <h3 class="font-bold mb-2">Heterosexual</h3>
                            <p class="text-slate-600 dark:text-slate-400">Atracción hacia personas de un género diferente al propio.</p>
                        </div>
                        
                        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                            <h3 class="font-bold mb-2">Homosexual</h3>
                            <p class="text-slate-600 dark:text-slate-400">Atracción hacia personas del mismo género.</p>
                        </div>
                        
                        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                            <h3 class="font-bold mb-2">Bisexual</h3>
                            <p class="text-slate-600 dark:text-slate-400">Atracción hacia múltiples géneros.</p>
                        </div>
                        
                        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                            <h3 class="font-bold mb-2">Asexual</h3>
                            <p class="text-slate-600 dark:text-slate-400">Poca o ninguna atracción sexual, pero puede haber atracción romántica.</p>
                        </div>
                    </div>
                </div>
            `
        },
        {
            title: "Diversidad e Inclusión",
            content: `
                <div class="space-y-6">
                    <h2 class="text-3xl font-headline font-bold">Creando Espacios Inclusivos</h2>
                    
                    <p class="text-lg">La diversidad es la realidad de que existen muchas identidades y orientaciones. La inclusión es el acto de valorarlas todas.</p>
                    
                    <div class="bg-primary/10 rounded-xl p-6 mb-6 border-l-4 border-primary">
                        <h3 class="font-bold mb-3">Mejores Prácticas para la Inclusión</h3>
                        <ul class="space-y-2">
                            <li>✓ Preguntar sobre pronombres preferidos</li>
                            <li>✓ Usar lenguaje inclusivo y no asumir</li>
                            <li>✓ Escuchar sin juzgar</li>
                            <li>✓ Cometer errores y aprender de ellos</li>
                            <li>✓ Ser aliado activo de la comunidad LGBTQ+</li>
                            <li>✓ Educar a otros con respeto</li>
                        </ul>
                    </div>
                    
                    <div class="bg-secondary/10 rounded-xl p-6 border-l-4 border-secondary">
                        <h3 class="font-bold mb-3">Glosario de Términos</h3>
                        <ul class="space-y-2 text-sm">
                            <li><strong>LGBTQ+:</strong> Lesbian, Gay, Bisexual, Transgender, Queer y otros</li>
                            <li><strong>Aliado:</strong> Persona que apoya activamente a la comunidad LGBTQ+</li>
                            <li><strong>Deadnaming:</strong> Llamar a alguien por su nombre anterior de forma irrespetuosa</li>
                            <li><strong>Pronouns:</strong> Palabras como él, ella, ellos/ellas que una persona elige</li>
                        </ul>
                    </div>
                </div>
            `
        }
    ],

    render() {
        const section = this.sections[this.currentSection];
        const progress = Math.round(((this.currentSection + 1) / this.sections.length) * 100);
        Storage.updateModuleProgress('educativo', progress);

        return `
        <div class="page-transition max-w-4xl mx-auto px-8 py-12">
            <!-- Progress Bar -->
            <div class="mb-8">
                <div class="flex justify-between items-center mb-3">
                    <h2 class="text-2xl font-headline font-bold">${section.title}</h2>
                    <span class="text-sm font-semibold text-slate-600 dark:text-slate-400">${this.currentSection + 1}/${this.sections.length}</span>
                </div>
                <div class="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div class="progress-bar" style="width: ${progress}%"></div>
                </div>
            </div>

            <!-- Content -->
            <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-8 border border-slate-200 dark:border-slate-700">
                ${section.content}
            </div>

            <!-- Navigation -->
            <div class="flex gap-4 justify-between">
                ${this.currentSection > 0 ? `
                    <button onclick="Educativo.previousSection()" class="flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600 hover:shadow-md transition-all">
                        <span class="material-symbols-outlined text-xl">arrow_back</span>
                        Anterior
                    </button>
                ` : `<div></div>`}
                
                ${this.currentSection < this.sections.length - 1 ? `
                    <button onclick="Educativo.nextSection()" class="flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg transition-all">
                        Siguiente
                        <span class="material-symbols-outlined text-xl">arrow_forward</span>
                    </button>
                ` : `
                    <button onclick="app.navigateTo('dashboard')" class="flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-green-600 text-white hover:bg-green-700 hover:shadow-lg transition-all">
                        <span class="material-symbols-outlined text-xl">check_circle</span>
                        Completado
                    </button>
                `}
            </div>
        </div>
        `;
    },

    nextSection() {
        if (this.currentSection < this.sections.length - 1) {
            this.currentSection++;
            this.refresh();
        }
    },

    previousSection() {
        if (this.currentSection > 0) {
            this.currentSection--;
            this.refresh();
        }
    },

    refresh() {
        document.getElementById('app-container').innerHTML = this.render();
    },

    reset() {
        this.currentSection = 0;
    }
};
