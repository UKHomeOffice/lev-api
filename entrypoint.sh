#!/usr/bin/env bash

set -e

POSTGRES_HOST="${POSTGRES_HOST:-localhost}"
POSTGRES_PORT="${POSTGRES_PORT:-5432}"
POSTGRES_DB="${POSTGRES_DB:-lev}"

# Run application
export POSTGRES_HOST
export POSTGRES_PORT
export POSTGRES_DB

echo "LEV API starting..."
node .
