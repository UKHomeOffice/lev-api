#!/usr/bin/env bash

set -e

POSTGRES_HOST="${POSTGRES_HOST:-localhost}"
POSTGRES_PORT="${POSTGRES_PORT:-5432}"
POSTGRES_DB="${POSTGRES_DB:-lev}"
POSTGRES_SCHEMA="${POSTGRES_SCHEMA:-public}"
POSTGRES_URL_PARAMS=""
JVM_HEAP="32m"
JVM_META="64m"
JVM_STACK="228k"

export JAVA_ARGS="-Xms${JVM_HEAP} -Xmx${JVM_HEAP} -XX:MetaspaceSize=${JVM_META} -XX:MaxMetaspaceSize=${JVM_META} -Xss${JVM_STACK}"

FLYWAY_BASELINE="0.0"
if [[ ! -z ADD_TEST_DATA ]]; then
  FLYWAY_BASELINE="0.5"
fi

if [ "${POSTGRES_SSL}" != "FALSE" ]; then
  if [ -n "${POSTGRES_CA}" ]; then
    echo -n "${POSTGRES_CA}" | base64 -d > "${PWD}/postgres-ca.pem"
    POSTGRES_URL_PARAMS="?ssl=true&sslrootcert=${PWD}/postgres-ca.pem&sslmode=verify-full"
  else
    POSTGRES_URL_PARAMS="?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory"
  fi
fi
POSTGRES_URL="jdbc:postgresql://${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}${POSTGRES_URL_PARAMS}"

if [ -z "${MOCK}" ]; then
  # Set up database
  echo "Waiting to set up database..."
  nc="nc ${POSTGRES_HOST} ${POSTGRES_PORT} </dev/null 2>/dev/null"
  set +e
  eval ${nc}
  while [ $? -ne 0 ]; do
    echo ...
    sleep 5
    eval ${nc}
  done
  set -e
  cd flyway/
  ./flyway migrate \
    -url="${POSTGRES_URL}" \
    -user="${POSTGRES_ADMIN_USER}" \
    -password="${POSTGRES_ADMIN_PASSWORD}" \
    -schemas="${POSTGRES_SCHEMA}" \
    -placeholders.app_user="${POSTGRES_USER}" \
    -placeholders.app_password="${POSTGRES_PASSWORD}" \
    -baselineOnMigrate="true" \
    -baselineVersion="${FLYWAY_BASELINE}"
  cd ..
fi

# Blot out secrets
export POSTGRES_ADMIN_USER=""
export POSTGRES_ADMIN_PASSWORD=""

# Run application
export POSTGRES_HOST
export POSTGRES_PORT
export POSTGRES_DB

echo "LEV API starting..."
node .
