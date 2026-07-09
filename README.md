
# Impax.Bud

Firma budowlana Yaroslav Boliuk — Warszawa.
Strona dwujęzyczna: polski + ukraiński.

## Stack

- WordPress 7.x
- PHP 8.2+
- HTML / SCSS / JavaScript

## Wymagania

- Docker & Docker Compose
- Node.js 20+ (lokalnie lub przez Docker)

---

## Szybki start (Docker)

### 1. Sklonuj repozytorium

git clone <repo-url> impax_bud
cd impax_bud

### 2. Skonfiguruj zmienne środowiskowe

copy .env.example .env

Edytuj `.env` — minimum zmień hasła.

### 3. Uruchom Docker

WordPress + MariaDB
────────────────────────────────────────
docker compose up -d

WordPress + MariaDB + phpMyAdmin (http://localhost:8081)
────────────────────────────────────────
docker compose --profile tools up -d

Wszystko: WP + DB + phpMyAdmin + Node.js
────────────────────────────────────────
docker compose --profile full up -d

### 4. Otwórz stronę

- **Strona:** http://localhost:8000
- **phpMyAdmin:** http://localhost:8081 (tylko z `--profile tools`)

---

## Development

### Serwisy Docker

| Serwis | Port | Opis |
|---|---|---|
| `wordpress` | `8000` | WP 7.x + PHP 8.2 + Apache + Xdebug 3 + Composer + WP-CLI |
| `db` | `3307` | MariaDB 10.11 |
| `phpmyadmin` | `8081` | Panel zarządzania bazą danych (opcjonalnie) |
| `node` | `3000` | Node.js 20 — build SCSS/JS (opcjonalnie) |

### Przydatne komendy

Logi WordPress
────────────────────────────────────────
docker compose logs -f wordpress

WP-CLI (wewnątrz kontenera)
────────────────────────────────────────
docker compose exec wordpress wp plugin list
docker compose exec wordpress wp language core install uk
docker compose exec wordpress wp language core install pl_PL

Composer
────────────────────────────────────────
docker compose exec wordpress composer install

Zatrzymanie
────────────────────────────────────────
docker compose down

Całkowite czyszczenie (baza danych również!)
────────────────────────────────────────
docker compose down -v

### Xdebug

Xdebug 3 skonfigurowany dla VSCode. Port `9003`, IDE key `VSCODE`.
Dla PhpStorm zmień `XDEBUG_IDEKEY` w `.env`.

### Wielojęzyczność

Strona wspiera języki **polski** i **ukraiński**. Po pierwszym uruchomieniu:

docker compose exec wordpress wp language core install pl_PL
docker compose exec wordpress wp language core install uk

---

## Build frontendu

Uruchom kontener Node.js do budowania
────────────────────────────────────────
docker compose --profile frontend up -d

Lub lokalnie:
────────────────────────────────────────
npm install
npm run dev

---

## Struktura projektu

```
impax_bud/
├── docker-compose.yml
├── .env.example
├── .gitignore
├── .editorconfig
├── .gitattributes
├── docker/
│   ├── wordpress/
│   │   ├── Dockerfile
│   │   ├── php.ini
│   │   ├── xdebug.ini
│   │   └── wp-cli.yml
│   └── node/
│       └── Dockerfile
├── html/                   # prototyp HTML (landing page)
│   ├── index.html
│   ├── about.html
│   ├── services.html
│   └── assets/
│       ├── css/style.css
│       └── js/
├── wp-content/
│   ├── themes/
│   │   └── impax_theme/    # tema projektu
│   └── plugins/
└── README.md
```

---

## Notatki

Repozytorium zawiera kod własnościowy i jest przeznaczone wyłącznie do wewnętrznego rozwoju.
