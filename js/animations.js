/* ============================================================
   GSAP SCROLL ANIMATIONS — ScrollTrigger
   ============================================================ */

(function initAnimations() {
  // Register GSAP plugins
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  /* ─────────────────────────────────
     [AOS] Custom Intersection Observer
  ───────────────────────────────── */
  const aosEls = document.querySelectorAll('[data-aos]');
  const aosObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
          aosObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );
  aosEls.forEach(el => aosObserver.observe(el));

  /* ─────────────────────────────────
     HERO Section — stagger in
  ───────────────────────────────── */
  gsap.from('.hero-name', {
    duration: 1.2,
    y: 80,
    opacity: 0,
    ease: 'power4.out',
    delay: 0.5,
  });

  /* ─────────────────────────────────
     NAVBAR — scroll effect
  ───────────────────────────────── */
  const navbar = document.getElementById('navbar');
  ScrollTrigger.create({
    trigger: 'body',
    start: 'top -60px',
    onEnter:  () => navbar && navbar.classList.add('scrolled'),
    onLeaveBack: () => navbar && navbar.classList.remove('scrolled'),
  });

  /* ─────────────────────────────────
     SECTION TITLES — character split
  ───────────────────────────────── */
  document.querySelectorAll('.section-title').forEach(title => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
  });

  /* ─────────────────────────────────
     SKILL BARS — animate on scroll
  ───────────────────────────────── */
  const skillFills = document.querySelectorAll('.skill-fill');
  skillFills.forEach(fill => {
    const targetWidth = fill.dataset.width + '%';

    ScrollTrigger.create({
      trigger: fill,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(fill, {
          width: targetWidth,
          duration: 1.5,
          ease: 'power2.out',
          delay: Math.random() * 0.3,
        });
      },
    });
  });

  /* ─────────────────────────────────
     PROJECT CARDS — stagger reveal
  ───────────────────────────────── */
  gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
      y: 60,
      opacity: 0,
      duration: 0.9,
      delay: i * 0.12,
      ease: 'power3.out',
    });
  });

  /* ─────────────────────────────────
     TIMELINE — draw line on scroll
  ───────────────────────────────── */
  const timelineLine = document.querySelector('.timeline-line');
  if (timelineLine) {
    gsap.from(timelineLine, {
      scrollTrigger: {
        trigger: '.timeline-container',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
      },
      scaleY: 0,
      transformOrigin: 'top center',
    });
  }

  gsap.utils.toArray('.timeline-item').forEach((item, i) => {
    const isRight = item.classList.contains('right');
    gsap.from(item.querySelector('.timeline-card'), {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      x: isRight ? 60 : -60,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: 'power3.out',
    });
    gsap.from(item.querySelector('.timeline-dot'), {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: 'back.out(2)',
    });
  });

  /* ─────────────────────────────────
     ABOUT STATS ROW — counter animation
  ───────────────────────────────── */
  const statVals = document.querySelectorAll('.stat-val');
  statVals.forEach(stat => {
    const text = stat.textContent.trim();
    const num  = parseInt(text);
    const suffix = text.replace(/\d/g, '');

    ScrollTrigger.create({
      trigger: stat,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        let current = 0;
        const step = num / 40;
        const timer = setInterval(() => {
          current = Math.min(current + step, num);
          stat.textContent = Math.round(current) + suffix;
          if (current >= num) clearInterval(timer);
        }, 30);
      },
    });
  });

  /* ─────────────────────────────────
     TECH PILLS — stagger reveal
  ───────────────────────────────── */
  gsap.from('.tech-pill', {
    scrollTrigger: {
      trigger: '.tech-stack-row',
      start: 'top 90%',
      toggleActions: 'play none none reverse',
    },
    scale: 0.5,
    opacity: 0,
    duration: 0.5,
    stagger: 0.05,
    ease: 'back.out(1.7)',
  });

  /* ─────────────────────────────────
     SKILL CATEGORIES — stagger
  ───────────────────────────────── */
  gsap.from('.skill-category', {
    scrollTrigger: {
      trigger: '.skills-grid',
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
  });

  /* ─────────────────────────────────
     CONTACT SECTION — entrance
  ───────────────────────────────── */
  gsap.from('.contact-form-wrap', {
    scrollTrigger: {
      trigger: '.contact-grid',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
    y: 50,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out',
    delay: 0.2,
  });

  /* ─────────────────────────────────
     FOOTER — entrance
  ───────────────────────────────── */
  gsap.from('.footer', {
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 95%',
      toggleActions: 'play none none reverse',
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  });

  /* ─────────────────────────────────
     Parallax on hero section elements
  ───────────────────────────────── */
  gsap.to('.orb-1', {
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
    y: -100,
  });
  gsap.to('.orb-2', {
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
    },
    y: -60,
  });

})();
