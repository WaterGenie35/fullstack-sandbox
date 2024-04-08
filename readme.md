# Fullstack Sandbox

## Resources

### Backend

- [MDN's guide on server-side programming with express](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)

## Setup

### New Project

1. Install nvm

https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating

2. Setup node

```bash
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

3. Adding dependencies

```bash
npm install --save-exact [--save-dev] <package name>
```

#### Misc.

- Git ignore `node_modules`

##### Formatting & Styling

```bash
npm install --save-exact --save-dev eslint
```
