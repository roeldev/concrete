var util = require('gulp-util');

//------------------------------------------------------------------------------

module.exports =
{
    isDev: !!util.env.dev,

    testDirSource: './tests/scss',
    testDirOutput: './tests/css',

    notifyErrorOptions:
    {
        //title:   '',
        message: 'Error test: <%= error.message %>',
        time:    2000,
        //icon:    ''
    },

    prefixerOptions:
    {
        browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'ff 17', 'opera 12.1', 'ios 6', 'android 4'],
        cascade:  false
    }
};
