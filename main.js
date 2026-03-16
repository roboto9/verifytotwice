document.addEventListener('DOMContentLoaded', function () {
  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu toggle (minimal, unobtrusive)
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isHidden = getComputedStyle(nav).display === 'none';
      if (isHidden) {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '64px';
        nav.style.right = '18px';
        nav.style.background = getComputedStyle(document.documentElement).getPropertyValue('--nav-bg') || '#fff';
        nav.style.padding = '10px';
        nav.style.boxShadow = '0 8px 24px rgba(16,40,60,0.08)';
        nav.style.borderRadius = '10px';
        nav.style.gap = '8px';
      } else {
        nav.style.display = 'none';
      }
    });
    // Close mobile menu on link click
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      if (window.innerWidth <= 900) nav.style.display = 'none';
    }));
  }

  // Lightweight download click feedback
  ['downloadPrimary','downloadSecondary'].forEach(id=>{
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('click', () => {
      const old = el.textContent;
      el.textContent = 'Préparation...';
      setTimeout(()=> el.textContent = old, 700);
    });
  });

  // Theme toggle: persistent via localStorage
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const LS_KEY = 'vt2_theme';
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      themeToggle.textContent = '☀️';
      themeToggle.title = 'Mode clair';
    } else {
      document.documentElement.classList.remove('dark');
      themeToggle.textContent = '🌙';
      themeToggle.title = 'Mode sombre';
    }
  };

  // Initialize theme from localStorage or system preference
  let stored = null;
  try { stored = localStorage.getItem(LS_KEY); } catch (e) { /* ignore */ }
  if (stored) {
    applyTheme(stored);
  } else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      const next = isDark ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(LS_KEY, next); } catch (e) { /* ignore */ }
    });
  }

  // Ensure nav background updates when resizing (so it matches theme)
  window.addEventListener('resize', () => {
    if (nav && getComputedStyle(nav).display !== 'none') {
      nav.style.background = getComputedStyle(document.documentElement).getPropertyValue('--nav-bg') || '';
    }
  });
});