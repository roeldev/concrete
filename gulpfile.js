// modules
var requireDir = require('require-dir'),
    config     = require('./gulpconfig.js');

// start up messages
console.log();
console.log('- Using dev mode: '+ config.isDev);
console.log();

// include tasks
requireDir('./gulp_tasks', { recurse: true });
