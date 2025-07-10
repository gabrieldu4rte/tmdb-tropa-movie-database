FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev \
    autoconf \
    pkg-config \
    build-essential \
    nginx \
    libssl-dev \
    openssl

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip
RUN pecl install --configureoptions 'enable-ssl="yes" with-ssl-dir="/usr" enable-mongodb-developer-flags="yes"' mongodb
RUN docker-php-ext-enable mongodb
RUN pecl install redis && docker-php-ext-enable redis

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

RUN composer install --no-dev --optimize-autoloader --no-interaction

RUN chown -R www-data:www-data /var/www
RUN chmod -R 755 /var/www/storage

# Configure PHP-FPM
RUN mkdir -p /var/run/
RUN touch /var/run/nginx.pid

# Copy and setup nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create start script
RUN echo '#!/bin/sh\nphp-fpm -D\nsed -i "s/listen 80/listen $PORT/" /etc/nginx/nginx.conf\nnginx -g "daemon off;"' > /var/www/start.sh
RUN chmod +x /var/www/start.sh

EXPOSE 80

CMD ["/var/www/start.sh"] 