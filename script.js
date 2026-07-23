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

const allPhotos=[...document.querySelectorAll('[data-lightbox]')];
if(allPhotos.length||document.querySelector('[data-open-gallery]')){const lb=document.createElement('div');lb.className='lightbox';lb.innerHTML='<button class="lightbox-close" aria-label="Zavřít">×</button><div class="lightbox-inner"><img alt=""><div class="lightbox-caption"></div><div class="lightbox-thumbs"></div></div>';document.body.appendChild(lb);const main=lb.querySelector('.lightbox img'),cap=lb.querySelector('.lightbox-caption'),thumbs=lb.querySelector('.lightbox-thumbs');let current=[];function openSet(nodes,start=0){current=[...nodes];thumbs.innerHTML='';current.forEach((n,i)=>{const b=document.createElement('button');b.innerHTML=`<img src="${n.dataset.lightbox}" alt="">`;b.onclick=()=>show(i);thumbs.appendChild(b)});show(start);lb.classList.add('open');document.body.style.overflow='hidden'}function show(i){const n=current[i];main.src=n.dataset.lightbox;cap.textContent=n.dataset.caption||'';[...thumbs.children].forEach((b,j)=>b.classList.toggle('active',i===j))}allPhotos.forEach((n,i)=>n.addEventListener('click',()=>openSet(allPhotos,i)));document.querySelectorAll('[data-open-gallery]').forEach(b=>b.addEventListener('click',()=>{const set=document.querySelector(`[data-gallery-set="${b.dataset.openGallery}"]`);openSet(set.querySelectorAll('[data-lightbox]'),0)}));function close(){lb.classList.remove('open');document.body.style.overflow=''}lb.querySelector('.lightbox-close').onclick=close;lb.addEventListener('click',e=>{if(e.target===lb)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape')close()})}


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
    'Fotografie areálu, ubytování a okolí.':'Fotos der Anlage, Unterkunft und Umgebung.','Galerie':'Galerie','Rehabilitace':'Rehabilitation','Sociální zařízení pokojů a rehabilitace':'Sanitäre Einrichtungen und Rehabilitation','Sledujte klub':'Folgen Sie dem Verein','Všechna práva vyhrazena.':'Alle Rechte vorbehalten.','brzy':'bald','Rozpis zápasů a výsledků':'Spielplan und Ergebnisse','Odehrané i nadcházející zápasy.':'Vergangene und kommende Spiele.','Otevřít rozpis na Fotbal.cz':'Spielplan auf Fotbal.cz öffnen','Hlavní odkaz':'Wichtigster Link','Aktuální pořadí týmů v soutěži.':'Aktuelle Platzierung der Teams.','Zobrazit aktuální tabulku':'Aktuelle Tabelle anzeigen','Střelci a další individuální přehledy.':'Torschützen und weitere Einzelstatistiken.','Otevřít statistiky na Fotbal.cz':'Statistiken auf Fotbal.cz öffnen',
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
    'Fotografie areálu, ubytování a okolí.':'Photos of the venue, accommodation and surroundings.','Galerie':'Gallery','Rehabilitace':'Rehabilitation','Sociální zařízení pokojů a rehabilitace':'Sanitary facilities and rehabilitation','Sledujte klub':'Follow the club','Všechna práva vyhrazena.':'All rights reserved.','brzy':'soon','Rozpis zápasů a výsledků':'Fixtures and results','Odehrané i nadcházející zápasy.':'Past and upcoming matches.','Otevřít rozpis na Fotbal.cz':'Open fixtures on Fotbal.cz','Hlavní odkaz':'Main link','Aktuální pořadí týmů v soutěži.':'Current team standings.','Zobrazit aktuální tabulku':'View current table','Střelci a další individuální přehledy.':'Top scorers and other individual statistics.','Otevřít statistiky na Fotbal.cz':'Open statistics on Fotbal.cz',
    'Po':'Mon','Út':'Tue','St':'Wed','Čt':'Thu','Pá':'Fri','So':'Sat','Ne':'Sun','Červen 2026':'June 2026'
  }
};

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
    translated=key.replace(/^(Hřiště|Pokoje|Stravování|Sociální zařízení pokojů a rehabilitace)\s+(\d+)/,(m,a,n)=>(translations[lang]?.[a]||a)+' '+n);
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
  localStorage.setItem('jiskra-language',lang);
  const pageTitle=originalDocumentTitle.split('|').map(x=>x.trim());
  const titleKey=pageTitle[0];
  document.title=(lang==='cs'?titleKey:(translations[lang]?.[titleKey]||titleKey))+' | FC Jiskra Modrá';
}
rememberOriginals();
document.querySelectorAll('[data-lang]').forEach(btn=>btn.addEventListener('click',()=>setLanguage(btn.dataset.lang)));
setLanguage(localStorage.getItem('jiskra-language')||'cs');
