/**
 * concrete | gulpfile.js
 * file version: 0.00.004
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
var Confirge            = require('confirge');
var Path                = require('path');
var RunSequence         = require('run-sequence');
var SassDoc             = require('sassdoc');

////////////////////////////////////////////////////////////////////////////////

var SRC_EXAMPLES = './examples/scss/*.scss';
var SRC_TESTS    = './tests/*.scss';
var SRC_SOURCE   = ['./source/**/*.scss', './*.scss',
                    '!node_modules/*', '!sassdoc/*'];

var $plumberOptions =
{
    'errorHandler': GulpNotify.onError(
    {
        'message': 'Error test: <%= error.message %>',
        'time':    5000
    })
};

//------------------------------------------------------------------------------

function compileTask($src, $dest)
{
    var $sassOptions =
    {
        'style':         'expanded',
        'sourceComments': true
    };

    return function()
    {
        return Gulp.src($src)
            .pipe( GulpPlumber($plumberOptions) )
            .pipe( GulpSass($sassOptions) )
            .pipe( GulpSize({ 'showFiles': true }) )
            .pipe( Gulp.dest($dest) );
    };
}

function watchTask($src, $task)
{
    return function()
    {
        return Gulp.watch([].concat(SRC_SOURCE, [$src]), $task);
    };
}

//------------------------------------------------------------------------------

/*
    Examples related tasks
 */
Gulp.task('compile:examples', compileTask(SRC_EXAMPLES, 'examples/css'));
Gulp.task('watch:examples',   watchTask(SRC_EXAMPLES, 'compile:examples'));

/*
    Tests related tasks
 */
Gulp.task('compile:tests', compileTask(SRC_TESTS, 'tests/css'));
Gulp.task('watch:tests',   watchTask(SRC_TESTS, 'compile:tests'));

/*
    Sass linter
 */
Gulp.task('lint', function()
{
    //var $config  = Confirge.read('./.scss-lint.yml');
    var $src     = [].concat(SRC_SOURCE, [SRC_EXAMPLES]);
    var $options =
    {
        'bundleExec':   true,
        'verbose':      true,
        'customReport': GulpScssLintStylish
    };

    return Gulp.src(SRC_SOURCE)
        .pipe( GulpScssLint($options) );
});

/*
    File watcher
 */
Gulp.task('watch', function()
{
    var $src = [].concat(SRC_SOURCE, [SRC_EXAMPLES, SRC_TESTS]);
    Gulp.watch($src, ['watch:examples', 'watch:tests']);
    Gulp.watch(SRC_SOURCE, ['lint'])
});

Gulp.task('test', function()
{
    setTimeout(function()
    {
        Gulp.src('test/*.js', { 'read': false })
            .pipe( GulpPlumber($plumberOptions) )
            .pipe( GulpMocha({ 'reporter': 'spec' }) );
    }, 500);
});

Gulp.task('dev', function()
{
    process.stdout.write('\u001b[2J');
    RunSequence('test', 'lint');
});

Gulp.task('watch:dev', function()
{
    Gulp.watch(['source/**/*.scss', 'test/*.scss'], ['test']);
});

/*
    Builder, run before creating new release
 */
Gulp.task('build', ['compile:examples', 'compile:tests'], function()
{
    Gulp.src(SRC_SOURCE)
        .pipe( SassDoc() )
});
