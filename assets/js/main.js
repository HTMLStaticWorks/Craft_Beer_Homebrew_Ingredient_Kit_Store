/* ============================================================
   SUPPLY CO. — Main JavaScript
   Nav · Theme · RTL · Animations · Carousel · Forms
   ============================================================ */
'use strict';

/* ── 1. THEME TOGGLE ── */
const THEME_KEY = 'supplyco-theme';
const THEME_ATTR = 'data-theme';

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute(THEME_ATTR, theme);
  localStorage.setItem(THEME_KEY, theme);
  updateThemeIcons(theme);
}

function updateThemeIcons(theme) {
  document.querySelectorAll('[data-theme-icon]').forEach(el => {
    const sunIcon  = el.querySelector('.icon-sun');
    const moonIcon = el.querySelector('.icon-moon');
    if (sunIcon && moonIcon) {
      sunIcon.style.display  = theme === 'dark'  ? 'block' : 'none';
      moonIcon.style.display = theme === 'light' ? 'block' : 'none';
    }
  });
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const theme = saved || getSystemTheme();
  applyTheme(theme);

  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute(THEME_ATTR) || 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem(THEME_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

/* ── 2. RTL TOGGLE ── */
const RTL_KEY = 'supplyco-rtl';

function applyRTL(isRTL) {
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  localStorage.setItem(RTL_KEY, isRTL ? '1' : '0');
  // load rtl.css if not already loaded
  const existingLink = document.getElementById('rtl-stylesheet');
  if (isRTL && !existingLink) {
    const link = document.createElement('link');
    link.id   = 'rtl-stylesheet';
    link.rel  = 'stylesheet';
    link.href = 'assets/css/rtl.css';
    document.head.appendChild(link);
  } else if (!isRTL && existingLink) {
    existingLink.remove();
  }
}

function initRTL() {
  const savedRTL = localStorage.getItem(RTL_KEY);
  if (savedRTL === '1') {
    applyRTL(true);
  }

  document.querySelectorAll('[data-rtl-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const isRTL = document.documentElement.dir === 'rtl';
      applyRTL(!isRTL);
    });
  });
}

/* ── 3. NAVBAR ── */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  // Scroll handler
  const handleScroll = () => {
    if (window.scrollY > 24) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Active link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__link, .drawer__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ── 4. HAMBURGER DRAWER ── */
function initDrawer() {
  const hamburger = document.querySelector('.hamburger');
  const drawer    = document.querySelector('.drawer');
  const overlay   = document.querySelector('.drawer-overlay');
  const closeBtn  = document.querySelector('.drawer__close');

  if (!hamburger || !drawer) return;

  function openDrawer() {
    hamburger.classList.add('open');
    drawer.classList.add('open');
    overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  }

  function closeDrawer() {
    hamburger.classList.remove('open');
    drawer.classList.remove('open');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.focus();
  }

  hamburger.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', closeDrawer);

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Close on drawer link click
  document.querySelectorAll('.drawer__link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ── 5. PARALLAX HERO ── */
function initParallax() {
  const heroBg = document.querySelector('.hero__bg');
  if (!heroBg) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    heroBg.style.transform = `scale(1.08) translateY(${scrollY * 0.3}px)`;
  }, { passive: true });
}

/* ── 6. TYPEWRITER EFFECT ── */
function initTypewriter() {
  const el = document.querySelector('[data-typewriter]');
  if (!el) return;

  const words = JSON.parse(el.getAttribute('data-words') || '[]');
  if (!words.length) return;

  const cursor = document.createElement('span');
  cursor.className = 'typewriter-cursor';
  el.parentNode.insertBefore(cursor, el.nextSibling);

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function type() {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      el.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentWord.length) {
        isPaused = true;
        setTimeout(() => { isPaused = false; isDeleting = true; type(); }, 2000);
        return;
      }
    } else {
      el.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    const speed = isDeleting ? 60 : 110;
    if (!isPaused) setTimeout(type, speed);
  }

  setTimeout(type, 1200);
}

/* ── 7. SCROLL REVEAL ── */
function initScrollReveal() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── 8. TESTIMONIALS CAROUSEL ── */
function initTestimonialsCarousel() {
  const track = document.querySelector('.testimonials__track');
  const dots   = document.querySelectorAll('.testimonials__dot');
  const prevBtn = document.querySelector('.testimonials__btn--prev');
  const nextBtn = document.querySelector('.testimonials__btn--next');

  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  let current = 0;
  let visible = getVisibleCount();
  let total   = Math.ceil(cards.length / visible);
  let autoInterval;

  function getVisibleCount() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function getCardWidth() {
    const card = cards[0];
    if (!card) return 0;
    return card.offsetWidth + 20; // 20 = gap approx
  }

  function goTo(index) {
    visible = getVisibleCount();
    total   = Math.ceil(cards.length / visible);
    current = Math.max(0, Math.min(index, total - 1));
    const offset = current * visible * getCardWidth();
    track.style.transform = `translateX(-${offset}px)`;

    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }

  function startAuto() {
    autoInterval = setInterval(() => goTo((current + 1) % total), 5000);
  }

  function stopAuto() {
    clearInterval(autoInterval);
  }

  prevBtn?.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
  nextBtn?.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); });
  });

  track.addEventListener('touchstart', e => { stopAuto(); }, { passive: true });

  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? current + 1 : current - 1);
    }
    startAuto();
  });

  window.addEventListener('resize', () => { goTo(0); });

  goTo(0);
  startAuto();
}

/* ── 9. COUNTER ANIMATION ── */
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.getAttribute('data-counter'));
      const suffix = el.getAttribute('data-suffix') || '';
      const prefix = el.getAttribute('data-prefix') || '';
      const duration = 1800;
      const start = performance.now();

      function update(timestamp) {
        const elapsed  = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease     = 1 - Math.pow(1 - progress, 3);
        const value    = Math.round(ease * target);
        el.textContent = prefix + value.toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

/* ── 10. BLOG FILTER ── */
function initBlogFilter() {
  const filterBtns = document.querySelectorAll('.blog-filter-btn');
  const blogCards  = document.querySelectorAll('.blog-card[data-category]');

  if (!filterBtns.length || !blogCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      blogCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = '';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = ''; }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });
}

/* ── 11. RECIPE BUILDER ── */
function initRecipeBuilder() {
  const steps = document.querySelectorAll('.recipe-builder__step');
  const output = document.querySelector('.recipe-builder__output');

  if (!steps.length) return;

  const recipes = {
    lager: {
      title: 'Classic American Lager',
      details: 'ABV: 4.2% · IBU: 12 · Color: Pale Gold · Fermentation: 50°F / 10°C',
    },
    ipa: {
      title: 'West Coast IPA',
      details: 'ABV: 6.8% · IBU: 65 · Color: Amber · Fermentation: 68°F / 20°C',
    },
    stout: {
      title: 'Dry Irish Stout',
      details: 'ABV: 4.5% · IBU: 40 · Color: Near-Black · Fermentation: 65°F / 18°C',
    },
    wheat: {
      title: 'Hefeweizen Wheat',
      details: 'ABV: 5.1% · IBU: 14 · Color: Hazy Pale · Fermentation: 62°F / 17°C',
    },
  };

  steps.forEach(step => {
    step.addEventListener('click', () => {
      steps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');

      const recipeKey = step.getAttribute('data-recipe');
      const recipe = recipes[recipeKey];

      if (recipe && output) {
        const titleEl   = output.querySelector('.recipe-builder__output-title');
        const detailEl  = output.querySelector('.recipe-builder__output-details');
        if (titleEl)  titleEl.textContent  = recipe.title;
        if (detailEl) detailEl.textContent = recipe.details;
        output.classList.add('visible');
      }
    });
  });
}

/* ── 12. COUNTDOWN TIMER ── */
function initCountdown() {
  const countdownEl = document.getElementById('countdown');
  if (!countdownEl) return;

  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 47);

  function update() {
    const now  = new Date();
    const diff = launchDate - now;

    if (diff <= 0) {
      countdownEl.innerHTML = '<p style="color:var(--color-primary-light)">We\'re Live!</p>';
      return;
    }

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const fmt = n => String(n).padStart(2, '0');

    countdownEl.querySelector('[data-days]').textContent    = fmt(days);
    countdownEl.querySelector('[data-hours]').textContent   = fmt(hours);
    countdownEl.querySelector('[data-minutes]').textContent = fmt(minutes);
    countdownEl.querySelector('[data-seconds]').textContent = fmt(seconds);
  }

  update();
  setInterval(update, 1000);
}

/* ── 13. FORM VALIDATION ── */
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setFieldState(input, state, message) {
  input.classList.remove('error', 'success');
  const errorEl = input.parentElement?.querySelector('.form-error');

  if (state === 'error') {
    input.classList.add('error');
    if (errorEl) { errorEl.textContent = message; errorEl.classList.add('visible'); }
  } else if (state === 'success') {
    input.classList.add('success');
    if (errorEl) { errorEl.classList.remove('visible'); }
  } else {
    if (errorEl) { errorEl.classList.remove('visible'); }
  }
}

function clearFieldState(input) {
  input.classList.remove('error', 'success');
  const errorEl = input.parentElement?.querySelector('.form-error');
  if (errorEl) errorEl.classList.remove('visible');
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = form.querySelectorAll('.form-input, .form-textarea');
  fields.forEach(f => f.addEventListener('blur', () => validateContactField(f)));
  fields.forEach(f => f.addEventListener('input', () => {
    if (f.classList.contains('error')) validateContactField(f);
  }));

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    fields.forEach(f => { if (!validateContactField(f)) valid = false; });
    if (valid) {
      const success = form.querySelector('.form-success');
      if (success) success.classList.add('visible');
      form.reset();
      fields.forEach(f => clearFieldState(f));
    }
  });
}

function validateContactField(field) {
  const value = field.value.trim();
  const name  = field.name || field.id;

  if (!value) {
    setFieldState(field, 'error', 'This field is required.');
    return false;
  }
  if (name === 'email' && !validateEmail(value)) {
    setFieldState(field, 'error', 'Please enter a valid email address.');
    return false;
  }
  setFieldState(field, 'success', '');
  return true;
}

function initAuthForm() {
  const loginForm    = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      const email    = loginForm.querySelector('#login-email');
      const password = loginForm.querySelector('#login-password');

      if (!email.value.trim() || !validateEmail(email.value.trim())) {
        setFieldState(email, 'error', 'Please enter a valid email address.'); valid = false;
      } else {
        setFieldState(email, 'success', '');
      }

      if (!password.value || password.value.length < 8) {
        setFieldState(password, 'error', 'Password must be at least 8 characters.'); valid = false;
      } else {
        setFieldState(password, 'success', '');
      }

      if (valid) {
        const success = loginForm.querySelector('.form-success');
        if (success) success.classList.add('visible');
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      const name     = registerForm.querySelector('#reg-name');
      const email    = registerForm.querySelector('#reg-email');
      const password = registerForm.querySelector('#reg-password');
      const confirm  = registerForm.querySelector('#reg-confirm');
      const terms    = registerForm.querySelector('#reg-terms');

      if (!name.value.trim() || name.value.trim().length < 2) {
        setFieldState(name, 'error', 'Please enter your full name.'); valid = false;
      } else { setFieldState(name, 'success', ''); }

      if (!email.value.trim() || !validateEmail(email.value.trim())) {
        setFieldState(email, 'error', 'Please enter a valid email address.'); valid = false;
      } else { setFieldState(email, 'success', ''); }

      if (!password.value || password.value.length < 8) {
        setFieldState(password, 'error', 'Password must be at least 8 characters.'); valid = false;
      } else { setFieldState(password, 'success', ''); }

      if (!confirm.value || confirm.value !== password.value) {
        setFieldState(confirm, 'error', 'Passwords do not match.'); valid = false;
      } else if (confirm.value) { setFieldState(confirm, 'success', ''); }

      if (!terms.checked) {
        const termsError = registerForm.querySelector('#terms-error');
        if (termsError) { termsError.classList.add('visible'); }
        valid = false;
      } else {
        const termsError = registerForm.querySelector('#terms-error');
        if (termsError) termsError.classList.remove('visible');
      }

      if (valid) {
        const success = registerForm.querySelector('.form-success');
        if (success) success.classList.add('visible');
      }
    });

    // Live validation
    ['reg-name','reg-email','reg-password','reg-confirm'].forEach(id => {
      const input = registerForm.querySelector(`#${id}`);
      if (input) {
        input.addEventListener('blur', () => {
          if (!input.value.trim()) return;
          if (id === 'reg-email' && !validateEmail(input.value.trim())) {
            setFieldState(input, 'error', 'Please enter a valid email address.');
          } else if ((id === 'reg-password' || id === 'reg-confirm') && input.value.length < 8) {
            setFieldState(input, 'error', 'Minimum 8 characters required.');
          } else if (id === 'reg-confirm') {
            const pw = registerForm.querySelector('#reg-password');
            if (pw && input.value !== pw.value) {
              setFieldState(input, 'error', 'Passwords do not match.');
            } else { setFieldState(input, 'success', ''); }
          } else {
            setFieldState(input, 'success', '');
          }
        });
      }
    });
  }
}

/* ── 14. NEWSLETTER FORMS ── */
function initNewsletterForms() {
  document.querySelectorAll('[data-newsletter-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input   = form.querySelector('input[type="email"]');
      const msgEl   = form.querySelector('[data-newsletter-msg]');

      if (!input || !validateEmail(input.value.trim())) {
        if (input) input.style.borderColor = '#D94040';
        return;
      }

      input.style.borderColor = '';
      if (msgEl) {
        msgEl.textContent = '🍺 You\'re on the list! Brew updates coming your way.';
        msgEl.style.display = 'block';
      }

      form.reset();
    });
  });
}

/* ── 15. MOBILE TOUCH SWIPE for ingredient cards ── */
function initTouchSwipe() {
  // swipe support is already in carousel; could extend here if needed
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initNavbar();
  initDrawer();
  initParallax();
  initTypewriter();
  initScrollReveal();
  initTestimonialsCarousel();
  initCounters();
  initBlogFilter();
  initRecipeBuilder();
  initCountdown();
  initContactForm();
  initAuthForm();
  initNewsletterForms();
});
