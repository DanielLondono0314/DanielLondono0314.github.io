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
      delay = 2000;
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
      <a href="${_previewUrls[id]}" target="_blank" rel="noopener" class="btn btn--primary btn--sm">Abrir app ↗</a>
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
    iframe.addEventListener('error', () => {
      clearTimeout(timeout);
      handleIframeError(id);
    });
  }
}

/* ─── PROJECTS ─── */
function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.dataset.id = project.id;

  const tagsHtml = project.tags.map(t => `<span class="project-tag">${t}</span>`).join('');

  const previewBlock = project.liveUrl ? `
    <div class="project-preview" id="preview-${project.id}">
      <div class="preview-toolbar">
        <a href="${project.liveUrl}" target="_blank" rel="noopener" class="btn btn--outline btn--sm">↗ Abrir</a>
        <button class="btn btn--outline btn--sm" onclick="togglePreview('${project.id}')">✕ Cerrar</button>
      </div>
      <div class="preview-skeleton" id="skeleton-${project.id}"></div>
    </div>` : '';

  const previewBtn = project.liveUrl
    ? `<button class="btn btn--primary btn--sm" onclick="togglePreview('${project.id}', '${project.liveUrl}')">▶ Live Preview</button>`
    : '';

  card.innerHTML = `
    <div class="project-visual" style="background: linear-gradient(135deg, ${project.accentColor}cc, ${project.accentColor}55);">
      ${project.name}
    </div>
    ${previewBlock}
    <div class="project-body">
      <h3 class="project-name">${project.name}</h3>
      <p class="project-desc">${project.description}</p>
      <div class="project-tags">${tagsHtml}</div>
      <div class="project-actions">
        ${previewBtn}
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

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  initHamburger();
  initNavHighlight();
  initTypewriter();
  loadProjects();
  initSkillBars();
});
