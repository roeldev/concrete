var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css');

gulp.task('watch', function()
{
    gulp.watch('**/*.scss', ['compile']);
});

gulp.task('compile', function()
{
    gulp.src('tests/scss/*.scss')
        .pipe(sass({ style: 'expanded' }))
        //.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        //.pipe(minifyCss())
        .pipe(gulp.dest('tests/css'));
});
