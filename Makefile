.PHONY: setup start stop delete

# Initial setup / start (pull image if needed)
setup:
	docker compose up -d

# Alias for setup (optional but convenient)
start: setup

# Stop containers without deleting data
stop:
	docker compose stop

# Stop and remove containers + volumes
delete:
	docker compose down -v