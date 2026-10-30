(() => {
  'use strict';
  const menuButton = document.querySelector('[data-menu-toggle]');
  const navigation = document.querySelector('#navegacion');
  if (menuButton && navigation) {
    document.documentElement.classList.add('js');
    menuButton.hidden = false;
    const closeMenu = () => { menuButton.setAttribute('aria-expanded', 'false'); navigation.dataset.open = 'false'; };
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(open)); navigation.dataset.open = String(open);
    });
    navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); }
    });
    window.matchMedia('(min-width: 601px)').addEventListener('change', closeMenu);
  }
  const filters = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('[data-status]')];
  const controls = document.querySelector('[data-filter-controls]');
  if (controls && cards.length) {
    controls.hidden = false;
    filters.forEach(button => button.addEventListener('click', () => {
      const category = button.dataset.filter;
      filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      cards.forEach(card => { card.hidden = category !== 'all' && category !== card.dataset.status; });
      const count = cards.filter(card => !card.hidden).length;
      const output = document.querySelector('[data-filter-count]');
      if (output) output.textContent = `${count} ${count === 1 ? 'área del producto' : 'áreas del producto'}`;
    }));
  }
  const tabs = [...document.querySelectorAll('[data-preview]')];
  const panels = [...document.querySelectorAll('[data-preview-panel]')];
  const activate = (tab, focus = false) => {
    tabs.forEach(item => { item.setAttribute('aria-selected', String(item === tab)); item.tabIndex = item === tab ? 0 : -1; });
    panels.forEach(panel => { panel.hidden = panel.dataset.previewPanel !== tab.dataset.preview; });
    if (focus) tab.focus();
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = tabs[(index + 1) % tabs.length];
      if (event.key === 'ArrowLeft') next = tabs[(index + tabs.length - 1) % tabs.length];
      if (event.key === 'Home') next = tabs[0];
      if (event.key === 'End') next = tabs[tabs.length - 1];
      if (next) { event.preventDefault(); activate(next, true); }
    });
  });
})();
