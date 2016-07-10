/* jshint node: true */
var nconf = require('nconf'),
    path = require('path');

switch (process.env.NODE_ENV) {
    case 'development' :
        nconf.argv().env().file({file: path.join(__dirname,'development.json')});
        console.log('server is using ' + process.env.NODE_ENV + ' configuration');
        break;
    case 'production' :
        nconf.argv().env().file({file: path.join(__dirname,'production.json')});
        console.log('server is using ' + process.env.NODE_ENV + ' configuration');
        break;
    default :
        process.env.NODE_ENV = 'development';
        nconf.argv().env().file({file: path.join(__dirname,'development.json')});
        console.log('server is using ' + process.env.NODE_ENV + ' configuration');
        break;
}

nconf.set('dir:root:server', path.join(__dirname,'..'));

module.exports = nconf;
