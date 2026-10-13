document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = form.querySelector('.form-submit-note');
      var submitBtn = form.querySelector('button[type="submit"]');

      // Honeypot: if this hidden field got filled in, it was a bot. Silently drop it.
      var honeypot = form.querySelector('input[name="_gotcha"]');
      if (honeypot && honeypot.value) {
        return;
      }

      if (submitBtn) { submitBtn.disabled = true; }
      if (note) {
        note.textContent = 'Sending...';
        note.style.color = '#64748B';
      }

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            form.reset();
            if (note) {
              note.textContent = "Thanks for reaching out. We'll follow up with you shortly.";
              note.style.color = '#0891B2';
            }
          } else {
            if (note) {
              note.textContent = "Something went wrong sending that. Please email info@sfttech.com directly.";
              note.style.color = '#DC2626';
            }
          }
        })
        .catch(function () {
          if (note) {
            note.textContent = "Something went wrong sending that. Please email info@sfttech.com directly.";
            note.style.color = '#DC2626';
          }
        })
        .finally(function () {
          if (submitBtn) { submitBtn.disabled = false; }
        });
    });
  }

  document.querySelectorAll('.multiselect').forEach(function (ms) {
    var trigger = ms.querySelector('.multiselect-trigger');
    var panel = ms.querySelector('.multiselect-panel');
    var placeholder = ms.querySelector('.multiselect-placeholder');
    var checkboxes = ms.querySelectorAll('input[type="checkbox"]');
    var defaultText = placeholder.textContent;

    function updateLabel() {
      var selected = Array.prototype.filter.call(checkboxes, function (cb) {
        return cb.checked;
      }).map(function (cb) {
        return cb.value;
      });
      if (selected.length === 0) {
        placeholder.textContent = defaultText;
        trigger.classList.remove('has-selection');
      } else if (selected.length <= 2) {
        placeholder.textContent = selected.join(', ');
        trigger.classList.add('has-selection');
      } else {
        placeholder.textContent = selected.length + ' services selected';
        trigger.classList.add('has-selection');
      }
    }

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = ms.classList.toggle('open');
      trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    if (form) {
      form.addEventListener('reset', function () {
        setTimeout(updateLabel, 0);
      });
    }

    checkboxes.forEach(function (cb) {
      cb.addEventListener('change', updateLabel);
    });
  });

  document.addEventListener('click', function (e) {
    document.querySelectorAll('.multiselect.open').forEach(function (ms) {
      if (!ms.contains(e.target)) {
        ms.classList.remove('open');
        ms.querySelector('.multiselect-trigger').setAttribute('aria-expanded', 'false');
      }
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.multiselect.open').forEach(function (ms) {
        ms.classList.remove('open');
        ms.querySelector('.multiselect-trigger').setAttribute('aria-expanded', 'false');
      });
    }
  });

  // ---- Careers page: load open positions from assets/data/positions.json ----
  var positionSelect = document.getElementById('c-position');
  var positionList = document.getElementById('open-positions-list');
  if (positionSelect || positionList) {
    fetch('assets/data/positions.json')
      .then(function (response) { return response.json(); })
      .then(function (positions) {
        if (positionSelect) {
          positionSelect.innerHTML = '';
          var placeholder = document.createElement('option');
          placeholder.value = '';
          placeholder.disabled = true;
          placeholder.selected = true;
          placeholder.textContent = 'Select a position';
          positionSelect.appendChild(placeholder);
          positions.forEach(function (pos) {
            var opt = document.createElement('option');
            opt.value = pos.title;
            opt.textContent = pos.title;
            positionSelect.appendChild(opt);
          });
        }
        if (positionList) {
          positionList.innerHTML = '';
          positions.forEach(function (pos, i) {
            var card = document.createElement('div');
            card.className = 'card';
            card.innerHTML =
              '<div class="icon-dot">' + String(i + 1).padStart(2, '0') + '</div>' +
              '<h3>' + pos.title + '</h3>' +
              '<p>' + pos.summary + '</p>' +
              '<p class="form-note" style="margin:10px 0 16px;">' + [pos.location, pos.type].filter(Boolean).join(' &middot; ') + '</p>' +
              '<button type="button" class="btn btn-outline-dark" data-apply-position="' + pos.title.replace(/"/g, '&quot;') + '">Apply for this role</button>';
            positionList.appendChild(card);
          });
          positionList.addEventListener('click', function (e) {
            var btn = e.target.closest('[data-apply-position]');
            if (!btn) { return; }
            var applySection = document.getElementById('apply');
            if (positionSelect) { positionSelect.value = btn.getAttribute('data-apply-position'); }
            if (applySection) { applySection.scrollIntoView({ behavior: 'smooth' }); }
          });
        }
      })
      .catch(function () {
        if (positionList) {
          positionList.innerHTML = '<p class="form-note">Could not load open positions right now. Email <a href="mailto:info@sfttech.com">info@sfttech.com</a> or use the general application below.</p>';
        }
        if (positionSelect) {
          positionSelect.innerHTML = '<option value="General Application">General Application</option>';
        }
      });
  }

  var newsItems = document.querySelectorAll('.news-item');
  var heroImages = document.querySelectorAll('.hero-graphic-img');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hero photos 2..N are loaded lazily (data-bg) so the first paint only fetches photo 1.
  var heroOverlay = 'linear-gradient(135deg, rgba(27,42,74,0.55), rgba(8,145,178,0.55))';
  function loadHero(i) {
    var el = heroImages[i];
    if (el && el.dataset.bg) {
      el.style.backgroundImage = heroOverlay + ", url('" + el.dataset.bg + "')";
      delete el.dataset.bg;
    }
  }

  if (newsItems.length > 1 && !reduceMotion) {
    var current = 0;
    window.addEventListener('load', function () { loadHero(1); });
    setInterval(function () {
      newsItems[current].classList.remove('active');
      if (heroImages[current]) {
        heroImages[current].classList.remove('active');
      }
      current = (current + 1) % newsItems.length;
      loadHero(current);
      loadHero((current + 1) % newsItems.length);
      newsItems[current].classList.add('active');
      if (heroImages[current]) {
        heroImages[current].classList.add('active');
      }
    }, 7000);
  }
});
