#!/bin/bash
echo "Configuring Keycloak..."

# Wait for Keycloak to be ready
echo "Waiting for Keycloak to start..."
until docker exec sosnot-keycloak /opt/keycloak/bin/kcadm.sh config credentials --server http://localhost:8080 --realm master --user admin --password admin > /dev/null 2>&1; do
  echo "Keycloak is not ready yet... Retrying in 5 seconds."
  sleep 5
done
echo "Keycloak is ready!"

# Create Realm 'soshs'
echo "Creating Realm 'soshs'..."
docker exec sosnot-keycloak /opt/keycloak/bin/kcadm.sh create realms -s realm=soshs -s enabled=true

# Create Client 'soshs-web'
echo "Creating Client 'soshs-web'..."
docker exec sosnot-keycloak /opt/keycloak/bin/kcadm.sh create clients -r soshs -s clientId=soshs-web -s enabled=true -s publicClient=true -s "redirectUris=[\"http://localhost:4200/*\"]" -s "webOrigins=[\"+\"]" -s directAccessGrantsEnabled=true -s standardFlowEnabled=true

# Create User 'test'
echo "Creating User 'test'..."
docker exec sosnot-keycloak /opt/keycloak/bin/kcadm.sh create users -r soshs -s username=test -s enabled=true

# Set Password
echo "Setting password for 'test'..."
docker exec sosnot-keycloak /opt/keycloak/bin/kcadm.sh set-password -r soshs --username test --new-password test

echo "Keycloak setup complete. User: test / test"