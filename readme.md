# Fullstack Sandbox

## Resources

- [MDN's guide on server-side programming with express](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)

### Stack
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)

## Setup

```bash
nvm use
npm install
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

### Git Ignore

```bash
node_modules
```

### Drizzle

- Install `drizzle-kit` as development dependency for the CLI
- Install SQL driver specific for the database being used

```bash
npx drizzle-kit generate:(pg|mysql|sqlite)
# Consolidate migration code into a script for ease of use, e.g.:
npm run migrate
```
