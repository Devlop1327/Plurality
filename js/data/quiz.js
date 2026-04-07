// Quiz Data
const quizData = {
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

    gameQuizzes: [
        {
            question: "El género es determinado únicamente por características biológicas",
            options: ["Verdadero", "Falso"],
            correct: 1
        },
        {
            question: "La orientación sexual es una condición que puede cambiar",
            options: ["Verdadero", "Falso"],
            correct: 1
        },
        {
            question: "¿Qué pronombre es correcto usar cuando no conoces la identidad de género?",
            options: ["Asumir basado en apariencia", "Preguntar directamente", "Ignorarlo"],
            correct: 1
        },
        {
            question: "La diversidad en el lugar de trabajo mejora la creatividad",
            options: ["No tiene efecto", "Mejora la creatividad", "La empeora"],
            correct: 1
        },
        {
            question: "¿Todos los transgénero necesitan cirugía?",
            options: ["Sí", "No, cada persona decide", "Solo las mujeres"],
            correct: 1
        }
    ],

    scenarioDecisions: [
        {
            id: 1,
            scenario: "Un compañero de clase usa pronombres 'ellos/ellas' y ha pedido que respeten su identidad. ¿Cómo reaccionas?",
            choices: [
                { text: "Respeto sus pronombres e incluyo a los demás en esta práctica", impact: "Positive", points: 10 },
                { text: "Lo ignoro y sigo usando otros pronombres", impact: "Negative", points: 0 },
                { text: "Dudo pero lo intento", impact: "Neutral", points: 5 }
            ]
        },
        {
            id: 2,
            scenario: "Escuchas a alguien hacer un chiste sobre la comunidad LGBTQ+. ¿Qué haces?",
            choices: [
                { text: "Señalo que no es apropiado y busco una conversación educativa", impact: "Positive", points: 10 },
                { text: "Me río para no ser el centro de atención", impact: "Negative", points: 0 },
                { text: "Cambio de tema", impact: "Neutral", points: 5 }
            ]
        },
        {
            id: 3,
            scenario: "Tu amigo quiere hablar sobre sus dudas sobre su identidad de género. ¿Cómo respondes?",
            choices: [
                { text: "Escucho sin juzgar y ofrezco apoyo", impact: "Positive", points: 10 },
                { text: "Intento convencerlo de que está confundido", impact: "Negative", points: 0 },
                { text: "Digo que no es gran cosa pero no profundizo", impact: "Neutral", points: 5 }
            ]
        }
    ]
};
