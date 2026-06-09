export function initSectionObserver() {  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.05 });

  document.querySelectorAll('.section').forEach(s => sectionObserver.observe(s));
}