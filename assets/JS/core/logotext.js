export function initLogoText() {  
    function updateLogoText() {
    const logoText = document.querySelector('.logo-text');
    if (logoText) {
      logoText.style.display = window.scrollY > 60 ? 'block' : 'none';
    }
  }
  return updateLogoText;
} 