let serverHandlers = require("./server-handlers");
let ipc = require("./server-ipc");

console.log("HELLO HOMIE BE");

let isDev, version;

if (process.argv[2] === "--subprocess") {
  isDev = false;
  version = process.argv[3];

  let socketName = process.argv[4];
  ipc.init(socketName, serverHandlers);
} else {
  let { ipcRenderer, remote } = require("electron");
  isDev = true;
  version = remote.app.getVersion();

  // @ts-ignore
  ipcRenderer.on("set-socket", (event, { name }) => {
    ipc.init(name, serverHandlers);
  });
}

console.log(version, isDev);

(async () => {
  const sharp = require("sharp");

  console.log(`Node process running on: ${__dirname}`);

  // Generates a green image in path
  await sharp({
    create: {
      width: 300,
      height: 200,
      channels: 4,
      background: { r: 0, g: 255, b: 0, alpha: 0.5 },
    },
  }).toFile(`${__dirname}/test.jpg`);
})();
