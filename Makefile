.PHONY: help init start-infra stop clean

help:
	@echo "SOSNot Development CLI"
	@echo "  init         : Install dependencies"
	@echo "  start-infra  : Start core infrastructure (Postgres, Keycloak, MinIO)"
	@echo "  stop         : Stop all containers"
	@echo "  clean        : Remove build artifacts"

init:
	@echo "Initializing project..."
	# Add dependency installation commands here (e.g. npm install, mvn install)

start-infra:
	docker-compose up -d postgres keycloak minio

stop:
	docker-compose down

clean:
	mvn clean
