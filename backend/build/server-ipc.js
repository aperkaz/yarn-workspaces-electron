var ipc = require('node-ipc');
function init(socketName, handlers) {
    ipc.config.id = socketName;
    ipc.config.silent = true;
    ipc.serve(function () {
        ipc.server.on('message', function (data, socket) {
            var msg = JSON.parse(data);
            var id = msg.id, name = msg.name, args = msg.args;
            if (handlers[name]) {
                handlers[name](args).then(function (result) {
                    ipc.server.emit(socket, 'message', JSON.stringify({ type: 'reply', id: id, result: result }));
                }, function (error) {
                    // Up to you how to handle errors, if you want to forward
                    // them, etc
                    ipc.server.emit(socket, 'message', JSON.stringify({ type: 'error', id: id }));
                    throw error;
                });
            }
            else {
                console.warn('Unknown method: ' + name);
                ipc.server.emit(socket, 'message', JSON.stringify({ type: 'reply', id: id, result: null }));
            }
        });
    });
    ipc.server.start();
}
function send(name, args) {
    ipc.server.broadcast('message', JSON.stringify({ type: 'push', name: name, args: args }));
}
module.exports = { init: init, send: send };
