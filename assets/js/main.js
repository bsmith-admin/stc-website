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
      if (note) {
        note.textContent = 'This form is a placeholder — connect it to a form service (e.g. Formspree, Netlify Forms) or a backend to actually receive messages.';
        note.style.color = '#0891B2';
      }
    });
  }
});
