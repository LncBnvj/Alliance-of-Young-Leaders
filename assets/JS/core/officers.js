export async function initOfficers() {
  const gridContainer = document.getElementById('officers-data-grid');
  if (!gridContainer) return;

  try {
    // 1. Fetch your JSON context data
    const response = await fetch('./data/officers.json'); 
    if (!response.ok) throw new Error('Could not retrieve officers data model.');
    const officers = await response.json();

    // 2. Loop and generate markup templates dynamically
    const gridHTML = officers.map(officer => {
      const featuredClass = officer.isFeatured ? 'officer-featured' : '';
      const delayClass = officer.delay > 0 ? `reveal-delay-${officer.delay}` : '';
      
      const photoContent = officer.img 
        ? `<img src="${officer.img}" alt="${officer.name}" class="officer-img-element">`
        : `<i class="fas fa-user"></i>`;
      
      const placeholderClass = officer.img ? '' : 'officer-placeholder';

      const socialLinksHTML = Object.entries(officer.socials || {})
        .map(([platform, url]) => `
          <a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${platform}">
            <i class="fab fa-${platform}"></i>
          </a>
        `).join('');

      return `
        <div class="officer-card ${featuredClass} reveal ${delayClass}">
          <div class="officer-photo-wrap">
            <div class="officer-photo ${placeholderClass}">
              ${photoContent}
            </div>
            ${officer.isFeatured ? '<div class="officer-badge">Chairperson</div>' : ''}
          </div>
          <div class="officer-info">
            <h3>${officer.name}</h3>
            <p class="officer-position">${officer.position}</p>
            <p class="officer-desc">${officer.desc}</p>
            <div class="officer-socials">
              ${socialLinksHTML}
            </div>
          </div>
        </div>
      `;
    }).join('');

    // 3. Mount populated elements to DOM layout target
    gridContainer.innerHTML = gridHTML;

  } catch (error) {
    console.error('❌ Officers Processing Engine Error:', error);
    gridContainer.innerHTML = `<p style="color: red; text-align: center;">Unable to display executive leadership listings at this time.</p>`;
  }
} 