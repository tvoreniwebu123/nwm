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

/* Sdílené prvky v19/v20 – navigace, právní informace a počítadlo */
document.querySelectorAll('.nav-submenu').forEach(menu => {
  let link = menu.querySelector('a[href="dalsi-tymy.html"]');
  if (!link) {
    link = document.createElement('a');
    link.href = 'dalsi-tymy.html';
    const contact = menu.querySelector('a[href="kontakt.html"]');
    menu.insertBefore(link, contact || null);
  }
  link.textContent = 'VIAGEM Ústí nad Labem B';
});

document.querySelectorAll('.footer-inner').forEach(footer => {
  const copy = footer.firstElementChild;
  if (copy && !copy.querySelector('.footer-legal-links')) {
    const links = document.createElement('div');
    links.className = 'footer-legal-links';
    links.innerHTML = '<a href="ochrana-osobnich-udaju.html">Ochrana osobních údajů</a><button type="button" data-cookie-settings>Nastavení cookies</button>';
    copy.appendChild(links);
  }
});

const topStrip = document.querySelector('.top-strip-inner');
if (topStrip && !topStrip.querySelector('.views-counter')) {
  const counter = document.createElement('div');
  counter.className = 'views-counter';
  counter.innerHTML = '<span>Zhlédnutí webu</span><strong data-view-count>—</strong><small data-view-status>Počítadlo čeká na připojení</small>';
  topStrip.prepend(counter);
}

/* Sjednocení názvu Regenerace ve viditelném obsahu. Cesty souborů zůstávají beze změny. */
const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
const textNodes = [];
while (textWalker.nextNode()) textNodes.push(textWalker.currentNode);
textNodes.forEach(node => {
  if (node.parentElement?.closest('script,style')) return;
  node.nodeValue = node.nodeValue
    .replace(/Sociální zařízení pokojů a rehabilitace/g, 'Regenerace a sociální zařízení')
    .replace(/Rehabilitace/g, 'Regenerace')
    .replace(/rehabilitace/g, 'regenerace');
});
document.querySelectorAll('[alt],[data-caption],[title],[aria-label]').forEach(element => {
  ['alt', 'data-caption', 'title', 'aria-label'].forEach(attribute => {
    const value = element.getAttribute(attribute);
    if (!value) return;
    element.setAttribute(attribute, value
      .replace(/Sociální zařízení pokojů a rehabilitace/g, 'Regenerace a sociální zařízení')
      .replace(/Rehabilitace/g, 'Regenerace')
      .replace(/rehabilitace/g, 'regenerace'));
  });
});
document.querySelectorAll('a[href$="#rehabilitace"]').forEach(link => link.setAttribute('href', link.getAttribute('href').replace('#rehabilitace', '#regenerace')));
const oldRegenerationAnchor = document.getElementById('rehabilitace');
if (oldRegenerationAnchor) oldRegenerationAnchor.id = 'regenerace';

/* Soustředění: regenerace je součástí stejného bloku jako hřiště a zázemí. */
const pitchGallery = document.querySelector('[data-gallery-set="hriste"]');
if (pitchGallery) {
  for (let index = 1; index <= 7; index += 1) {
    const number = String(index).padStart(2, '0');
    const displayNumber = String(index);
    const source = `assets/photos/rehabilitace/socialni-zarizeni-pokoju-a-rehabilitace-${number}.webp`;
    const button = document.createElement('button');
    button.className = 'gallery-photo';
    button.dataset.caption = `Regenerace a sociální zařízení ${displayNumber}`;
    button.dataset.lightbox = source;
    button.innerHTML = `<img alt="Regenerace a sociální zařízení ${displayNumber}" loading="lazy" src="${source}"><span>Regenerace a sociální zařízení ${displayNumber}</span>`;
    pitchGallery.appendChild(button);
  }
  const pitchCard = document.querySelector('.camp-category [data-open-gallery="hriste"]')?.closest('.camp-category');
  if (pitchCard) {
    const title = pitchCard.querySelector('h3');
    const coverLabel = pitchCard.querySelector('.camp-cover span');
    const description = pitchCard.querySelector('h3 + p');
    const coverImage = pitchCard.querySelector('.camp-cover img');
    if (title) title.textContent = 'Hřiště, zázemí a regenerace';
    if (coverLabel) coverLabel.textContent = 'Hřiště, zázemí a regenerace';
    if (description) description.textContent = 'Tréninkové plochy, sportovní zázemí a prostory pro regeneraci.';
    if (coverImage) coverImage.alt = 'Hřiště, zázemí a regenerace';
  }
}

/* Hlavní fotogalerie: sloučení regenerace do prvního bloku. */
if (currentPage === 'fotogalerie.html') {
  const categories = [...document.querySelectorAll('.gallery-category')];
  const pitchCategory = categories.find(section => section.querySelector('h2')?.textContent.trim() === 'Hřiště a zázemí');
  const regenerationCategory = categories.find(section => section.querySelector('h2')?.textContent.trim().startsWith('Regenerace'));
  if (pitchCategory && regenerationCategory) {
    pitchCategory.querySelector('h2').textContent = 'Hřiště, zázemí a regenerace';
    const targetGrid = pitchCategory.querySelector('.real-gallery-grid');
    regenerationCategory.querySelectorAll('.gallery-photo').forEach(photo => targetGrid.appendChild(photo));
    regenerationCategory.remove();
  }

  const container = document.querySelector('.compact-page .container');
  const visibleCategories = [...document.querySelectorAll('.gallery-category')];
  if (container && visibleCategories.length) {
    const index = document.createElement('nav');
    index.className = 'gallery-index';
    index.setAttribute('aria-label', 'Kategorie fotogalerie');
    const indexTitle = document.createElement('strong');
    indexTitle.className = 'gallery-index-title';
    indexTitle.textContent = 'Kategorie fotografií';
    index.appendChild(indexTitle);
    visibleCategories.forEach((section, categoryIndex) => {
      const heading = section.querySelector('h2');
      const id = `galerie-${categoryIndex + 1}`;
      section.id = id;
      const link = document.createElement('a');
      link.href = `#${id}`;
      link.textContent = heading?.textContent || `Galerie ${categoryIndex + 1}`;
      index.appendChild(link);
    });
    container.prepend(index);
  }
}

/* Náhledové pásy v kartách soustředění. */
document.querySelectorAll('.camp-category').forEach(card => {
  const opener = card.querySelector('[data-open-gallery]');
  const gallery = opener ? document.querySelector(`[data-gallery-set="${opener.dataset.openGallery}"]`) : null;
  if (!gallery || card.querySelector('.camp-preview-strip')) return;
  const photos = [...gallery.querySelectorAll('[data-lightbox]')];
  const indexes = opener.dataset.openGallery === 'hriste' && photos.length > 9 ? [0, 1, 8, 9] : [0, 1, 2, 3];
  const strip = document.createElement('div');
  strip.className = 'camp-preview-strip';
  strip.setAttribute('aria-label', 'Rychlý výběr fotografií');
  indexes.filter(index => photos[index]).forEach(index => {
    const photo = photos[index];
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.galleryPreview = opener.dataset.openGallery;
    button.dataset.previewIndex = String(index);
    button.setAttribute('aria-label', `Otevřít fotografii ${index + 1}`);
    button.innerHTML = `<img src="${photo.dataset.lightbox}" alt="${photo.dataset.caption || ''}" loading="lazy">`;
    strip.appendChild(button);
  });
  card.querySelector('.camp-cover')?.insertAdjacentElement('afterend', strip);
});

/* Kompaktní mřížka s možností zobrazit celou kategorii. */
document.querySelectorAll('.real-gallery-grid').forEach(grid => {
  grid.classList.add('gallery-enhanced-grid');
  const photos = [...grid.querySelectorAll('.gallery-photo')];
  if (photos.length <= 12) return;
  photos.slice(12).forEach(photo => photo.classList.add('gallery-collapsed-item'));
  const toggle = document.createElement('button');
  toggle.className = 'gallery-show-more';
  toggle.type = 'button';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.innerHTML = `<span>Zobrazit všechny fotografie</span> <b>(${photos.length})</b>`;
  toggle.addEventListener('click', () => {
    const expanded = grid.classList.toggle('show-all');
    toggle.setAttribute('aria-expanded', String(expanded));
    const label = expanded ? 'Zobrazit méně' : 'Zobrazit všechny fotografie';
    toggle.querySelector('span').textContent = translateString(label, document.documentElement.lang || 'cs');
  });
  grid.insertAdjacentElement('afterend', toggle);
});

/* Jednoduchý lightbox: šipky, klávesnice a spodní náhledy. */
const allPhotos = [...document.querySelectorAll('[data-lightbox]')];
if (allPhotos.length || document.querySelector('[data-open-gallery]')) {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.hidden = true;
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Prohlížeč fotografií');
  lightbox.innerHTML = `
    <div class="lightbox-panel">
      <div class="lightbox-toolbar">
        <div><strong class="lightbox-caption"></strong><span class="lightbox-counter"></span></div>
        <div class="lightbox-actions"><button class="lightbox-close" type="button" aria-label="Zavřít">×</button></div>
      </div>
      <div class="lightbox-viewer">
        <button class="lightbox-prev" type="button" aria-label="Předchozí fotografie">‹</button>
        <div class="lightbox-stage"><img alt="" draggable="false"></div>
        <button class="lightbox-next" type="button" aria-label="Další fotografie">›</button>
      </div>
      <div class="lightbox-thumbs" role="tablist" aria-label="Náhledy fotografií"></div>
    </div>`;
  document.body.appendChild(lightbox);

  const mainImage = lightbox.querySelector('.lightbox-stage img');
  const stage = lightbox.querySelector('.lightbox-stage');
  const caption = lightbox.querySelector('.lightbox-caption');
  const counter = lightbox.querySelector('.lightbox-counter');
  const thumbs = lightbox.querySelector('.lightbox-thumbs');
  let currentPhotos = [];
  let currentIndex = 0;
  let previousFocus = null;

  mainImage.addEventListener('load', () => mainImage.classList.remove('is-loading'));

  const showPhoto = index => {
    if (!currentPhotos.length) return;
    currentIndex = (index + currentPhotos.length) % currentPhotos.length;
    const photo = currentPhotos[currentIndex];
    mainImage.classList.add('is-loading');
    mainImage.src = photo.dataset.lightbox;
    mainImage.alt = photo.dataset.caption || photo.querySelector('img')?.alt || '';
    caption.textContent = translateString(photo.dataset.caption || '', document.documentElement.lang || 'cs');
    counter.textContent = `${currentIndex + 1} / ${currentPhotos.length}`;
    [...thumbs.children].forEach((button, thumbIndex) => {
      const active = thumbIndex === currentIndex;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
      if (active) button.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'center' });
    });
    const nextPhoto = currentPhotos[(currentIndex + 1) % currentPhotos.length];
    const previousPhoto = currentPhotos[(currentIndex - 1 + currentPhotos.length) % currentPhotos.length];
    [nextPhoto, previousPhoto].forEach(item => { const preload = new Image(); preload.src = item.dataset.lightbox; });
  };

  const openSet = (nodes, startIndex = 0) => {
    currentPhotos = [...nodes];
    if (!currentPhotos.length) return;
    previousFocus = document.activeElement;
    thumbs.innerHTML = '';
    currentPhotos.forEach((photo, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-label', `Fotografie ${index + 1}`);
      button.innerHTML = `<img src="${photo.dataset.lightbox}" alt="" loading="lazy">`;
      button.addEventListener('click', () => showPhoto(index));
      thumbs.appendChild(button);
    });
    lightbox.hidden = false;
    lightbox.classList.add('open');
    document.body.classList.add('lightbox-open');
    showPhoto(startIndex);
    lightbox.querySelector('.lightbox-close').focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.hidden = true;
    document.body.classList.remove('lightbox-open');
    previousFocus?.focus?.();
  };

  allPhotos.forEach(photo => photo.addEventListener('click', () => {
    const group = photo.closest('[data-gallery-set], .real-gallery-grid');
    const photos = group ? [...group.querySelectorAll('[data-lightbox]')] : allPhotos;
    openSet(photos, photos.indexOf(photo));
  }));
  document.querySelectorAll('[data-open-gallery]').forEach(button => button.addEventListener('click', () => {
    const set = document.querySelector(`[data-gallery-set="${button.dataset.openGallery}"]`);
    if (set) openSet(set.querySelectorAll('[data-lightbox]'), 0);
  }));
  document.querySelectorAll('[data-gallery-preview]').forEach(button => button.addEventListener('click', () => {
    const set = document.querySelector(`[data-gallery-set="${button.dataset.galleryPreview}"]`);
    if (set) openSet(set.querySelectorAll('[data-lightbox]'), Number(button.dataset.previewIndex || 0));
  }));

  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-prev').addEventListener('click', () => showPhoto(currentIndex - 1));
  lightbox.querySelector('.lightbox-next').addEventListener('click', () => showPhoto(currentIndex + 1));
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', event => {
    if (!lightbox.classList.contains('open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') showPhoto(currentIndex - 1);
    if (event.key === 'ArrowRight') showPhoto(currentIndex + 1);
  });
}

/* Klikací ukázkový kalendář s detailem každého dne. */
const calendar = document.querySelector('.calendar-card');
if (calendar) {
  const calendarDialog = document.createElement('div');
  calendarDialog.className = 'calendar-dialog';
  calendarDialog.hidden = true;
  calendarDialog.setAttribute('role', 'dialog');
  calendarDialog.setAttribute('aria-modal', 'true');
  calendarDialog.innerHTML = '<div class="calendar-dialog-card"><button type="button" class="calendar-dialog-close" aria-label="Zavřít">×</button><span class="calendar-dialog-date"></span><h3></h3><p></p><small>Kalendář je zatím ukázkový; přesný program bude doplněn.</small></div>';
  document.body.appendChild(calendarDialog);

  const detailsByType = {
    free: ['Volný termín', 'V ukázkovém kalendáři je tento den vedený jako volný.'],
    busy: ['Rezervovaný termín', 'Areál je v ukázkovém kalendáři vedený jako obsazený. Podrobnosti rezervace budou doplněny.'],
    match: ['Zápas / klubová akce', 'V areálu je naplánovaný zápas nebo klubová akce. Přesný program a čas budou doplněny.']
  };
  const calendarButtons = [...calendar.querySelectorAll('.calendar-grid button')];
  const updateCalendarLabels = (language = 'cs') => {
    const locale = language === 'de' ? 'de-DE' : language === 'en' ? 'en-GB' : 'cs-CZ';
    calendarButtons.forEach(button => {
      const type = button.classList.contains('match') ? 'match' : button.classList.contains('busy') ? 'busy' : 'free';
      button.dataset.calendarType = type;
      button.type = 'button';
      const date = new Date(2026, 5, Number(button.textContent)).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
      const status = language === 'cs' ? detailsByType[type][0] : translateString(detailsByType[type][0], language);
      button.setAttribute('aria-label', `${date} – ${status}`);
      button.title = language === 'cs' ? 'Zobrazit detail dne' : translateString('Zobrazit detail dne', language);
    });
  };
  window.updateCalendarLanguage = updateCalendarLabels;
  updateCalendarLabels();

  calendarButtons.forEach(button => button.addEventListener('click', () => {
    calendarButtons.forEach(day => day.classList.remove('is-selected'));
    button.classList.add('is-selected');
    const type = button.dataset.calendarType;
    const detail = detailsByType[type];
    const language = document.documentElement.lang || 'cs';
    const locale = language === 'de' ? 'de-DE' : language === 'en' ? 'en-GB' : 'cs-CZ';
    calendarDialog.querySelector('.calendar-dialog-date').textContent = new Date(2026, 5, Number(button.textContent)).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    calendarDialog.querySelector('h3').textContent = language === 'cs' ? detail[0] : translateString(detail[0], language);
    calendarDialog.querySelector('p').textContent = language === 'cs' ? detail[1] : translateString(detail[1], language);
    calendarDialog.hidden = false;
    calendarDialog.classList.add('open');
    calendarDialog.querySelector('.calendar-dialog-close').focus();
  }));
  const closeCalendar = () => {
    calendarDialog.classList.remove('open');
    calendarDialog.hidden = true;
  };
  calendarDialog.querySelector('.calendar-dialog-close').addEventListener('click', closeCalendar);
  calendarDialog.addEventListener('click', event => { if (event.target === calendarDialog) closeCalendar(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && calendarDialog.classList.contains('open')) closeCalendar(); });
}

/* Počítadlo používá společnou databázi přes Vercel API. Bez ní nezobrazuje vymyšlené číslo. */
const viewCount = document.querySelector('[data-view-count]');
const viewStatus = document.querySelector('[data-view-status]');
if (viewCount && viewStatus) {
  let increment = true;
  try {
    increment = sessionStorage.getItem('jiskra-view-counted') !== 'yes';
  } catch (error) {
    increment = true;
  }
  fetch(`/api/views?increment=${increment ? '1' : '0'}`, { cache: 'no-store' })
    .then(response => response.ok ? response.json() : Promise.reject(new Error('Counter unavailable')))
    .then(data => {
      if (!Number.isFinite(data.count)) throw new Error('Invalid counter');
      viewCount.textContent = new Intl.NumberFormat('cs-CZ').format(data.count);
      viewStatus.textContent = translateString('celkem', document.documentElement.lang || 'cs');
      try { sessionStorage.setItem('jiskra-view-counted', 'yes'); } catch (error) { /* storage may be disabled */ }
    })
    .catch(() => {
      viewCount.textContent = '—';
      viewStatus.textContent = translateString('Počítadlo čeká na připojení', document.documentElement.lang || 'cs');
    });
}

/* Decentní lišta pro technické uložení volby jazyka a nastavení. */
const cookieBanner = document.createElement('aside');
cookieBanner.className = 'cookie-banner';
cookieBanner.hidden = true;
cookieBanner.setAttribute('aria-label', 'Informace o cookies');
cookieBanner.innerHTML = '<div><strong>Nastavení webu</strong><p>Web používá pouze technické uložení volby jazyka, potvrzení této lišty a relace počítadla návštěv.</p></div><button type="button" class="cookie-confirm">Rozumím</button>';
document.body.appendChild(cookieBanner);
let cookiesConfirmed = false;
try { cookiesConfirmed = localStorage.getItem('jiskra-cookie-info') === 'accepted'; } catch (error) { /* storage may be disabled */ }
if (!cookiesConfirmed) cookieBanner.hidden = false;
cookieBanner.querySelector('.cookie-confirm').addEventListener('click', () => {
  try { localStorage.setItem('jiskra-cookie-info', 'accepted'); } catch (error) { /* storage may be disabled */ }
  cookieBanner.hidden = true;
});
document.querySelectorAll('[data-cookie-settings]').forEach(button => button.addEventListener('click', () => {
  cookieBanner.hidden = false;
  cookieBanner.querySelector('.cookie-confirm').focus();
}));


/* Jazykové mutace CZ / DE / EN */
const translations = {
  de: {
    'Úvod':'Startseite','Soustředění':'Trainingslager','Týmy':'Mannschaften','Sportovní areál':'Sportanlage','Klub':'Verein','O klubu':'Über den Verein','A tým':'A-Mannschaft','Zápasy':'Spiele','Další týmy':'Weitere Mannschaften','Kontakt':'Kontakt','Partneři':'Partner','Rezervace':'Reservierung','Fotogalerie':'Fotogalerie',
    'Oficiální web klubu':'Offizielle Vereinswebsite','Rezervace areálu':'Anlage reservieren','Aktuální soutěž':'Aktueller Wettbewerb','FC Jiskra Modrá na Fotbal.cz':'FC Jiskra Modrá auf Fotbal.cz','Rozpis, výsledky, tabulka a statistiky soutěže na jednom místě.':'Spielplan, Ergebnisse, Tabelle und Statistiken an einem Ort.','Rozpis a výsledky':'Spielplan und Ergebnisse','Odehrané i nadcházející zápasy':'Vergangene und kommende Spiele','Tabulka soutěže':'Tabelle','Aktuální pořadí týmů':'Aktuelle Platzierung','Statistiky soutěže':'Wettbewerbsstatistiken','Střelci a další přehledy':'Torschützen und weitere Übersichten',
    'Obsazenost hřiště':'Belegung des Spielfelds','Kalendář areálu':'Belegungskalender','Provizorní přehled. Skutečná obsazenost bude doplněna.':'Vorläufige Übersicht. Die tatsächliche Belegung wird ergänzt.','Ukázkový kalendář':'Beispielkalender','Volno':'Frei','Obsazeno':'Belegt','Zápas / akce':'Spiel / Veranstaltung','Sportovní areál':'Sportanlage','Soustředění a pronájem':'Trainingslager und Vermietung','Hřiště • ubytování • stravování • regenerace':'Spielfeld • Unterkunft • Verpflegung • Regeneration','Soustředění a ubytování':'Trainingslager und Unterkunft','Hřiště':'Spielfeld','Stravování':'Verpflegung','Regenerace':'Regeneration','Poptat termín':'Termin anfragen','Partneři klubu':'Vereinspartner','Prostor pro sponzory':'Platz für Sponsoren','Logo partnera':'Partnerlogo',
    'Základní údaje a vedení klubu.':'Grunddaten und Vereinsleitung.','← Zpět na úvod':'← Zurück zur Startseite','← Zpět na klub':'← Zurück zum Verein','← Zpět na rezervace':'← Zurück zur Reservierung','Klub od roku 1945':'Verein seit 1945','Fotbalový klub se sídlem v Jílovém. Další informace o historii a současnosti klubu budou doplněny.':'Fußballverein mit Sitz in Jílové. Weitere Informationen zur Geschichte und Gegenwart werden ergänzt.','Rok založení':'Gründungsjahr','Sídlo':'Sitz','Bankovní účet':'Bankverbindung','Vedení klubu':'Vereinsleitung','Předseda výkonného výboru':'Vorsitzender des Vorstands','Člen výkonného výboru':'Vorstandsmitglied','Členka výkonného výboru':'Vorstandsmitglied',
    'Kontakty na vedení a správce areálu.':'Kontakte zur Vereinsleitung und zum Anlagenverwalter.','Správce areálu':'Anlagenverwalter','Adresa':'Adresse','Otevřít mapu →':'Karte öffnen →',
    'Partneři a podporovatelé klubu.':'Partner und Unterstützer des Vereins.','Děkujeme':'Vielen Dank','Vážíme si podpory našich partnerů':'Wir schätzen die Unterstützung unserer Partner','Podpora partnerů pomáhá rozvoji klubu, hráčů i sportovního areálu.':'Die Unterstützung unserer Partner fördert den Verein, die Spieler und die Sportanlage.',
    'Poptávka hřiště, pobytu nebo klubové akce.':'Anfrage für Spielfeld, Aufenthalt oder Vereinsveranstaltung.','Možnosti rezervace':'Reservierungsmöglichkeiten','Vyberte typ rezervace':'Reservierungsart wählen','Pobyt, stravování a sportovní program':'Aufenthalt, Verpflegung und Sportprogramm','Pronájem areálu':'Anlage mieten','Hřiště, zápasy a klubové akce':'Spielfeld, Spiele und Vereinsveranstaltungen','Poptávka':'Anfrage','Nezávazný formulář':'Unverbindliches Formular','Jméno a příjmení':'Vor- und Nachname','Název klubu':'Vereinsname','Počet osob':'Personenzahl','Termín':'Termin','Typ rezervace':'Reservierungsart','Pronájem hřiště':'Spielfeldmiete','Klubová akce':'Vereinsveranstaltung','Jiná poptávka':'Andere Anfrage','E-mail':'E-Mail','Telefon':'Telefon','Poznámka':'Nachricht','Odeslat poptávku':'Anfrage senden','Formulář je zatím pouze ukázkový.':'Das Formular ist derzeit nur eine Vorschau.',
    'Ubytování, sport a program pro týmy.':'Unterkunft, Sport und Programm für Teams.','Pobyt pro tým':'Aufenthalt für Teams','Vše na jednom místě':'Alles an einem Ort','Kapacita, ceny a přesné podmínky budou doplněny.':'Kapazität, Preise und genaue Bedingungen werden ergänzt.','Hřiště a zázemí':'Spielfeld und Einrichtungen','Tréninkové hřiště a sportovní zázemí.':'Trainingsplatz und Sporteinrichtungen.','Zobrazit fotografie →':'Fotos anzeigen →','Ubytování':'Unterkunft','Pokoje a sociální zařízení.':'Zimmer und sanitäre Einrichtungen.','Stravování podle dohody.':'Verpflegung nach Vereinbarung.','Volnočasové aktivity':'Freizeitaktivitäten','Výlety a program v okolí.':'Ausflüge und Programm in der Umgebung.',
    'Realizační tým a hráči.':'Trainerteam und Spieler.','Realizační tým':'Trainerteam','A mužstvo':'A-Mannschaft','Trenér:':'Trainer:','Vedoucí:':'Teamleiter:','Domácí hřiště:':'Heimspielstätte:','Mapa a navigace':'Karte und Navigation','Soupiska':'Kader','Hráči':'Spieler','Další hráči budou doplněni po pořízení fotografií.':'Weitere Spieler werden nach Erstellung der Fotos ergänzt.',
    'Dva nejbližší zápasy a aktuální soutěž.':'Die zwei nächsten Spiele und der aktuelle Wettbewerb.','Nejbližší zápas':'Nächstes Spiel','Další zápas':'Weiteres Spiel','Termín bude doplněn':'Termin wird ergänzt','Soupeř bude doplněn':'Gegner wird ergänzt','Místo a čas budou doplněny':'Ort und Uhrzeit werden ergänzt','Kompletní údaje jsou průběžně aktualizované na oficiálním webu FAČR.':'Vollständige Daten werden laufend auf der offiziellen FAČR-Website aktualisiert.','Zápasy FC Jiskra Modrá':'Spiele von FC Jiskra Modrá','Tabulka':'Tabelle','Pořadí v soutěži':'Platzierung im Wettbewerb','Statistiky':'Statistiken','Individuální přehledy':'Individuelle Übersichten',
    'Informace o dalších týmech klubu.':'Informationen zu weiteren Mannschaften des Vereins.','Informace budou doplněny':'Informationen werden ergänzt','Týmy, trenéři a tréninkové časy budou přidány později.':'Mannschaften, Trainer und Trainingszeiten werden später ergänzt.',
    'Fotografie areálu, ubytování a okolí.':'Fotos der Anlage, Unterkunft und Umgebung.','Galerie':'Galerie','Regenerace a sociální zařízení':'Regeneration und Sanitäranlagen','Sledujte klub':'Folgen Sie dem Verein','Všechna práva vyhrazena.':'Alle Rechte vorbehalten.','brzy':'bald','Rozpis zápasů a výsledků':'Spielplan und Ergebnisse','Odehrané i nadcházející zápasy.':'Vergangene und kommende Spiele.','Otevřít rozpis na Fotbal.cz':'Spielplan auf Fotbal.cz öffnen','Hlavní odkaz':'Wichtigster Link','Aktuální pořadí týmů v soutěži.':'Aktuelle Platzierung der Teams.','Zobrazit aktuální tabulku':'Aktuelle Tabelle anzeigen','Střelci a další individuální přehledy.':'Torschützen und weitere Einzelstatistiken.','Otevřít statistiky na Fotbal.cz':'Statistiken auf Fotbal.cz öffnen',
    'Hřiště, zázemí a regenerace':'Spielfeld, Einrichtungen und Regeneration','Tréninkové plochy, sportovní zázemí a prostory pro regeneraci.':'Trainingsflächen, Sporteinrichtungen und Regenerationsbereiche.','Rychlý výběr fotografií':'Schnellauswahl der Fotos','Otevřít fotografii':'Foto öffnen','Zobrazit všechny fotografie':'Alle Fotos anzeigen','Zobrazit méně':'Weniger anzeigen','Kategorie fotogalerie':'Fotogalerie-Kategorien','Prohlížeč fotografií':'Fotobetrachter','Přiblížit fotografii':'Foto vergrößern','Přiblížit':'Vergrößern','Oddálit':'Verkleinern','Předchozí fotografie':'Vorheriges Foto','Další fotografie':'Nächstes Foto','Náhledy fotografií':'Fotovorschauen','Na mobilu posouvejte fotografie tahem. Na počítači použijte šipky.':'Auf dem Handy wischen Sie durch die Fotos. Am Computer verwenden Sie die Pfeiltasten.','Zavřít':'Schließen',
    'Zhlédnutí webu':'Website-Aufrufe','Počítadlo čeká na připojení':'Zähler wartet auf Verbindung','celkem':'gesamt','Ochrana osobních údajů':'Datenschutz','Nastavení cookies':'Cookie-Einstellungen','Informace o cookies':'Cookie-Informationen','Nastavení webu':'Website-Einstellungen','Web používá pouze technické uložení volby jazyka, potvrzení této lišty a relace počítadla návštěv.':'Die Website speichert nur technisch notwendige Einstellungen für Sprache, Hinweisbestätigung und die Zählersitzung.','Rozumím':'Verstanden',
    'Volný termín':'Freier Termin','V ukázkovém kalendáři je tento den vedený jako volný.':'Im Beispielkalender ist dieser Tag als frei markiert.','Rezervovaný termín':'Reservierter Termin','Areál je v ukázkovém kalendáři vedený jako obsazený. Podrobnosti rezervace budou doplněny.':'Die Anlage ist im Beispielkalender als belegt markiert. Reservierungsdetails werden ergänzt.','Zápas / klubová akce':'Spiel / Vereinsveranstaltung','V areálu je naplánovaný zápas nebo klubová akce. Přesný program a čas budou doplněny.':'Auf der Anlage ist ein Spiel oder eine Vereinsveranstaltung geplant. Programm und Uhrzeit werden ergänzt.','Kalendář je zatím ukázkový; přesný program bude doplněn.':'Der Kalender ist derzeit ein Beispiel; das genaue Programm wird ergänzt.','Zobrazit detail dne':'Tagesdetails anzeigen',
    'Další tým':'Weitere Mannschaft','4. česká fotbalová liga · skupina B':'4. tschechische Fußballliga · Gruppe B','Zázemí v Modré':'Standort in Modrá','Tým VIAGEM Ústí nad Labem využívá sportovní areál FC Jiskra Modrá. Na této stránce najdete základní přehled a později také přímé odkazy na aktuální soutěžní údaje.':'VIAGEM Ústí nad Labem nutzt die Sportanlage von FC Jiskra Modrá. Diese Seite bietet eine Übersicht und später direkte Links zu aktuellen Wettbewerbsdaten.','Konkrétní odkazy zatím nebyly dodány, proto jsou připravené jako jasně označená místa k doplnění.':'Konkrete Links wurden noch nicht geliefert und sind daher klar als Platzhalter gekennzeichnet.','Soutěžní odkazy VIAGEM Ústí nad Labem':'Wettbewerbslinks für VIAGEM Ústí nad Labem','Odkaz bude doplněn':'Link wird ergänzt','Informace o týmu':'Mannschaftsinformationen',
    'Informace o zpracování údajů a technickém uložení nastavení webu.':'Informationen zur Datenverarbeitung und technischen Speicherung von Website-Einstellungen.','Jak web pracuje s údaji':'Wie die Website mit Daten umgeht','Web aktuálně používá pouze technické uložení volby jazyka, potvrzení informační lišty a jednorázové započítání návštěvy v rámci relace. Tato nastavení se ukládají v prohlížeči uživatele.':'Die Website speichert derzeit nur die Sprachwahl, die Bestätigung des Hinweises und die einmalige Zählung eines Besuchs pro Sitzung im Browser.','Kontaktní a rezervační formuláře':'Kontakt- und Reservierungsformulare','Formuláře na webu jsou zatím připravené pro budoucí napojení a bez připojené služby údaje nikam neodesílají.':'Die Formulare sind für eine spätere Anbindung vorbereitet und senden ohne angeschlossenen Dienst keine Daten.','Počítadlo návštěv':'Besucherzähler','Po připojení databáze může web evidovat souhrnný anonymní počet návštěv. Počítadlo neukládá jméno, e-mail ani jiné údaje z formulářů.':'Nach Anschluss einer Datenbank kann die Website eine anonyme Gesamtzahl der Besuche erfassen. Der Zähler speichert weder Namen noch E-Mail-Adressen oder Formulardaten.','Externí odkazy':'Externe Links','Web obsahuje odkazy na Fotbal.cz, mapy a sociální sítě. Po jejich otevření se zpracování údajů řídí pravidly příslušné služby.':'Die Website enthält Links zu Fotbal.cz, Karten und sozialen Netzwerken. Nach dem Öffnen gelten die Regeln des jeweiligen Dienstes.','Aktualizace informací':'Aktualisierung der Informationen','Text bude doplněn o úplné identifikační a kontaktní údaje správce před spuštěním formulářů nebo analytických služeb.':'Vor der Aktivierung von Formularen oder Analysediensten werden vollständige Angaben und Kontaktdaten des Verantwortlichen ergänzt.',
    'Po':'Mo','Út':'Di','St':'Mi','Čt':'Do','Pá':'Fr','So':'Sa','Ne':'So','Červen 2026':'Juni 2026'
  },
  en: {
    'Úvod':'Home','Soustředění':'Training camp','Týmy':'Teams','Sportovní areál':'Sports venue','Klub':'Club','O klubu':'About the club','A tým':'First team','Zápasy':'Matches','Další týmy':'Other teams','Kontakt':'Contact','Partneři':'Partners','Rezervace':'Booking','Fotogalerie':'Gallery',
    'Oficiální web klubu':'Official club website','Rezervace areálu':'Book the venue','Aktuální soutěž':'Current competition','FC Jiskra Modrá na Fotbal.cz':'FC Jiskra Modrá on Fotbal.cz','Rozpis, výsledky, tabulka a statistiky soutěže na jednom místě.':'Fixtures, results, standings and competition statistics in one place.','Rozpis a výsledky':'Fixtures and results','Odehrané i nadcházející zápasy':'Past and upcoming matches','Tabulka soutěže':'League table','Aktuální pořadí týmů':'Current team standings','Statistiky soutěže':'Competition statistics','Střelci a další přehledy':'Top scorers and other statistics',
    'Obsazenost hřiště':'Pitch availability','Kalendář areálu':'Venue calendar','Provizorní přehled. Skutečná obsazenost bude doplněna.':'Temporary overview. Live availability will be added.','Ukázkový kalendář':'Sample calendar','Volno':'Available','Obsazeno':'Booked','Zápas / akce':'Match / event','Sportovní areál':'Sports venue','Soustředění a pronájem':'Training camps and rental','Hřiště • ubytování • stravování • regenerace':'Pitch • accommodation • catering • recovery','Soustředění a ubytování':'Training camps and accommodation','Hřiště':'Pitch','Stravování':'Catering','Regenerace':'Recovery','Poptat termín':'Request a date','Partneři klubu':'Club partners','Prostor pro sponzory':'Sponsor area','Logo partnera':'Partner logo',
    'Základní údaje a vedení klubu.':'Club details and management.','← Zpět na úvod':'← Back to home','← Zpět na klub':'← Back to club','← Zpět na rezervace':'← Back to booking','Klub od roku 1945':'Club since 1945','Fotbalový klub se sídlem v Jílovém. Další informace o historii a současnosti klubu budou doplněny.':'Football club based in Jílové. More information about the club’s history and present will be added.','Rok založení':'Founded','Sídlo':'Registered office','Bankovní účet':'Bank account','Vedení klubu':'Club management','Předseda výkonného výboru':'Chairman of the executive committee','Člen výkonného výboru':'Executive committee member','Členka výkonného výboru':'Executive committee member',
    'Kontakty na vedení a správce areálu.':'Contacts for club management and the venue manager.','Správce areálu':'Venue manager','Adresa':'Address','Otevřít mapu →':'Open map →',
    'Partneři a podporovatelé klubu.':'Club partners and supporters.','Děkujeme':'Thank you','Vážíme si podpory našich partnerů':'We appreciate the support of our partners','Podpora partnerů pomáhá rozvoji klubu, hráčů i sportovního areálu.':'Partner support helps develop the club, its players and the sports venue.',
    'Poptávka hřiště, pobytu nebo klubové akce.':'Request a pitch, stay or club event.','Možnosti rezervace':'Booking options','Vyberte typ rezervace':'Choose a booking type','Pobyt, stravování a sportovní program':'Stay, catering and sports programme','Pronájem areálu':'Venue rental','Hřiště, zápasy a klubové akce':'Pitch, matches and club events','Poptávka':'Enquiry','Nezávazný formulář':'Non-binding enquiry form','Jméno a příjmení':'Full name','Název klubu':'Club name','Počet osob':'Number of people','Termín':'Date','Typ rezervace':'Booking type','Pronájem hřiště':'Pitch rental','Klubová akce':'Club event','Jiná poptávka':'Other enquiry','E-mail':'Email','Telefon':'Phone','Poznámka':'Message','Odeslat poptávku':'Send enquiry','Formulář je zatím pouze ukázkový.':'The form is currently a preview only.',
    'Ubytování, sport a program pro týmy.':'Accommodation, sport and programme for teams.','Pobyt pro tým':'Team stay','Vše na jednom místě':'Everything in one place','Kapacita, ceny a přesné podmínky budou doplněny.':'Capacity, prices and exact conditions will be added.','Hřiště a zázemí':'Pitch and facilities','Tréninkové hřiště a sportovní zázemí.':'Training pitch and sports facilities.','Zobrazit fotografie →':'View photos →','Ubytování':'Accommodation','Pokoje a sociální zařízení.':'Rooms and sanitary facilities.','Stravování podle dohody.':'Catering by arrangement.','Volnočasové aktivity':'Leisure activities','Výlety a program v okolí.':'Trips and activities nearby.',
    'Realizační tým a hráči.':'Coaching staff and players.','Realizační tým':'Coaching staff','A mužstvo':'First team','Trenér:':'Coach:','Vedoucí:':'Team manager:','Domácí hřiště:':'Home ground:','Mapa a navigace':'Map and directions','Soupiska':'Squad','Hráči':'Players','Další hráči budou doplněni po pořízení fotografií.':'More players will be added after photos are taken.',
    'Dva nejbližší zápasy a aktuální soutěž.':'The next two matches and current competition.','Nejbližší zápas':'Next match','Další zápas':'Following match','Termín bude doplněn':'Date to be added','Soupeř bude doplněn':'Opponent to be added','Místo a čas budou doplněny':'Venue and time to be added','Kompletní údaje jsou průběžně aktualizované na oficiálním webu FAČR.':'Complete data is continuously updated on the official FAČR website.','Zápasy FC Jiskra Modrá':'FC Jiskra Modrá matches','Tabulka':'Table','Pořadí v soutěži':'Competition standings','Statistiky':'Statistics','Individuální přehledy':'Individual statistics',
    'Informace o dalších týmech klubu.':'Information about other club teams.','Informace budou doplněny':'Information will be added','Týmy, trenéři a tréninkové časy budou přidány později.':'Teams, coaches and training times will be added later.',
    'Fotografie areálu, ubytování a okolí.':'Photos of the venue, accommodation and surroundings.','Galerie':'Gallery','Regenerace a sociální zařízení':'Recovery and sanitary facilities','Sledujte klub':'Follow the club','Všechna práva vyhrazena.':'All rights reserved.','brzy':'soon','Rozpis zápasů a výsledků':'Fixtures and results','Odehrané i nadcházející zápasy.':'Past and upcoming matches.','Otevřít rozpis na Fotbal.cz':'Open fixtures on Fotbal.cz','Hlavní odkaz':'Main link','Aktuální pořadí týmů v soutěži.':'Current team standings.','Zobrazit aktuální tabulku':'View current table','Střelci a další individuální přehledy.':'Top scorers and other individual statistics.','Otevřít statistiky na Fotbal.cz':'Open statistics on Fotbal.cz',
    'Hřiště, zázemí a regenerace':'Pitch, facilities and recovery','Tréninkové plochy, sportovní zázemí a prostory pro regeneraci.':'Training areas, sports facilities and recovery spaces.','Rychlý výběr fotografií':'Quick photo selection','Otevřít fotografii':'Open photo','Zobrazit všechny fotografie':'Show all photos','Zobrazit méně':'Show less','Kategorie fotogalerie':'Gallery categories','Prohlížeč fotografií':'Photo viewer','Přiblížit fotografii':'Zoom photo','Přiblížit':'Zoom in','Oddálit':'Zoom out','Předchozí fotografie':'Previous photo','Další fotografie':'Next photo','Náhledy fotografií':'Photo thumbnails','Na mobilu posouvejte fotografie tahem. Na počítači použijte šipky.':'Swipe through photos on mobile. Use the arrow keys on a computer.','Zavřít':'Close',
    'Zhlédnutí webu':'Website views','Počítadlo čeká na připojení':'Counter waiting for connection','celkem':'total','Ochrana osobních údajů':'Privacy','Nastavení cookies':'Cookie settings','Informace o cookies':'Cookie information','Nastavení webu':'Website settings','Web používá pouze technické uložení volby jazyka, potvrzení této lišty a relace počítadla návštěv.':'The website only stores technical preferences for language, banner confirmation and the view-counter session.','Rozumím':'Got it',
    'Volný termín':'Available date','V ukázkovém kalendáři je tento den vedený jako volný.':'This day is marked as available in the sample calendar.','Rezervovaný termín':'Reserved date','Areál je v ukázkovém kalendáři vedený jako obsazený. Podrobnosti rezervace budou doplněny.':'The venue is marked as booked in the sample calendar. Booking details will be added.','Zápas / klubová akce':'Match / club event','V areálu je naplánovaný zápas nebo klubová akce. Přesný program a čas budou doplněny.':'A match or club event is planned at the venue. The exact programme and time will be added.','Kalendář je zatím ukázkový; přesný program bude doplněn.':'The calendar is currently a sample; the exact programme will be added.','Zobrazit detail dne':'Show day details',
    'Další tým':'Other team','4. česká fotbalová liga · skupina B':'Czech fourth football league · group B','Zázemí v Modré':'Based in Modrá','Tým VIAGEM Ústí nad Labem využívá sportovní areál FC Jiskra Modrá. Na této stránce najdete základní přehled a později také přímé odkazy na aktuální soutěžní údaje.':'VIAGEM Ústí nad Labem uses the FC Jiskra Modrá sports venue. This page provides an overview and will later include direct links to current competition details.','Konkrétní odkazy zatím nebyly dodány, proto jsou připravené jako jasně označená místa k doplnění.':'Specific links have not yet been supplied, so clearly labelled placeholders are provided.','Soutěžní odkazy VIAGEM Ústí nad Labem':'Competition links for VIAGEM Ústí nad Labem','Odkaz bude doplněn':'Link to be added','Informace o týmu':'Team information',
    'Informace o zpracování údajů a technickém uložení nastavení webu.':'Information about data processing and technical storage of website settings.','Jak web pracuje s údaji':'How the website handles data','Web aktuálně používá pouze technické uložení volby jazyka, potvrzení informační lišty a jednorázové započítání návštěvy v rámci relace. Tato nastavení se ukládají v prohlížeči uživatele.':'The website currently stores only the language choice, banner confirmation and a one-time visit count per session in the user’s browser.','Kontaktní a rezervační formuláře':'Contact and booking forms','Formuláře na webu jsou zatím připravené pro budoucí napojení a bez připojené služby údaje nikam neodesílají.':'The forms are prepared for a future connection and do not send data anywhere without a connected service.','Počítadlo návštěv':'View counter','Po připojení databáze může web evidovat souhrnný anonymní počet návštěv. Počítadlo neukládá jméno, e-mail ani jiné údaje z formulářů.':'Once a database is connected, the website can record an anonymous total number of visits. The counter does not store names, email addresses or form data.','Externí odkazy':'External links','Web obsahuje odkazy na Fotbal.cz, mapy a sociální sítě. Po jejich otevření se zpracování údajů řídí pravidly příslušné služby.':'The website contains links to Fotbal.cz, maps and social networks. After opening them, data processing follows the relevant service’s rules.','Aktualizace informací':'Updates to this information','Text bude doplněn o úplné identifikační a kontaktní údaje správce před spuštěním formulářů nebo analytických služeb.':'Full controller identification and contact details will be added before forms or analytics services are enabled.',
    'Po':'Mon','Út':'Tue','St':'Wed','Čt':'Thu','Pá':'Fri','So':'Sat','Ne':'Sun','Červen 2026':'June 2026'
  }
};

Object.assign(translations.de, {
  'Kategorie fotografií':'Fotokategorien',
  'Partnerský tým':'Partnerteam',
  'B mužstvo VIAGEM Ústí nad Labem využívá sportovní areál FC Jiskra Modrá. Níže jsou přímé odkazy na oficiální soutěžní údaje FAČR pro sezonu 2026/27.':'Die B-Mannschaft von VIAGEM Ústí nad Labem nutzt die Sportanlage von FC Jiskra Modrá. Unten finden Sie direkte Links zu den offiziellen FAČR-Wettbewerbsdaten für die Saison 2026/27.',
  'Rozpis, výsledky, tabulka a statistiky se aktualizují přímo na Fotbal.cz.':'Spielplan, Ergebnisse, Tabelle und Statistiken werden direkt auf Fotbal.cz aktualisiert.',
  'Otevřít na Fotbal.cz':'Auf Fotbal.cz öffnen',
  'Zobrazit tabulku':'Tabelle anzeigen',
  'Otevřít statistiky':'Statistiken öffnen'
});

Object.assign(translations.en, {
  'Kategorie fotografií':'Photo categories',
  'Partnerský tým':'Partner team',
  'B mužstvo VIAGEM Ústí nad Labem využívá sportovní areál FC Jiskra Modrá. Níže jsou přímé odkazy na oficiální soutěžní údaje FAČR pro sezonu 2026/27.':'VIAGEM Ústí nad Labem B uses the FC Jiskra Modrá sports venue. Direct links to the official FAČR competition data for the 2026/27 season are listed below.',
  'Rozpis, výsledky, tabulka a statistiky se aktualizují přímo na Fotbal.cz.':'Fixtures, results, standings and statistics are updated directly on Fotbal.cz.',
  'Otevřít na Fotbal.cz':'Open on Fotbal.cz',
  'Zobrazit tabulku':'View table',
  'Otevřít statistiky':'Open statistics'
});

Object.assign(translations.de, {
  'Výlety':'Ausflüge','Mapa':'Karte','Areál':'Anlage','Od roku 1945':'Seit 1945',
  'Jsme malý fotbalový klub s velkým srdcem.':'Wir sind ein kleiner Fußballverein mit großem Herzen.',
  'Od roku 1945 hrajeme fotbal na travnatých hřištích v Jílovém u Děčína, v jednom z nejkrásnějších koutů severních Čech. Přijeďte si k nám zahrát zápas, vyrazit na soustředění nebo se jen podívat, jak vypadá fotbal v objetí Labských pískovců.':'Seit 1945 spielen wir auf Naturrasenplätzen in Jílové bei Děčín, in einer der schönsten Regionen Nordböhmens. Kommen Sie zu einem Spiel, einem Trainingslager oder erleben Sie Fußball mitten im Elbsandsteingebirge.',
  'Sport, ubytování, stravování i odpočinek na jednom místě.':'Sport, Unterkunft, Verpflegung und Erholung an einem Ort.',
  'Proč právě k nám':'Warum zu uns','Soustředění bez zbytečného přejíždění':'Trainingslager ohne unnötige Wege',
  'V areálu FC Jiskra Modrá máte tréninkové plochy, zázemí, regeneraci, ubytování i domácí stravování pohromadě. Pobyt připravíme pro fotbalové a další sportovní týmy podle jejich programu, věku hráčů a délky soustředění.':'Auf dem Gelände von FC Jiskra Modrá finden Sie Trainingsflächen, Einrichtungen, Regeneration, Unterkunft und Hausmannskost an einem Ort. Wir gestalten den Aufenthalt für Fußball- und andere Sportteams passend zu Programm, Alter und Aufenthaltsdauer.',
  'Ubytování nabízíme podle aktuální kapacity také turistům, rodinám a jednotlivcům. Okolí Labských pískovců je ideální pro aktivní dovolenou i klidný víkend.':'Je nach Verfügbarkeit bieten wir die Unterkunft auch Touristen, Familien und Einzelreisenden an. Das Elbsandsteingebirge eignet sich für Aktivurlaub und ruhige Wochenenden.',
  'Co u nás najdete':'Was Sie bei uns finden','Kompletní nabídka areálu':'Das komplette Angebot','Vyberte si celý pobyt, nebo jen služby, které právě potřebujete.':'Wählen Sie den ganzen Aufenthalt oder nur die Leistungen, die Sie benötigen.',
  'Dvě travnatá hřiště doplňuje tenisový kurt, šatny, sprchy a zázemí pro rozhodčí. Po tréninku je k dispozici regenerační linka, vířivka a masážní lehátko.':'Zwei Naturrasenplätze werden durch einen Tennisplatz, Umkleiden, Duschen und Schiedsrichterräume ergänzt. Nach dem Training stehen Regenerationsbereich, Whirlpool und Massageliege zur Verfügung.',
  'Prohlédnout fotografie →':'Fotos ansehen →','Pokoje jsou připravené převážně pro tři až čtyři osoby a mají vlastní sociální zařízení. Z ubytování je to jen pár kroků přímo na hřiště.':'Die Zimmer sind überwiegend für drei bis vier Personen ausgelegt und verfügen über ein eigenes Bad. Vom Zimmer sind es nur wenige Schritte zum Spielfeld.',
  'Také pro veřejnost podle aktuální kapacity.':'Je nach Verfügbarkeit auch für die Öffentlichkeit.',
  'Vaříme domácí kuchyni a denní režim přizpůsobíme sportovnímu programu. Zajistíme snídani, dopolední svačinu, oběd, odpolední svačinu i večeři; jídelníček domluvíme předem.':'Wir kochen Hausmannskost und passen den Tagesablauf an das Sportprogramm an. Frühstück, zwei Snacks, Mittag- und Abendessen sowie der Speiseplan werden im Voraus vereinbart.',
  'Mezi tréninky můžete vyrazit do skal, na vyhlídku, za památkami nebo do Děčína. Připravili jsme dvanáct konkrétních tipů s přímým otevřením v Google Maps.':'Zwischen den Trainingseinheiten können Sie Felsen, Aussichtspunkte, Sehenswürdigkeiten oder Děčín besuchen. Wir haben zwölf konkrete Tipps mit direkter Route in Google Maps vorbereitet.',
  'Zobrazit 12 tipů na výlet →':'12 Ausflugstipps anzeigen →','Poptávka pobytu':'Aufenthalt anfragen','Řekněte nám svůj termín':'Nennen Sie uns Ihren Termin',
  'Pošlete základní představu o počtu osob a programu. Ozveme se s dostupností a konkrétní nabídkou.':'Senden Sie uns Personenzahl und Programmvorstellung. Wir melden uns mit Verfügbarkeit und einem konkreten Angebot.',
  'Soustředění pro sportovní kluby':'Trainingslager für Sportvereine','Pronájem hřiště a areálu':'Vermietung von Platz und Anlage','Ubytování pro veřejnost':'Unterkunft für Gäste','Klubové a společenské akce':'Vereins- und Gesellschaftsveranstaltungen',
  'Nezávazně':'Unverbindlich','Poptávkový formulář':'Anfrageformular','Název klubu nebo skupiny':'Name des Vereins oder der Gruppe','Formulář je připravený k napojení na odesílací službu.':'Das Formular ist für die Anbindung an einen Versanddienst vorbereitet.',
  'Fotbal v Modré od roku 1945.':'Fußball in Modrá seit 1945.','Malý klub s velkým srdcem':'Kleiner Verein mit großem Herzen',
  'Klub vyrostl z nadšení místních lidí pro fotbal. Už více než osm desetiletí spojuje hráče, trenéry, dobrovolníky i fanoušky a pečuje o areál v Jílovém u Děčína.':'Der Verein entstand aus der Fußballbegeisterung der Einheimischen. Seit mehr als acht Jahrzehnten verbindet er Spieler, Trainer, Helfer und Fans und pflegt die Anlage in Jílové bei Děčín.',
  'Historie':'Geschichte','Klubové milníky':'Meilensteine des Vereins','Příběh fotbalu v Modré v pěti důležitých zastaveních.':'Die Geschichte des Fußballs in Modrá in fünf wichtigen Stationen.',
  'Začátek fotbalu v Modré':'Beginn des Fußballs in Modrá','Po skončení druhé světové války vznikl v Modré samostatný fotbalový oddíl. První hráči a dobrovolníci položili základ klubu, který se brzy zapojil do pravidelných soutěží.':'Nach dem Zweiten Weltkrieg entstand in Modrá eine eigenständige Fußballabteilung. Die ersten Spieler und Helfer legten den Grundstein für den baldigen Ligabetrieb.',
  'Nová organizace tělovýchovy':'Neue Sportorganisation','V rámci poválečné reorganizace sportu se oddíl začlenil do sjednocené tělovýchovy. Fotbalová činnost v obci pokračovala a klub si udržel své místní zázemí.':'Im Zuge der Nachkriegsreorganisation wurde die Abteilung in den einheitlichen Sportverband eingegliedert. Der Fußballbetrieb vor Ort wurde fortgesetzt.',
  'Jméno Jiskra':'Der Name Jiskra','Oddíl začal vystupovat pod názvem Jiskra. Jméno se stalo pevnou součástí klubové identity a v různých organizačních podobách provází modranský fotbal dodnes.':'Die Abteilung trat fortan unter dem Namen Jiskra auf. Der Name wurde zum festen Bestandteil der Vereinsidentität und begleitet den Fußball in Modrá bis heute.',
  'Samostatná nová etapa':'Eine neue selbstständige Etappe','Po společenských změnách se klub znovu postavil na vlastní nohy. Obnovil samostatné fungování, navázal na tradici předchozích generací a začal rozvíjet areál.':'Nach dem gesellschaftlichen Wandel wurde der Verein wieder selbstständig, knüpfte an frühere Generationen an und entwickelte die Anlage weiter.',
  'DNES':'HEUTE','Současný klub staví na komunitě, dobrovolnické práci a otevřeném areálu. Vedle soutěžního fotbalu nabízí zázemí pro soustředění, ubytování a sportovní pobyty v Labských pískovcích.':'Der heutige Verein lebt von Gemeinschaft, ehrenamtlicher Arbeit und einer offenen Anlage. Neben Ligafußball bietet er Trainingslager, Unterkunft und Sportaufenthalte im Elbsandsteingebirge.',
  'Lidé v klubu':'Menschen im Verein','Labské pískovce':'Elbsandsteingebirge','Výlety v okolí':'Ausflüge in der Umgebung','Dvanáct míst pro volný den nebo program mezi tréninky.':'Zwölf Ziele für einen freien Tag oder die Zeit zwischen Trainingseinheiten.',
  '12 tipů':'12 Tipps','Od skal po děčínské památky':'Von Felsen bis zu Sehenswürdigkeiten in Děčín','Každý odkaz otevře trasu z areálu FC Jiskra Modrá přímo v Google Maps.':'Jeder Link öffnet direkt eine Route von FC Jiskra Modrá in Google Maps.',
  'Tiské stěny':'Tyssaer Wände','Skalní město s vyhlídkovým okruhem, pískovcovými věžemi a trasami pro kratší i delší výlet.':'Felsenstadt mit Rundweg, Sandsteintürmen sowie kurzen und längeren Routen.',
  'Děčínský Sněžník':'Hoher Schneeberg','Stolová hora s kamennou rozhlednou a širokými výhledy na České i Saské Švýcarsko.':'Tafelberg mit Steinturm und weitem Blick über die Böhmische und Sächsische Schweiz.',
  'Pravčická brána':'Prebischtor','Nejznámější přírodní symbol Českého Švýcarska a jeden z největších pískovcových mostů v Evropě.':'Das bekannteste Naturdenkmal der Böhmischen Schweiz und eine der größten Sandsteinbrücken Europas.',
  'Soutěsky Kamenice':'Kamnitzklammen','Romantická cesta kaňonem řeky Kamenice v Hřensku, vhodná jako klidnější doplněk turistického programu.':'Romantischer Weg durch die Kamnitzklamm bei Hřensko als ruhigerer Programmpunkt.',
  'Dolský mlýn':'Grundmühle','Malebná zřícenina historického mlýna v údolí Kamenice, známá také z českých pohádek.':'Malerische Ruine einer historischen Mühle im Kamnitztal.',
  'Zámek Děčín':'Schloss Děčín','Dominanta města nad soutokem Labe a Ploučnice s Růžovou zahradou a výhledem na údolí.':'Wahrzeichen über dem Zusammenfluss von Elbe und Ploučnice mit Rosengarten und Talblick.',
  'Pastýřská stěna':'Schäferwand','Vyhlídka přímo nad Děčínem s restaurací, ferratou a panoramatem zámku i řeky Labe.':'Aussicht über Děčín mit Restaurant, Klettersteig und Panorama auf Schloss und Elbe.',
  'Zoo Děčín':'Zoo Děčín','Menší zoologická zahrada v lesoparku na Pastýřské stěně, vhodná pro rodiny a mládežnické týmy.':'Kleiner Zoo im Waldpark auf der Schäferwand, geeignet für Familien und Jugendteams.',
  'Belvedér':'Belvedere','Historická skalní vyhlídka v Labské Stráni s působivým pohledem do hlubokého kaňonu Labe.':'Historischer Felsaussichtspunkt in Labská Stráň mit Blick in den tiefen Elbcanyon.',
  'Jetřichovické vyhlídky':'Aussichten bei Jetřichovice','Oblíbený okruh přes Mariinu skálu, Vilemíninu stěnu a Rudolfův kámen pro zdatnější skupiny.':'Beliebte Runde über Marienfels, Wilhelminenwand und Rudolfstein für sportliche Gruppen.',
  'Růžovský vrch':'Rosenberg','Výrazný čedičový vrch u Růžové s lesní výstupovou trasou a klidnou přírodou mimo hlavní cíle.':'Markanter Basaltberg bei Růžová mit ruhigem Waldaufstieg abseits der Hauptziele.',
  'Hřensko a nábřeží Labe':'Hřensko und das Elbufer','Výchozí bod Českého Švýcarska, kde se Kamenice vlévá do Labe a odkud začíná řada turistických tras.':'Ausgangspunkt der Böhmischen Schweiz am Zusammenfluss von Kamnitz und Elbe.',
  'Otevřít trasu v Google Maps →':'Route in Google Maps öffnen →','Výchozí bod':'Ausgangspunkt','Vyrazte přímo z Modré':'Direkt von Modrá starten','Otevřete si polohu areálu nebo naplánujte pobyt s výletem.':'Öffnen Sie den Standort oder planen Sie einen Aufenthalt mit Ausflug.','Mapa areálu':'Karte der Anlage','Poptat pobyt':'Aufenthalt anfragen'
});

Object.assign(translations.en, {
  'Výlety':'Trips','Mapa':'Map','Areál':'Venue','Od roku 1945':'Since 1945',
  'Jsme malý fotbalový klub s velkým srdcem.':'We are a small football club with a big heart.',
  'Od roku 1945 hrajeme fotbal na travnatých hřištích v Jílovém u Děčína, v jednom z nejkrásnějších koutů severních Čech. Přijeďte si k nám zahrát zápas, vyrazit na soustředění nebo se jen podívat, jak vypadá fotbal v objetí Labských pískovců.':'Since 1945, we have played on grass pitches in Jílové near Děčín, in one of the most beautiful parts of northern Bohemia. Come for a match, a training camp or simply experience football in the Elbe Sandstone Mountains.',
  'Sport, ubytování, stravování i odpočinek na jednom místě.':'Sport, accommodation, catering and recovery in one place.',
  'Proč právě k nám':'Why choose us','Soustředění bez zbytečného přejíždění':'A training camp without unnecessary travel',
  'V areálu FC Jiskra Modrá máte tréninkové plochy, zázemí, regeneraci, ubytování i domácí stravování pohromadě. Pobyt připravíme pro fotbalové a další sportovní týmy podle jejich programu, věku hráčů a délky soustředění.':'At FC Jiskra Modrá, training areas, facilities, recovery, accommodation and home-style catering are all in one place. We tailor stays to each team’s programme, player age and length of camp.',
  'Ubytování nabízíme podle aktuální kapacity také turistům, rodinám a jednotlivcům. Okolí Labských pískovců je ideální pro aktivní dovolenou i klidný víkend.':'Subject to availability, accommodation is also open to tourists, families and individuals. The Elbe Sandstone Mountains are ideal for active holidays and quiet weekends.',
  'Co u nás najdete':'What you will find','Kompletní nabídka areálu':'Everything at the venue','Vyberte si celý pobyt, nebo jen služby, které právě potřebujete.':'Choose a complete stay or only the services you need.',
  'Dvě travnatá hřiště doplňuje tenisový kurt, šatny, sprchy a zázemí pro rozhodčí. Po tréninku je k dispozici regenerační linka, vířivka a masážní lehátko.':'Two grass pitches are complemented by a tennis court, changing rooms, showers and referee facilities. After training, teams can use the recovery area, hot tub and massage table.',
  'Prohlédnout fotografie →':'View photos →','Pokoje jsou připravené převážně pro tři až čtyři osoby a mají vlastní sociální zařízení. Z ubytování je to jen pár kroků přímo na hřiště.':'Rooms are mainly for three to four people and have private bathrooms. The pitch is only a few steps away.',
  'Také pro veřejnost podle aktuální kapacity.':'Also available to the public, subject to capacity.',
  'Vaříme domácí kuchyni a denní režim přizpůsobíme sportovnímu programu. Zajistíme snídani, dopolední svačinu, oběd, odpolední svačinu i večeři; jídelníček domluvíme předem.':'We serve home-style food and adapt the daily schedule to the sports programme. Breakfast, two snacks, lunch, dinner and the menu are agreed in advance.',
  'Mezi tréninky můžete vyrazit do skal, na vyhlídku, za památkami nebo do Děčína. Připravili jsme dvanáct konkrétních tipů s přímým otevřením v Google Maps.':'Between training sessions, visit the rocks, viewpoints, local sights or Děčín. We have prepared twelve specific tips with direct Google Maps routes.',
  'Zobrazit 12 tipů na výlet →':'View 12 trip ideas →','Poptávka pobytu':'Stay enquiry','Řekněte nám svůj termín':'Tell us your dates',
  'Pošlete základní představu o počtu osob a programu. Ozveme se s dostupností a konkrétní nabídkou.':'Send us the number of guests and your programme idea. We will reply with availability and a specific offer.',
  'Soustředění pro sportovní kluby':'Training camps for sports clubs','Pronájem hřiště a areálu':'Pitch and venue rental','Ubytování pro veřejnost':'Public accommodation','Klubové a společenské akce':'Club and social events',
  'Nezávazně':'No obligation','Poptávkový formulář':'Enquiry form','Název klubu nebo skupiny':'Club or group name','Formulář je připravený k napojení na odesílací službu.':'The form is ready to be connected to a submission service.',
  'Fotbal v Modré od roku 1945.':'Football in Modrá since 1945.','Malý klub s velkým srdcem':'A small club with a big heart',
  'Klub vyrostl z nadšení místních lidí pro fotbal. Už více než osm desetiletí spojuje hráče, trenéry, dobrovolníky i fanoušky a pečuje o areál v Jílovém u Děčína.':'The club grew from local enthusiasm for football. For more than eight decades, it has brought together players, coaches, volunteers and supporters while caring for the venue in Jílové near Děčín.',
  'Historie':'History','Klubové milníky':'Club milestones','Příběh fotbalu v Modré v pěti důležitých zastaveních.':'The story of football in Modrá in five key milestones.',
  'Začátek fotbalu v Modré':'Football begins in Modrá','Po skončení druhé světové války vznikl v Modré samostatný fotbalový oddíl. První hráči a dobrovolníci položili základ klubu, který se brzy zapojil do pravidelných soutěží.':'After the Second World War, an independent football section was established in Modrá. Its first players and volunteers laid the foundations for regular competition.',
  'Nová organizace tělovýchovy':'A new sports organisation','V rámci poválečné reorganizace sportu se oddíl začlenil do sjednocené tělovýchovy. Fotbalová činnost v obci pokračovala a klub si udržel své místní zázemí.':'During the post-war reorganisation of sport, the section joined the unified sports structure. Football continued locally and retained its base.',
  'Jméno Jiskra':'The Jiskra name','Oddíl začal vystupovat pod názvem Jiskra. Jméno se stalo pevnou součástí klubové identity a v různých organizačních podobách provází modranský fotbal dodnes.':'The section began playing under the Jiskra name, which became a lasting part of the club’s identity and remains with football in Modrá today.',
  'Samostatná nová etapa':'A new independent chapter','Po společenských změnách se klub znovu postavil na vlastní nohy. Obnovil samostatné fungování, navázal na tradici předchozích generací a začal rozvíjet areál.':'Following the social changes, the club became independent again, continued the tradition of earlier generations and began developing the venue.',
  'DNES':'TODAY','Současný klub staví na komunitě, dobrovolnické práci a otevřeném areálu. Vedle soutěžního fotbalu nabízí zázemí pro soustředění, ubytování a sportovní pobyty v Labských pískovcích.':'Today the club is built on community, volunteer work and an open venue. Alongside competitive football, it offers training camps, accommodation and sports stays in the Elbe Sandstone Mountains.',
  'Lidé v klubu':'People at the club','Labské pískovce':'Elbe Sandstone Mountains','Výlety v okolí':'Trips nearby','Dvanáct míst pro volný den nebo program mezi tréninky.':'Twelve destinations for a free day or time between training sessions.',
  '12 tipů':'12 ideas','Od skal po děčínské památky':'From rock towns to Děčín landmarks','Každý odkaz otevře trasu z areálu FC Jiskra Modrá přímo v Google Maps.':'Each link opens a route from FC Jiskra Modrá directly in Google Maps.',
  'Tiské stěny':'Tisá Walls','Skalní město s vyhlídkovým okruhem, pískovcovými věžemi a trasami pro kratší i delší výlet.':'A rock town with a scenic circuit, sandstone towers and routes for shorter or longer walks.',
  'Děčínský Sněžník':'Děčínský Sněžník','Stolová hora s kamennou rozhlednou a širokými výhledy na České i Saské Švýcarsko.':'A table mountain with a stone lookout tower and wide views over Bohemian and Saxon Switzerland.',
  'Pravčická brána':'Pravčická Gate','Nejznámější přírodní symbol Českého Švýcarska a jeden z největších pískovcových mostů v Evropě.':'The best-known natural landmark of Bohemian Switzerland and one of Europe’s largest sandstone arches.',
  'Soutěsky Kamenice':'Kamenice Gorges','Romantická cesta kaňonem řeky Kamenice v Hřensku, vhodná jako klidnější doplněk turistického programu.':'A romantic route through the Kamenice canyon near Hřensko and a quieter addition to the programme.',
  'Dolský mlýn':'Dolský Mill','Malebná zřícenina historického mlýna v údolí Kamenice, známá také z českých pohádek.':'Picturesque ruins of a historic mill in the Kamenice valley.',
  'Zámek Děčín':'Děčín Castle','Dominanta města nad soutokem Labe a Ploučnice s Růžovou zahradou a výhledem na údolí.':'A city landmark above the confluence of the Elbe and Ploučnice, with a rose garden and valley views.',
  'Pastýřská stěna':'Shepherd’s Wall','Vyhlídka přímo nad Děčínem s restaurací, ferratou a panoramatem zámku i řeky Labe.':'A viewpoint above Děčín with a restaurant, via ferrata and views of the castle and Elbe.',
  'Zoo Děčín':'Děčín Zoo','Menší zoologická zahrada v lesoparku na Pastýřské stěně, vhodná pro rodiny a mládežnické týmy.':'A smaller zoo in the forest park on Shepherd’s Wall, suitable for families and youth teams.',
  'Belvedér':'Belvedere','Historická skalní vyhlídka v Labské Stráni s působivým pohledem do hlubokého kaňonu Labe.':'A historic rock viewpoint at Labská Stráň overlooking the deep Elbe canyon.',
  'Jetřichovické vyhlídky':'Jetřichovice viewpoints','Oblíbený okruh přes Mariinu skálu, Vilemíninu stěnu a Rudolfův kámen pro zdatnější skupiny.':'A popular circuit via Mariina skála, Vilemínina stěna and Rudolfův kámen for fitter groups.',
  'Růžovský vrch':'Růžovský Hill','Výrazný čedičový vrch u Růžové s lesní výstupovou trasou a klidnou přírodou mimo hlavní cíle.':'A prominent basalt hill near Růžová with a quiet woodland ascent away from the busiest sights.',
  'Hřensko a nábřeží Labe':'Hřensko and the Elbe waterfront','Výchozí bod Českého Švýcarska, kde se Kamenice vlévá do Labe a odkud začíná řada turistických tras.':'A gateway to Bohemian Switzerland where the Kamenice meets the Elbe and many walking routes begin.',
  'Otevřít trasu v Google Maps →':'Open route in Google Maps →','Výchozí bod':'Starting point','Vyrazte přímo z Modré':'Start directly from Modrá','Otevřete si polohu areálu nebo naplánujte pobyt s výletem.':'Open the venue location or plan a stay with a trip.','Mapa areálu':'Venue map','Poptat pobyt':'Enquire about a stay'
});

const originalText = new WeakMap();
const originalDocumentTitle = document.title;
const translatableSelector = 'body *:not(script):not(style):not(svg):not(path)';
function rememberOriginals(){
  document.querySelectorAll(translatableSelector).forEach(el=>{
    el.childNodes.forEach(node=>{if(node.nodeType===Node.TEXT_NODE && node.nodeValue.trim()) originalText.set(node,node.nodeValue);});
    ['placeholder','aria-label','title'].forEach(attr=>{if(el.hasAttribute(attr)) el.dataset['orig'+attr.replace('-','')]=el.getAttribute(attr);});
  });
}
function translateString(value,lang){
  if(lang==='cs') return value;
  const lead=value.match(/^\s*/)?.[0]||'', trail=value.match(/\s*$/)?.[0]||'', key=value.trim();
  if(!key) return value;
  let translated=translations[lang]?.[key];
  if(!translated){
    // captions with a translated category followed by a number
    translated=key.replace(/^(Hřiště|Pokoje|Stravování|Regenerace a sociální zařízení)\s+(\d+)/,(m,a,n)=>(translations[lang]?.[a]||a)+' '+n);
  }
  return lead+(translated||key)+trail;
}
function setLanguage(lang){
  if(!['cs','de','en'].includes(lang)) lang='cs';
  document.documentElement.lang=lang;
  document.querySelectorAll(translatableSelector).forEach(el=>{
    el.childNodes.forEach(node=>{if(node.nodeType===Node.TEXT_NODE && originalText.has(node)) node.nodeValue=translateString(originalText.get(node),lang);});
    ['placeholder','aria-label','title'].forEach(attr=>{const key='orig'+attr.replace('-','');if(el.dataset[key]) el.setAttribute(attr,translateString(el.dataset[key],lang));});
  });
  document.querySelectorAll('[data-lang]').forEach(btn=>btn.classList.toggle('active',btn.dataset.lang===lang));
  window.updateCalendarLanguage?.(lang);
  localStorage.setItem('jiskra-language',lang);
  const pageTitle=originalDocumentTitle.split('|').map(x=>x.trim());
  const titleKey=pageTitle[0];
  document.title=(lang==='cs'?titleKey:(translations[lang]?.[titleKey]||titleKey))+' | FC Jiskra Modrá';
}
rememberOriginals();
document.querySelectorAll('[data-lang]').forEach(btn=>btn.addEventListener('click',()=>setLanguage(btn.dataset.lang)));
setLanguage(localStorage.getItem('jiskra-language')||'cs');
