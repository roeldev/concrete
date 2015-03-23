var _gulp    = require('gulp'),
    _plumber = require('gulp-plumber'),
    _notify  = require('gulp-notify'),
    _sass    = require('gulp-sass'),
    _size    = require('gulp-size');

//------------------------------------------------------------------------------

var _compileTasks = [],
    _config =
    {
        'plumberOptions':
        {
            'errorHandler': _notify.onError(
            {
                'message': 'Error test: <%= error.message %>',
                'time':    5000
            })
        },

        'sassOptions':
        {
            'style':          'expanded',
            'sourceComments': true
        }
    };

//------------------------------------------------------------------------------

function _addTasks($name, $src, $dest)
{
    var $taskCompile = $name +':compile',
        $taskWatch   = $name +':watch';

    _compileTasks.push($taskCompile);

    _gulp.task($taskCompile, function()
    {
        return _gulp.src($src)
            .pipe( _plumber(_config.plumberOptions) )
            .pipe( _sass(_config.sassOptions) )
            .pipe( _size({ showFiles: true }) )
            .pipe( _gulp.dest($dest) );
    });

    _gulp.task($taskWatch, function()
    {
        return _gulp.watch(['source/**/*.scss', src], [$taskCompile]);
    });
}

//------------------------------------------------------------------------------

// compiler and watcher for examples only
_addTasks('examples', 'examples/scss/*.scss', 'examples/css');
// compiler and watcher for tests only
_addTasks('tests', 'tests/*.scss', 'tests/css');

// global file watcher, will watch and compile everything
_gulp.task('default', function()
{
    return _gulp.watch('**/*.scss', _compileTasks);
});
