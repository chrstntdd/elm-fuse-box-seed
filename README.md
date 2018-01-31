# elm-seed

A (nearly) bare bones starter project for Elm.

## Features

* SCSS / SASS compilation
* PostCSS
* Autoprefixer
* CSS optimization
* Development server
* Hot module replacement
* Browser refresh on save
* Elm time traveling debugger
* Elm compiler messages output to console
* Uglify-JS and FuseBox Quantum optimizations
* [Extensible!](#considerations)

## Installation

1. We are using [FuseBox](https://fuse-box.org/) paired with a [plugin](https://github.com/ccapndave/fuse-box-elm-plugin) to compile our Elm code. The version of FuseBox that we are using requires having Node.js version 8.2.0 or greater so visit the official Node.js website for instructions on how to download Node.js using a [package manager](https://nodejs.org/en/download/package-manager/) or [direct download](https://nodejs.org/en/download/) for your operating system if you don't already have it installed.

2. Clone this repository and then navigate into the project by running this command in your terminal.

```bash
$ git clone https://github.com/chrstntdd/elm-seed.git && cd elm-seed
```

2. Install project dependencies.

```bash
$ npm install
```

## Getting started

I have set up two scripts in the `package.json` file. One for development and one that is better suited for production.

### Development

```bash
$ npm run start
```

This script will start up an Express.js server at http://localhost:4444 to serve the static contents of the `build` directory that this command outputs. The server is also configured to always serve back the `index.html` file that is generated for any request. This is a very handy feature if you plan on handling routing on the client like most single-page-apps do. Don't be alarmed if you see there is no css output when in development, the css is still there - it has just been being injected into the head of the `index.html` file, don't worry though, your source maps will be in tact!

### Production

```bash
$ npm run prod
```

This script will run FuseBox in production mode which will spend a little extra time minifying our output javascript code with uglify-js and its own internal features. The contents of `build` will now be ready for a similar server to host it, or even better - [Netlify](https://www.netlify.com/). Netlify makes it very simple to deploy static front end code just like this. The choice is entirely up to you.

## Considerations

### Included

This project includes normalize.css and autoprefixer by default, but nothing else aside from Elm itself. You may wish to remove these two dependencies if you enjoy browser inconsistencies. If you need polyfills for older browsers, they can be imported into the `index.js` file and they will be incorporated into your bundle.

```js
// index.js

import './index.scss';
import { Main } from './Main.elm';

import 'smoothscroll-polyfill';
// ...

Main.embed(document.getElementById('elm-root'));
```

### Configuration

I would encourage you to look into the `fuse.js` file. Those ~100 lines are responsible for building this entire project so feel free to tweak things as necessary for your individual project needs. Configuration can be as quick as changing the constants I have preset at the top of the file or writing your own [build tasks](https://fuse-box.org/page/sparky). Do make it a point to check out the FuseBox website and peruse the documentation or maybe ask a question on [Gitter](https://gitter.im/fusebox-bundler/Lobby?utm_source=share-link&utm_medium=link&utm_campaign=share-link) if you need help extending FuseBox to further suit your needs.

### Known Issues

This issue only exists when in development, but it happens now and again - caching is part of what makes FuseBox so fast, but caching is just one really [hard thing](https://martinfowler.com/bliki/TwoHardThings.html). To combat this, clear the cache by deleting the `.fusebox` directory entirely and then rebuild your project.
