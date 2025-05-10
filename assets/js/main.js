document.addEventListener('DOMContentLoaded', () => {
  const navButtons = document.querySelectorAll('.nav-list button');
  const panels = document.querySelectorAll('.panel');

  function closeAll() {
    // hide panels & deactivate buttons
    panels.forEach(p => p.classList.remove('open'));
    navButtons.forEach(b => b.classList.remove('active'));
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.panel;           // e.g. "intro"
      const panel = document.getElementById('panel-' + target);

      // if this panel is already open, just close it
      if (panel.classList.contains('open')) {
        closeAll();
      } else {
        closeAll();
        // open the right one
        panel.classList.add('open');
        btn.classList.add('active');
      }
    });
  });

  // wire up all “close” buttons inside panels
  document.querySelectorAll('.panel .close-btn').forEach(x => {
    x.addEventListener('click', () => closeAll());
  });
});
