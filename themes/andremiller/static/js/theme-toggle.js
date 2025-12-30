/**
 * Dark/Light Mode Toggle for andremiller Theme
 * Uses Bootstrap 5.3's built-in dark mode support
 * Persists preference in localStorage
 */

(function() {
  'use strict';

  // DOM Elements
  const themeToggle = document.getElementById('theme-toggle');
  const lightIcon = document.getElementById('theme-icon-light');
  const darkIcon = document.getElementById('theme-icon-dark');

  if (!themeToggle || !lightIcon || !darkIcon) {
    console.warn('Theme toggle elements not found');
    return;
  }

  /**
   * Get the user's preferred theme
   * Priority: localStorage > system preference > default (light)
   */
  function getPreferredTheme() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  }

  /**
   * Set the theme on the document
   * @param {string} theme - 'light' or 'dark'
   */
  function setTheme(theme) {
    // Disable transitions during theme change to prevent flicker
    document.documentElement.setAttribute('data-bs-theme-switching', '');

    document.documentElement.setAttribute('data-bs-theme', theme);
    updateIcon(theme);

    // Re-enable transitions after theme has been applied
    // Use setTimeout to ensure the theme change has been processed
    setTimeout(() => {
      document.documentElement.removeAttribute('data-bs-theme-switching');
    }, 50);

    // Dispatch event for other scripts that might need to know
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  }

  /**
   * Update the toggle button icon
   * @param {string} theme - 'light' or 'dark'
   */
  function updateIcon(theme) {
    if (theme === 'dark') {
      lightIcon.classList.add('d-none');
      darkIcon.classList.remove('d-none');
      themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
      lightIcon.classList.remove('d-none');
      darkIcon.classList.add('d-none');
      themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
  }

  /**
   * Toggle between light and dark themes
   */
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  /**
   * Listen for system theme changes
   */
  function watchSystemTheme() {
    if (!window.matchMedia) return;

    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Only auto-switch if user hasn't set a preference
    darkModeQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // Initialize theme on page load
  function init() {
    const preferredTheme = getPreferredTheme();
    setTheme(preferredTheme);

    // Set up event listeners
    themeToggle.addEventListener('click', toggleTheme);

    // Watch for system theme changes
    watchSystemTheme();

    // Keyboard support (Enter/Space)
    themeToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
      }
    });
  }

  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose theme functions globally (optional, for debugging)
  window.themeUtils = {
    getTheme: () => document.documentElement.getAttribute('data-bs-theme'),
    setTheme: setTheme,
    toggleTheme: toggleTheme
  };
})();
