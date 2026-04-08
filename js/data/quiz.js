// Quiz Data - Expandido con 4 módulos nuevos + 6 tipos de juegos
const quizData = {
    // ========== EDUCATIVO ==========
    eduQuestions: [
        {
            id: 1,
            question: "¿Cuál es la diferencia principal entre sexo e identidad de género?",
            options: [
                "No hay diferencia",
                "El sexo se refiere a características biológicas, la identidad de género es la percepción personal",
                "Son términos sinónimos"
            ],
            correct: 1
        },
        {
            id: 2,
            question: "¿Qué significa ser cisgénero?",
            options: [
                "Tener una orientación sexual diferente",
                "La identidad de género coincide con el sexo asignado al nacer",
                "Ser heterosexual"
            ],
            correct: 1
        },
        {
            id: 3,
            question: "¿Cuál de estas opciones describe la orientación sexual?",
            options: [
                "La ropa que prefieres usar",
                "El género hacia el cual sientes atracción romántica o sexual",
                "Tu profesión o carrera"
            ],
            correct: 1
        },
        {
            id: 4,
            question: "¿Qué es la diversidad e inclusión?",
            options: [
                "Aceptar solo a personas igual a ti",
                "Reconocer y valorar las diferencias de todas las personas",
                "Ignorar las diferencias"
            ],
            correct: 1
        },
        {
            id: 5,
            question: "¿Quién determina la identidad de género de una persona?",
            options: [
                "Los amigos",
                "La sociedad",
                "La propia persona"
            ],
            correct: 2
        },
        {
            id: 6,
            question: "¿Qué es un pronombre preferido?",
            options: [
                "No tiene importancia",
                "La palabra que una persona prefiere usar para referirse a sí misma",
                "Solo afecta a ciertos grupos"
            ],
            correct: 1
        },
        {
            id: 7,
            question: "¿Cuál es el espectro de la orientación sexual?",
            options: [
                "Solo hay heterosexuales y homosexuales",
                "Es un continuo que incluye múltiples orientaciones",
                "No existe tal cosa"
            ],
            correct: 1
        },
        {
            id: 8,
            question: "¿Qué significa ser aliado de la comunidad LGBTQ+?",
            options: [
                "Pretender que no hay diferencias",
                "Apoyar activamente los derechos y la inclusión de las personas LGBTQ+",
                "Ignorar el tema"
            ],
            correct: 1
        },
        {
            id: 9,
            question: "¿La identidad de género es siempre binaria?",
            options: [
                "Sí, siempre",
                "No, existe un espectro de identidades",
                "Depende del país"
            ],
            correct: 1
        },
        {
            id: 10,
            question: "¿Cuál es la importancia de respetar la diversidad?",
            options: [
                "Es menos importante",
                "Crea una sociedad más equitativa, inclusiva y respetuosa",
                "No tiene importancia"
            ],
            correct: 1
        }
    ],

    // ========== VERDADERO/FALSO GAMES ==========
    trueFalseGames: [
        { question: "El sexo biológico y la identidad de género son siempre iguales", correct: false, explanation: "No. Muchas personas transgénero tienen una identidad de género que no coincide con el sexo asignado al nacer." },
        { question: "La orientación sexual es una condición que puede cambiar voluntariamente", correct: false, explanation: "No. La orientación sexual es una parte fundamental de la identidad de una persona." },
        { question: "Las personas no binarias rechazan su género", correct: false, explanation: "No. Las personas no binarias tienen una identidad de género válida que está fuera del binario hombre/mujer." },
        { question: "Respetar pronombres preferidos es importante para la inclusión", correct: true, explanation: "Sí. Los pronombres son parte importante de la identidad de cada persona." },
        { question: "La diversidad en equipos mejora la innovación y creatividad", correct: true, explanation: "Sí. Estudios muestran que equipos diversos tienen mejores resultados." },
        { question: "Todos los transgénero desean someterse a cirugía", correct: false, explanation: "No. Cada persona decide sobre sus transiciones de forma personal." },
        { question: "La asexualidad es una orientación sexual válida", correct: true, explanation: "Sí. Las personas asexuales tienen poco o ningún deseo sexual, y eso es válido." },
        { question: "Ser aliado es solo decir que apoyas a la comunidad LGBTQ+", correct: false, explanation: "No. Ser aliado requiere acciones concretas y educación continua." }
    ],

    // ========== MATCHING GAMES ==========
    matchingGames: [
        {
            title: "Empareja términos con definiciones",
            pairs: [
                { id: 1, left: "Cisgénero", right: "Identidad de género coincide con sexo asignado" },
                { id: 2, left: "Transgénero", right: "Identidad de género diferente al sexo asignado" },
                { id: 3, left: "No binario", right: "Identidad fuera del binario hombre/mujer" },
                { id: 4, left: "Genderfluid", right: "Identidad de género que varía con el tiempo" },
                { id: 5, left: "Heterosexual", right: "Atracción hacia personas del género opuesto" },
                { id: 6, left: "Homosexual", right: "Atracción hacia personas del mismo género" },
                { id: 7, left: "Bisexual", right: "Atracción hacia múltiples géneros" },
                { id: 8, left: "Inclusión", right: "Crear espacios donde todos se sienten valorados" }
            ]
        },
        {
            title: "Empareja autores con sus aportes",
            pairs: [
                { id: 1, left: "Sally Subiratz", right: "Estudios sobre género e inclusión" },
                { id: 2, left: "Judith Butler", right: "Teoría performativa del género" },
                { id: 3, left: "Audre Lorde", right: "Interseccionalidad y diferencia" },
                { id: 4, left: "Gloria Anzaldúa", right: "Consciencia mestiza y transformación" },
                { id: 5, left: "bell hooks", right: "Feminismo para todos" }
            ]
        }
    ],

    // ========== MEMORIA GAMES ==========
    memoryGames: [
        {
            title: "Memoria: Géneros e Identidades",
            cards: [
                { id: 1, content: "Cis", pair: "Identidad coincide" },
                { id: 2, content: "Identidad coincide", pair: "Cis" },
                { id: 3, content: "Trans", pair: "Identidad diferente" },
                { id: 4, content: "Identidad diferente", pair: "Trans" },
                { id: 5, content: "No binario", pair: "Fuera del binario" },
                { id: 6, content: "Fuera del binario", pair: "No binario" },
                { id: 7, content: "Queer", pair: "Identidad fluida" },
                { id: 8, content: "Identidad fluida", pair: "Queer" }
            ]
        },
        {
            title: "Memoria: Orientaciones Sexuales",
            cards: [
                { id: 1, content: "Gay", pair: "Hombre-Hombre" },
                { id: 2, content: "Hombre-Hombre", pair: "Gay" },
                { id: 3, content: "Lesbiana", pair: "Mujer-Mujer" },
                { id: 4, content: "Mujer-Mujer", pair: "Lesbiana" },
                { id: 5, content: "Bi", pair: "Múltiples géneros" },
                { id: 6, content: "Múltiples géneros", pair: "Bi" },
                { id: 7, content: "Asexual", pair: "Poco deseo sexual" },
                { id: 8, content: "Poco deseo sexual", pair: "Asexual" }
            ]
        }
    ],

    // ========== COMPLETAR ESPACIOS ==========
    fillInGames: [
        { question: "La identidad de género es la percepción _____ de una persona.", answer: "interna", options: ["externa", "interna", "familiar", "social"] },
        { question: "La orientación sexual es hacía qué _____ sientes atracción.", answer: "genero", options: ["sexo", "genero", "familia", "edad"] },
        { question: "La inclusión significa crear espacios donde todos se sienten _____.", answer: "valorados", options: ["invisibles", "valorados", "pequeños", "limitados"] },
        { question: "El término _____ se refiere a personas cuya identidad coincide con su sexo.", answer: "cisgénero", options: ["transgénero", "cisgénero", "no binario", "genderfluid"] },
        { question: "Sally Subiratz ha contribuido a estudios sobre _____ e inclusión.", answer: "género", options: ["color", "género", "edad", "religión"] }
    ],

    // ========== ORDENAR SECUENCIAS ==========
    orderGames: [
        { question: "Ordena los pasos para ser un buen aliado LGBTQ+", items: ["Educate sobre términos", "Escucha sin juzgar", "Apoya activamente", "Reconoce tus errores"], correct: [0, 1, 2, 3] },
        { question: "Ordena la evolución de la comprensión del género", items: ["Binario únicamente", "Espectro de género", "Identidad fluida", "Inclusión total"], correct: [0, 1, 2, 3] }
    ],

    // ========== MÓDULO: INCLUSIÓN ==========
    inclusionContent: [
        { id: 1, title: "¿Qué es la Inclusión?", content: "La inclusión es el proceso de garantizar que todas las personas, independientemente de su género, orientación sexual o identidad, sean valoradas, respetadas y tengan oportunidades iguales. No se trata simplemente de tolerar las diferencias, sino de celebrarlas.", author: "Sally Subiratz", context: "La inclusión crea espacios donde la diversidad es una fortaleza" },
        { id: 2, title: "Inclusión en la Educación", content: "Las escuelas inclusivas crean ambientes donde estudiantes de todas las identidades y orientaciones sexuales pueden prosperar. Esto incluye usar pronombres correctos, celebrar la diversidad y combatir el acoso.", author: "Judith Butler", context: "La educación es clave para la transformación social" },
        { id: 3, title: "Inclusión Laboral", content: "La inclusión en el trabajo mejora la creatividad, innovación y satisfacción de empleados. Empresas inclusivas atraen talento diverso y tienen mejor desempeño.", author: "Audre Lorde", context: "Nuestras diferencias son nuestras fuerzas" },
        { id: 4, title: "Inclusión Familiar", content: "Las familias que aceptan y apoyan la identidad de género y orientación sexual de sus miembros crean ambientes saludables. El apoyo familiar es crucial para el bienestar mental.", author: "bell hooks", context: "El amor es revolucionario" }
    ],

    // ========== MÓDULO: DERECHOS LGBTQ+ ==========
    derechosContent: [
        { id: 1, title: "Derechos Fundamentales", content: "Toda persona tiene derecho a: identidad, expresión libre, no discriminación, acceso a oportunidades iguales, protección legal, y el derecho a amar y ser amado.", countries: ["Colombia", "Argentina", "Brasil", "Uruguay"], progress: "Some rights recognized" },
        { id: 2, title: "Matrimonio Igualitario", content: "El derecho al matrimonio entre personas del mismo sexo es un hito importante. Permite acceso a beneficios legales, herencias, y validación social.", countries: ["Argentina", "Brasil", "Colombia"], progress: "Legal in multiple countries" },
        { id: 3, title: "Cambio de Identidad Legal", content: "Muchas personas transgénero necesitan cambiar su documentación legal. Algunos países lo permiten fácilmente, mientras otros requieren procedimientos complejos.", countries: ["Argentina (leader)", "Colombia (progress)", "Uruguay (progress)"], progress: "Improving in Latin America" },
        { id: 4, title: "Protección contra Discriminación", content: "Leyes anti-discriminación protegen a personas LGBTQ+ en empleo, educación, vivienda y servicios. Son esenciales para la igualdad.", countries: ["Several LA countries", "Some EU countries", "Progressive Canada"], progress: "Variable globally" }
    ],

    // ========== MÓDULO: HISTORIA ==========
    historiaContent: [
        { id: 1, year: "1969", event: "Stonewall Uprising", description: "El levantamiento de Stonewall en Nueva York marca el inicio del movimiento moderno por derechos LGBTQ+. La resistencia contra la persecución policial se convierte en un símbolo global." },
        { id: 2, year: "1978", event: "Primer Orgullo", description: "Se celebra la primera marcha del orgullo LGBTQ+, conmemorando Stonewall. Rápidamente se expande a ciudades alrededor del mundo." },
        { id: 3, year: "1996", event: "Primeras Uniones Civiles", description: "Dinamarca reconoce las primeras uniones civiles homosexuales. Un paso importante hacia la igualdad legal." },
        { id: 4, year: "2001", event: "Matrimonio Igualitario en Holanda", description: "Holanda se convierte en el primer país en legalizar el matrimonio igualitario. Otros países rápidamente siguen este ejemplo." },
        { id: 5, year: "2009", event: "ONU Declara Derechos", description: "Las Naciones Unidas reconocen los derechos de personas LGBTQ+ como derechos humanos fundamentales." },
        { id: 6, year: "2010", event: "Matrimonio en América Latina", description: "Argentina se convierte en el primer país latinoamericano en legalizar matrimonio igualitario." }
    ],

    // ========== MÓDULO: SER ALIADO ==========
    aliadoContent: [
        { id: 1, step: "Edúcate a ti mismo", description: "Aprende sobre identidad de género, orientaciones sexuales, y experiencias LGBTQ+. Lee libros, ve documentales, asiste a charlas.", tips: ["Leer a autores LGBTQ+", "Escuchar podcasts", "Ver documentales", "Asistir a eventos"] },
        { id: 2, step: "Escucha sin Juzgar", description: "Cuando alguien comparte su identidad contigo, escucha con apertura y respeto. No hagas suposiciones basadas en apariencia.", tips: ["Mantén silencio y escucha", "No interrumpas", "Haz preguntas respetuosas", "Valida sus experiencias"] },
        { id: 3, step: "Usa los Pronombres Correctos", description: "Respeta los pronombres preferidos de cada persona. Si no estás seguro, pregunta respetuosamente.", tips: ["Pregunta si es necesario", "Corrige tus errores", "Practica mentalmente", "No hagas gran drama si fallas"] },
        { id: 4, step: "De Espectador a Defensor", description: "Si ves discriminación o acoso, no te quedes en silencio. Intervén de forma segura y apoya a la persona afectada.", tips: ["Cuestiona chistes ofensivos", "Apoya a victimas", "Reporta discriminación", "Documenta incidentes"] },
        { id: 5, step: "Apoya Activamente", description: "Participa en eventos, apoya organizaciones, vota por políticas inclusivas, y usa tu voz para abogar por igualdad.", tips: ["Asiste a eventos Pride", "Dona a organizaciones", "Vota inclusivamente", "Haz activismo"] },
        { id: 6, step: "Reconoce tu Privilegio", description: "Entiende que si eres cisgénero y heterosexual, tienes privilegios. Úsalos para amplificar voces marginalizadas.", tips: ["Reconoce tu privilegio", "Cede espacios", "Escucha voces marginalizadas", "Usa tu plataforma"] }
    ],

    // ========== EVALUACIÓN EXPANDIDA ==========
    evaluacionQuestions: [
        { id: 1, section: "Conceptos Fundamentales", question: "¿Cuál es la diferencia entre sexo e identidad de género?", options: ["Son lo mismo", "Sexo es biológico, identidad de género es psicológica personal", "Sexo es psicológico, identidad de género es biológico", "No hay diferencia importante"], correct: 1 },
        { id: 2, section: "Conceptos Fundamentales", question: "¿Qué significa 'cisgénero'?", options: ["Una orientación sexual", "Identidad de género coincide con sexo asignado al nacer", "Una expresión de género", "Alguien que rechaza género"], correct: 1 },
        { id: 3, section: "Conceptos Fundamentales", question: "¿Cuál es un ejemplo de no-binaridad?", options: ["Ser homosexual", "Ser heterosexual", "Tener una identidad de género fuera del binario hombre/mujer", "No tener orientación sexual"], correct: 2 },
        { id: 4, section: "Conceptos Fundamentales", question: "¿La orientación sexual puede cambiar voluntariamente?", options: ["Sí, con esfuerzo", "No, es parte fundamental de la identidad", "Depende de la edad", "Es una enfermedad que se cura"], correct: 1 },
        { id: 5, section: "Inclusión y Sociedad", question: "¿Qué es inclusión en el contexto de diversidad?", options: ["Ignorar las diferencias", "Aceptar solo al grupo mayoritario", "Valorar y crear espacios para todos", "Separar por diferencias"], correct: 2 },
        { id: 6, section: "Inclusión y Sociedad", question: "¿Quién es Sally Subiratz?", options: ["Una cantante famosa", "Una investigadora sobre género e inclusión", "Una política", "Una deportista"], correct: 1 },
        { id: 7, section: "Inclusión y Sociedad", question: "¿Cuál es el primer país latinoamericano en legalizar matrimonio igualitario?", options: ["Colombia", "Argentina", "Brasil", "Uruguay"], correct: 1 },
        { id: 8, section: "Inclusión y Sociedad", question: "¿Qué evento es considerado el inicio del movimiento moderno LGBTQ+?", options: ["Pride en San Francisco", "Stonewall Uprising 1969", "Matrimonio en Holanda", "ONU Derechos Humanos"], correct: 1 },
        { id: 9, section: "Ser Aliado", question: "¿Cuál es el primer paso para ser un aliado LGBTQ+?", options: ["Decir que apoyo", "Educarse sobre el tema", "Ignore el tema", "Juzgar a otros"], correct: 1 },
        { id: 10, section: "Ser Aliado", question: "¿Qué hacer si cometes un error con los pronombres de alguien?", options: ["Ignóralo", "Disculpate brevemente y corrige", "Haz un drama grande", "Culpa a la otra persona"], correct: 1 }
    ],

    // ========== JUEGOS QUIZ EXPANDIDOS ==========
    gameQuizzes: [
        { question: "El género es determinado únicamente por características biológicas", options: ["Verdadero", "Falso"], correct: 1 },
        { question: "La orientación sexual puede cambiar con conversión", options: ["Verdadero", "Falso"], correct: 1 },
        { question: "¿Qué pronombre es correcto usar cuando no conoces la identidad de género?", options: ["Asumir basado en apariencia", "Preguntar directamente", "Ignorarlo"], correct: 1 },
        { question: "La diversidad en el lugar de trabajo mejora la creatividad", options: ["No tiene efecto", "Mejora la creatividad", "La empeora"], correct: 1 },
        { question: "¿Todos los transgénero necesitan cirugía?", options: ["Sí", "No, cada persona decide", "Solo las mujeres"], correct: 1 }
    ],

    // ========== TRIVIA RÁPIDO ==========
    triviaRapido: [
        { question: "¿En qué año ocurrió el levantamiento de Stonewall?", answer: "1969", hint: "Un evento clave en los años 60..." },
        { question: "¿Cuál fue el primer país en legalizar matrimonio igualitario?", answer: "holanda", hint: "En Europa Occidental, año 2001..." },
        { question: "¿Quién es Sally Subiratz?", answer: "investigadora", hint: "Experta en inclusión y género..." },
        { question: "¿Qué país latinoamericano legalizó matrimonio igualitario en 2010?", answer: "argentina", hint: "País sudamericano importante..." },
        { question: "¿Cuál es el primer paso para ser un aliado LGBTQ+?", answer: "educarse", hint: "Aprende sobre el tema..." }
    ],

    // ========== JUEGO ¿QUIÉN SOY? ==========
    quienSoy: [
        { description: "Soy una identidad donde tu género no fue el asignado al nacer. ¿Quién soy?", answer: "transgénero", options: ["cisgénero", "transgénero", "no binario", "queer"] },
        { description: "Soy la atracción hacia personas del mismo género. ¿Quién soy?", answer: "homosexualidad", options: ["heterosexualidad", "bisexualidad", "homosexualidad", "asexualidad"] },
        { description: "Soy un movimiento que celebra la diversidad cada junio. ¿Quién soy?", answer: "Pride", options: ["Equality", "Pride", "Diversity", "Celebration"] },
        { description: "Soy la teoría sobre cómo realizamos género a través de acciones. ¿Quién soy?", answer: "Butler", options: ["Subiratz", "Butler", "Lorde", "hooks"] },
        { description: "Soy el proceso de como una persona descubre quién es. ¿Cómo se llama?", answer: "autodescubrimiento", options: ["imposición", "conformidad", "opdescubrimiento", "normalidad"] }
    ],

    // ========== CATEGORIZACIÓN ==========
    categorizacion: [
        {
            title: "Categoriza: Identidades vs Orientaciones",
            items: [
                { text: "Cisgénero", category: "Identidad" },
                { text: "Heterosexual", category: "Orientación" },
                { text: "Transgénero", category: "Identidad" },
                { text: "Bisexual", category: "Orientación" },
                { text: "No binario", category: "Identidad" },
                { text: "Asexual", category: "Orientación" }
            ]
        },
        {
            title: "Categoriza: Derechos por tipo",
            items: [
                { text: "Matrimonio igualitario", category: "Derechos Civiles" },
                { text: "Identidad legal", category: "Derechos Humanos" },
                { text: "Protección laboral", category: "Derechos Laborales" },
                { text: "Respeto de pronombres", category: "Derechos Humanos" },
                { text: "Uniontes civiles", category: "Derechos Civiles" }
            ]
        }
    ],

    // ========== PALABRAS CLAVE ==========
    verdaderoFalso: [
        { statement: "La inclusión significa crear espacios para todos sin discriminación.", answer: true },
        { statement: "Un pronombre es una palabra que describe características físicas.", answer: false },
        { statement: "Una persona cisgénero tiene una identidad de género que coincide con el sexo asignado.", answer: true },
        { statement: "Un aliado es alguien que solo habla de LGBTQ+ pero no actúa.", answer: false },
        { statement: "La diversidad incluye variedad de identidades, orientaciones y experiencias.", answer: true }
    ],

    // ========== CONEXIONES DE CONCEPTOS ==========
    conexionesConceptos: [
        {
            title: "Conecta: Autores con sus contribuciones",
            connections: [
                { left: "Judith Butler", right: "Teoría performativa", correct: true },
                { left: "Sally Subiratz", right: "Inclusión", correct: true },
                { left: "Audre Lorde", right: "Interseccionalidad", correct: true },
                { left: "bell hooks", right: "Feminismo", correct: true },
                { left: "Gloria Anzaldúa", right: "Mestiza", correct: true }
            ]
        },
        {
            title: "Conecta: Eventos con años",
            connections: [
                { left: "Stonewall", right: "1969", correct: true },
                { left: "Primer Pride", right: "1978", correct: true },
                { left: "Matrimonio Holanda", right: "2001", correct: true },
                { left: "Argentina Matrimonio", right: "2010", correct: true },
                { left: "ONU Derechos", right: "2009", correct: true }
            ]
        }
    ],

    // ========== ROMPECABEZAS DE CONCEPTOS ==========
    rompeacabezas: [
        {
            title: "Completa la definición",
            question: "La identidad de género es la _____ personal de alguien sobre su propio género",
            answer: "percepción",
            options: ["percepción", "presentación", "expresión", "orientación"]
        },
        {
            title: "Completa la frase",
            question: "Ser _____ significa apoyar activamente los derechos de la comunidad LGBTQ+",
            answer: "aliado",
            options: ["amigo", "aliado", "testigo", "espectador"]
        },
        {
            title: "Completa el concepto",
            question: "El espectro de las _____ sexuales incluye heterosexualidad, homosexualidad, bisexualidad y más",
            answer: "orientaciones",
            options: ["identidades", "orientaciones", "expresiones", "géneros"]
        }
    ],

    // ========== ESCENARIOS SIMULADOR ==========
    scenarioDecisions: [
        { id: 1, scenario: "Un compañero de clase usa pronombres 'ellos/ellas' y ha pedido que respeten su identidad. ¿Cómo reaccionas?", choices: [{ text: "Respeto sus pronombres e incluyo a los demás en esta práctica", impact: "Positive", points: 10 }, { text: "Lo ignoro y sigo usando otros pronombres", impact: "Negative", points: 0 }, { text: "Dudo pero lo intento", impact: "Neutral", points: 5 }] },
        { id: 2, scenario: "Escuchas a alguien hacer un chiste sobre la comunidad LGBTQ+. ¿Qué haces?", choices: [{ text: "Señalo que no es apropiado y busco una conversación educativa", impact: "Positive", points: 10 }, { text: "Me río para no ser el centro de atención", impact: "Negative", points: 0 }, { text: "Cambio de tema", impact: "Neutral", points: 5 }] },
        { id: 3, scenario: "Tu amigo quiere hablar sobre sus dudas sobre su identidad de género. ¿Cómo respondes?", choices: [{ text: "Escucho sin juzgar y ofrezco apoyo", impact: "Positive", points: 10 }, { text: "Intento convencerlo de que está confundido", impact: "Negative", points: 0 }, { text: "Digo que no es gran cosa pero no profundizo", impact: "Neutral", points: 5 }] }
    ]
};
