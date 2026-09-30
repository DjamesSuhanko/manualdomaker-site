const zoom = document.getElementById('score-zoom');
const score = document.getElementById('score-image');
zoom?.addEventListener('change', () => {
  score.style.width = `${zoom.value}%`;
});
