/* ═══════════════════════════════════════════
   main.js — Portfolio Daniel Londoño
   Vibe Logic Light redesign
═══════════════════════════════════════════ */

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
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const roles = ['Vibecoder', 'AI App Builder', 'Software Developer'];
  let roleIndex = 0, charIndex = 0, deleting = false;
  function tick() {
    const current = roles[roleIndex];
    el.textContent = deleting ? current.slice(0, --charIndex) : current.slice(0, ++charIndex);
    let delay = deleting ? 60 : 100;
    if (!deleting && charIndex === current.length) { delay = 2000; deleting = true; }
    else if (deleting && charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 400; }
    setTimeout(tick, delay);
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
      ${project.name}
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
const SKILLS = [
  { group: 'Herramientas', items: [{ name: 'Lovable', pct: 90 }, { name: 'Claude AI', pct: 88 }, { name: 'React', pct: 75 }] },
  { group: 'Capacidades', items: [{ name: 'Prompt Engineering', pct: 88 }, { name: 'Product Thinking', pct: 80 }] },
  { group: 'Idiomas', items: [{ name: 'Español', pct: 100 }, { name: 'Inglés C1', pct: 85 }] },
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
        <div class="skill-track"><div class="skill-fill" data-pct="${skill.pct}"></div></div>
      `;
      groupEl.appendChild(item);
    });
    container.appendChild(groupEl);
  });

  const fills = container.querySelectorAll('.skill-fill');

  if (window.innerWidth >= 1024) {
    // Horizontal scroll: trigger when panel enters viewport horizontally
    const track = document.getElementById('main-track');
    const skillSection = document.getElementById('skills');
    let fired = false;
    if (track && skillSection) {
      track.addEventListener('scroll', () => {
        if (fired) return;
        const rect = skillSection.getBoundingClientRect();
        if (rect.left < window.innerWidth * 0.8) {
          fired = true;
          fills.forEach(f => { f.style.width = f.dataset.pct + '%'; });
        }
      });
    }
  } else {
    // Vertical: Intersection Observer
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fills.forEach(f => { f.style.width = f.dataset.pct + '%'; });
          observer.disconnect();
        }
      });
    }, { threshold: 0.2 });
    observer.observe(container);
  }
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  initHorizontalScroll();
  initNavHighlight();
  initNavClick();
  initHamburger();
  initTypewriter();
  loadProjects();
  initSkillBars();
});
