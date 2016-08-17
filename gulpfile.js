/**
 * concrete | gulpfile.js
 */
'use strict';

const Gulp      = require('gulp');
const Maelstrom = require('maelstrom');
const SassDoc   = require('sassdoc');

Maelstrom.init(Gulp, ['maelstrom-sass']);

// -----------------------------------------------------------------------------

Gulp.task('sass:doc', function()
{
    SassDoc('./src/');
});
