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
  const renderAvatar = (person, iconClass) => {
    const photo = (typeof person === 'object' && person.photo) ? person.photo : null;
    return (photo && photo.trim() !== "") 
      ? `<img src="${photo}" alt="Profile" style="width: 100%; height: 100%; object-fit: cover; border-radius: 12px;" />` 
      : `<i class="${iconClass}"></i>`;
  };

  const renderSocials = (person) => {
    if (person && typeof person === 'object' && person.socials) {
      return `
        <div class="formal-socials-row" style="display: flex; gap: 8px; margin-top: 10px; justify-content: center;">
          ${person.socials.fb ? `<a href="${person.socials.fb}" target="_blank" class="formal-social-icon-btn" style="width: 35px; height: 35px; display: flex; align-items: center; justify-content: center; background: #3b5998; color: white; border-radius: 50%;"><i class="fab fa-facebook-f"></i></a>` : ''}
          ${person.socials.li ? `<a href="${person.socials.li}" target="_blank" class="formal-social-icon-btn" style="width: 35px; height: 35px; display: flex; align-items: center; justify-content: center; background: #0077b5; color: white; border-radius: 50%;"><i class="fab fa-linkedin-in"></i></a>` : ''}
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
      // Returns user to directory view by default
      directoryViewWrapper.style.display = 'block'; 
    });

    // --- RENDER GRIDS ---
    function buildGridCard(c, index) {
      const chairName = typeof c.chair === 'object' ? c.chair.name : c.chair;
      return `
        <div class="committee-card reveal committee-clickable-entry-node" data-index="${index}" style="cursor: pointer;">
          <div class="committee-header">
            <div class="committee-icon" style="display: flex; align-items: center; justify-content: center; overflow: hidden; background: #ffffff;">
              <img src="${c.logo || './assets/img/placeholder-logo.png'}" alt="${c.title}" style="max-width: 90%; max-height: 90%; object-fit: contain;">
            </div>
            <div>
              <h3>${c.title}</h3>
              <p class="committee-chair">${chairName || 'TBA'}</p>
            </div>
          </div>
          <p class="committee-desc">${c.desc}</p>
        </div>`;
    }

    landingGrid.innerHTML = committees.slice(0, 2).map((c, i) => buildGridCard(c, i)).join('');
    if (allCommitteesGrid) allCommitteesGrid.innerHTML = committees.map((c, i) => buildGridCard(c, i)).join('');

    // --- CLICK ROUTER (Event Delegation) ---
    // We attach to the container elements instead of a non-existent #committees ID
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
            ${['chair', 'viceChair', 'secretary'].map(role => committee[role] ? `
              <div class="formal-officer-profile-card" style="padding: 20px;">
                <div class="formal-officer-photo-box" style="width: 100px; height: 100px;">${renderAvatar(committee[role], 'fas fa-user-tie')}</div>
                <div class="formal-officer-text-stack">
                  <h3>${committee[role].name || committee[role]}</h3>
                  <span class="formal-role-chip">${role.replace(/([A-Z])/g, ' $1').toUpperCase()}</span>
                  ${renderSocials(committee[role])}
                </div>
              </div>` : '').join('')}
          </div>
          <div class="committee-roster-grid-system">
            ${committee.members.map(member => `
              <div class="formal-officer-profile-card" style="padding: 20px;">
                <div class="formal-officer-photo-box" style="width: 70px; height: 70px;">${renderAvatar(member, 'fas fa-user')}</div>
                <div class="formal-officer-text-stack">
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