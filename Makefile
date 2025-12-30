.PHONY: init start-infra stop-infra clean

init:
	@echo "Initializing SOSNot Project..."
	# Add initialization scripts here if needed

start-infra:
	@echo "Starting Infrastructure..."
	docker-compose up -d

stop-infra:
	@echo "Stopping Infrastructure..."
	docker-compose down

clean:
	@echo "Cleaning up..."
	docker-compose down -v

dev-registry:
	@echo "Starting Registry Service..."
	cd backend/sn-registry && mvn quarkus:dev -Dnet.bytebuddy.experimental=true

dev-gateway:
	@echo "Starting Gateway Service..."
	cd backend/sn-gateway && mvn quarkus:dev

