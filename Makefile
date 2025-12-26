.PHONY: setup start stop delete

# Initial setup / start (pull image if needed)
setup:
	docker compose up -d
# Only local fix instead of healtcheck in the compose file
	sleep 3
	npx drizzle-kit push --force
	npx tsx src/lib/server/db/seed.ts
	npm run dev

# Alias for setup (optional but convenient)
start: 
	docker compose start
	npm run dev

# Stop containers without deleting data
stop:
	docker compose stop

# Stop and remove containers + volumes
delete:
	docker compose down -v