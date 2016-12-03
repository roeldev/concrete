/**
 * concrete | gulpfile.js
 */
'use strict';

const Gulp      = require('gulp');
const Maelstrom = require('maelstrom');
const SassDoc   = require('sassdoc');

Maelstrom.init(Gulp, ['maelstrom-sass']);

// // // // // // // // // // // // // // // // // // // // // // // // // // //

console.log(Maelstrom.sass.src());

Gulp.task('sass:doc', () =>
{
    SassDoc('./src/');
});

Gulp.task('watch', () =>
{
    Gulp.watch(Maelstrom.sass.src(), ['sass']);
    Gulp.watch(Maelstrom.sass.src('test/**/*.scss'), ['sass:lint', 'sass:test']);
});

Gulp.task('watch:test', () =>
{
    // Gulp.watch(Maelstrom.sass.src(), ['sass']);
    Gulp.watch(Maelstrom.sass.src('test/**/*.scss'), ['sass:test']);
});

Gulp.task('watch:lint', () =>
{
    Gulp.watch(Maelstrom.sass.src(), ['sass']);
    Gulp.watch(Maelstrom.sass.src('test/**/*.scss'), ['sass:lint']);
});

Gulp.task('default', ['watch:test']);
