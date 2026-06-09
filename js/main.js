/* ═══════════════════════════════════════════
   main.js — Portfolio Daniel Londoño
   Vibe Logic Light redesign
═══════════════════════════════════════════ */

/* ─── I18N ─── */
const TRANSLATIONS = {
  es: {
    'nav.projects':      'Proyectos',
    'nav.education':     'Educación',
    'nav.contact':       'Contacto',
    'hero.status':       'STATUS: BUILDING_THE_FUTURE',
    'hero.bio':          'Construyo productos digitales con IA desde Medellín, Colombia.',
    'hero.badge':        '🟢 Disponible',
    'hero.cta1':         'Ver proyectos →',
    'hero.resume':       'Resume (EN) ↓',
    'contact.resume':    'Resume (EN)',
    'about.title':       'Quién<br>soy.',
    'about.bio':         'Soy Daniel, vibecoder y AI App Builder desde Medellín. Construyo productos digitales reales usando IA como herramienta principal — Lovable, Claude y React son mi stack. Cada proyecto que ves aquí resuelve un problema concreto.',
    'about.stat1':       'Proyectos publicados',
    'about.stat2':       'Idiomas',
    'projects.title':    'Proyectos<br><em>Destacados.</em>',
    'projects.subtitle': 'Apps reales, resolviendo problemas reales.',
    'skills.label':      'HABILIDADES',
    'skills.title':      'Mi<br>Stack.',
    'skills.tools':      'Herramientas',
    'skills.abilities':  'Capacidades',
    'skills.languages':  'Idiomas',
    'edu.label':         'FORMACIÓN',
    'edu.title':         'Educación &amp;<br><em>Certs.</em>',
    'edu.degree':        'Ingeniería de Software · En curso · Medellín',
    'edu.certs':         'CERTIFICACIONES',
    'contact.label':     'CONTACTO',
    'contact.title':     '¿Tienes un<br>proyecto?',
    'contact.sub':       'Hablemos.',
    'project.live':      '▶ Live Preview',
    'project.github':    '⬡ GitHub',
    'project.open':      '↗ Abrir',
    'project.close':     '✕ Cerrar',
    'project.fallback':  'Esta app no permite previsualización embebida.',
    'project.openapp':   'Abrir app ↗',
  },
  en: {
    'nav.projects':      'Projects',
    'nav.education':     'Education',
    'nav.contact':       'Contact',
    'hero.status':       'STATUS: BUILDING_THE_FUTURE',
    'hero.bio':          'I build digital products with AI from Medellín, Colombia.',
    'hero.badge':        '🟢 Open to work',
    'hero.cta1':         'View projects →',
    'hero.resume':       'Resume ↓',
    'contact.resume':    'Resume',
    'about.title':       'Who<br>I am.',
    'about.bio':         "I'm Daniel, a vibecoder and AI App Builder from Medellín. I build real digital products using AI as my main tool — Lovable, Claude and React are my stack. Every project you see here solves a concrete problem.",
    'about.stat1':       'Published projects',
    'about.stat2':       'Languages',
    'projects.title':    'Featured<br><em>Projects.</em>',
    'projects.subtitle': 'Real apps, solving real problems.',
    'skills.label':      'SKILLS',
    'skills.title':      'My<br>Stack.',
    'skills.tools':      'Tools',
    'skills.abilities':  'Capabilities',
    'skills.languages':  'Languages',
    'edu.label':         'EDUCATION',
    'edu.title':         'Education &amp;<br><em>Certs.</em>',
    'edu.degree':        'Software Engineering · In progress · Medellín',
    'edu.certs':         'CERTIFICATIONS',
    'contact.label':     'CONTACT',
    'contact.title':     'Got a<br>project?',
    'contact.sub':       "Let's talk.",
    'project.live':      '▶ Live Preview',
    'project.github':    '⬡ GitHub',
    'project.open':      '↗ Open',
    'project.close':     '✕ Close',
    'project.fallback':  "This app doesn't allow embedded preview.",
    'project.openapp':   'Open app ↗',
  }
};

const PROJECT_DESCRIPTIONS = {
  es: {
    'kennel-stride':      'SaaS para centros de adiestramiento canino: reservas, historiales médicos, facturación y gestión de personal en una sola plataforma.',
    'danielytuperro':     'Plataforma de asesorías caninas con calendario, rutinas en video, chat directo, chat de voz y membresía paga.',
    'boca2':              'App para guardar recomendaciones de foodies de Instagram. Scraping de posts con IA, mapa interactivo de lugares.',
    'michael-cornell':    'Rediseño editorial premium de sitio personal para coach de negocios con 500+ alumnos. React 18 + Vite, SEO estructurado con 5 schemas, accesibilidad WCAG AA.',
    'danielytuperro-com': 'Sitio web para emprendimiento canino. Ecommerce desde cero, integración Wompi, sistema de rifas con reservas/cancelaciones en tiempo real y manejo de inventario.',
  },
  en: {
    'kennel-stride':      'SaaS for dog training centers: bookings, medical records, billing and staff management in one platform.',
    'danielytuperro':     'Canine coaching platform with calendar, video routines, direct chat, voice chat and paid membership.',
    'boca2':              'App to save foodie recommendations from Instagram. AI-powered post scraping, interactive map of places.',
    'michael-cornell':    'Premium editorial redesign for a business coach with 500+ students. React 18 + Vite, structured SEO with 5 schemas, WCAG AA accessibility.',
    'danielytuperro-com': 'Website for a canine entrepreneurship. E-commerce from scratch, Wompi integration, raffle system with real-time reservations/cancellations and inventory management.',
  }
};

let currentLang = 'es';

function detectLang() {
  const saved = localStorage.getItem('dl-lang');
  if (saved) return saved;
  const browser = (navigator.language || navigator.userLanguage || 'es').toLowerCase();
  return browser.startsWith('en') ? 'en' : 'es';
}

function t(key) {
  return TRANSLATIONS[currentLang][key] || TRANSLATIONS['es'][key] || key;
}

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('dl-lang', lang);
  document.documentElement.lang = lang;

  // Translate static data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = TRANSLATIONS[lang][key];
    if (val !== undefined) el.innerHTML = val;
  });

  // Update project descriptions dynamically
  document.querySelectorAll('.project-card').forEach(card => {
    const id = card.dataset.id;
    const desc = PROJECT_DESCRIPTIONS[lang]?.[id];
    if (desc) {
      const descEl = card.querySelector('.project-desc');
      if (descEl) descEl.textContent = desc;
    }
    // Update button labels
    const liveBtn = card.querySelector('.btn--acid');
    if (liveBtn) liveBtn.textContent = t('project.live');
    const ghBtn = card.querySelector('.btn--outline[href*="github"]');
    if (ghBtn) ghBtn.innerHTML = `${t('project.github')}`;
  });

  // Re-render skills in the active language
  renderSkills(lang);

  // Update toggle buttons
  const label = lang === 'en' ? 'ES' : 'EN';
  document.querySelectorAll('#lang-toggle, #lang-toggle-mobile').forEach(btn => {
    btn.textContent = label;
    btn.title = lang === 'en' ? 'Cambiar a español' : 'Switch to English';
  });

  // Re-init typewriter with correct language
  initTypewriter();
}

function initLangToggle() {
  currentLang = detectLang();
  applyLang(currentLang);

  document.querySelectorAll('#lang-toggle, #lang-toggle-mobile').forEach(btn => {
    btn.addEventListener('click', () => {
      applyLang(currentLang === 'es' ? 'en' : 'es');
    });
  });
}

/* ─── HORIZONTAL SCROLL (desktop only) ─── */
function initHorizontalScroll() {
  if (window.innerWidth < 1024) return;
  const track = document.getElementById('main-track');
  if (!track) return;

  track.addEventListener('wheel', (e) => {
    e.preventDefault();
    track.scrollLeft += e.deltaY + e.deltaX;
  }, { passive: false });

  // Touch support for horizontal drag on desktop
  let startX = 0, startScroll = 0, isDragging = false;
  track.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
    startScroll = track.scrollLeft;
    track.style.cursor = 'grabbing';
  });
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    track.scrollLeft = startScroll - (e.pageX - startX);
  });
  document.addEventListener('mouseup', () => {
    isDragging = false;
    track.style.cursor = '';
  });
}

/* ─── NAV HIGHLIGHT ─── */
function initNavHighlight() {
  const isDesktop = () => window.innerWidth >= 1024;
  const sections = document.querySelectorAll('section[id]');
  const vLinks = document.querySelectorAll('.nav-vlink');
  const mLinks = document.querySelectorAll('.nav-mlink');

  function setActive(id) {
    vLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
    mLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
  }

  if (isDesktop()) {
    // Horizontal: watch scrollLeft on track
    const track = document.getElementById('main-track');
    if (!track) return;
    track.addEventListener('scroll', () => {
      let closest = null, closestDist = Infinity;
      sections.forEach(section => {
        const dist = Math.abs(section.getBoundingClientRect().left);
        if (dist < closestDist) { closestDist = dist; closest = section; }
      });
      if (closest) setActive(closest.id);
    });
  } else {
    // Vertical: Intersection Observer
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach(s => observer.observe(s));
  }
}

/* ─── NAV CLICK → SCROLL TO SECTION ─── */
function initNavClick() {
  const isDesktop = () => window.innerWidth >= 1024;

  document.querySelectorAll('.nav-vlink, .nav-mlink, .drawer-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;

      if (isDesktop()) {
        e.preventDefault();
        const track = document.getElementById('main-track');
        if (track) {
          track.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
        }
      }
      // On mobile, let native anchor scroll handle it
      // Close drawer if open
      const drawer = document.querySelector('.nav-drawer');
      const btn = document.querySelector('.nav-hamburger');
      if (drawer && btn) {
        drawer.classList.remove('open');
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', false);
      }
    });
  });
}

/* ─── HAMBURGER (mobile) ─── */
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
}

/* ─── TYPEWRITER ─── */
let _twTimer = null;
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  if (_twTimer) clearTimeout(_twTimer);
  // Roles are the same in both languages (technical terms)
  const roles = ['Vibecoder', 'AI App Builder', 'Software Developer'];
  let roleIndex = 0, charIndex = 0, deleting = false;
  el.textContent = '';
  function tick() {
    const current = roles[roleIndex];
    el.textContent = deleting ? current.slice(0, --charIndex) : current.slice(0, ++charIndex);
    let delay = deleting ? 60 : 100;
    if (!deleting && charIndex === current.length) { delay = 2000; deleting = true; }
    else if (deleting && charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 400; }
    _twTimer = setTimeout(tick, delay);
  }
  tick();
}

/* ─── LIVE PREVIEW ─── */
const _previewUrls = {};

function handleIframeError(id) {
  const previewEl = document.getElementById(`preview-${id}`);
  if (!previewEl) return;
  const skeleton = previewEl.querySelector('.preview-skeleton');
  const iframe = previewEl.querySelector('iframe');
  const target = skeleton || iframe;
  if (!target) return;
  target.outerHTML = `
    <div class="preview-fallback">
      <p>Esta app no permite previsualización embebida.</p>
      <a href="${_previewUrls[id]}" target="_blank" rel="noopener" class="btn btn--acid btn--sm">Abrir app ↗</a>
    </div>
  `;
}

function togglePreview(id, liveUrl) {
  const previewEl = document.getElementById(`preview-${id}`);
  if (!previewEl) return;
  const isOpen = previewEl.classList.contains('open');
  if (isOpen) {
    previewEl.classList.remove('open');
    const iframe = previewEl.querySelector('iframe');
    if (iframe) iframe.remove();
    const fallback = previewEl.querySelector('.preview-fallback');
    if (fallback) fallback.outerHTML = `<div class="preview-skeleton" id="skeleton-${id}"></div>`;
    return;
  }
  if (liveUrl) _previewUrls[id] = liveUrl;
  previewEl.classList.add('open');
  const skeleton = document.getElementById(`skeleton-${id}`);
  if (skeleton && _previewUrls[id]) {
    const iframe = document.createElement('iframe');
    iframe.src = _previewUrls[id];
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups');
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('title', `Preview de ${id}`);
    skeleton.replaceWith(iframe);
    const timeout = setTimeout(() => handleIframeError(id), 6000);
    iframe.addEventListener('load', () => clearTimeout(timeout));
    iframe.addEventListener('error', () => { clearTimeout(timeout); handleIframeError(id); });
  }
}

/* ─── PROJECTS ─── */
function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.dataset.id = project.id;
  const tagsHtml = project.tags.map(t => `<span class="project-tag">${t}</span>`).join('');
  card.innerHTML = `
    <div class="project-visual" style="background:${project.accentColor}22; border-bottom:2px solid ${project.accentColor};">
      <img src="assets/screenshots/${project.id}.jpg" alt="Screenshot de ${project.name}" loading="lazy"
           onerror="this.remove()" class="project-screenshot" />
      <span class="project-visual__name">${project.name}</span>
    </div>
    <div class="project-preview" id="preview-${project.id}">
      <div class="preview-toolbar">
        <a href="${project.liveUrl || project.repoUrl}" target="_blank" rel="noopener" class="btn btn--outline btn--sm">↗ Abrir</a>
        <button class="btn btn--outline btn--sm" onclick="togglePreview('${project.id}')">✕ Cerrar</button>
      </div>
      <div class="preview-skeleton" id="skeleton-${project.id}"></div>
    </div>
    <div class="project-body">
      <h3 class="project-name">${project.name}</h3>
      <p class="project-desc">${project.description}</p>
      <div class="project-tags">${tagsHtml}</div>
      <div class="project-actions">
        ${project.liveUrl ? `<button class="btn btn--acid btn--sm" onclick="togglePreview('${project.id}','${project.liveUrl}')">▶ Live Preview</button>` : ''}
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
    grid.innerHTML = '<p style="color:var(--muted);font-family:monospace;font-size:13px">Error cargando proyectos.</p>';
  }
}

/* ─── SKILLS ─── */
const SKILLS = {
  es: [
    { group: 'Herramientas', items: [
      { name: 'Lovable', note: '4 apps en producción' },
      { name: 'Claude AI', note: 'desarrollo diario' },
      { name: 'React', note: 'UI de cada proyecto' },
    ]},
    { group: 'Capacidades', items: [
      { name: 'Prompt Engineering', note: 'de spec a producto' },
      { name: 'Product Thinking', note: 'problema real primero' },
      { name: 'Pagos & Ecommerce', note: 'Wompi en producción' },
    ]},
    { group: 'Idiomas', items: [
      { name: 'Español', note: 'nativo' },
      { name: 'Inglés', note: 'C1 · EF SET 70/100' },
    ]},
  ],
  en: [
    { group: 'Tools', items: [
      { name: 'Lovable', note: '4 production apps' },
      { name: 'Claude AI', note: 'daily driver' },
      { name: 'React', note: 'UI on every project' },
    ]},
    { group: 'Capabilities', items: [
      { name: 'Prompt Engineering', note: 'spec to product' },
      { name: 'Product Thinking', note: 'real problem first' },
      { name: 'Payments & Ecommerce', note: 'Wompi in production' },
    ]},
    { group: 'Languages', items: [
      { name: 'Spanish', note: 'native' },
      { name: 'English', note: 'C1 · EF SET 70/100' },
    ]},
  ],
};

function renderSkills(lang) {
  const container = document.getElementById('skills-groups');
  if (!container) return;
  container.innerHTML = '';
  (SKILLS[lang] || SKILLS.es).forEach(group => {
    const groupEl = document.createElement('div');
    groupEl.className = 'skill-group';
    groupEl.innerHTML = `<p class="skill-group-title">${group.group}</p>`;
    group.items.forEach(skill => {
      const row = document.createElement('div');
      row.className = 'skill-row';
      row.innerHTML = `
        <span class="skill-row__name">${skill.name}</span>
        <span class="skill-row__note mono">${skill.note}</span>
      `;
      groupEl.appendChild(row);
    });
    container.appendChild(groupEl);
  });
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  initHorizontalScroll();
  initNavHighlight();
  initNavClick();
  initHamburger();
  loadProjects().then(() => {
    initLangToggle(); // apply lang after projects are rendered (also renders skills)
  });
});
