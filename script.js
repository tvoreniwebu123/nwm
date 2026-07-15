const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

const closeNavigation = () => {
  navLinks?.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
  document.querySelectorAll('.nav-dropdown.open').forEach(dropdown => {
    dropdown.classList.remove('open');
    dropdown.querySelector('.nav-drop-toggle')?.setAttribute('aria-expanded', 'false');
  });
};

navToggle?.addEventListener('click', event => {
  event.stopPropagation();
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => closeNavigation());
});

document.querySelectorAll('.nav-drop-toggle').forEach(button => {
  button.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    const dropdown = button.closest('.nav-dropdown');
    const isOpen = dropdown.classList.toggle('open');
    button.setAttribute('aria-expanded', String(isOpen));
  });
});

document.addEventListener('click', event => {
  if (!event.target.closest('.nav')) closeNavigation();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeNavigation();
});

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.getAttribute('href') === currentPage) link.classList.add('active');
});

document.querySelectorAll('a[href="#"]').forEach(link => {
  link.addEventListener('click', event => event.preventDefault());
});

const inquiryForm = document.querySelector('[data-inquiry-form]');
inquiryForm?.addEventListener('submit', event => {
  event.preventDefault();
  const note = inquiryForm.querySelector('#formNote');
  if (note) note.textContent = 'Děkujeme, formulář je připravený pro budoucí napojení.';
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view'));
}
