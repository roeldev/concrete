/**
 * concrete | gulpfile.js
 */
'use strict';

const Gulp                = require('gulp');
const GulpPlumber         = require('gulp-plumber');
const GulpMocha           = require('gulp-mocha');
const GulpNotify          = require('gulp-notify');
const GulpSass            = require('gulp-sass');
const GulpScssLint        = require('gulp-scss-lint');
const GulpScssLintStylish = require('gulp-scss-lint-stylish');
const GulpSize            = require('gulp-size');
const SassDoc             = require('sassdoc');

////////////////////////////////////////////////////////////////////////////////

const SRC_EXAMPLES = './examples/scss/*.scss';
const SRC_TESTS    = './test/**/*.scss';
const SRC_SOURCE   = ['./src/**/*.scss', './*.scss',
                    '!node_modules/*', '!docs/*'];

//------------------------------------------------------------------------------

const $sassOptions =
{
    'style':         'expanded',
    'sourceComments': true
};

const $plumberOptions =
{
    'errorHandler': GulpNotify.onError(
    {
        'message': 'Error test: <%= error.message %>',
        'time':    5000
    })
};

//------------------------------------------------------------------------------

// delay task so it won't fail when the editor has locked the file while saving
function GulpDelayTask($delay, $fn)
{
    setTimeout($fn, $delay);
}

//------------------------------------------------------------------------------

/*
    Examples related tasks
 */
Gulp.task('compile:examples', function($callback)
{
    GulpDelayTask(500, function()
    {
        Gulp.src(SRC_EXAMPLES)
            .pipe( GulpPlumber($plumberOptions) )
            .pipe( GulpSass($sassOptions) )
            .pipe( GulpSize({ 'showFiles': true }) )
            .pipe( Gulp.dest('examples/css') );

        $callback();
    });
});

Gulp.task('watch:examples', function()
{
    let $src = [].concat(SRC_SOURCE, [SRC_EXAMPLES]);
    Gulp.watch($src, ['compile:examples']);
});

/*
    Runs True Sass test suite with Mocha.
 */
Gulp.task('test', function($callback)
{
    GulpDelayTask(500, function()
    {
        process.stdout.write('\u001b[2J');

        Gulp.src('test/*.js', { 'read': false })
            .pipe( GulpPlumber($plumberOptions) )
            .pipe( GulpMocha({ 'reporter': 'spec' }) );

        $callback();
    });
});

Gulp.task('watch:tests', function()
{
    let $src = [].concat(SRC_SOURCE, [SRC_TESTS]);
    Gulp.watch($src, ['test']);
});

/*
    File watcher
 */
Gulp.task('watch', function()
{
    let $src = [].concat(SRC_SOURCE, [SRC_EXAMPLES, SRC_TESTS]);
    Gulp.watch($src, ['watch:examples', 'watch:tests']);
    //Gulp.watch(SRC_SOURCE, ['lint'])
});

/*
    Builder, run before creating new release
 */
Gulp.task('build', ['compile:examples'], function()
{
    SassDoc('./src/');
});
