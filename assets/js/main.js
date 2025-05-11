document.addEventListener('DOMContentLoaded', () => {
  const navButtons    = document.querySelectorAll('.topnav .nav-btn');
  const circleButtons = document.querySelectorAll('.circle-nav .circle-btn');
  const panels        = document.querySelectorAll('.content-panel');

  function showPanel(id) {
    panels.forEach(p =>
      p.id === 'panel-' + id ? p.classList.add('open') : p.classList.remove('open')
    );
    navButtons.forEach(b => b.classList.toggle('active', b.dataset.panel === id));
    circleButtons.forEach(b => b.classList.toggle('active', b.dataset.panel === id));
  }

  navButtons.forEach(btn =>
    btn.addEventListener('click', e => {
      e.preventDefault();
      showPanel(btn.dataset.panel);
    })
  );
  circleButtons.forEach(btn =>
    btn.addEventListener('click', e => {
      e.preventDefault();
      showPanel(btn.dataset.panel);
    })
  );

  // default panel
  showPanel('about');
});
