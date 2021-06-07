const ipcModule = require("node-ipc");

function init(socketName, handlers) {
  ipcModule.config.id = socketName;
  ipcModule.config.silent = true;

  ipcModule.serve(() => {
    ipcModule.server.on("message", (data, socket) => {
      let msg = JSON.parse(data);
      let { id, name, args } = msg;

      console.log(`BE receive: ${name} | ${JSON.stringify(args)}`);

      if (handlers[name]) {
        handlers[name](args).then(
          (result) => {
            ipcModule.server.emit(
              socket,
              "message",
              JSON.stringify({ type: "reply", id, result })
            );
          },
          (error) => {
            // Up to you how to handle errors, if you want to forward
            // them, etc
            ipcModule.server.emit(
              socket,
              "message",
              JSON.stringify({ type: "error", id })
            );
            throw error;
          }
        );
      } else {
        console.warn("Unknown method: " + name);
        ipcModule.server.emit(
          socket,
          "message",
          JSON.stringify({ type: "reply", id, result: null })
        );
      }
    });
  });

  ipcModule.server.start();
}

function send(name, args) {
  console.log(`BE send: ${name} | ${JSON.stringify(args)}`);
  ipcModule.server.broadcast(
    "message",
    JSON.stringify({ type: "push", name, args })
  );
}

module.exports = { init, send };
