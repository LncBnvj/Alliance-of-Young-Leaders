export async function initDirectors() {
  const landingGrid = document.getElementById('directors-data-grid');
  if (!landingGrid) return;

  const allDirectorsGrid = document.getElementById('all-directors-data-grid');
  const landingViewWrapper = document.getElementById('directors-landing-view');
  const directoryViewWrapper = document.getElementById('directors-directory-view');
  const goDirectoryBtn = document.getElementById('btn-go-directors-directory');
  const backBtn = document.getElementById('btn-back-to-directors-landing');

  try {
    const response = await fetch('./data/directors.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const directors = await response.json();

    let landingCardsArray = [];
    let completeDirectoryArray = [];

    directors.forEach((director, index) => {
      const delayClass = director.delay > 0 ? `reveal-delay-${director.delay}` : '';
      
      const photoContent = director.img 
        ? `<img src="${director.img}" alt="${director.name}" class="officer-img-element">`
        : `<i class="fas fa-user"></i>`;
      
      const placeholderClass = director.img ? '' : 'officer-placeholder';

      const socialLinksHTML = Object.entries(director.socials || {})
        .map(([platform, url]) => {
            const isEmail = platform === 'email';
            const iconClass = isEmail ? 'fas fa-envelope' : `fab fa-${platform}`;
            
            // If email, we use a data-attribute for copying instead of a standard href
            const linkProps = isEmail 
              ? `data-email="${url.replace('mailto:', '')}" style="cursor:pointer;" onclick="copyEmail(this)"`
              : `href="${url}" target="_blank" rel="noopener noreferrer"`;

            return `
              <a ${linkProps} aria-label="${platform}">
                <i class="${iconClass}"></i>
              </a>
            `;
        }).join('');

      const cardHTML = `
        <div class="officer-card reveal ${delayClass}">
          <div class="officer-photo-wrap">
            <div class="officer-photo ${placeholderClass}">
              ${photoContent}
            </div>
          </div>
          <div class="officer-info">
            <h3>${director.name}</h3>
            <p class="officer-position">${director.position}</p>
            <p class="officer-desc">${director.desc || ''}</p>
            <div class="officer-socials">
              ${socialLinksHTML}
            </div>
          </div>
        </div>
      `;

      completeDirectoryArray.push(cardHTML);
      if (index < 2) landingCardsArray.push(cardHTML);
    });

    landingGrid.innerHTML = landingCardsArray.join('');
    if (allDirectorsGrid) allDirectorsGrid.innerHTML = completeDirectoryArray.join('');

    // --- COPY TO CLIPBOARD FUNCTION ---
    window.copyEmail = function(element) {
        const email = element.getAttribute('data-email');
        navigator.clipboard.writeText(email).then(() => {
            // Get the toast element
            const x = document.getElementById("toast");
            
            // Make it visible
            x.style.visibility = "visible";
            
            // After 3 seconds, hide it
            setTimeout(function(){ x.style.visibility = "hidden"; }, 3000);
        });
    };

    // View State Toggle Logic (kept as is)
    if (goDirectoryBtn && landingViewWrapper && directoryViewWrapper) {
      goDirectoryBtn.addEventListener('click', () => {
        landingViewWrapper.style.display = 'none';
        directoryViewWrapper.style.display = 'block';
        document.getElementById('directors').scrollIntoView({ behavior: 'smooth' });
      });
    }

    if (backBtn && landingViewWrapper && directoryViewWrapper) {
      backBtn.addEventListener('click', () => {
        directoryViewWrapper.style.display = 'none';
        landingViewWrapper.style.display = 'block';
        document.getElementById('directors').scrollIntoView({ behavior: 'smooth' });
      });
    }

  } catch (error) {
    console.error('❌ Directors Processing Engine Error:', error);
    landingGrid.innerHTML = `<p style="color: red; text-align: center; grid-column: 1/-1;">Unable to display departmental director listings at this time.</p>`;
  }
}