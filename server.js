
//File: server.js//
//Student: Vida Majd//
//Stu ID: 301238005//
//Date: OCt 26 2022//

var app = require('./server/config/app');
var debug = require('debug')('portfolio:server');
var http = require('http');


var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) { return val; }
    if (port >= 0) { return port; }
    return false;
}


function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Vivi ' + port
        : 'Port ' + port;

    //error msg//
    switch (error.code) {
        case 'Denied':
            console.error(bind + 'Not Authorized');
            process.exit(1);
            break;
        case 'INUSE':
            console.error(bind + ' In use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}


function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'vivi ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
