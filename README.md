# Impax Bud

Приватний WordPress-проєкт для клієнта. Двомовний сайт: українська + польська.

## Стек

- WordPress 6.x
- PHP 8.2+
- HTML / SCSS / JavaScript

## Вимоги

- Docker & Docker Compose
- Node.js 20+ (локально або через Docker)

---

## Швидкий старт (Docker)

### 1. Клонувати репозиторій

```bash
git clone <repo-url> impax_bud
cd impax_bud
```

### 2. Налаштувати змінні оточення

```bash
cp .env.example .env
```

Відредагуйте `.env` — мінімум змініть паролі.

### 3. Запустити Docker

```bash
# WordPress + MariaDB
docker compose up -d

# WordPress + MariaDB + phpMyAdmin (http://localhost:8080)
docker compose --profile tools up -d

# Усе разом: WP + DB + phpMyAdmin + Node.js збірка
docker compose --profile full up -d
```

### 4. Відкрити сайт

- **Сайт:** http://localhost:8000
- **phpMyAdmin:** http://localhost:8080 (якщо запущено з `--profile tools`)

---

## Розробка

### Docker-сервіси

| Сервіс | Порт   | Призначення |
|---|--------|---|
| `wordpress` | `8000` | WP 6.x + PHP 8.2 + Apache + Xdebug 3 + Composer + WP-CLI |
| `db` | `3307` | MariaDB 10.11 |
| `phpmyadmin` | `8080` | Веб-інтерфейс для БД (опціонально) |
| `node` | `3000` | Node.js 20 — збірка SCSS/JS (опціонально) |

### Корисні команди

```bash
# Логи WordPress
docker compose logs -f wordpress

# WP-CLI (всередині контейнера)
docker compose exec wordpress wp plugin list
docker compose exec wordpress wp language core install uk
docker compose exec wordpress wp language core install pl_PL

# Composer
docker compose exec wordpress composer install

# Зупинка
docker compose down

# Повне очищення (база даних також!)
docker compose down -v
```

### Xdebug

Xdebug 3 налаштований для VSCode. Порт `9003`, IDE key `VSCODE`.
Для PhpStorm змініть `XDEBUG_IDEKEY` у `.env`.

### Мультимовність

Сайт підтримує **українську** та **польську** мови. Після першого запуску:

```bash
# Завантажити мовні пакети
docker compose exec wordpress wp language core install uk
docker compose exec wordpress wp language core install pl_PL
```

Для мультимовного контенту використовується **Polylang** (безкоштовний плагін).

---

## Збірка фронтенду

```bash
# Запустити Node.js контейнер для збірки
docker compose --profile frontend up -d

# Або локально:
npm install
npm run dev
```

---

## Структура проєкту

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
└── wp-content/
    ├── themes/
    │   └── impax-bud/       # тема проєкту
    └── plugins/             # кастомні плагіни
```

---

## Нотатки

Цей репозиторій містить пропрієтарний код і призначений виключно для внутрішньої розробки.
