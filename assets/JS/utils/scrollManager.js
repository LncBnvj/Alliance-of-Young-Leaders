// Ensure your scroll manager looks something like this
export function initScrollManager(handlers) {
  window.addEventListener('scroll', () => {
    handlers.forEach(handler => {
      if (typeof handler === 'function') {
        handler(); // This triggers the updateNavbar function
      }
    });
  });
}