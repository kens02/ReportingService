#!/usr/bin/env bash
set -euo pipefail

if [ ! -f .env ]; then
  echo "Creating .env from .env.example"
  cp .env.example .env
fi

npm install
npx prisma generate

if npx prisma migrate dev --name init; then
  echo "Prisma migrate succeeded."
else
  echo "Prisma migrate failed. Falling back to SQLite schema creation."
  sqlite3 prisma/dev.db "CREATE TABLE IF NOT EXISTS Report (id TEXT PRIMARY KEY NOT NULL, title TEXT NOT NULL, description TEXT NOT NULL, chartType TEXT NOT NULL, data TEXT NOT NULL, createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);"
fi

npm run seed

echo "Setup complete. Run 'npm run dev' to start the app."
