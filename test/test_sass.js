'use strict';

var FileSystem = require('fs');
var Path       = require('path');
var SassTrue   = require('sass-true');

////////////////////////////////////////////////////////////////////////////////

function readDir($dir)
{
    var $items = FileSystem.readdirSync($dir);
    $items.forEach(function($item)
    {
        // ignore dirs and files starting with _
        if ($item.substr(0, 1) == '_') return;

        $item = Path.join($dir, $item);

        // when subdir
        if (!Path.extname($item))
        {
            readDir($item);
        }
        // when scss file
        else if (Path.extname($item) === '.scss')
        {
            SassTrue.runSass({ 'file': $item }, describe, it);
        }
    });
}

//------------------------------------------------------------------------------

readDir(__dirname);
