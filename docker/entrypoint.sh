#!/bin/sh

# TODO: check migraiton workflow, see dockerfile
echo "Migrating database.."
npm run db-migrate

echo "Starting app.."
npm run app
