import serverHandlers from './API/handlers';
import * as ipc from './API/utils';

let isDev;

if (process.argv[2] === '--subprocess') {
  isDev = false;

  let socketName = process.argv[4];
  ipc.init(socketName, serverHandlers);

  console.log('node process started');
} else {
  let { ipcRenderer } = require('electron');
  isDev = true;

  // @ts-ignore
  ipcRenderer.on('set-socket', (event, { name }) => {
    ipc.init(name, serverHandlers);
  });

  console.log('browser window started ');
}
