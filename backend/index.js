let electron = require('electron');
let { app, BrowserWindow } = require('electron');
let { fork } = require('child_process');
let path = require('path');
let isDev = require('electron-is-dev');

let FE_DEV = isDev;
let FE_DEBUG = false;
let BE_DEV = isDev;

FE_DEV = true;
FE_DEBUG = true;
BE_DEV = false;

let findOpenSocket = require('./src/find-open-socket');

let frontendWindow;
let backendWindow;
let backendProcess;

const FE_BUILD_DIR = `build-frontend`;
const BE_BUILD_DIR = `build-backend`;

function createFrontendWindow(socketName) {
  frontendWindow = new BrowserWindow({
    x: 900,
    y: 0,
    width: 1000,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      preload: `${__dirname}/src/client-preload.js`
    }
  });

  frontendWindow.loadURL(
    FE_DEV
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, FE_BUILD_DIR, 'index.html')}`
  );

  frontendWindow.webContents.on('did-finish-load', () => {
    frontendWindow.webContents.send('set-socket', {
      name: socketName
    });
  });

  if (!FE_DEBUG) {
    frontendWindow.removeMenu();
  } else {
    frontendWindow.webContents.openDevTools();
  }
}

function createBackendWindow(socketName) {
  const window = new BrowserWindow({
    x: 0,
    y: 0,
    width: 900,
    height: 600,
    show: true,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  });
  window.loadURL(`file://${__dirname}/${BE_BUILD_DIR}/server-dev.html`);

  window.webContents.openDevTools();

  window.webContents.on('did-finish-load', () => {
    window.webContents.send('set-socket', { name: socketName });
  });

  backendWindow = window;
}

function createBackendProcess(socketName) {
  backendProcess = fork(`${__dirname}/${BE_BUILD_DIR}/server.js`, [
    '--subprocess',
    app.getVersion(),
    socketName
  ]);

  backendProcess.on('message', (msg) => {
    console.log(msg);
  });
}

const initializeApp = async () => {
  let serverSocket = await findOpenSocket();

  createFrontendWindow(serverSocket);

  if (BE_DEV) {
    createBackendWindow(serverSocket);
    // createBackgroundProcess(serverSocket);
  } else {
    createBackendProcess(serverSocket);
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', initializeApp);

// App close handler
app.on('before-quit', () => {
  if (backendProcess) {
    backendProcess.kill();
    backendProcess = null;
  }
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', async () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    initializeApp();
  }
});

// Add extensions: https://github.com/MarshallOfSound/electron-devtools-installer
app.whenReady().then(() => {
  if (FE_DEBUG) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS
    } = require('electron-devtools-installer');

    installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err));
  }

  const { ipcMain } = require('electron');
  ipcMain.on('restart', () => {
    app.relaunch();
    app.exit();
  });
});
