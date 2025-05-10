document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-bar .tab');
  const panels = document.querySelectorAll('.panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = 'panel-' + tab.dataset.panel;

      // Activate this tab, deactivate others
      tabs.forEach(t => t.classList.toggle('active', t === tab));

      // Show intro only if 'intro' clicked; hide otherwise
      panels.forEach(panel => {
        if (panel.id === targetId) {
          panel.classList.add('open');
        } else if (panel.classList.contains('intro-panel')) {
          // keep intro open only on its tab
          panel.classList.toggle('open', tab.dataset.panel === 'intro');
        } else {
          panel.classList.remove('open');
        }
      });
    });
  });
});
