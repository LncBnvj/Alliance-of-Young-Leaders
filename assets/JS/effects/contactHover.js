export function initContactHover() {
  document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.contact-icon');
      if (icon) icon.style.transform = 'scale(1.1) rotate(-5deg)';
    });
    card.addEventListener('mouseleave', () => {
      const icon = card.querySelector('.contact-icon');
      if (icon) icon.style.transform = '';
    });
  });
}