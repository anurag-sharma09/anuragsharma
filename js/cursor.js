/* ============================================================
   CUSTOM MAGNETIC CURSOR + TRAILING PARTICLES
   ============================================================ */

(function initCursor() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;

  let posX = 0, posY = 0;
  let followerX = 0, followerY = 0;

  /* ── Move cursor dot ── */
  document.addEventListener('mousemove', (e) => {
    posX = e.clientX;
    posY = e.clientY;
    cursor.style.left = posX + 'px';
    cursor.style.top  = posY + 'px';
  });

  /* ── Smooth follower ── */
  function animateFollower() {
    followerX += (posX - followerX) * 0.12;
    followerY += (posY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  /* ── Hover states ── */
  const interactives = document.querySelectorAll(
    'a, button, .project-card, .skill-category, .tilt-card, .social-btn, .tech-pill, .timeline-card, input, textarea'
  );

  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      follower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      follower.classList.remove('hover');
    });
  });

  /* ── Click ripple ── */
  document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      width: 10px; height: 10px;
      background: rgba(108,99,255,0.5);
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0);
      pointer-events: none;
      z-index: 9997;
      animation: cursor-ripple 0.5s ease forwards;
    `;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  });

  /* ── Ripple keyframe injection ── */
  if (!document.getElementById('cursor-ripple-style')) {
    const style = document.createElement('style');
    style.id = 'cursor-ripple-style';
    style.textContent = `
      @keyframes cursor-ripple {
        to { transform: translate(-50%,-50%) scale(8); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  /* ── Hide default cursor ── */
  document.body.style.cursor = 'none';
})();


/* ── 3D Tilt Card Effect ── */
(function initTiltCard() {
  const card = document.getElementById('tilt-card');
  if (!card) return;

  const INTENSITY = 15;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;

    card.style.transform = `
      perspective(800px)
      rotateY(${x * INTENSITY}deg)
      rotateX(${-y * INTENSITY}deg)
      scale3d(1.03, 1.03, 1.03)
    `;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
    card.style.transition = 'transform 0.5s ease';
  });

  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease';
  });
})();
