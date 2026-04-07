# Plurality - Aplicación Educativa sobre Género y Diversidad

Una aplicación web interactiva y educativa diseñada para enseñar conceptos fundamentales sobre género, orientación sexual, identidad de género, y prácticas inclusivas.

## 🎯 Características Principales

### 1. **Dashboard de Bienvenida**
- Resumen personalizado del progreso del usuario
- Visualización rápida de avance en cada módulo
- Tarjetas interactivas para acceder a los módulos
- Sistema de puntos y logros

### 2. **Módulo Educativo (Aprende)**
- 4 secciones de aprendizaje interactivo:
  - Género vs Sexo
  - Identidad de Género
  - Orientación Sexual
  - Diversidad e Inclusión
- Navegación fluida con transiciones suaves
- Contenido visual y bien estructurado

### 3. **Centro de Juegos (Juega)**
- **Quiz Rápido**: Preguntas de opción múltiple con puntuación
- **Emparejamiento**: Arrastra conceptos a definiciones
- Sistema de puntos acumulativos
- Retroalimentación inmediata

### 4. **Simulador de Decisiones (Empatiza)**
- Escenarios realistas basados en situaciones de diversidad
- Múltiples opciones de respuesta con feedback educativo
- Sistema de impacto (Positivo, Negativo, Neutral)
- Reflexión sobre las consecuencias de nuestras acciones

### 5. **Evaluación Final y Logros (Evalúate)**
- Test de 10 preguntas aleatorias
- Cálculo automático de puntaje
- Sistema de medallas y logros
- Visualización completa del progreso

## 💾 Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript Vanilla
- **Styling**: Tailwind CSS + Material Design
- **Storage**: LocalStorage para persistencia de datos
- **Fuentes**: Google Fonts (Plus Jakarta Sans, Lexend)
- **Iconos**: Material Symbols

## 🚀 Cómo Usar

### Requisitos
- Un navegador web moderno (Chrome, Firefox, Safari, Edge)
- No requiere dependencias externas

### Instalación
1. Descarga o clona los archivos del proyecto
2. Abre `index.html` en tu navegador web
3. ¡Comienza a aprender!

### Estructura de Carpetas
```
stitch/
├── index.html                 # Página principal
├── js/
│   ├── app.js                 # Controlador principal (SPA)
│   ├── data/
│   │   └── quiz.js            # Datos de preguntas y escenarios
│   └── modules/
│       ├── storage.js         # Gestión de LocalStorage
│       ├── dashboard.js       # Módulo de bienvenida
│       ├── educativo.js       # Módulo de aprendizaje
│       ├── juegos.js          # Centro de juegos
│       ├── simulador.js       # Simulador de decisiones
│       └── evaluacion.js      # Evaluación final
└── prd_app_g_nero_y_diversidad.txt  # Documento de requisitos
```

## 📊 Persistencia de Datos

La aplicación utiliza **LocalStorage** para guardar:
- Progreso en cada módulo (%)
- Puntuación total de juegos
- Resultados de quizzes
- Preferencia de modo oscuro/claro
- Nombre de usuario

**Nota**: Los datos se guardan localmente en el navegador. Para reiniciar el progreso, usa el botón "Reiniciar Progreso" en el dashboard.

## 🎨 Personalización de Temas

### Modo Oscuro/Claro
- Haz clic en el ícono de luna en la esquina superior derecha
- Tu preferencia se guardarán automáticamente

### Colores Principales
- **Primario**: #653DA7 (Púrpura)
- **Secundario**: #006A62 (Turquesa)
- **Terciario**: #714E00 (Marrón)

## 📈 Sistema de Progreso

Cada módulo tiene un porcentaje de avance:
- **0%**: No iniciado
- **25%**: En progreso
- **50%**: Medio camino
- **100%**: Completado

El progreso total es el promedio de todos los módulos.

## 🏆 Sistema de Logros

Se desbloquean medallas por:
- **🎯 Iniciado**: Por empezar cualquier actividad
- **📚 Aprendiz**: 40%+ de puntaje
- **⭐ Aventajado**: 60%+ de puntaje
- **🏆 Experto**: 80%+ de puntaje
- **👑 Maestro**: 100% de puntaje

## 📚 Contenido Educativo

La aplicación cubre:
- Diferencia entre sexo e identidad de género
- Identidades de género (cisgénero, transgénero, no binario, genderfluid)
- Orientación sexual y el espectro de la atracción
- Prácticas inclusivas y cómo ser aliado
- Vocabulario y glosario de términos importantes

## 🤝 Contribuciones

Este proyecto fue diseñado como herramienta educativa. Para sugerencias o mejoras, por favor contacta al equipo de desarrollo.

## 📄 Licencia

Todos los derechos reservados © 2026

## 🔗 Enlaces Útiles

- Material Design: https://m3.material.io
- Google Fonts: https://fonts.google.com
- Tailwind CSS: https://tailwindcss.com

---

**Última actualización**: Abril 2026

¡Disfruta aprendiendo y promoviendo la inclusión! 🌈
