module.exports = function(grunt)
{
    // load modules
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-sassdoc');

    grunt.initConfig(
    {
        //pkg: grunt.file.readJSON('package.json'),

    //--------------------------------------------------------------------------

        watch:
        {
            sass:
            {
                files: ['*.scss',
                        '**/*.scss'],

                tasks: ['sass']
            },

            livereload:
            {
                files: ['*.html',
                        '*.php',
                        'js/**/*.{js,json}',
                        'css/*.css',
                        'imgs/**/*.{png,jpg,jpeg,gif,webp,svg}'],
                options:
                {
                    livereload: true
                }
            }
        },

    //--------------------------------------------------------------------------

        sass:
        {
            options:
            {
                sourceMap:    true,
                includePaths: ['source/', 'source/**'],
                outputStyle:  'nested',
            },

            dist:
            {
                files:
                {
                    'tests/css/breakpoints.css':   'tests/scss/breakpoints.scss',
                    'tests/css/debug_tests.css':   'tests/scss/debug_tests.scss',
                    'tests/css/grid_table.css':    'tests/scss/grid_table.scss',
                    'tests/css/warning_tests.css': 'tests/scss/warning_tests.scss'
                }
            }
        }
    });

    // register tasks
    grunt.registerTask('default', ['sass']);
    grunt.registerTask('auto', ['watch']);
};
