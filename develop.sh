#!/bin/bash

# Wait for postgres to be ready
until pg_isready -h tashtebat-postgres -p 5432 -U postgres; do
  echo "Waiting for Postgres..."
  sleep 2
done

echo "Postgres is ready, running migrations..."
# Run migrations with correct action
npx medusa db:migrate || { echo "Migrations failed"; exit 1; }

echo "Starting Medusa server..."

npx medusa develop