'use strict';

var FileSystem = require('fs');
var Path       = require('path');
var SassTrue   = require('sass-true');

////////////////////////////////////////////////////////////////////////////////

var $files = FileSystem.readdirSync(__dirname);
$files.forEach(function($file)
{
    if (Path.extname($file) === '.scss')
    {
        $file = Path.resolve(__dirname, './'+ $file);
        SassTrue.runSass({ 'file': $file }, describe, it);
    }
});
