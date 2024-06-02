# Fullstack Sandbox

## Resources

### Stack
- [Express](https://expressjs.com/)
  - [MDN's guide on server-side programming with express](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)
- [Drizzle](https://orm.drizzle.team/)
- [Postgres](https://www.postgresql.org/)
  - [Linuxize's guide on installing postgres on debian](https://linuxize.com/post/how-to-install-postgresql-on-debian-10/)
  - [Postgres docker image's quick reference](https://github.com/docker-library/docs/blob/master/postgres/README.md)
  - [Setting up postgres and pgadmin on docker](https://github.com/docker/awesome-compose/tree/master/postgresql-pgadmin)
- [Docker]()
  - [Docker's node.js language-specific guide](https://docs.docker.com/language/nodejs/)

## Setup

```bash
nvm use
npm install
npm start
```

## Development

### Node
```bash
# Install nvm:
# https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating
nvm install lts
npm init

node --version > .nvmrc
echo "engine-strict=true" > .npmrc
# Add the engine versions to package.json:
"engines": {
  "npm": "a.b.c",
  "node": "x.y.z"
}
```

### Adding Dependencies

```bash
npm install --save-exact [--save-dev] <package name> # -DE for short
```

### Drizzle

- Install `drizzle-kit` as development dependency for the CLI
- Install SQL driver specific for the database being used

```bash
# After schema changes:
npm run db-make-migration
npm run db-migrate

# Drizzle studio:
npm run db-studio
```

### PostgreSQL

- The `pg` driver dependency is only for drizzle studio

### WSL

- Specify services that should automatically start in `/etc/wsl.conf`

```bash
# E.g.
[boot]
command="service docker start && service postgresql start"
```

#### Local Testing

1. `npm run db-drop-migration` to select and remove migrations
2. `npm run db-make-migration` to re-make the migrations
3. `rm path/to/dev.db`
3. `npm run db-migrate`
