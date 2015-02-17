// modules
var gulp         = require('gulp'),
    util         = require('gulp-util'),
    gulpif       = require('gulp-if'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss    = require('gulp-minify-css');

// vars/settings
var $isDev = !!util.env.dev;

// start up messages
console.log();
console.log('- Using dev mode: '+ $isDev);
console.log();

// tasks
gulp.task('watch', function()
{
    gulp.watch('**/*.scss', ['compile']);
});

gulp.task('compile', function()
{
    gulp.src('tests/scss/*.scss')
        .pipe( sass({ style: 'expanded' }) ).on('error', swallowError)
        .pipe( autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'ff 17', 'opera 12.1', 'ios 6', 'android 4') )
        .pipe( gulpif(!$isDev, minifyCss()) )
        .pipe(gulp.dest('tests/css'));
});
