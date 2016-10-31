/**
 * concrete | gulpfile.js
 */
'use strict';

const Gulp      = require('gulp');
const Maelstrom = require('maelstrom');
const SassDoc   = require('sassdoc');

Maelstrom.init(Gulp, ['maelstrom-sass']);

const SRC_FILES  = Maelstrom.sass.src();
const TEST_FILES = Maelstrom.sass.src('test/**/*.scss');

// // // // // // // // // // // // // // // // // // // // // // // // // // //

Gulp.task('sass:doc', () =>
{
    SassDoc('./src/');
});

Gulp.task('watch', () =>
{
    Gulp.watch(SRC_FILES, ['sass']);
    Gulp.watch(TEST_FILES, ['sass:lint', 'sass:test']);
});

Gulp.task('watch:test', () =>
{
    // Gulp.watch(SRC_FILES, ['sass']);
    Gulp.watch(TEST_FILES, ['sass:test']);
});

Gulp.task('watch:lint', () =>
{
    Gulp.watch(SRC_FILES, ['sass']);
    Gulp.watch(TEST_FILES, ['sass:lint']);
});

Gulp.task('default', ['watch:test']);
