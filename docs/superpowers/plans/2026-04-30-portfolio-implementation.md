# Portfolio Daniel Londoño — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page portfolio website in pure HTML/CSS/JS, deployable to GitHub Pages with zero build steps, featuring animated skill bars, a live project preview system with iframes, and a projects.json config for easy maintenance.

**Architecture:** One `index.html` as the entry point, `css/style.css` for all styles (CSS custom properties for theming), and `js/main.js` for all interactivity. Project data lives in `data/projects.json` and is fetched at runtime. No frameworks, no bundlers.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox, Intersection Observer API), JavaScript ES6+ (fetch, async/await, classList), Google Fonts (Inter), GitHub Pages

---

## File Map

| File | Responsibility |
|---|---|
| `index.html` | Full page markup — all sections, semantic HTML |
| `css/style.css` | All styles — tokens, layout, components, animations, media queries |
| `js/main.js` | All JS — loadProjects, typewriter, skill bars, nav highlight, iframe preview |
| `data/projects.json` | Project data — edit this to add/remove projects |
| `assets/photo.jpg` | Hero photo — replace file to update photo |
| `assets/favicon.ico` | Browser tab icon |

---

## Task 1: Project scaffolding

**Files:**
- Create: `index.html`
- Create: `css/style.css`
- Create: `js/main.js`
- Create: `data/projects.json`
- Create: `assets/` directory

- [ ] **Step 1: Create directory structure**

```bash
cd /Users/daniel/Desktop/daniel.github.io
mkdir -p css js data assets
```

- [ ] **Step 2: Create `data/projects.json`**

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

- [ ] **Step 3: Copy the hero photo**

The user's photo is in the conversation. Save it as `assets/photo.jpg`. If it is not yet in the filesystem, ask the user to drop it into `assets/photo.jpg` and confirm before continuing.

- [ ] **Step 4: Create empty placeholder files**

Create empty `index.html`, `css/style.css`, and `js/main.js` (content added in later tasks):

```bash
touch index.html css/style.css js/main.js
```

- [ ] **Step 5: Commit scaffold**

```bash
git add .
git commit -m "chore: scaffold project structure and project data"
```

---

## Task 2: HTML skeleton

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Write full HTML skeleton**

Write the following into `index.html`. This is the complete semantic structure — all sections are present as empty shells that later tasks will flesh out with content and CSS:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Daniel Londoño — Vibecoder & AI App Builder</title>
  <meta name="description" content="Portfolio de Daniel Londoño, Vibecoder y AI App Builder desde Medellín, Colombia." />
  <link rel="icon" href="assets/favicon.ico" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>

  <!-- NAV -->
  <header class="nav-wrapper">
    <nav class="nav-pill">
      <a href="#hero" class="nav-link active">Home</a>
      <a href="#projects" class="nav-link">Proyectos</a>
      <a href="#skills" class="nav-link">Skills</a>
      <a href="#education" class="nav-link">Educación</a>
      <a href="#contact" class="nav-link">Contacto</a>
    </nav>
    <button class="nav-hamburger" aria-label="Menú" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </header>

  <!-- MOBILE DRAWER -->
  <div class="nav-drawer" aria-hidden="true">
    <a href="#hero" class="drawer-link">Home</a>
    <a href="#projects" class="drawer-link">Proyectos</a>
    <a href="#skills" class="drawer-link">Skills</a>
    <a href="#education" class="drawer-link">Educación</a>
    <a href="#contact" class="drawer-link">Contacto</a>
  </div>

  <main>

    <!-- HERO -->
    <section id="hero" class="section hero">
      <div class="hero-text">
        <p class="hero-greeting">Hola, soy</p>
        <h1 class="hero-name">Daniel Londoño</h1>
        <p class="hero-role">
          <span class="typewriter" id="typewriter"></span>
          <span class="typewriter-cursor">|</span>
        </p>
        <p class="hero-bio">Construyo productos digitales con IA desde Medellín, Colombia.</p>
        <div class="hero-badges">
          <span class="badge">📍 Medellín, Colombia</span>
          <span class="badge badge--green">🟢 Open to work</span>
        </div>
        <div class="hero-cta">
          <a href="#projects" class="btn btn--primary">Ver proyectos ↓</a>
          <a href="https://www.linkedin.com/in/daniel-londono-perez/" target="_blank" rel="noopener" class="btn btn--outline">LinkedIn ↗</a>
        </div>
      </div>
      <div class="hero-photo-wrapper">
        <img src="assets/photo.jpg" alt="Daniel Londoño" class="hero-photo" loading="eager" />
      </div>
    </section>

    <!-- ABOUT -->
    <section id="about" class="section about">
      <div class="about-stats">
        <div class="stat-card">
          <span class="stat-number">3</span>
          <span class="stat-label">Proyectos publicados</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">2</span>
          <span class="stat-label">Idiomas</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">2025</span>
          <span class="stat-label">Building since</span>
        </div>
      </div>
      <p class="about-bio">
        Soy Daniel, vibecoder y AI App Builder desde Medellín. Construyo productos digitales reales
        usando IA como herramienta principal — Lovable, Claude y React son mi stack.
        Cada proyecto que ves aquí resuelve un problema concreto.
      </p>
    </section>

    <!-- PROJECTS -->
    <section id="projects" class="section projects">
      <p class="section-label">PORTFOLIO</p>
      <h2 class="section-title">Proyectos <span class="gradient-text">Destacados</span></h2>
      <p class="section-subtitle">Apps reales, resolviendo problemas reales.</p>
      <div class="projects-grid" id="projects-grid">
        <!-- JS inserts cards here -->
      </div>
    </section>

    <!-- SKILLS -->
    <section id="skills" class="section skills">
      <p class="section-label">HABILIDADES</p>
      <h2 class="section-title">Mi <span class="gradient-text">Stack</span></h2>
      <div class="skills-groups" id="skills-groups">
        <!-- JS inserts skill groups here -->
      </div>
    </section>

    <!-- EDUCATION -->
    <section id="education" class="section education">
      <p class="section-label">FORMACIÓN</p>
      <h2 class="section-title">Educación &amp; <span class="gradient-text">Certificaciones</span></h2>
      <div class="edu-card">
        <div class="edu-icon">🎓</div>
        <div class="edu-info">
          <h3 class="edu-name">Corporación Universitaria Remington</h3>
          <p class="edu-detail">Ingeniería de Software · En curso · Medellín, Colombia</p>
        </div>
      </div>
      <h3 class="certs-title">Certificaciones</h3>
      <div class="certs-grid">
        <div class="cert-chip">
          <span class="cert-issuer">EF</span>
          <span class="cert-name">EF SET English Certificate 70/100 (C1 Advanced)</span>
        </div>
        <div class="cert-chip">
          <span class="cert-issuer">Platzi</span>
          <span class="cert-name">Desarrollo de Aplicaciones con IA</span>
          <span class="cert-date">oct. 2025</span>
        </div>
        <div class="cert-chip">
          <span class="cert-issuer">Platzi</span>
          <span class="cert-name">Desarrollo Frontend con React.js</span>
          <span class="cert-date">oct. 2025</span>
        </div>
        <div class="cert-chip">
          <span class="cert-issuer">Platzi</span>
          <span class="cert-name">Curso de Desarrollo Avanzado con Lovable</span>
          <span class="cert-date">oct. 2025</span>
        </div>
        <div class="cert-chip">
          <span class="cert-issuer">Platzi</span>
          <span class="cert-name">Inglés Avanzado C1</span>
          <span class="cert-date">oct. 2025</span>
        </div>
        <div class="cert-chip">
          <span class="cert-issuer">Platzi</span>
          <span class="cert-name">Desarrollo Backend con Node.js</span>
          <span class="cert-date">oct. 2025</span>
        </div>
        <div class="cert-chip">
          <span class="cert-issuer">Platzi</span>
          <span class="cert-name">HTML y CSS a Profundidad</span>
          <span class="cert-date">abr. 2023</span>
        </div>
        <div class="cert-chip">
          <span class="cert-issuer">Platzi</span>
          <span class="cert-name">Curso Práctico de Frontend Developer</span>
          <span class="cert-date">feb. 2023</span>
        </div>
        <div class="cert-chip">
          <span class="cert-issuer">Platzi</span>
          <span class="cert-name">Curso de Frontend Developer</span>
          <span class="cert-date">feb. 2023</span>
        </div>
      </div>
    </section>

    <!-- CONTACT -->
    <section id="contact" class="section contact">
      <h2 class="contact-title">¿Tienes un proyecto?</h2>
      <p class="contact-sub">Hablemos.</p>
      <div class="contact-links">
        <a href="https://github.com/DanielLondono0314" target="_blank" rel="noopener" class="contact-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/daniel-londono-perez/" target="_blank" rel="noopener" class="contact-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          LinkedIn
        </a>
        <a href="mailto:dearloups@gmail.com" class="contact-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
          Email
        </a>
      </div>
    </section>

  </main>

  <footer class="footer">
    <p>Daniel Londoño · Medellín, Colombia · 2026</p>
    <p class="footer-sub">Hecho con Lovable + Claude ⚡</p>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Open `index.html` in a browser (File → Open or drag the file). You should see unstyled text for all sections — no errors in the console. The page should have all sections: hero, about, projects, skills, education, contact, footer.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add full HTML skeleton with all sections"
```

---

## Task 3: CSS — Design tokens, reset, and base styles

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Write base CSS (tokens + reset + typography + background)**

Write the following into `css/style.css`:

```css
/* ─── TOKENS ─── */
:root {
  --bg: #0d0d14;
  --surface: #13131f;
  --border: rgba(255, 255, 255, 0.08);
  --text: #f0f0f0;
  --text-muted: #888;
  --accent-1: #7C3AED;
  --accent-2: #EC4899;
  --gradient: linear-gradient(135deg, #7C3AED, #EC4899);
  --radius: 12px;
  --radius-lg: 20px;
  --transition: 0.3s ease;
}

/* ─── RESET ─── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: var(--text);
  background-color: var(--bg);
  background-image: radial-gradient(circle at 60% 10%, rgba(124, 58, 237, 0.12) 0%, transparent 60%),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30'%3E%3Ccircle cx='1' cy='1' r='1' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
  min-height: 100vh;
}
img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }

/* ─── TYPOGRAPHY ─── */
.gradient-text {
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ─── SECTIONS ─── */
.section {
  max-width: 1100px;
  margin: 0 auto;
  padding: 100px 24px;
}

.section-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: var(--accent-1);
  text-transform: uppercase;
  margin-bottom: 12px;
}

.section-title {
  font-size: 40px;
  font-weight: 800;
  margin-bottom: 12px;
}

.section-subtitle {
  color: var(--text-muted);
  margin-bottom: 48px;
}

/* ─── BUTTONS ─── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity var(--transition), transform var(--transition);
  border: none;
}
.btn:hover { opacity: 0.85; transform: translateY(-1px); }

.btn--primary {
  background: var(--gradient);
  color: #fff;
}

.btn--outline {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--border);
}
.btn--outline:hover { border-color: rgba(255,255,255,0.3); }
```

- [ ] **Step 2: Verify in browser**

Reload `index.html`. Background should be dark navy with subtle dot grid and a violet glow in the top-right area. Text should be white, Inter font.

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: add CSS tokens, reset, and base typography"
```

---

## Task 4: CSS — Navbar (pill + glassmorphism + hamburger)

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Append navbar styles to `css/style.css`**

```css
/* ─── NAVBAR ─── */
.nav-wrapper {
  position: fixed;
  top: 20px;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  pointer-events: none;
}

.nav-pill {
  display: flex;
  gap: 4px;
  padding: 6px 8px;
  background: rgba(19, 19, 31, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  border-radius: 999px;
  pointer-events: all;
}

.nav-link {
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-muted);
  transition: color var(--transition), background var(--transition);
}
.nav-link:hover { color: var(--text); }
.nav-link.active {
  background: rgba(124, 58, 237, 0.2);
  color: var(--text);
}

/* Hamburger — hidden on desktop */
.nav-hamburger {
  display: none;
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 101;
  background: rgba(19, 19, 31, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 10px;
  cursor: pointer;
  flex-direction: column;
  gap: 5px;
  pointer-events: all;
}
.nav-hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
  transition: transform var(--transition), opacity var(--transition);
}
.nav-hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
.nav-hamburger.open span:nth-child(2) { opacity: 0; }
.nav-hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

/* Mobile drawer */
.nav-drawer {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background: rgba(13, 13, 20, 0.97);
  backdrop-filter: blur(16px);
  padding: 80px 24px 32px;
  flex-direction: column;
  gap: 8px;
  transform: translateY(-100%);
  transition: transform 0.35s ease;
}
.nav-drawer.open { transform: translateY(0); }

.drawer-link {
  padding: 14px 16px;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-muted);
  border-radius: var(--radius);
  transition: color var(--transition), background var(--transition);
}
.drawer-link:hover {
  color: var(--text);
  background: rgba(255,255,255,0.05);
}

/* ─── RESPONSIVE: MOBILE NAV ─── */
@media (max-width: 768px) {
  .nav-pill { display: none; }
  .nav-hamburger { display: flex; }
  .nav-drawer { display: flex; }
}
```

- [ ] **Step 2: Verify in browser**

Reload. On desktop: a dark pill nav should appear fixed at the top center. On mobile (resize window to <768px): the pill nav disappears and a hamburger button appears top-right. Clicking hamburger (no JS yet) won't do anything — that's fine, JS comes later.

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: add navbar pill and mobile hamburger styles"
```

---

## Task 5: CSS — Hero section

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Append hero styles to `css/style.css`**

```css
/* ─── HERO ─── */
.hero {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 48px;
  padding-top: 120px;
}

.hero-greeting {
  font-size: 18px;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.hero-name {
  font-size: 64px;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 16px;
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-role {
  font-size: 22px;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 20px;
  min-height: 32px;
}

.typewriter-cursor {
  animation: blink 1s step-end infinite;
  color: var(--accent-1);
}
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

.hero-bio {
  color: var(--text-muted);
  font-size: 17px;
  margin-bottom: 24px;
  max-width: 440px;
}

.hero-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 32px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: rgba(255,255,255,0.06);
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 13px;
  color: var(--text-muted);
}
.badge--green { color: #4ade80; border-color: rgba(74, 222, 128, 0.2); background: rgba(74, 222, 128, 0.08); }

.hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

/* Photo */
.hero-photo-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-photo {
  width: 380px;
  height: 480px;
  object-fit: cover;
  border-radius: 24px;
  box-shadow: 0 0 60px rgba(124, 58, 237, 0.35), 0 0 0 1px rgba(124, 58, 237, 0.2);
}

@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
    text-align: center;
    padding-top: 100px;
    min-height: auto;
    padding-bottom: 60px;
  }
  .hero-photo-wrapper { order: -1; }
  .hero-photo { width: 220px; height: 280px; }
  .hero-name { font-size: 42px; }
  .hero-badges, .hero-cta { justify-content: center; }
  .hero-bio { margin-left: auto; margin-right: auto; }
}
```

- [ ] **Step 2: Verify in browser**

Reload. The hero should show: gradient name, role text with blinking cursor, badges, two CTA buttons. On the right: the photo with violet glow. On mobile: stacked vertically with photo on top.

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: add hero section styles with photo and CTA"
```

---

## Task 6: CSS — About, Skills, Education, Contact, Footer

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Append remaining section styles to `css/style.css`**

```css
/* ─── ABOUT ─── */
.about {
  text-align: center;
}
.about-stats {
  display: flex;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
  margin-bottom: 40px;
}
.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 32px 48px;
  min-width: 160px;
}
.stat-number {
  font-size: 48px;
  font-weight: 800;
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.stat-label {
  font-size: 13px;
  color: var(--text-muted);
  margin-top: 6px;
}
.about-bio {
  max-width: 620px;
  margin: 0 auto;
  color: var(--text-muted);
  font-size: 17px;
  line-height: 1.8;
}

/* ─── PROJECTS ─── */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
@media (max-width: 1024px) { .projects-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .projects-grid { grid-template-columns: 1fr; } }

.project-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: border-color var(--transition), transform var(--transition);
}
.project-card:hover {
  border-color: rgba(124, 58, 237, 0.3);
  transform: translateY(-4px);
}
.project-visual {
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 800;
  color: rgba(255,255,255,0.9);
  letter-spacing: -0.5px;
  text-align: center;
  padding: 16px;
}
.project-body { padding: 20px; }
.project-name {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
}
.project-desc {
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 16px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}
.project-tag {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(124, 58, 237, 0.15);
  color: #a78bfa;
  border: 1px solid rgba(124, 58, 237, 0.2);
}
.project-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.btn--sm {
  padding: 8px 16px;
  font-size: 13px;
}

/* iframe preview area */
.project-preview {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease;
  background: #000;
}
.project-preview.open { max-height: 520px; }
.project-preview iframe {
  width: 100%;
  height: 480px;
  border: none;
  display: block;
}
.preview-toolbar {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(0,0,0,0.4);
}
.preview-skeleton {
  width: 100%;
  height: 480px;
  background: linear-gradient(90deg, #13131f 25%, #1e1e30 50%, #13131f 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

.preview-fallback {
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: var(--text-muted);
  font-size: 14px;
  padding: 24px;
  text-align: center;
}

/* ─── SKILLS ─── */
.skills-groups {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px 60px;
}
@media (max-width: 640px) { .skills-groups { grid-template-columns: 1fr; } }

.skill-group-title {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent-1);
  margin-bottom: 20px;
}
.skill-item { margin-bottom: 18px; }
.skill-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
}
.skill-pct { color: var(--text-muted); }
.skill-track {
  height: 6px;
  background: rgba(255,255,255,0.08);
  border-radius: 999px;
  overflow: hidden;
}
.skill-fill {
  height: 100%;
  width: 0;
  border-radius: 999px;
  background: var(--gradient);
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ─── EDUCATION ─── */
.edu-card {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px;
  margin-bottom: 40px;
}
.edu-icon { font-size: 36px; }
.edu-name {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 6px;
}
.edu-detail { color: var(--text-muted); font-size: 14px; }
.certs-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.certs-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.cert-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font-size: 13px;
  transition: border-color var(--transition);
}
.cert-chip:hover { border-color: rgba(124, 58, 237, 0.4); }
.cert-issuer {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent-1);
  background: rgba(124, 58, 237, 0.15);
  padding: 2px 6px;
  border-radius: 4px;
}
.cert-name { font-weight: 500; }
.cert-date { color: var(--text-muted); font-size: 12px; }

/* ─── CONTACT ─── */
.contact { text-align: center; }
.contact-title {
  font-size: 52px;
  font-weight: 800;
  line-height: 1.1;
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
}
.contact-sub {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-muted);
  margin-bottom: 40px;
}
.contact-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
}
.contact-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 999px;
  font-weight: 600;
  font-size: 15px;
  transition: border-color var(--transition), transform var(--transition), background var(--transition);
}
.contact-link:hover {
  border-color: rgba(124, 58, 237, 0.5);
  background: rgba(124, 58, 237, 0.08);
  transform: translateY(-2px);
}

/* ─── FOOTER ─── */
.footer {
  text-align: center;
  padding: 32px 24px 48px;
  color: var(--text-muted);
  font-size: 14px;
  border-top: 1px solid var(--border);
}
.footer-sub { margin-top: 6px; font-size: 13px; opacity: 0.6; }
```

- [ ] **Step 2: Verify in browser**

Reload. All sections should be styled. The about stat cards, education card, cert chips, and contact links should all be visible and correctly styled. Skills section will be empty until JS renders it in Task 8.

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: add styles for about, projects, skills, education, contact, footer"
```

---

## Task 7: JavaScript — Navbar interactions (hamburger + active link on scroll)

**Files:**
- Modify: `js/main.js`

- [ ] **Step 1: Write the full JS file with navbar functions**

Write the following into `js/main.js`:

```js
/* ─── NAVBAR: HAMBURGER ─── */
function initHamburger() {
  const btn = document.querySelector('.nav-hamburger');
  const drawer = document.querySelector('.nav-drawer');
  if (!btn || !drawer) return;

  btn.addEventListener('click', () => {
    const isOpen = btn.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen);
    drawer.classList.toggle('open', isOpen);
    drawer.setAttribute('aria-hidden', !isOpen);
  });

  // Close drawer when a link is clicked
  drawer.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', false);
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', true);
    });
  });
}

/* ─── NAVBAR: ACTIVE LINK ON SCROLL ─── */
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(section => observer.observe(section));
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  initHamburger();
  initNavHighlight();
});
```

- [ ] **Step 2: Verify in browser**

Reload. On desktop, scroll down — the active nav link should update as you pass each section. On mobile (resize to <768px), the hamburger button should appear. Click it — the drawer should slide down. Click a link — the drawer should close.

- [ ] **Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat: add navbar hamburger toggle and scroll-based active highlight"
```

---

## Task 8: JavaScript — Typewriter effect

**Files:**
- Modify: `js/main.js`

- [ ] **Step 1: Add `initTypewriter` function**

Add this function to `js/main.js` before the `DOMContentLoaded` listener, and call it inside the listener:

```js
/* ─── TYPEWRITER ─── */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const roles = ['Vibecoder', 'AI App Builder', 'Software Developer'];
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = roles[roleIndex];
    if (deleting) {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
    } else {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
    }

    let delay = deleting ? 60 : 100;

    if (!deleting && charIndex === current.length) {
      delay = 2000; // pause at end of word
      deleting = true;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(tick, delay);
  }

  tick();
}
```

Update `DOMContentLoaded` to call it:

```js
document.addEventListener('DOMContentLoaded', () => {
  initHamburger();
  initNavHighlight();
  initTypewriter();
});
```

- [ ] **Step 2: Verify in browser**

Reload. The hero subtitle should animate: types "Vibecoder", pauses, deletes, types "AI App Builder", pauses, deletes, types "Software Developer", loops. The blinking cursor `|` should pulse.

- [ ] **Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat: add typewriter effect cycling through developer roles"
```

---

## Task 9: JavaScript — Render projects from JSON

**Files:**
- Modify: `js/main.js`

- [ ] **Step 1: Add `loadProjects` and `createProjectCard` functions**

Add these functions to `js/main.js` before the `DOMContentLoaded` listener, and call `loadProjects()` inside the listener:

```js
/* ─── PROJECTS ─── */
function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.dataset.id = project.id;

  const tagsHtml = project.tags.map(t => `<span class="project-tag">${t}</span>`).join('');

  card.innerHTML = `
    <div class="project-visual" style="background: linear-gradient(135deg, ${project.accentColor}cc, ${project.accentColor}55);">
      ${project.name}
    </div>
    <div class="project-preview" id="preview-${project.id}">
      <div class="preview-toolbar">
        <a href="${project.liveUrl}" target="_blank" rel="noopener" class="btn btn--outline btn--sm">↗ Abrir</a>
        <button class="btn btn--outline btn--sm" onclick="togglePreview('${project.id}')">✕ Cerrar</button>
      </div>
      <div class="preview-skeleton" id="skeleton-${project.id}"></div>
    </div>
    <div class="project-body">
      <h3 class="project-name">${project.name}</h3>
      <p class="project-desc">${project.description}</p>
      <div class="project-tags">${tagsHtml}</div>
      <div class="project-actions">
        <button class="btn btn--primary btn--sm" onclick="togglePreview('${project.id}', '${project.liveUrl}')">▶ Live Preview</button>
        <a href="${project.repoUrl}" target="_blank" rel="noopener" class="btn btn--outline btn--sm">⬡ GitHub</a>
      </div>
    </div>
  `;

  return card;
}

async function loadProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  try {
    const res = await fetch('data/projects.json');
    const projects = await res.json();
    projects.forEach(project => grid.appendChild(createProjectCard(project)));
  } catch (err) {
    grid.innerHTML = '<p style="color:var(--text-muted);text-align:center">Error cargando proyectos.</p>';
  }
}
```

Update `DOMContentLoaded`:

```js
document.addEventListener('DOMContentLoaded', () => {
  initHamburger();
  initNavHighlight();
  initTypewriter();
  loadProjects();
});
```

- [ ] **Step 2: Verify — IMPORTANT: must use a local server**

`fetch()` won't work with `file://` protocol due to CORS. Start a local server:

```bash
cd /Users/daniel/Desktop/daniel.github.io
python3 -m http.server 8080
```

Open `http://localhost:8080` in the browser. The projects section should render 3 cards: Kennel Stride (orange), DanielYTuPerro (violet), Boca2 (pink). Each card shows the colorful visual area, name, description, tags, and two buttons.

- [ ] **Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat: render project cards dynamically from projects.json"
```

---

## Task 10: JavaScript — Live preview toggle with iframe + fallback

**Files:**
- Modify: `js/main.js`

- [ ] **Step 1: Add `togglePreview` and `handleIframeError` functions**

Add these functions to `js/main.js` before the `DOMContentLoaded` listener:

```js
/* ─── LIVE PREVIEW ─── */
function handleIframeError(id) {
  const skeleton = document.getElementById(`skeleton-${id}`);
  if (!skeleton) return;

  skeleton.outerHTML = `
    <div class="preview-fallback">
      <p>Esta app no permite previsualización embebida.</p>
      <a href="${_previewUrls[id]}" target="_blank" rel="noopener" class="btn btn--primary btn--sm">Abrir app ↗</a>
    </div>
  `;
}

// Store URLs so handleIframeError can access them
const _previewUrls = {};

function togglePreview(id, liveUrl) {
  const previewEl = document.getElementById(`preview-${id}`);
  if (!previewEl) return;

  const isOpen = previewEl.classList.contains('open');

  if (isOpen) {
    previewEl.classList.remove('open');
    // Remove iframe on close to stop the embedded app
    const iframe = previewEl.querySelector('iframe');
    if (iframe) iframe.remove();
    // Restore skeleton for next open
    const fallback = previewEl.querySelector('.preview-fallback');
    if (fallback) fallback.outerHTML = `<div class="preview-skeleton" id="skeleton-${id}"></div>`;
    return;
  }

  // Opening
  if (liveUrl) _previewUrls[id] = liveUrl;
  previewEl.classList.add('open');

  // Build iframe lazily
  const skeleton = document.getElementById(`skeleton-${id}`);
  if (skeleton && liveUrl) {
    const iframe = document.createElement('iframe');
    iframe.src = liveUrl;
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups');
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('title', `Preview de ${id}`);

    // Replace skeleton with iframe
    skeleton.replaceWith(iframe);

    // Fallback timeout: if load event hasn't fired in 6s, show fallback
    const timeout = setTimeout(() => handleIframeError(id), 6000);
    iframe.addEventListener('load', () => clearTimeout(timeout));
    iframe.addEventListener('error', () => {
      clearTimeout(timeout);
      handleIframeError(id);
    });
  }
}
```

- [ ] **Step 2: Verify in browser at `http://localhost:8080`**

Click "▶ Live Preview" on any project card. The card should expand smoothly revealing a skeleton shimmer, then after a moment the iframe should load the live app. Click "✕ Cerrar" — the card should collapse and the iframe should be removed. Click "▶ Live Preview" again — it should reload fresh.

- [ ] **Step 3: Verify fallback**

Temporarily edit `projects.json` to set a `liveUrl` to `"https://example.com"` (which blocks iframes). Open preview — after 6 seconds the fallback message and "Abrir app ↗" button should appear. Revert the JSON after verifying.

- [ ] **Step 4: Commit**

```bash
git add js/main.js
git commit -m "feat: add lazy iframe live preview with loading skeleton and fallback"
```

---

## Task 11: JavaScript — Skill bars with Intersection Observer

**Files:**
- Modify: `js/main.js`

- [ ] **Step 1: Add skills data and `initSkillBars` function**

Add before `DOMContentLoaded`:

```js
/* ─── SKILLS ─── */
const SKILLS = [
  {
    group: 'Herramientas',
    items: [
      { name: 'Lovable', pct: 90 },
      { name: 'Claude AI', pct: 88 },
      { name: 'React', pct: 75 },
    ]
  },
  {
    group: 'Capacidades',
    items: [
      { name: 'Prompt Engineering', pct: 88 },
      { name: 'Product Thinking', pct: 80 },
    ]
  },
  {
    group: 'Idiomas',
    items: [
      { name: 'Español', pct: 100 },
      { name: 'Inglés C1', pct: 85 },
    ]
  },
];

function initSkillBars() {
  const container = document.getElementById('skills-groups');
  if (!container) return;

  SKILLS.forEach(group => {
    const groupEl = document.createElement('div');
    groupEl.className = 'skill-group';
    groupEl.innerHTML = `<p class="skill-group-title">${group.group}</p>`;

    group.items.forEach(skill => {
      const item = document.createElement('div');
      item.className = 'skill-item';
      item.innerHTML = `
        <div class="skill-header">
          <span>${skill.name}</span>
          <span class="skill-pct">${skill.pct}%</span>
        </div>
        <div class="skill-track">
          <div class="skill-fill" data-pct="${skill.pct}"></div>
        </div>
      `;
      groupEl.appendChild(item);
    });

    container.appendChild(groupEl);
  });

  // Animate bars when section enters viewport
  const fills = container.querySelectorAll('.skill-fill');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        fills.forEach(fill => {
          fill.style.width = fill.dataset.pct + '%';
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.2 });

  observer.observe(container);
}
```

Update `DOMContentLoaded`:

```js
document.addEventListener('DOMContentLoaded', () => {
  initHamburger();
  initNavHighlight();
  initTypewriter();
  loadProjects();
  initSkillBars();
});
```

- [ ] **Step 2: Verify in browser at `http://localhost:8080`**

Scroll to the Skills section. As it enters the viewport, the bars should animate from 0% to their target percentages with a smooth 800ms transition. Three groups should be visible: Herramientas, Capacidades, Idiomas.

- [ ] **Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat: add skill bars with viewport-triggered animation"
```

---

## Task 12: Final polish — favicon, meta tags, and scroll-to-top

**Files:**
- Modify: `index.html`
- Modify: `js/main.js`

- [ ] **Step 1: Generate a simple favicon**

Create `assets/favicon.ico` using any free favicon generator (e.g. https://favicon.io — use the letter "D" with the violet color `#7C3AED`). Place the resulting `favicon.ico` in `assets/`.

Alternatively, use an emoji favicon by replacing the `<link rel="icon">` in `index.html` with:

```html
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>" />
```

- [ ] **Step 2: Add Open Graph meta tags to `<head>` in `index.html`**

Add after the `<meta name="description">` tag:

```html
<meta property="og:title" content="Daniel Londoño — Vibecoder & AI App Builder" />
<meta property="og:description" content="Portfolio de Daniel Londoño, Vibecoder y AI App Builder desde Medellín, Colombia." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://daniellondono0314.github.io" />
```

- [ ] **Step 3: Verify in browser**

Reload. The browser tab should show the ⚡ emoji as the favicon.

- [ ] **Step 4: Commit**

```bash
git add index.html assets/
git commit -m "feat: add emoji favicon and Open Graph meta tags"
```

---

## Task 13: GitHub Pages deploy

**Files:**
- No code changes — configuration only

- [ ] **Step 1: Verify the repo remote**

```bash
git remote -v
```

Expected output:
```
origin  https://github.com/DanielLondono0314/daniel.github.io.git (fetch)
origin  https://github.com/DanielLondono0314/daniel.github.io.git (push)
```

- [ ] **Step 2: Push to GitHub**

```bash
git push -u origin main
```

- [ ] **Step 3: Enable GitHub Pages**

Go to `https://github.com/DanielLondono0314/daniel.github.io` → Settings → Pages → Source: **Deploy from a branch** → Branch: `main` → `/` (root) → Save.

- [ ] **Step 4: Wait ~2 minutes, then verify**

Open `https://daniellondono0314.github.io` in the browser. The portfolio should load exactly as it does on `localhost:8080`.

- [ ] **Step 5: Verify live previews on GitHub Pages**

Click "▶ Live Preview" on each project. The iframe should load the Lovable apps. If any app blocks iframe embedding, the fallback message should appear within 6 seconds.

---

## How to update the portfolio in the future

**Add a new project:**
1. Open `data/projects.json`
2. Add a new object: `{ "id", "name", "description", "liveUrl", "repoUrl", "tags", "accentColor" }`
3. `git add data/projects.json && git commit -m "feat: add [project name]" && git push`

**Change skill percentages:**
1. Open `js/main.js`, find the `SKILLS` array, edit the `pct` values
2. `git commit -m "chore: update skill levels" && git push`

**Change hero photo:**
1. Replace `assets/photo.jpg` with the new photo (same filename, compress to <200KB)
2. `git commit -m "chore: update hero photo" && git push`
