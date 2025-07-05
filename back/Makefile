up:
	docker compose up

down:
	docker compose down

logs:
	docker compose logs -f

build:
	docker compose build

build-dev:
	docker compose -f docker-compose.dev.yml build

dev:
	docker compose -f docker-compose.dev.yml up

dev-down:
	docker compose -f docker-compose.dev.yml down

dev-logs:
	docker compose -f docker-compose.dev.yml logs -f

shell:
	docker compose exec app bash

migrate:
	docker compose exec app php artisan migrate

clear:
	docker compose exec app php artisan cache:clear
	docker compose exec app php artisan config:clear 