document.addEventListener('DOMContentLoaded', () => {
  const aboutBtn = document.getElementById('aboutBtn');
  const aboutPanel = document.getElementById('aboutMePanel');

  aboutBtn.addEventListener('click', () => {
    aboutPanel.classList.toggle('open');
    aboutBtn.classList.toggle('active');
  });
});
