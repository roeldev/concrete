/**
 * concrete | gulpfile.js
 */
'use strict';

var Gulp                = require('gulp');
var GulpPlumber         = require('gulp-plumber');
var GulpMocha           = require('gulp-mocha');
var GulpNotify          = require('gulp-notify');
var GulpSass            = require('gulp-sass');
var GulpScssLint        = require('gulp-scss-lint');
var GulpScssLintStylish = require('gulp-scss-lint-stylish');
var GulpSize            = require('gulp-size');
var SassDoc             = require('sassdoc');

////////////////////////////////////////////////////////////////////////////////

var SRC_EXAMPLES = './examples/scss/*.scss';
var SRC_TESTS    = './test/*.scss';
var SRC_SOURCE   = ['./src/**/*.scss', './*.scss',
                    '!node_modules/*', '!docs/*'];

//------------------------------------------------------------------------------

var $sassOptions =
{
    'style':         'expanded',
    'sourceComments': true
};

var $plumberOptions =
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
    var $src = [].concat(SRC_SOURCE, [SRC_EXAMPLES]);
    Gulp.watch($src, ['compile:examples']);
});

/*
    Runs True Sass test suite with Mocha.
 */
Gulp.task('test', function($callback)
{
    GulpDelayTask(500, function()
    {
        Gulp.src('test/*.js', { 'read': false })
            .pipe( GulpPlumber($plumberOptions) )
            .pipe( GulpMocha({ 'reporter': 'spec' }) );

        $callback();
    });
});

Gulp.task('watch:tests', function()
{
    var $src = [].concat(SRC_SOURCE, [SRC_TESTS]);
    Gulp.watch($src, ['test']);
});

/*
    File watcher
 */
Gulp.task('watch', function()
{
    var $src = [].concat(SRC_SOURCE, [SRC_EXAMPLES, SRC_TESTS]);
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
