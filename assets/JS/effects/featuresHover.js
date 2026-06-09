export function initFeatureHover() {
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.feature-icon');
      if (icon) icon.style.transform = 'rotate(-5deg) scale(1.05)';
    });
    card.addEventListener('mouseleave', () => {
      const icon = card.querySelector('.feature-icon');
      if (icon) icon.style.transform = '';
    });
  });
}