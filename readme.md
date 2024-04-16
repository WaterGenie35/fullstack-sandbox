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

### Prisma

- Install `prisma` as development dependency for the CLI
- Install `@prisma/client` for the project

```bash
npx prisma init --datasource-provider sqlite
```
