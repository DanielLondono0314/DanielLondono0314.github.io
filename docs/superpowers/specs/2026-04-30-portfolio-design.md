# Portfolio Daniel Londoño — Diseño

**Fecha:** 2026-04-30
**Repo:** https://github.com/DanielLondono0314/daniel.github.io
**Deploy:** GitHub Pages en `https://daniellondono0314.github.io`

---

## 1. Resumen

Portfolio de una sola página (SPA estática) para Daniel Londoño, Vibecoder & AI App Builder, deployado en GitHub Pages. Tecnología: HTML + CSS + JavaScript vanilla. Sin frameworks, sin build step. Los proyectos se configuran en `data/projects.json` para que agregar o editar proyectos no requiera tocar código.

**Referencia visual:** https://www.pszostak.pl — dark navy profundo, nav pill centrado, tipografía limpia, cards con colores de acento por proyecto.

---

## 2. Arquitectura de archivos

```
daniel.github.io/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── data/
│   └── projects.json
└── assets/
    ├── photo.jpg         # foto del hero (escalera)
    └── favicon.ico
```

### `data/projects.json` — estructura

```json
[
  {
    "id": "kennel-stride",
    "name": "Kennel Stride",
    "description": "CRM para manejo de centros caninos. Registro de clientes, seguimiento de mascotas y gestión de servicios.",
    "liveUrl": "https://kennel-stride.lovable.app",
    "repoUrl": "https://github.com/DanielLondono0314/kennel-stride",
    "tags": ["React", "AI", "CRM", "Lovable"],
    "accentColor": "#F97316"
  },
  {
    "id": "danielytuperro",
    "name": "DanielYTuPerro",
    "description": "Plataforma de asesorías caninas con calendario, rutinas en video, chat directo, chat de voz y membresía paga.",
    "liveUrl": "https://danielytuperro.lovable.app/",
    "repoUrl": "https://github.com/DanielLondono0314/danielytuperro",
    "tags": ["React", "AI", "SaaS", "Lovable"],
    "accentColor": "#7C3AED"
  },
  {
    "id": "boca2",
    "name": "Boca2",
    "description": "App para guardar recomendaciones de foodies de Instagram. Scraping de posts con IA, mapa interactivo de lugares.",
    "liveUrl": "https://boca2.lovable.app/",
    "repoUrl": "https://github.com/DanielLondono0314/boca2",
    "tags": ["React", "AI", "Maps", "Scraping"],
    "accentColor": "#EC4899"
  }
]
```

Para agregar un proyecto: abrir `data/projects.json`, pegar un bloque nuevo, hacer commit. El JS lo renderiza automáticamente.

---

## 3. Diseño Visual

### Paleta de colores

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#0d0d14` | Fondo general |
| `--surface` | `#13131f` | Cards, nav |
| `--border` | `rgba(255,255,255,0.08)` | Bordes sutiles |
| `--text` | `#f0f0f0` | Texto principal |
| `--text-muted` | `#888` | Texto secundario |
| `--accent-1` | `#7C3AED` | Violeta primario |
| `--accent-2` | `#EC4899` | Rosa secundario |
| `--gradient` | `linear-gradient(135deg, #7C3AED, #EC4899)` | Títulos, CTAs |

### Tipografía

- **Familia:** Inter (Google Fonts)
- **Títulos hero:** 56-72px, weight 800, gradient clip
- **Subtítulos:** 32-40px, weight 700
- **Body:** 16px, weight 400, line-height 1.6
- **Tags/badges:** 12px, weight 600, uppercase, letter-spacing 0.08em

### Fondo

- Color base `#0d0d14`
- Dot grid SVG pattern con opacidad 0.15 (CSS `background-image`)
- Spotlight radial gradient violeta centrado en hero (estático, no animado)

---

## 4. Secciones

### 4.1 Navbar

- Posición: `fixed top`, centrado horizontalmente
- Fondo: `rgba(13,13,20,0.8)` + `backdrop-filter: blur(12px)`
- Forma: pill (`border-radius: 999px`), borde `rgba(255,255,255,0.08)`
- Links: Home, Proyectos, Skills, Educación, Contacto
- Comportamiento: el link activo se resalta al hacer scroll (Intersection Observer)
- Mobile: hamburger menu con drawer deslizable desde arriba

### 4.2 Hero

**Layout desktop:** dos columnas — texto izquierda, foto derecha.

**Contenido texto:**
```
Hola, soy
Daniel Londoño
Vibecoder & AI App Builder

Construyo productos digitales con IA desde Medellín, Colombia.

[Ver proyectos ↓]   [LinkedIn ↗]
```

- "Daniel Londoño" en gradient text (`-webkit-background-clip: text`)
- Subtítulo con efecto typewriter CSS que cicla entre: `"Vibecoder"` → `"AI App Builder"` → `"Software Developer"` (pausa 2s por frase)
- Badge pill: `📍 Medellín, Colombia` y `🟢 Open to work`

**Foto:**
- Contenedor circular o con border-radius suave
- Borde con glow del gradiente (`box-shadow: 0 0 40px rgba(124,58,237,0.4)`)
- La imagen `assets/photo.jpg` ya provista

### 4.3 About

Sección breve — 3 stat cards + bio corta.

**Stats:**
- `3` Proyectos publicados
- `2` Idiomas (ES / EN C1)
- `2025` Building since

**Bio:** "Soy Daniel, vibecoder y AI App Builder desde Medellín. Construyo productos digitales reales usando IA como herramienta principal — Lovable, Claude y React son mi stack. Cada proyecto que ves aquí resuelve un problema concreto."

### 4.4 Proyectos (sección clave)

Los proyectos se leen desde `data/projects.json` con `fetch()` al cargar la página. El JS genera el HTML dinámicamente.

**Card — Estado cerrado:**
- Fondo: `var(--surface)` con borde sutil
- Header: nombre del proyecto + tags (chips)
- Descripción: 2 líneas
- Preview area: div con fondo gradiente usando `accentColor` del JSON + nombre del proyecto centrado en grande (no requiere screenshots externos — la card en sí es el visual)
- Botones: `[▶ Live Preview]` (primario, gradiente) y `[GitHub ↗]` (secundario, outline)

**Card — Estado Live Preview (al clickar ▶):**
- La card se expande en height con transición CSS (`max-height` transition)
- Aparece un `<iframe>` con `src` del `liveUrl`
- El iframe se setea con `sandbox="allow-scripts allow-same-origin allow-forms"` por seguridad
- Loading skeleton mientras carga el iframe
- Botón `[✕]` para colapsar + botón `[↗ Abrir en nueva pestaña]`

**Fallback X-Frame-Options:**
- Si el iframe dispara error de carga, se detecta via `iframe.onerror` o timeout de 5s
- Se reemplaza el iframe por un mensaje: `"Esta app no permite previsualización embebida"` + botón grande `[Abrir app ↗]`

**Grid layout:**
- Desktop (>1024px): 3 columnas
- Tablet (768-1024px): 2 columnas
- Mobile (<768px): 1 columna

### 4.5 Skills

Tres grupos de skill bars:

**Herramientas:**
| Skill | % |
|---|---|
| Lovable | 90% |
| Claude AI | 88% |
| React | 75% |

**Capacidades:**
| Skill | % |
|---|---|
| Prompt Engineering | 88% |
| Product Thinking | 80% |

**Idiomas:**
| Skill | % |
|---|---|
| Español | 100% |
| Inglés C1 | 85% |

**Animación:** Las barras arrancan en 0% y se llenan al entrar en viewport (Intersection Observer + CSS transition de 800ms).

### 4.6 Educación y Certificaciones

**Educación formal:**
- Corporación Universitaria Remington — Ingeniería de Software · En curso · Medellín

**Certificaciones** (chips/badges ordenados por fecha, más reciente primero):

| Certificación | Entidad | Fecha |
|---|---|---|
| EF SET English Certificate 70/100 (C1 Advanced) | EF Education | — |
| Desarrollo de Aplicaciones con IA | Platzi | oct. 2025 |
| Desarrollo Frontend con React.js | Platzi | oct. 2025 |
| Curso de Desarrollo Avanzado con Lovable | Platzi | oct. 2025 |
| Inglés Avanzado C1 | Platzi | oct. 2025 |
| Desarrollo Backend con Node.js | Platzi | oct. 2025 |
| HTML y CSS a Profundidad | Platzi | abr. 2023 |
| Curso Práctico de Frontend Developer | Platzi | feb. 2023 |
| Curso de Frontend Developer | Platzi | feb. 2023 |

Cada certificación: chip con icono de Platzi/EF, nombre, fecha. Layout: `flexbox wrap`.

### 4.7 Contacto / Footer

**CTA:**
```
¿Tienes un proyecto?
Hablemos.

[GitHub → https://github.com/DanielLondono0314]  [LinkedIn → https://www.linkedin.com/in/daniel-londono-perez/]  [Email → dearloups@gmail.com]
```

**Footer:**
```
Daniel Londoño · Medellín, Colombia · 2026
Hecho con Lovable + Claude ⚡
```

---

## 5. JavaScript — Comportamiento

Todo en `js/main.js`. Sin dependencias externas excepto Google Fonts (CSS).

### Funciones principales

| Función | Responsabilidad |
|---|---|
| `loadProjects()` | `fetch('data/projects.json')` → renderiza cards |
| `createProjectCard(project)` | Genera HTML de una card desde el objeto JSON |
| `togglePreview(id)` | Abre/cierra el iframe de live preview |
| `handleIframeError(id)` | Activa fallback si el iframe no carga |
| `initSkillBars()` | Intersection Observer para animar las barras |
| `initNavHighlight()` | Intersection Observer para resaltar nav activo |
| `initTypewriter()` | Efecto typewriter en el subtítulo del hero |

### Lazy loading de iframes

El `src` del iframe se setea **solo** cuando el usuario hace click en "Live Preview", no al cargar la página. Esto evita que los 3 proyectos carguen en background al entrar al sitio.

---

## 6. Responsividad

| Breakpoint | Comportamiento |
|---|---|
| < 480px | Stack vertical total, nav hamburger, cards 1col |
| 480-768px | Cards 1col, hero stack vertical |
| 768-1024px | Cards 2col, hero 2col |
| > 1024px | Cards 3col, hero 2col con foto grande |

---

## 7. Performance y GitHub Pages

- Sin build step — commit y push = deploy automático
- Google Fonts con `display=swap` para evitar FOIT
- Imagen hero con `loading="lazy"` y compresión recomendada < 200KB
- `fetch()` de projects.json con `cache: 'force-cache'` en producción
- No hay JS de terceros — todo vanilla

---

## 8. Mantenimiento futuro

**Agregar proyecto nuevo:**
1. Abrir `data/projects.json`
2. Pegar un nuevo objeto con `id`, `name`, `description`, `liveUrl`, `repoUrl`, `tags`, `accentColor`
3. Commit + push → GitHub Pages hace el resto

**Cambiar skill bars:**
- Buscar el array `skills` en `js/main.js` y editar los porcentajes

**Cambiar foto:**
- Reemplazar `assets/photo.jpg` con la nueva imagen (mismo nombre)
