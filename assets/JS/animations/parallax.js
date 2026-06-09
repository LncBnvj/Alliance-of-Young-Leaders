export function initParallax() {
  const shapes = document.querySelectorAll('.shape');

  function updateParallax() {
    const scrollY = window.scrollY;
    shapes.forEach((shape, i) => {
      const speed = (i + 1) * 0.04;
      shape.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }
}