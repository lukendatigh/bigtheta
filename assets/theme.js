/* Theme toggle.

   The stylesheet follows the OS preference on its own, so this script only
   deals with an explicit choice: it writes data-theme on <html>, remembers it
   in localStorage, and keeps the button's label and the browser chrome in
   sync. The pre-paint snippet in each page's <head> applies the stored choice
   before first render so there is no flash. */

(function () {
  var KEY = 'bigtheta-theme';
  var root = document.documentElement;
  var media = window.matchMedia('(prefers-color-scheme: dark)');

  function stored() {
    try {
      var v = localStorage.getItem(KEY);
      return v === 'dark' || v === 'light' ? v : null;
    } catch (e) {
      return null;
    }
  }

  function active() {
    return stored() || (media.matches ? 'dark' : 'light');
  }

  function sync() {
    var theme = active();
    var next = theme === 'dark' ? 'light' : 'dark';

    var buttons = document.querySelectorAll('.theme-toggle');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-label', 'Switch to ' + next + ' theme');
      buttons[i].setAttribute('title', 'Switch to ' + next + ' theme');
      buttons[i].setAttribute('aria-pressed', String(theme === 'dark'));
    }

    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0f1011' : '#ffffff');
  }

  function toggle() {
    var next = active() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem(KEY, next);
    } catch (e) {
      /* private browsing — the choice just won't outlive the page */
    }
    sync();
  }

  function init() {
    var buttons = document.querySelectorAll('.theme-toggle');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].hidden = false;
      buttons[i].addEventListener('click', toggle);
    }
    sync();
  }

  // Track the OS while no explicit choice has been made.
  var onChange = function () {
    if (!stored()) sync();
  };
  if (media.addEventListener) media.addEventListener('change', onChange);
  else if (media.addListener) media.addListener(onChange);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
