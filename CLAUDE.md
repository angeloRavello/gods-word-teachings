# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Estado actual:** ya existen el motor compartido (`assets/`), la portada, `_template/`, `tools/screen-info/` y la primera presentación (`00001-evangelism`). No hay build, lint ni tests automatizados: es HTML/CSS/JS estático sin dependencias. La prueba es manual: abrir con el teclado en Chrome y luego en la TV.

# Presentaciones HTML para TV Samsung 4K

## Objetivo del proyecto
Crear presentaciones en HTML, simples y fáciles de leer, para reemplazar los PPT. Se ven en el **navegador web integrado de una Smart TV Samsung 4K (Tizen)**, se publican en **GitHub Pages** y se manejan **solo con el control remoto de la TV** (flechas + OK). No hay control desde el celular ni servidor.

## Público y propósito actual
- Las presentaciones son **para mi abuela**: una persona mayor que las verá en la TV, a distancia, a su propio ritmo.
- Tema: **Dios, según lo que enseña la Biblia.** El enfoque es que se **entienda**: lenguaje sencillo, cálido y respetuoso, una idea a la vez.
- Versiones bíblicas: **NTV** (Nueva Traducción Viviente) y **RVR1960** (Reina-Valera 1960).

## Contexto (por qué este enfoque)
- La duplicación de pantalla desde el celular (Smart View / AirPlay) se queda cargando y no es confiable.
- En las TV Samsung no se pueden instalar otros navegadores. El navegador integrado usa un motor Chromium antiguo, que depende del año del modelo, y tiene poca RAM y CPU.
- Se descartaron Canva, AhaSlides, Slides.com y PowerPoint Live por pesados o dependientes de terceros, y la app nativa de Tizen por compleja.
- Solución: páginas HTML estáticas y ligeras que se abren desde un favorito en el navegador de la TV.

---

## Contenido bíblico: reglas obligatorias

### Citas
- **Toda cita bíblica lleva su referencia completa y la versión**: libro, capítulo, versículo(s) y abreviatura. Ejemplos: `Juan 3:16 (NTV)`, `Salmo 23:1-3 (RVR1960)`.
- **Cada punto de enseñanza** indica en qué capítulo y versículo se basa, aunque el texto no se cite completo. Ejemplo: `Dios nos cuida — Mateo 6:26`.
- El texto citado debe ser **literal y exacto** según la versión indicada. **Nunca** inventar, completar de memoria ni parafrasear dentro de una cita. Antes de publicar, verificar cada versículo contra una fuente confiable (BibleGateway, Biblia.com o la Biblia física). Si no se pudo verificar, marcarlo con `<!-- VERIFICAR: Juan 3:16 NTV -->` y avisar.
- Las explicaciones propias van **separadas visualmente** del texto bíblico. Nunca deben parecer parte de la Escritura (ver componentes abajo).
- No sacar versículos de contexto. Si un versículo depende del anterior, incluir el rango o explicarlo.
- Contenido fiel al texto, sin entrar en polémicas doctrinales ni denominacionales.

### Uso de las dos versiones
- **Lectura bíblica = siempre ambas versiones.** Cada vez que se muestre un pasaje para leer, primero va **NTV** y **justo después RVR1960**, con el mismo pasaje y la misma referencia. Sin excepciones y sin otro contenido entre las dos.
- Cómo mostrarlas sin perder legibilidad:
  - Si ambas caben cómodas en una vista (respetando los tamaños mínimos de letra), se muestran en la misma diapositiva como dos pasos consecutivos: con `→` aparece la tarjeta NTV y con el siguiente `→` la tarjeta RVR1960 debajo.
  - Si el pasaje es largo, NTV ocupa una diapositiva y RVR1960 la **diapositiva inmediatamente siguiente**, con el mismo título y la misma referencia.
  - Nunca reducir la letra para que quepan las dos.
- **Citas breves o para recordar** (referencias dentro de un punto, el resumen, el "Versículo para recordar", frases cortas de apoyo): se puede usar **solo RVR1960**.
- La versión siempre debe verse clara en cada tarjeta de versículo, también con su color (ver paleta).

### Derechos de autor
- NTV (© Tyndale House Foundation) y RVR1960 (© Sociedades Bíblicas en América Latina, renovado © Sociedades Bíblicas Unidas) permiten citas limitadas en usos no comerciales, siempre con el aviso de copyright. Cada presentación termina con una **diapositiva de créditos** con los avisos de ambas versiones. La portada lleva una nota breve en el pie.
- Citar versículos puntuales; no copiar capítulos ni libros completos.

### Estructura recomendada de cada presentación (8–15 diapositivas)
1. **Portada**: título en forma de pregunta o frase simple (ej. "¿Quién es Dios?").
2. **Pregunta de inicio**: algo cercano que invite a pensar.
3. **Puntos** (2–4 en total). Cada uno sigue el mismo ritmo:
   a. Idea en una frase corta + referencia.
   b. "La Biblia dice": tarjeta del pasaje en **NTV**.
   c. Inmediatamente después: el mismo pasaje en **RVR1960** (obligatorio).
   d. "¿Qué significa?": explicación en 1–3 frases sencillas, con ilustración o ícono si ayuda.
4. **Resumen**: los puntos en lista corta, cada uno con su referencia (citas breves solo en RVR1960 si se incluyen).
5. **Versículo para recordar**: uno solo, grande, en **RVR1960**.
6. **Cierre**: una reflexión o una oración corta (opcional).
7. **Créditos**: versiones usadas y avisos de copyright.

---

## Lectura cómoda y buena comprensión (prioridad máxima)
- **Una idea por diapositiva.** Máximo 3 viñetas cortas por vista. Si no cabe, dividir en dos diapositivas o en pasos.
- **Tamaño de letra grande** (base 1920×1080):
  - Texto normal: mínimo `3.4vw` (~65 px).
  - Versículos: `3.8vw`–`4.2vw`.
  - Títulos: `5vw`–`6vw`.
  - Referencias: mínimo `2.6vw`.
  - Nunca menos de `2.4vw` para nada que deba leerse.
- **Líneas cortas**: máximo ~40–45 caracteres por línea (`max-width` en `ch`). Interlineado de `1.5`–`1.6`.
- **Texto alineado a la izquierda** en párrafos y versículos, sin justificar. Se puede centrar solo en títulos cortos.
- No usar MAYÚSCULAS sostenidas ni cursiva en textos largos. Para destacar, usar **negrita + color de acento** solo en 1–3 palabras clave por diapositiva.
- **Alto contraste sin deslumbrar**: fondo crema cálido con texto casi negro (preferido), o fondo azul noche con texto crema. Contraste mínimo 7:1 (WCAG AAA) para el texto de lectura.
- **Revelado paso a paso** (fragmentos): con `→` aparece primero la idea, luego el versículo y luego la explicación. Así la vista sigue el orden de lectura.
- **Nada automático**: sin autoavance ni temporizadores. Ella avanza cuando termina de leer.
- Animaciones suaves y cortas (aparición con `opacity`, 300–400 ms). Sin efectos llamativos que distraigan.
- Diseño y posiciones **consistentes** en todas las diapositivas: el título siempre arriba, la referencia siempre en el mismo lugar y el indicador `3 / 10` discreto en una esquina.

## Recursos visuales
- **Paleta con significado (fija en todo el proyecto)**:
  - Fondo crema `#FBF6EC`, texto principal `#1F1A14`.
  - Tarjetas NTV con acento **azul** `#1E4E8C`; tarjetas RVR1960 con acento **vino/borgoña** `#7A1E2C`.
  - Explicación "¿Qué significa?" con acento **verde** `#2F6B3A`.
  - Palabras clave en **dorado oscuro** `#8A5A00` (sobre fondo crema).
  - El color nunca es la única pista: la versión también va escrita.
- **Ilustraciones**: SVG simple, inline o en archivo, de trazo limpio. Usar símbolos como Biblia abierta, luz o sol, camino, corazón, manos, oveja y pastor, cruz o paloma. **No representar el rostro de Dios ni de Jesús.** No usar fotos de personas reales ni imágenes con derechos de autor.
- **Viñetas**: íconos SVG simples y grandes (~1.2em), coherentes en todo el proyecto. **No usar emojis**, porque los navegadores antiguos de Tizen pueden no mostrarlos.
- Las imágenes acompañan, no compiten: máximo una ilustración por vista, al lado o encima del texto, nunca detrás.

---

## Pantalla 4K: consideraciones
- Aunque la TV es 4K, el navegador de Samsung normalmente dibuja la página a **1920×1080 px CSS** y la escala. Diseñar sobre **1920×1080** con unidades `vw`/`vh` para que escale a cualquier resolución.
- Comprobarlo una vez en la TV con una página de diagnóstico (`/tools/screen-info/`) que muestre `window.innerWidth`, `innerHeight` y `devicePixelRatio`. Resultado medido en la TV (2026-11-19): **ventana 1920×1080 px CSS, navegador Chrome 108.0.5359.1**. La pantalla completa funciona.
- **Preferir SVG** para ilustraciones e íconos, porque se ven nítidos en 4K sin pesar más.
- Fotos o fondos de mapa de bits: máximo **2560 px** de ancho y ≤ 300 KB (JPG/WebP). No usar imágenes 3840 px, porque consumen demasiada memoria de la TV.
- Dejar un margen de seguridad de ~5% en todos los bordes (overscan).

---

## Estructura del repositorio
Un solo repositorio público, `gods-word-teachings` ("enseñanzas de la Palabra de Dios"), publicado en `https://angeloravello.github.io/gods-word-teachings/`.

```
gods-word-teachings/
├── index.html                      # Portada: lista de presentaciones, navegable con flechas
├── CLAUDE.md
├── README.md                       # Cómo agregar una presentación (breve, para humanos)
│
├── assets/                         # Todo lo compartido
│   ├── css/
│   │   ├── 01-tokens.css           # Variables: colores, tamaños, espaciados, tiempos
│   │   ├── 02-base.css             # Reset mínimo, tipografía base, body, foco global
│   │   ├── 03-layout.css           # Estructura de la diapositiva, zonas seguras, rejillas
│   │   ├── 04-components/          # Un archivo por componente
│   │   │   ├── slide.css
│   │   │   ├── verse-card.css      # Tarjeta de versículo (NTV / RVR1960)
│   │   │   ├── meaning-box.css     # Caja "¿Qué significa?"
│   │   │   ├── bullet-list.css
│   │   │   ├── progress.css        # Indicador 3 / 10
│   │   │   └── home-menu.css       # Lista de la portada
│   │   ├── 05-utilities.css        # Clases de ayuda pequeñas (.u-center, .u-hidden…)
│   │   └── 06-animations.css       # Transiciones y fragmentos
│   ├── js/
│   │   ├── core/
│   │   │   ├── namespace.js        # Crea window.TV = {} (cargar primero)
│   │   │   └── keys.js             # Mapa de teclas del control → acciones
│   │   ├── modules/
│   │   │   ├── deck.js             # Motor de diapositivas (ir a, siguiente, anterior)
│   │   │   ├── fragments.js        # Revelado paso a paso dentro de una diapositiva
│   │   │   ├── focus.js            # Foco entre elementos interactivos (↑ ↓ OK)
│   │   │   ├── progress.js         # Actualiza el indicador de posición
│   │   │   ├── preload.js          # Precarga imágenes de la siguiente diapositiva
│   │   │   ├── fullscreen.js       # Botón de pantalla completa (en la portada de cada presentación)
│   │   │   └── pointer.js          # Clic del puntero de la TV → acciones (navegación principal)
│   │   └── pages/
│   │       ├── home.js             # Inicializa la portada
│   │       └── presentation.js     # Inicializa una presentación
│   ├── icons/                      # Íconos SVG compartidos (bible.svg, light.svg…)
│   └── fonts/                      # (Opcional) una fuente WOFF legible
│
├── _template/                      # Plantilla para copiar al crear una presentación
│   └── index.html
│
├── tools/
│   └── screen-info/index.html      # Diagnóstico de resolución de la TV
│
├── 00001-who-is-god/
│   ├── index.html                  # Contenido de la presentación (solo HTML semántico)
│   ├── presentation.css            # (Opcional) ajustes propios, mínimos
│   └── img/                        # Ilustraciones propias de esta presentación
└── 00002-god-loves-us/
    └── …
```

### Nombres de carpetas de presentaciones (formato obligatorio)
- Formato: `NNNNN-english-name-in-kebab-case`.
  - `NNNNN`: número **correlativo de 5 dígitos con ceros a la izquierda**, empezando en `00001`.
  - Después del guion: el nombre **en inglés**, en minúsculas, palabras separadas por guiones, sin tildes ni caracteres especiales.
  - Ejemplos: `00001-who-is-god`, `00002-god-loves-us`, `00003-the-good-shepherd`.
- No reutilizar ni renumerar números ya publicados (romperían favoritos y enlaces). Si se elimina una, su número queda libre sin usar.
- El título visible en pantalla siempre va **en español**. El inglés es solo para la carpeta.
- La portada lista las presentaciones en orden numérico.

### Buenas prácticas de CSS
- **Orden de carga fijo**, siguiendo los prefijos numéricos: tokens → base → layout → componentes → utilidades → animaciones. Cada página los enlaza con `<link>` en ese orden. No usar `@import`, porque hace más lenta la carga.
- **Todos los valores de diseño viven en `01-tokens.css`** como custom properties (`--color-bg`, `--font-size-verse`, `--space-m`, `--duration-fade`). Los componentes solo usan variables, sin colores ni tamaños "mágicos" repetidos. Cambiar el aspecto de todo el proyecto debe ser editar un solo archivo.
- Nombres de clases con **BEM**: `.verse-card`, `.verse-card__reference`, `.verse-card--rvr1960`. Estados con prefijo `is-`: `.is-active`, `.is-focused`, `.is-visible`.
- Selectores de baja especificidad: solo clases, sin IDs para estilos y sin `!important` (excepto en utilidades).
- Cada archivo empieza con un comentario breve: qué es y qué clases define.
- `presentation.css` de cada carpeta solo para excepciones reales. Si algo se repite en dos presentaciones, se convierte en componente compartido.

### Buenas prácticas de JavaScript
- **Sin módulos ES** (no compatibles con Tizen antiguos). Cada archivo es un **IIFE** que se registra en el espacio de nombres global `window.TV` (ej. `TV.deck`, `TV.keys`), y se cargan con `<script defer>` en orden: `core/` → `modules/` → `pages/`.
- **Una responsabilidad por archivo.** Los módulos no se llaman en cadena desordenadamente: se comunican con eventos personalizados (`document.dispatchEvent(new CustomEvent('tv:slidechange', …))`) o mediante funciones públicas claras.
- `keys.js` es el **único lugar** con códigos de teclas. Traduce teclas a acciones (`'next'`, `'prev'`, `'up'`, `'down'`, `'select'`, `'home'`), y el resto del código solo conoce acciones.
- El contenido **no vive en JS**: las diapositivas se escriben en HTML semántico y el JS solo las controla.
- Comentarios en español explicando el *porqué*. Nombres de funciones y variables en inglés, descriptivos (`goToSlide`, `revealNextFragment`).
- Sin dependencias externas ni build steps.

### Marcado HTML de una presentación (convención)
```html
<section class="slide" data-slide>
  <h2 class="slide__title">Dios nos cuida</h2>
  <p class="slide__point fragment">Dios cuida de las aves, y mucho más de ti.
    <span class="ref">Mateo 6:26</span></p>

  <!-- Lectura bíblica: siempre NTV y luego RVR1960, consecutivas -->
  <blockquote class="verse-card verse-card--ntv fragment">
    <p class="verse-card__text">…texto literal verificado (NTV)…</p>
    <cite class="verse-card__reference">Mateo 6:26 <abbr>NTV</abbr></cite>
  </blockquote>

  <blockquote class="verse-card verse-card--rvr1960 fragment">
    <p class="verse-card__text">…texto literal verificado (RVR1960)…</p>
    <cite class="verse-card__reference">Mateo 6:26 <abbr>RVR1960</abbr></cite>
  </blockquote>

  <aside class="meaning-box fragment">
    <h3 class="meaning-box__title">¿Qué significa?</h3>
    <p>…explicación sencilla…</p>
  </aside>
</section>
```

---

## Navegación con el control remoto

**Comprobado en la TV real:** el navegador de Samsung NO entrega las flechas a la página. Tiene dos modos: **puntero** (las flechas mueven un cursor y OK hace clic) y **desplazamiento** (ícono de 4 direcciones; las flechas desplazan la página). Lo único que llega a la página es el **clic**. Por eso la navegación principal es por puntero (`assets/js/modules/pointer.js`):
- Clic en cualquier zona libre: 25 % izquierdo = anterior, el resto = siguiente. Basta con dejar el cursor a la derecha y pulsar OK.
- Botones grandes `‹ ›` (`deck-nav`) en los márgenes laterales como guía visual, con `data-action="prev|next"`.
- Los clics sobre enlaces y botones se dejan pasar (portada, "Volver al inicio", pantalla completa).
- Todo clic se traduce a la misma acción `tv:action` que las teclas, así fragmentos y diapositivas se comportan igual.

Las teclas siguen soportadas (teclado en la PC, o si algún modelo las entrega):
- `←` / `→` (keyCode 37 / 39): paso o diapositiva anterior / siguiente. Primero se revelan los fragmentos y luego se pasa de diapositiva.
- `↑` / `↓` (38 / 40): mover el foco entre elementos interactivos (en la portada, entre presentaciones).
- `OK` / `Enter` (13): activar el elemento enfocado.
- Detectar con `event.keyCode` además de `event.key`, porque algunos motores antiguos no envían `key`.
- Nada debe depender del hover. Todo lo interactivo debe funcionar con **clic** (puntero de la TV) y con teclado. **Foco muy visible**: borde grueso de alto contraste y ligera escala.
- Cada presentación permite volver a la portada (enlace "Volver al inicio" en la diapositiva final, alcanzable con flechas + OK).

## Reglas técnicas (compatibilidad con Tizen)
- **HTML, CSS y JavaScript puro**, sin frameworks, CDNs externos, Google Fonts ni build steps.
- JavaScript conservador. Evitar: `?.`, `??`, `import`/`export`, `async/await`, campos privados `#`, `Array.prototype.at`, `structuredClone`, `replaceAll`. Se aceptan `let`/`const`, arrow functions y template literals.
- CSS conservador. Evitar: `gap` en flexbox (usar márgenes; `gap` en grid sí está bien), `aspect-ratio`, `:has()`, `:is()`/`:where()`, container queries, `inset`, CSS nesting, `backdrop-filter`. Custom properties sí se pueden usar.
- Animar solo `transform` y `opacity`.
- Pantalla completa sin scroll en cada diapositiva.
- Fuentes del sistema (`sans-serif` legible) o una sola WOFF local.
- Peso objetivo por presentación: < 3 MB en total.

---

## Publicación (GitHub CLI en la PC del usuario)
Requisitos: `git`, `gh` con sesión iniciada (`gh auth status`) y un repo **público** (GitHub Pages gratis lo exige).

Primera vez:
```bash
git init && git add . && git commit -m "feat: initial presentations site"
git branch -M main
gh repo create gods-word-teachings --public --source . --push
gh api -X POST repos/{owner}/gods-word-teachings/pages -f "source[branch]=main" -f "source[path]=/"
```
Actualizaciones:
```bash
git add . && git commit -m "feat: add 00002-god-loves-us" && git push
```
Los mensajes de commit siguen **Conventional Commits** (`feat:`, `fix:`, `docs:`, `style:`, `chore:`), sin líneas de atribución a IA.
URL: `https://angeloravello.github.io/gods-word-teachings/` (Pages tarda 1–2 minutos en actualizar).

## Cómo agregar una presentación
1. Copiar `_template/` a una carpeta nueva con el siguiente número: `0000N-english-name`.
2. Escribir el contenido siguiendo la estructura recomendada y las reglas de citas.
3. Verificar cada versículo contra la fuente y revisar que todos los puntos tengan su referencia.
4. Agregar el enlace en la portada (`index.html` raíz).
5. Probar con el teclado en Chrome, luego publicar y probar en la TV.

## Lista de verificación antes de publicar
- [ ] Carpeta con formato `NNNNN-english-name` y número correlativo.
- [ ] Cada cita con libro, capítulo, versículo y versión; texto verificado y literal.
- [ ] Toda lectura bíblica muestra NTV y justo después RVR1960 (mismo pasaje). Las citas breves o para recordar, solo en RVR1960.
- [ ] Cada punto con su referencia.
- [ ] Máximo 3 viñetas por vista; textos cortos; letra en los tamaños mínimos.
- [ ] Explicaciones visualmente separadas del texto bíblico.
- [ ] Diapositiva de créditos con los avisos de NTV y RVR1960.
- [ ] Todo se recorre solo con flechas + OK; foco visible; vuelve a la portada.
- [ ] Sin errores en consola; peso < 3 MB; sin emojis ni recursos externos.
- [ ] Probado en la TV real.

## Fuera de alcance (por ahora)
Control desde el celular, sincronización entre dispositivos, backend, app nativa de Tizen y conversión automática de .pptx.
