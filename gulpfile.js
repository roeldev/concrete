var gulp       = require('gulp'),
    plumber    = require('gulp-plumber'),
    notify     = require('gulp-notify'),
    sass       = require('gulp-sass'),
    size       = require('gulp-size');

//------------------------------------------------------------------------------

var config =
{
    notifyErrorOptions:
    {
        //title:   '',
        message: 'Error test: <%= error.message %>',
        time:    5000,
        //icon:    ''
    },

    sassOptions:
    {
        style:          'expanded',
        sourceComments: true
    }
}

//------------------------------------------------------------------------------

gulp.task('tests:compile', function()
{
    return gulp.src('tests/*.scss')
        .pipe( plumber({ errorHandler: notify.onError(config.notifyErrorOptions) }) )
        .pipe( sass(config.sassOptions) )
        .pipe( size({ showFiles: true }) )
        .pipe( gulp.dest('tests/compiled_result') );
});

gulp.task('tests:watch', function()
{
    return gulp.watch('**/*.scss', ['tests:compile']);
});
