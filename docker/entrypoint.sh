#!/bin/sh

echo "Migrating database.."
npm run db-migrate

echo "Starting app.."
npm run app
