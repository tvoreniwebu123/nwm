# FC Jiskra Modrá – verze 21

Statický web je připravený pro nasazení na Vercel a obsahuje jazykové verze CZ / DE / EN.

## Počítadlo zhlédnutí

Vzhled i API počítadla jsou hotové. Pro skutečný společný počet návštěv je nutné na Vercelu připojit databázi Upstash Redis a nastavit dvě proměnné prostředí:

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

Volitelně lze nastavit `VIEW_COUNTER_KEY`. Bez databáze web bezpečně zobrazuje pomlčku a netvrdí nepravdivý počet návštěv.
