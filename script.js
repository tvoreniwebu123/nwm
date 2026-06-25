const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks?.classList.remove('open'));
});

document.querySelectorAll('.nav-drop-toggle').forEach(button => {
  button.addEventListener('click', event => {
    event.preventDefault();
    const dropdown = button.closest('.nav-dropdown');
    const isOpen = dropdown.classList.toggle('open');
    button.setAttribute('aria-expanded', String(isOpen));
  });
});

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.getAttribute('href') === currentPage) link.classList.add('active');
});

const fixturesEl = document.getElementById('fixtures');
const tableEl = document.getElementById('table');
if (fixturesEl && tableEl) {
  const fixtures = [
    { title: 'FC Jiskra Modrá A – soupeř bude doplněn', meta: 'Místo, datum a čas budou doplněny' },
    { title: 'Přátelské utkání / turnaj', meta: 'Informace budou doplněny' },
    { title: 'Kalendář akcí', meta: 'Bude napojen podle potřeby klubu' }
  ];
  const tableRows = [
    ['1.', 'Tým bude doplněn', '0 b.'],
    ['2.', 'FC Jiskra Modrá', '0 b.'],
    ['3.', 'Tým bude doplněn', '0 b.']
  ];

  fixturesEl.innerHTML = fixtures.map(item => `
    <div class="fixture"><div><strong>${item.title}</strong><span>${item.meta}</span></div><span>Detail</span></div>
  `).join('');
  tableEl.innerHTML = tableRows.map(row => `
    <div class="table-row"><div><strong>${row[0]} ${row[1]}</strong><span>Ukázková tabulka</span></div><strong>${row[2]}</strong></div>
  `).join('');

  document.querySelectorAll('.tab').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
      button.classList.add('active');
      document.getElementById(button.dataset.tab)?.classList.add('active');
    });
  });
}

document.getElementById('inquiryForm')?.addEventListener('submit', event => {
  event.preventDefault();
  document.getElementById('formNote').textContent = 'Děkujeme, formulář je připravený pro budoucí napojení.';
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
