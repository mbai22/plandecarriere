// Shared dashboard shell: builds the sidebar, the top bar and the mobile menu on every page.
(function () {
  const NAV = [
    { title: 'MENU', items: [
      ['dashboard.html', 'layout-dashboard', "Vue d'ensemble"],
      ['orientation.html', 'compass', 'Orientation'],
      ['urgent.html', 'timer', 'Opportunités', 'nav-count'],
      ['bourses.html', 'globe', 'Bourses'],
      ['masters.html', 'graduation-cap', 'Masters'],
      ['grants.html', 'hand-coins', 'Grants'],
      ['ecoles.html', 'school', 'Écoles gratuites'],
      ['freelance.html', 'briefcase', 'Freelance']
    ] },
    { title: 'MON PARCOURS', items: [
      ['profil.html', 'user-round', 'Profil'],
      ['competences.html', 'zap', 'Compétences'],
      ['objectifs.html', 'target', 'Objectifs'],
      ['plan4.html', 'clipboard-list', 'Plan PRO'],
      ['plan.html', 'calendar-range', 'Timeline']
    ] },
    { title: 'APPRENDRE', items: [
      ['plateformes.html', 'book-open', 'Plateformes'],
      ['certifications.html', 'award', 'Certifications'],
      ['ressources.html', 'link', 'Ressources']
    ] }
  ];

  const page = location.pathname.split('/').pop() || 'dashboard.html';
  const current = NAV.flatMap(g => g.items).find(i => i[0] === page);

  const side = document.getElementById('side');
  if (side) {
    side.innerHTML = `
      <a href="dashboard.html" class="brand">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b4e04a" stroke-width="2.4" stroke-linecap="round"><path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9 4.9 19.1"/></svg>
        Willifred
      </a>
      ${NAV.map(g => `<h4>${g.title}</h4><nav>${g.items.map(([href, icon, label, pill]) =>
        `<a href="${href}"${href === page ? ' class="on"' : ''}><i data-lucide="${icon}"></i>${label}${pill ? `<span class="pill" id="${pill}"></span>` : ''}</a>`).join('')}</nav>`).join('')}
      <div class="me">
        <div class="avatar photo" role="img" aria-label="Mbaihornom Willifred"></div>
        <div><b>Mbaihornom Willifred</b><span>Licence · Univ. de Dschang</span></div>
        <a href="index.html" title="Déconnexion"><i data-lucide="log-out"></i></a>
      </div>`;
    side.insertAdjacentHTML('afterend', '<div class="scrim"></div>');
  }

  // Empty top bar on content pages gets the default content; every top bar gets the mobile menu button
  const topbar = document.querySelector('.topbar');
  if (topbar) {
    if (!topbar.children.length) {
      topbar.innerHTML = `<h1>Plan de Carrière <small>/ ${current ? current[2] : ''}</small></h1>
        <a href="orientation.html" class="btn">Faire le test <i data-lucide="plus-circle"></i></a>`;
    }
    topbar.insertAdjacentHTML('afterbegin', '<button class="menu-btn" aria-label="Menu"><i data-lucide="menu"></i></button>');
  }

  // Page title gets the same icon as its menu entry
  const title = document.querySelector('.head h2');
  if (title && current && !title.querySelector('[data-lucide]')) {
    title.insertAdjacentHTML('afterbegin', `<i data-lucide="${current[1]}"></i>`);
  }

  document.addEventListener('click', e => {
    if (e.target.closest('.menu-btn')) document.body.classList.toggle('nav-open');
    else if (e.target.closest('.scrim')) document.body.classList.remove('nav-open');
  });

  window.renderIcons = () => { if (window.lucide) lucide.createIcons(); };
  window.renderIcons();
})();
