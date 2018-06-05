const {
  FuseBox,
  CSSPlugin,
  QuantumPlugin,
  WebIndexPlugin
} = require('fuse-box');
const { src, task, context } = require('fuse-box/sparky');
const { ElmPlugin } = require('fuse-box-elm-plugin');
const { join } = require('path');
const express = require('express');

const OUT_DIR = join(__dirname, '/build');
const TEMPLATE = join(__dirname, 'src/index.html');
const ALL_FILES = './**/**.*';
const TITLE = 'Elm App';

context(
  class {
    compileElm() {
      const isProd = this.isProduction;

      return FuseBox.init({
        homeDir: 'src',
        output: `${OUT_DIR}/$name.js`,
        log: true,
        sourceMaps: !isProd,
        target: 'browser@es5',
        cache: !isProd,
        plugins: [
          [CSSPlugin()],
          isProd ? ElmPlugin() : ElmPlugin({ warn: true, debug: true }),
          WebIndexPlugin({ template: TEMPLATE, title: TITLE }),
          isProd &&
            QuantumPlugin({
              bakeApiIntoBundle: 'app',
              uglify: true,
              treeshake: true,
              css: true
            })
        ]
      });
    }
  }
);

task('prod-build', async context => {
  context.isProduction = true;

  const fuse = context.compileElm();
  fuse.bundle('app').instructions('!> index.js');

  await fuse.run();
});

task('dev-build', async context => {
  const fuse = context.compileElm();

  fuse.dev({ root: false }, server => {
    const app = server.httpServer.app;
    app.use(express.static(OUT_DIR));
    app.get('*', (req, res) => {
      res.sendFile(join(OUT_DIR, '/index.html'));
    });
  });

  fuse
    .bundle('app')
    .hmr({ reload: true })
    .watch()
    .instructions('> index.js');

  await fuse.run();
});

/* TASKS TO COPY FILES */
task('copy-assets', () => src(ALL_FILES, { base: './src/assets/' }).dest(`${OUT_DIR}/assets`));

/* TASK TO CLEAN OUT OLD FILES BEFORE COMPILATION */
task('clean', () => src(`${OUT_DIR}/*`).clean(OUT_DIR));

/* MAIN BUILD TASK CHAINS */
task('dev', ['clean', 'copy-assets', 'dev-build'], () =>
  console.info(
    `Your Elm code has successfully been compiled and the development server is up and running!`
  )
);

task('prod', ['clean', 'copy-assets', 'prod-build'], () =>
  console.info('Your Elm code has been successfully compiled and optimized.')
);
