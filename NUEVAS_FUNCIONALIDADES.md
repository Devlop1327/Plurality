# Nuevas Funcionalidades - Documentación

## Resumen de Cambios

Se han agregado cuatro componentes interactivos principales a la aplicación Plurality de Educación Inclusiva:

---

## 1. Panel de Accesibilidad (Fijo en pantalla)

### Ubicación
- **Panel flotante** en la esquina superior derecha de la pantalla
- Se mantiene visible durante toda la navegación
- Z-index: 40 (por debajo del header)

### Características

#### Botón "Alto Contraste"
- **Función**: Activa/desactiva un modo de alto contraste
- **Colores en contraste**:
  - Fondo: `#121212` (casi negro)
  - Texto: `#FFFF00` (amarillo brillante)
  - Bordes: `#FFFF00`
- **Almacenamiento**: Se guarda en localStorage bajo la clave `plurality-high-contrast`
- **Clase CSS aplicada**: `.high-contrast` en el `<body>`

#### Control "Tamaño de Fuente"
- **Función**: Ajusta el tamaño del texto de la página
- **Rango**: 12px a 20px
- **Valor por defecto**: 16px
- **Almacenamiento**: Se guarda en localStorage bajo la clave `plurality-font-size`
- **Aplicación**: Modifica la propiedad `font-size` del `<html>`

### Código de Inicialización
```javascript
// El AccessibilityManager se inicia automáticamente cuando el DOM está listo
AccessibilityManager.init();
```

### Archivos
- Lógica: `/js/modules/accessibility.js`
- Estilos: `/css/style.css` (sección "Alto Contraste" y "Range input styling")
- HTML: Panel en `index.html`

---

## 2. Nueva Sección: "La Inclusión en el Pacífico: Nuestra Identidad Cultural"

### Ubicación
- Dentro del módulo de **"Inclusión"** en la sección "Inclusión en la Práctica"
- Es la **5ª y última sección** del módulo (después de "Inclusión Familiar")

### Contenido
- **Subtítulo**: "La Inclusión en el Pacífico: Nuestra Identidad Cultural"
- **Texto exacto**: Habla sobre Buenaventura, etnoeducación, saberes ancestrales y tradición oral
- **Autor**: Comunidad del Pacífico
- **Contexto**: "La etnoeducación es el camino hacia la verdadera inclusión"

### Datos
Se agregó un nuevo objeto en `quizData.inclusionContent` en `/js/data/quiz.js`:

```javascript
{
    id: 5,
    title: "La Inclusión en el Pacífico: Nuestra Identidad Cultural",
    content: "En Buenaventura y la región del Pacífico, ...",
    author: "Comunidad del Pacífico",
    context: "La etnoeducación es el camino hacia la verdadera inclusión"
}
```

---

## 3. Trivia Rápida: "El Desafío de la Inclusión"

### Ubicación
- Al final de la sección de **Inclusión** (después de la última sección)
- Se muestra solo cuando el usuario llega a la última sección del módulo

### Características
- **Formato**: Una pregunta a la vez
- **Total**: 3 preguntas
- **Validación**: Feedback visual inmediato (verde = correcto, rojo = incorrecto)
- **Progreso**: Barra visual que muestra el avance
- **Flujo**:
  1. Mostrar pregunta
  2. Usuario selecciona respuesta
  3. Mostrar feedback (correcta/incorrecta)
  4. Botón para siguiente pregunta o reintentar

### Las 3 Preguntas

**Pregunta 1**: ¿Dónde se encuentran realmente las barreras para el aprendizaje?
- Opción A: Exclusivamente en las limitaciones físicas o cognitivas del estudiante.
- **Opción B**: En el sistema educativo, los currículos rígidos y el entorno social. ✅
- Opción C: Únicamente en la falta de recursos económicos de las familias.

**Pregunta 2**: ¿Qué significa educar en la diversidad?
- Opción A: Enseñar a todos exactamente lo mismo y con el mismo método.
- Opción B: Crear salones especiales y separados para quienes tienen dificultades.
- **Opción C**: Construir ambientes flexibles adaptando las estrategias a las necesidades de cada estudiante. ✅

**Pregunta 3**: Según los criterios de inclusión, ¿qué es la "Equidad"?
- Opción A: Dar a todos exactamente lo mismo.
- **Opción B**: Dar a cada estudiante los apoyos específicos que requiere para alcanzar sus metas. ✅
- Opción C: Evaluar a todos con el mismo examen estandarizado.

### Datos
Las preguntas están en el objeto `InteractiveComponents.trivia.questions` en `/js/modules/interactive.js`

### Estilos
- Botones de respuesta con estados: hover, correcto (verde), incorrecto (rojo)
- Animaciones suaves
- Feedback visual clara

---

## 4. Muro de Compromisos por la Inclusión (LocalStorage)

### Ubicación
- Nueva sección accesible desde la navegación principal
- Etiqueta en navbar: **"Compromisos"**
- Puede accederse directamente o al final de cada módulo

### Características

#### Formulario
- **Campo 1**: Input de texto para el nombre
- **Campo 2**: Textarea para escribir el compromiso
- **Botón**: "Publicar Compromiso"

#### Visualización
- **Formato**: Grid de tarjetas estilo "notas adhesivas"
- **Diseño**: 
  - Color: Degradado amarillo-naranja
  - Rotación leve (efecto de notas desordenadas)
  - Sombra suave
  - Efecto hover: zoom y más sombra
- **Información por tarjeta**:
  - Nombre del autor
  - Texto del compromiso
  - Fecha y hora de publicación
  - Botón de eliminar (ícono X)

#### Almacenamiento
- **LocalStorage**: Todos los compromisos se guardan automáticamente
- **Clave**: `plurality-compromisos`
- **Formato**: JSON array
- **Persistencia**: Los compromisos se mantienen aunque se recargue la página

#### Funcionalidades
- ✅ Publicar nuevo compromiso
- ✅ Listar todos los compromisos guardados
- ✅ Eliminar compromiso individual (con confirmación)
- ✅ Persiste datos entre sesiones

### Estructura de Datos
```javascript
{
    nombre: "Nombre del usuario",
    compromiso: "Texto del compromiso...",
    fecha: "29 de mayo de 2026 12:30"
}
```

### Archivos
- Lógica: `/js/modules/interactive.js` (objeto `InteractiveComponents.muro`)
- Estilos: `/css/style.css` (sección "Sticky Notes")

---

## Archivos Modificados

### Nuevos archivos creados:
1. `/js/modules/accessibility.js` - Gestor de accesibilidad
2. `/js/modules/interactive.js` - Trivia y Muro de Compromisos

### Archivos modificados:
1. `/index.html` - Panel flotante, scripts incluidos, navegación actualizada
2. `/js/app.js` - Caso "compromisos" en switch de render
3. `/js/data/quiz.js` - Nueva sección de Buenaventura en inclusionContent
4. `/js/modules/inclusion.js` - Integración de trivia en la última sección
5. `/css/style.css` - Estilos personalizados para todas las nuevas funcionalidades

---

## Uso del Usuario

### Panel de Accesibilidad
1. El usuario ve los botones en la esquina superior derecha
2. **Alto Contraste**: Click para activar modo de alto contraste
3. **Tamaño de Fuente**: Deslizar el slider para aumentar/disminuir fuente
4. Las preferencias se guardan y persisten en futuras visitas

### Navegación a Muro de Compromisos
1. **Opción 1**: Desde el navbar > clic en "Compromisos"
2. **Opción 2**: Al final del módulo de Inclusión > botón "Ir al Inicio" redirige al dashboard

### Publicar un Compromiso
1. Navegar a la sección "Compromisos"
2. Rellenar nombre y texto del compromiso
3. Clic en "Publicar Compromiso"
4. La tarjeta aparece en la grilla junto a otros compromisos

### Hacer la Trivia
1. Navegar a "Inclusión" en el navbar
2. Pasar por todas las secciones (Anterior/Siguiente)
3. En la última sección (Buenaventura), aparece la trivia
4. Responder las 3 preguntas
5. Ver feedback inmediato (verde/rojo)
6. Opción de reintentar después de terminar

---

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos personalizados, gradientes, transformaciones, transiciones
- **JavaScript Nativo**: Sin librerías externas
- **LocalStorage API**: Para persistencia de datos
- **Tailwind CSS**: Clases utilitarias para diseño rápido

---

## Notas Importantes

1. **Compatibilidad**: Los componentes funcionan en todos los navegadores modernos
2. **Responsividad**: El grid del muro es adaptativo (1 columna móvil, 2-3 en desktop)
3. **Accesibilidad**: 
   - Alto contraste mejora visibilidad para baja visión
   - Control de tamaño de fuente beneficia legibilidad
4. **Performance**: LocalStorage es eficiente para pequeños volúmenes de datos
5. **Estado**: El panel de accesibilidad persiste aunque se navegue entre módulos

---

## Cambios Visuales

### Antes
- Navegación sin "Compromisos"
- Sin panel de accesibilidad
- Módulo de inclusión con 4 secciones

### Después
- Nueva sección "Compromisos" en navbar
- Panel flotante de accesibilidad en esquina superior derecha
- Módulo de inclusión con 5 secciones (+ Buenaventura)
- Trivia integrada en la última sección
- Muro visual con tarjetas estilo notas adhesivas

---

¡La aplicación está lista para usar estas nuevas funcionalidades!
