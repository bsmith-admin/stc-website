document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
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

  var newsItems = document.querySelectorAll('.news-item');
  var heroImages = document.querySelectorAll('.hero-graphic-img');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (newsItems.length > 1 && !reduceMotion) {
    var current = 0;
    setInterval(function () {
      newsItems[current].classList.remove('active');
      if (heroImages[current]) {
        heroImages[current].classList.remove('active');
      }
      current = (current + 1) % newsItems.length;
      newsItems[current].classList.add('active');
      if (heroImages[current]) {
        heroImages[current].classList.add('active');
      }
    }, 7000);
  }
});
