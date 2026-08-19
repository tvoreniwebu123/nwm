# FC Jiskra Modrá – verze 23

Statický web je připravený pro nasazení na Vercel a obsahuje jazykové verze CZ / DE / EN.

## Obsah webu

- nový úvodní text klubu „Od roku 1945“
- rozšířená stránka Rezervace se čtyřmi částmi nabídky
- samostatná stránka Výlety s 12 tipy a trasami v Google Maps
- mapa areálu přímo v horní navigaci
- historie klubu zpracovaná jako časová osa
- sjednocená galerie, regenerace a mobilní rozvržení

## Úpravy verze 23

- přirozené číslování 1, 2, 3 bez úvodních nul
- mapa jako malý, nenápadný odkaz v navigaci
- kompaktnější karty, formuláře, galerie a soupiska na mobilu

## Počítadlo zhlédnutí

Vzhled i API počítadla jsou hotové. Pro skutečný společný počet návštěv je nutné na Vercelu připojit databázi Upstash Redis a nastavit dvě proměnné prostředí:

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

Volitelně lze nastavit `VIEW_COUNTER_KEY`. Bez databáze web bezpečně zobrazuje pomlčku a netvrdí nepravdivý počet návštěv.
