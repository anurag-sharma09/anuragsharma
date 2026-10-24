/* ============================================================
   MAIN.JS — Entry Point
   Typed.js, Navigation, Contact Form, Nav Active State
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // Force scroll to top on initial page load/refresh
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  /* ─────────────────────────────────
     TYPED.JS — Hero typewriter effect
  ───────────────────────────────── */
  if (typeof Typed !== 'undefined') {
    const typedEl = document.getElementById('typed-text');
    if (typedEl) {
      new Typed(typedEl, {
        strings: [
          'Full Stack Developer',
          'UI/UX Designer',
          'Data Scientist',
          'Problem Solver',
          'Creative Thinker',
        ],
        typeSpeed: 70,
        backSpeed: 40,
        backDelay: 1800,
        startDelay: 600,
        loop: true,
        showCursor: false, // We use our own CSS cursor
      });
    }
  }

  /* ─────────────────────────────────
     HAMBURGER / MOBILE MENU
  ───────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close on nav link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ─────────────────────────────────
     ACTIVE NAV LINK — Intersection Observer
  ───────────────────────────────── */
  const sections = document.querySelectorAll('.section');
  const navItems = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navItems.forEach(link => {
            link.classList.toggle('active', link.dataset.section === id);
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(section => sectionObserver.observe(section));

  /* ─────────────────────────────────
     CONTACT FORM — Fake Submit Animation
  ───────────────────────────────── */
  const form       = document.getElementById('contact-form');
  const submitBtn  = document.getElementById('submit-btn');
  const btnText    = submitBtn?.querySelector('.btn-text');
  const btnIcon    = submitBtn?.querySelector('.btn-icon');
  const btnLoader  = submitBtn?.querySelector('.btn-loader');
  const successMsg = document.getElementById('form-success');

  if (form && submitBtn) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation
      const name    = form.querySelector('#form-name').value.trim();
      const email   = form.querySelector('#form-email').value.trim();
      const message = form.querySelector('#form-message').value.trim();

      if (!name || !email || !message) {
        shakeForm(submitBtn);
        return;
      }

      // Show loader
      btnText.textContent = 'Sending...';
      btnIcon?.classList.add('hidden');
      btnLoader?.classList.remove('hidden');
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.8';

      // Send via Web3Forms API
      const formData = new FormData(form);
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData
      })
      .then(res => res.json())
      .then(result => {
        btnLoader?.classList.add('hidden');
        if (result.success) {
          btnText.textContent = '✓ Sent!';
          submitBtn.style.opacity = '1';
          submitBtn.style.background = 'linear-gradient(135deg, #00ffaa, #00d4ff)';

          if (successMsg) {
            successMsg.textContent = '✅ Message sent successfully! Thank you for contacting me.';
            successMsg.classList.remove('hidden');
            successMsg.style.animation = 'page-in 0.5s ease both';
          }
          form.reset();
        } else {
          btnText.textContent = 'Failed';
          if (successMsg) {
            successMsg.textContent = '⚠️ Unable to send your message. Please try again.';
            successMsg.classList.remove('hidden');
          }
        }

        setTimeout(() => {
          btnText.textContent = 'Send Message';
          btnIcon?.classList.remove('hidden');
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          if (successMsg) successMsg.classList.add('hidden');
        }, 5000);
      })
      .catch(err => {
        btnLoader?.classList.add('hidden');
        btnText.textContent = 'Failed';
        if (successMsg) {
          successMsg.textContent = '⚠️ Unable to send your message. Please try again.';
          successMsg.classList.remove('hidden');
        }
        setTimeout(() => {
          btnText.textContent = 'Send Message';
          btnIcon?.classList.remove('hidden');
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          if (successMsg) successMsg.classList.add('hidden');
        }, 5000);
      });
    });
  }

  function shakeForm(el) {
    el.style.animation = 'none';
    el.offsetHeight; // reflow
    el.style.animation = 'shake 0.4s ease';
    if (!document.getElementById('shake-style')) {
      const style = document.createElement('style');
      style.id = 'shake-style';
      style.textContent = `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-5px); }
          80%       { transform: translateX(5px); }
        }
      `;
      document.head.appendChild(style);
    }
  }

  /* ─────────────────────────────────
     SMOOTH SCROLL for anchor links
  ───────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ─────────────────────────────────
     PROJECT CARD — Magnetic hover
  ───────────────────────────────── */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 12;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 12;
      card.style.transform = `perspective(600px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.15s ease';
    });
  });

  /* ─────────────────────────────────
     CONSOLE EASTER EGG
  ───────────────────────────────── */
  console.log('%c🚀 Hey there, fellow dev!', 'color: #6c63ff; font-size: 18px; font-weight: bold;');
  console.log('%cBuilt with ❤️ by Anurag Sharma', 'color: #00d4ff; font-size: 14px;');
  console.log('%cGitHub: https://github.com/anurag-sharma09', 'color: #9090a8; font-size: 12px;');

  /* ─────────────────────────────────
     PARTICLE TRAIL on mouse (canvas)
  ───────────────────────────────── */
  (function initParticleTrail() {
    const trailCanvas = document.createElement('canvas');
    trailCanvas.style.cssText = `
      position: fixed; inset: 0; pointer-events: none;
      z-index: 9995; width: 100%; height: 100%;
    `;
    document.body.appendChild(trailCanvas);
    const tCtx = trailCanvas.getContext('2d');
    trailCanvas.width  = window.innerWidth;
    trailCanvas.height = window.innerHeight;

    const particles = [];
    let mx = 0, my = 0;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: mx, y: my,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          alpha: 0.8,
          r: Math.random() * 3 + 1,
          color: Math.random() > 0.5 ? '#6c63ff' : '#00d4ff',
        });
      }
    });

    function loopTrail() {
      tCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x     += p.vx;
        p.y     += p.vy;
        p.alpha -= 0.04;
        p.r     *= 0.96;
        if (p.alpha <= 0) { particles.splice(i, 1); continue; }
        tCtx.beginPath();
        tCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        tCtx.fillStyle = p.color + Math.round(p.alpha * 255).toString(16).padStart(2, '0');
        tCtx.fill();
      }
      requestAnimationFrame(loopTrail);
    }
    loopTrail();

    window.addEventListener('resize', () => {
      trailCanvas.width  = window.innerWidth;
      trailCanvas.height = window.innerHeight;
    });
  })();

  /* ─────────────────────────────────
     REDESIGNED SKILLS SECTION INTERACTIVITY
     ───────────────────────────────── */
  const skillItems = document.querySelectorAll('.skill-item');
  const telemetryCard = document.getElementById('telemetry-card');
  const filterBtns = document.querySelectorAll('.skills-filter-row .filter-btn');
  const categories = document.querySelectorAll('.skills-grid .skill-category');

  // 1. Function to update Telemetry HUD Panel
  function updateTelemetry(item) {
    if (!item || !telemetryCard) return;

    // Remove active class from all items and add to clicked
    skillItems.forEach(el => el.classList.remove('active-item'));
    item.classList.add('active-item');

    const name = item.getAttribute('data-skill');
    const percent = item.getAttribute('data-percent');
    const icon = item.getAttribute('data-icon');
    const category = item.getAttribute('data-category').replace('_', ' ');
    const subskillsStr = item.getAttribute('data-subskills') || '';
    const level = item.getAttribute('data-level');
    const exp = item.getAttribute('data-experience');
    const desc = item.getAttribute('data-description');

    const subskills = subskillsStr.split(',').map(s => s.trim()).filter(Boolean);
    const tagsHtml = subskills.map(sub => `<span class="telemetry-tag">${sub}</span>`).join('');

    telemetryCard.innerHTML = `
      <div class="telemetry-header">
        <div class="telemetry-title-wrap">
          <span class="telemetry-icon">${icon}</span>
          <div class="telemetry-title-inner">
            <span class="telemetry-title">${name}</span>
            <span class="telemetry-category">${category}</span>
          </div>
        </div>
        <div class="telemetry-meta">
          <div class="telemetry-level">${level}</div>
          <div class="telemetry-exp">${exp}</div>
        </div>
      </div>
      <div class="telemetry-body">
        <p class="telemetry-desc">${desc}</p>
        <div>
          <h4 class="telemetry-subskills-title">Core Sub-Skills</h4>
          <div class="telemetry-tags">
            ${tagsHtml}
          </div>
        </div>
      </div>
    `;
  }

  // 2. Click events on skill items
  skillItems.forEach(item => {
    item.addEventListener('click', () => {
      updateTelemetry(item);
    });
  });

  // 3. Category Filter Tabs
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Manage active tab class
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      // Filter category grids with smooth entrance transitions
      categories.forEach(cat => {
        let isMatch = false;
        if (filterVal === 'all') {
          isMatch = true;
        } else if (filterVal === 'frontend' && cat.classList.contains('category-frontend')) {
          isMatch = true;
        } else if (filterVal === 'backend' && cat.classList.contains('category-backend')) {
          isMatch = true;
        } else if (filterVal === 'design_data' && cat.classList.contains('category-design-data')) {
          isMatch = true;
        }

        if (isMatch) {
          cat.style.display = 'block';
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(cat, 
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
            );
          } else {
            cat.style.opacity = '1';
          }
        } else {
          cat.style.display = 'none';
        }
      });

      // Automatically focus first item in active category
      if (filterVal === 'all') {
        const reactItem = document.getElementById('skill-item-s1');
        if (reactItem) {
          updateTelemetry(reactItem);
        } else if (skillItems.length > 0) {
          updateTelemetry(skillItems[0]);
        }
      } else {
        const activeCategoryGrid = document.querySelector(`.category-${filterVal.replace('_', '-')}`);
        if (activeCategoryGrid) {
          const firstSkill = activeCategoryGrid.querySelector('.skill-item');
          if (firstSkill) {
            updateTelemetry(firstSkill);
          }
        }
      }

      // Refresh ScrollTrigger positions
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    });
  });

  // 4. Select default first skill on load (React.js)
  const initialReactItem = document.getElementById('skill-item-s1');
  if (initialReactItem) {
    updateTelemetry(initialReactItem);
  } else if (skillItems.length > 0) {
    updateTelemetry(skillItems[0]);
  }

});
