export function initStaggerCards() {
  document.querySelectorAll('.officer-card:not(.officer-featured)').forEach((card, i) => {
    card.style.transitionDelay = `${(i % 3) * 0.1}s`;
  });

  /* ── Staggered Committee Cards ───────────────────────── */
  document.querySelectorAll('.committee-card').forEach((card, i) => {
  card.style.transitionDelay = `${(i % 3) * 0.1}s`;
  });
}