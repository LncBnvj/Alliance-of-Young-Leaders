export async function initCommittees() {
  const landingGrid = document.getElementById('committees-data-grid');
  const sectionHeader = document.getElementById('committees-section-header');
  const allCommitteesGrid = document.getElementById('all-committees-data-grid');
  const landingViewWrapper = document.getElementById('committees-landing-view');
  const directoryViewWrapper = document.getElementById('committees-directory-view');
  const pageViewWrapper = document.getElementById('committee-profile-page-view');
  
  // Navigation Buttons
  const goDirectoryBtn = document.getElementById('btn-go-committees-directory');
  const backBtn = document.getElementById('btn-back-to-committees-landing');
  const exitPageBtn = document.getElementById('btn-exit-committee-page');

  if (!landingGrid) return;

  // --- HELPERS ---
const renderAvatar = (person, fallbackIconClass) => {
  const photo = (person && typeof person === 'object' && person.photo) ? person.photo.trim() : '';
  
  // Strict layout check to ensure broken img tags are never injected
  if (photo !== "" && photo !== null && photo !== undefined) {
    return `<img src="${photo}" alt="Profile Avatar" onerror="this.onerror=null; this.parentNode.innerHTML='<i class=\'${fallbackIconClass}\'></i>';">`;
  }
  return `<i class="${fallbackIconClass}"></i>`;
};

const renderSocials = (person) => {
  if (person && typeof person === 'object' && person.socials) {
    return `
      <div class="formal-socials-row">
        ${person.socials.fb ? `<a href="${person.socials.fb}" target="_blank" class="formal-social-icon-btn"><i class="fab fa-facebook-f"></i></a>` : ''}
        ${person.socials.li ? `<a href="${person.socials.li}" target="_blank" class="formal-social-icon-btn"><i class="fab fa-linkedin-in"></i></a>` : ''}
      </div>`;
  }
  return '';
};
  try {
    const response = await fetch('./data/committees.json');
    const committees = await response.json();

    // --- NAVIGATION LOGIC ---
    goDirectoryBtn?.addEventListener('click', () => {
      landingViewWrapper.style.display = 'none';
      directoryViewWrapper.style.display = 'block';
    });

    backBtn?.addEventListener('click', () => {
      directoryViewWrapper.style.display = 'none';
      landingViewWrapper.style.display = 'block';
    });

    exitPageBtn?.addEventListener('click', () => {
      pageViewWrapper.style.display = 'none';
      sectionHeader.style.display = 'block';
      directoryViewWrapper.style.display = 'block'; 
    });

    // --- RENDER GRIDS ---
    function buildGridCard(c, index) {
      const chairName = typeof c.chair === 'object' ? c.chair.name : c.chair;
      return `
       <div class="committee-card reveal committee-clickable-entry-node" data-index="${index}" style="cursor: pointer;">
          <div class="committee-header">
            <div class="committee-icon">
             <img src="${c.logo || './assets/img/placeholder-logo.png'}" alt="${c.title}" style="max-width: 85%; max-height: 85%; object-fit: contain;">
           </div>
           <div>
             <h3>${c.title}</h3>
             <!-- Prefixed label right before the dynamic variable -->
              <p class="committee-chair">Chairperson: ${chairName || 'TBA'}</p>
           </div>
          </div>
        </div>`;
    }
    landingGrid.innerHTML = committees.slice(0, 2).map((c, i) => buildGridCard(c, i)).join('');
    if (allCommitteesGrid) allCommitteesGrid.innerHTML = committees.map((c, i) => buildGridCard(c, i)).join('');

    // --- CLICK ROUTER ---
    const clickContainers = [landingGrid, allCommitteesGrid];
    clickContainers.forEach(container => {
      container?.addEventListener('click', (e) => {
        const targetCard = e.target.closest('.committee-clickable-entry-node');
        if (!targetCard) return;

        const committee = committees[targetCard.getAttribute('data-index')];

        document.getElementById('committee-page-logo').src = committee.logo || './assets/img/placeholder-logo.png';
        document.getElementById('committee-page-title').innerText = committee.title;
        document.getElementById('committee-page-subtitle').innerText = committee.subtitle || 'Specialized Division';
        document.getElementById('committee-page-mission').innerText = committee.mission;
        document.getElementById('committee-page-movement').innerText = committee.movement;

        const rosterGrid = document.getElementById('committee-page-officers-grid');
        rosterGrid.innerHTML = `
          <div class="committee-roster-grid-system">
            ${[
              { key: 'chair', label: 'Chairperson', accent: 'chair-accent' },
              { key: 'viceChair', label: 'Vice Chairperson', accent: 'vice-accent' },
              { key: 'secretary', label: 'Secretary', accent: 'sec-accent' }
            ].map(role => committee[role.key] ? `
              <div class="formal-officer-profile-card ${role.accent}">
                <div class="formal-officer-photo-box">${renderAvatar(committee[role.key], 'fas fa-user-tie')}</div>
                <div class="formal-officer-text-stack">
                  <span class="formal-role-chip">${role.label}</span>
                  <h3>${committee[role.key].name || committee[role.key]}</h3>
                  ${renderSocials(committee[role.key])}
                </div>
              </div>` : '').join('')}
          </div>
          <div class="committee-roster-grid-system">
            ${committee.members.map(member => `
              <div class="formal-officer-profile-card member-accent">
                <div class="formal-officer-photo-box" style="width: 90px; height: 90px; border-radius: 12px !important;">${renderAvatar(member, 'fas fa-user')}</div>
                <div class="formal-officer-text-stack">
                  <span class="formal-role-chip" style="background: #f8fafc; color: #64748b;">Committee Member</span>
                  <h3>${typeof member === 'object' ? member.name : member}</h3>
                  ${renderSocials(typeof member === 'object' ? member : null)}
                </div>
              </div>`).join('')}
          </div>`;

        sectionHeader.style.display = 'none';
        landingViewWrapper.style.display = 'none';
        directoryViewWrapper.style.display = 'none';
        pageViewWrapper.style.display = 'block';
      });
    });

  } catch (error) { console.error('❌ Engine Error:', error); }
}