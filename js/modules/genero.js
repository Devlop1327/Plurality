// Género, Pluralidad y Diversidades Module
const Genero = {
    render() {
        return `
        <div class="max-w-7xl mx-auto px-8 py-12">
            <div class="mb-8">
                <h1 class="text-4xl font-bold text-[#7E57C2] dark:text-[#b39ddb] mb-2">Diversidad y Educación Inclusiva</h1>
                <p class="text-slate-600 dark:text-slate-400 text-lg">Un desafío para los sistemas educativos actuales</p>
            </div>

            <div class="grid gap-6">
                <section class="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
                    <h2 class="text-3xl font-semibold text-slate-900 dark:text-white mb-4">Inicio (Portada)</h2>
                    <div class="space-y-3 text-slate-700 dark:text-slate-300">
                        <p><strong>Asignatura:</strong> Género, Pluralidad y Diversidades (Semestre 1 - 2026, Jornada Noche)</p>
                        <p><strong>Institución:</strong> Universidad del Valle</p>
                        <p><strong>Docente:</strong> Rubiela Perdomo Medina</p>
                    </div>
                    <div class="mt-6 bg-slate-50 dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-700">
                        <h3 class="text-2xl font-semibold text-[#1f4e79] dark:text-[#8ab4f8] mb-3">Equipo 1 - Integrantes</h3>
                        <ul class="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-2">
                            <li>Escobar Arroyo Karen Dayana</li>
                            <li>Riscos Vivas Kevin Yair</li>
                            <li>Hinojosa López Alexis</li>
                        </ul>
                    </div>
                </section>

                <section class="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
                    <h2 class="text-3xl font-semibold text-slate-900 dark:text-white mb-4">El desafío de la inclusión</h2>

                    <article class="mb-7">
                        <h3 class="text-2xl font-semibold mb-3">1. Relación entre Exclusión Social/Educativa y Educación en la Diversidad</h3>
                        <p class="mb-3"><strong>Pregunta:</strong> ¿La problemática de la exclusión social y educativa tiene relación con la educación en y para la diversidad?</p>
                        <p class="text-slate-700 dark:text-slate-300">Existe una relación directa y de codependencia. La exclusión educativa es, al mismo tiempo, el reflejo y una de las causas principales de la exclusión social. Cuando un sistema educativo ignora la diversidad de su estudiantado, impone un modelo único y estandarizado que margina a quienes no encajan en él (ya sea por condiciones socioeconómicas, capacidades funcionales o identidades culturales). Al negarles el acceso a una formación de calidad, el sistema perpetúa las dinámicas históricas de desigualdad, limitando las oportunidades de desarrollo e inclusión de estos ciudadanos en la vida económica, política y social de su entorno.</p>
                    </article>

                    <article class="mb-7">
                        <h3 class="text-2xl font-semibold mb-3">2. Educar desde la Diversidad para Eliminar la Exclusión</h3>
                        <p class="mb-3"><strong>Pregunta:</strong> ¿Crees que educar desde la diversidad podría ser un camino para eliminar la exclusión? ¿Por qué?</p>
                        <p class="text-slate-700 dark:text-slate-300">Sí, es el camino indispensable. Educar desde la diversidad implica una transformación radical de la escuela tradicional: deja de verse la diferencia como un "problema a corregir" y pasa a entenderse como un valor pedagógico y una riqueza colectiva. Al estructurar las aulas bajo este enfoque, se desmienten los prejuicios y estereotipos desde la infancia. Los estudiantes aprenden a cooperar, empatizar y reconocer el valor del otro, lo que neutraliza la discriminación en la raíz y forma ciudadanos preparados para construir comunidades equitativas y sin segregaciones.</p>
                    </article>

                    <article class="mb-7">
                        <h3 class="text-2xl font-semibold mb-3">3. El Concepto de Diversidad y sus Manifestaciones</h3>
                        <p class="mb-3"><strong>Pregunta:</strong> Expliquen el concepto de diversidad y sus diferentes manifestaciones.</p>
                        <p class="text-slate-700 dark:text-slate-300 mb-4">La diversidad es una condición intrínseca, natural y constitutiva del ser humano; no es una excepción, es la norma. Lejos de referirse únicamente a grupos específicos, abarca la pluralidad de identidades que nos hacen únicos. Sus manifestaciones principales se dan en los siguientes ámbitos:</p>
                        <ul class="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                            <li><strong>Diversidad Cultural y Étnica:</strong> Multiplicidad de saberes, lenguas, tradiciones e historias colectivas (comunidades afrodescendientes, indígenas, rom, etc.).</li>
                            <li><strong>Diversidad Funcional o de Capacidades:</strong> Diferentes formas de interactuar con el entorno debido a condiciones físicas, intelectuales, sensoriales o, por el contrario, capacidades y talentos excepcionales.</li>
                            <li><strong>Diversidad de Ritmos y Estilos de Aprendizaje:</strong> Las distintas maneras, tiempos y canales cognitivos que cada individuo requiere para procesar y consolidar el conocimiento.</li>
                            <li><strong>Diversidad de Género y Orientaciones:</strong> Pluralidad de identidades y expresiones de género dentro de la sociedad.</li>
                            <li><strong>Diversidad Socioeconómica:</strong> Variaciones en los entornos materiales y contextos familiares que impactan las oportunidades de vida.</li>
                        </ul>
                    </article>

                    <article>
                        <h3 class="text-2xl font-semibold mb-3">4. Barreras para Atender a la Diversidad</h3>
                        <p class="mb-3"><strong>Pregunta:</strong> ¿Cuáles son las posibles barreras sociales, culturales y de la educación para atender a la diversidad?</p>
                        <p class="text-slate-700 dark:text-slate-300 mb-4">Las barreras no están en las personas, sino en las limitaciones del entorno que restringen su participación plena. Se clasifican en:</p>
                        <ul class="list-disc list-inside space-y-3 text-slate-700 dark:text-slate-300">
                            <li><strong>Barreras Sociales y Culturales:</strong> Prejuicios arraigados, estigmas, actitudes de lástima o rechazo, discriminación estructural e indiferencia ciudadana frente a los derechos de los sectores vulnerables.</li>
                            <li><strong>Barreras Educativas (Pedagógicas e Institucionales):</strong>
                                <ul class="list-disc list-inside mt-3 ml-6 space-y-2">
                                    <li><strong>Ideológicas:</strong> La persistencia del "modelo del déficit" (creer que las dificultades son culpa exclusiva del estudiante y su condición).</li>
                                    <li><strong>Curriculares:</strong> Currículos e instrumentos de evaluación rígidos y homogeneizadores que no permiten adaptaciones flexibilizadas.</li>
                                    <li><strong>Organizativas y Materiales:</strong> Infraestructura física inaccesible, escasez de recursos tecnológicos/didácticos adaptados y falta de formación continua y herramientas para el cuerpo docente.</li>
                                </ul>
                            </li>
                        </ul>
                    </article>
                </section>

                <section class="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
                    <h2 class="text-3xl font-semibold text-slate-900 dark:text-white mb-4">Inclusión en la práctica</h2>

                    <article class="mb-7">
                        <h3 class="text-2xl font-semibold mb-3">5. Ejemplos Prácticos de Educación en la Diversidad</h3>
                        <p class="mb-4 text-slate-700 dark:text-slate-300"><strong>Pregunta:</strong> Ejemplificar cuándo educamos en la diversidad y cuándo no.</p>
                        <ul class="list-disc list-inside space-y-3 text-slate-700 dark:text-slate-300">
                            <li><strong>CUÁNDO SÍ SE EDUCA EN LA DIVERSIDAD:</strong> Cuando un docente planea su clase utilizando el Diseño Universal para el Aprendizaje (DUA), presentando la información mediante textos visuales, audios y actividades prácticas para que todo el grupo participe por igual; o cuando la institución incorpora la historia afrocolombiana de forma transversal en los planes de estudio y no solo como una celebración aislada.</li>
                            <li><strong>CUÁNDO NO SE EDUCA EN LA DIVERSIDAD:</strong> Cuando a un estudiante con baja visión se le entrega el mismo examen impreso en letra pequeña sin ningún ajuste y se reprocha su rendimiento; o cuando se aísla permanentemente a los estudiantes con dificultades de aprendizaje en un salón alterno "especial", privándolos de interactuar y aprender junto a sus compañeros de aula regular.</li>
                        </ul>
                    </article>

                    <article class="mb-7">
                        <h3 class="text-2xl font-semibold mb-3">6. Criterios de la Educación Inclusiva para la Formación Integral</h3>
                        <p class="mb-4 text-slate-700 dark:text-slate-300"><strong>Pregunta:</strong> ¿Cuáles son los criterios en educación inclusiva que dan respuesta en la formación integral de ciudadanos y ciudadanas?</p>
                        <ul class="list-disc list-inside space-y-3 text-slate-700 dark:text-slate-300">
                            <li><strong>Equidad:</strong> Ofrecer recursos, apoyos y metodologías diferenciadas según las necesidades particulares de cada estudiante para garantizar la igualdad de oportunidades.</li>
                            <li><strong>Reconocimiento y Valoración:</strong> Validar la identidad de cada alumno como un sujeto de derechos legítimo, cuyos saberes previos enriquecen el aula.</li>
                            <li><strong>Pertinencia:</strong> Diseñar contenidos educativos que respondan y respeten las realidades lingüísticas, geográficas y culturales de los estudiantes.</li>
                            <li><strong>Accesibilidad Universal:</strong> Eliminar de raíz cualquier obstáculo físico, comunicativo o digital que impida el libre acceso al entorno escolar.</li>
                            <li><strong>Participación Real:</strong> Asegurar que los estudiantes no solo "estén presentes" en el salón, sino que tengan voz activa en las decisiones pedagógicas y comunitarias.</li>
                        </ul>
                    </article>

                    <article>
                        <h3 class="text-2xl font-semibold mb-3">7. Desafíos de la Educación Inclusiva</h3>
                        <p class="text-slate-700 dark:text-slate-300 mb-4"><strong>Pregunta:</strong> Expliquen cuáles son los desafíos de la educación inclusiva en el marco de la diversidad.</p>
                        <ol class="list-decimal list-inside space-y-3 text-slate-700 dark:text-slate-300 ml-4">
                            <li>Transitar de la integración a la inclusión real: Dejar de adaptar al estudiante al sistema y empezar a transformar el sistema (políticas, prácticas y cultura) para el estudiante.</li>
                            <li>Fortalecer la formación docente: Capacitar de manera práctica a los educadores en metodologías inclusivas y flexibilización curricular.</li>
                            <li>Garantizar la financiación y recursos: Proveer a las escuelas públicas de la infraestructura idónea, profesionales de apoyo pedagógico y tecnologías accesibles necesarias.</li>
                            <li>Articular las políticas del MEN con el aula: Traducir los decretos y lineamientos teóricos nacionales en realidades tangibles y aplicadas dentro de cada salón de clases en Colombia.</li>
                        </ol>
                    </article>
                </section>

                <section class="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
                    <h2 class="text-3xl font-semibold text-slate-900 dark:text-white mb-4">Fuentes de consulta</h2>
                    <div class="space-y-3 text-slate-700 dark:text-slate-300">
                        <p><strong>Bibliografía Oficial:</strong></p>
                        <ul class="list-disc list-inside space-y-2">
                            <li>Arnaiz, P. Sobre la atención a la diversidad. Materiales para la formación del profesorado. Consejería de Educación y Cultura de la Región de Murcia.</li>
                            <li>Ministerio de Educación Nacional (MEN). Lineamientos de Educación Inclusiva. Bogotá, Colombia.</li>
                            <li>Echeita, G. y Sandoval, M. Educación inclusiva o educación sin exclusiones. Madrid, España.</li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
        `;
    }
};
