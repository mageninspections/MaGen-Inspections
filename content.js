/**
 * content.js — Dynamic content loader for MaGen Radon Mitigation
 * Reads saved values from localStorage and applies them to the page.
 * Runs on every page. Falls back to original defaults if nothing is saved.
 */
(function () {
  'use strict';

  const DEFAULTS = {
    phone_display: '614-557-9716',
    phone_tel:     '6145579716',
    email:         'mageninspections@gmail.com',
    address:       'Columbus, Ohio',
    tagline:       'Protecting You and Your House',
    hours:         'Mon\u2013Fri: 8am\u20136pm  |  Sat: 9am\u20134pm',
    hero_headline: 'Protect Your Home From *Radon Gas*',
    hero_sub:      "Radon is the #1 cause of lung cancer in non-smokers. You can\u2019t see it, smell it, or feel it \u2014 but it may be inside your home right now. We test, we fix, we protect.",
  };

  function get(key) {
    const saved = localStorage.getItem('site_' + key);
    return (saved !== null && saved !== '') ? saved : DEFAULTS[key];
  }

  // Convert *word* → <em>word</em>
  function parseHeadline(text) {
    return text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  }

  function applyContent() {
    const phoneDisplay = get('phone_display');
    const phoneTel     = get('phone_tel');
    const email        = get('email');
    const tagline      = get('tagline');

    // ── Phone links ──────────────────────────────
    document.querySelectorAll('a[href^="tel:"]').forEach(function (el) {
      el.href = 'tel:' + phoneTel;
      var text = el.textContent;
      if (text.indexOf(DEFAULTS.phone_display) !== -1) {
        el.textContent = text.replace(DEFAULTS.phone_display, phoneDisplay);
      }
    });

    // ── Tagline (under logo, all pages) ──────────
    document.querySelectorAll('.nav-logo-tagline').forEach(function (el) {
      el.textContent = tagline;
    });

    // ── Email links ───────────────────────────────
    document.querySelectorAll('a[href^="mailto:"]').forEach(function (el) {
      el.href = 'mailto:' + email;
      if (el.textContent.indexOf('@') !== -1) {
        el.textContent = email;
      }
    });

    // ── Hours (elements with data-content="hours") ─
    document.querySelectorAll('[data-content="hours"]').forEach(function (el) {
      el.textContent = get('hours');
    });

    // ── Address (elements with data-content="address") ─
    document.querySelectorAll('[data-content="address"]').forEach(function (el) {
      el.textContent = get('address');
    });

    // ── Homepage hero headline + subtext ─────────
    var heroH1 = document.querySelector('.hero-text h1');
    if (heroH1) {
      heroH1.innerHTML = parseHeadline(get('hero_headline'));
    }

    var heroParagraphs = document.querySelectorAll('.hero-text > p');
    if (heroParagraphs.length > 0) {
      heroParagraphs[0].textContent = get('hero_sub');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyContent);
  } else {
    applyContent();
  }
})();
