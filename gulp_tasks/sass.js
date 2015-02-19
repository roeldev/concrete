var config       = require('../gulpconfig.js'),
    gulp         = require('gulp'),
    gulpif       = require('gulp-if'),
    plumber      = require('gulp-plumber'),
    notify       = require('gulp-notify'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss    = require('gulp-minify-css');

//------------------------------------------------------------------------------

gulp.task('sass', function()
{
    return gulp.src(config.testDirSource +'/*.scss')
        .pipe( plumber({ errorHandler: notify.onError(config.notifyErrorOptions) }) )
        //.pipe( gulpif(config.isDev, sourcemaps.init({ loadMaps: false, debug: false })) )
        .pipe( sass({ style: 'expanded' }) )
        .pipe( gulpif(config.isDev, sourcemaps.write()) )
        .pipe( autoprefixer(config.prefixerOptions) )
        .pipe( gulpif(!config.isDev, minifyCss()) )
        .pipe( gulp.dest(config.testDirOutput) );
});
