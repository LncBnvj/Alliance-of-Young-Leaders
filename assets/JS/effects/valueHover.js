export function initValueHover() {
  document.querySelectorAll('.value-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-4px) scale(1.03)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}