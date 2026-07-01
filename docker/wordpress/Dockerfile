# =============================================================================
# WordPress 6.x + PHP 8.2 + Apache + Xdebug + WP-CLI + Composer
# Локалі: uk_UA.UTF-8, pl_PL.UTF-8
# =============================================================================

FROM wordpress:7-php8.2-apache

LABEL project="impax_bud"
LABEL description="WordPress dev environment — Xdebug, WP-CLI, Composer, uk_UA + pl_PL locales"

# ---------------------------------------------------------------------------
# Системні залежності та локалі
# ---------------------------------------------------------------------------
RUN apt-get update && apt-get install -y --no-install-recommends \
    # Composer / PHP
    unzip \
    git \
    # Зображення (WordPress медіа)
    libjpeg-dev \
    libpng-dev \
    libwebp-dev \
    libfreetype6-dev \
    # Інтернаціоналізація (intl)
    libicu-dev \
    # Локалізація — генерація uk_UA та pl_PL
    locales \
    # Очищення
    && sed -i '/^#.* uk_UA.UTF-8/s/^# //' /etc/locale.gen \
    && sed -i '/^#.* pl_PL.UTF-8/s/^# //' /etc/locale.gen \
    && locale-gen \
    && rm -rf /var/lib/apt/lists/*

# Встановлюємо змінні оточення для локалей
ENV LANG=uk_UA.UTF-8 \
    LANGUAGE=uk_UA:pl \
    LC_ALL=uk_UA.UTF-8

# ---------------------------------------------------------------------------
# PHP розширення
# ---------------------------------------------------------------------------
RUN docker-php-ext-configure gd \
    --with-freetype \
    --with-jpeg \
    --with-webp \
    && docker-php-ext-install -j$(nproc) \
    gd \
    intl \
    exif \
    && docker-php-ext-enable gd intl exif

# ---------------------------------------------------------------------------
# Xdebug 3
# ---------------------------------------------------------------------------
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug

# ---------------------------------------------------------------------------
# Composer 2
# ---------------------------------------------------------------------------
COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer

# ---------------------------------------------------------------------------
# WP-CLI
# ---------------------------------------------------------------------------
RUN curl -o /usr/local/bin/wp https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
    && chmod +x /usr/local/bin/wp

# ---------------------------------------------------------------------------
# Apache: mod_rewrite + віртуальний хост
# ---------------------------------------------------------------------------
RUN a2enmod rewrite headers \
    && { \
        echo '<Directory /var/www/html>'; \
        echo '    Options Indexes FollowSymLinks'; \
        echo '    AllowOverride All'; \
        echo '    Require all granted'; \
        echo '</Directory>'; \
    } > /etc/apache2/conf-available/wordpress.conf \
    && a2enconf wordpress

WORKDIR /var/www/html
