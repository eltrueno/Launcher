const electron = require('electron');
const {app, BrowserWindow} = electron;

let mainWindow;

const isAlreadyRunning = app.makeSingleInstance(() => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }

    mainWindow.show();
  }
});

if (isAlreadyRunning) {
  app.quit();
}

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    show: false,
    title: app.getName(),
    width: 500,
    height: 600,
    minWidth: 500,
    minHeight: 600,
    maxWidth: 500,
    maxHeight: 600,
    resizable: false,
    fullscreen: false,
    background: '#2196F3',
    titleBarStyle: 'hiddenInset',
    frame: process.platform == 'darwin',
    autoHideMenuBar: true
  });

  if (process.platform === 'darwin') {
    mainWindow.setSheetOffset(40);
  }

  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.on('enter-full-screen', e => {
    e.preventDefault();
  });

  mainWindow.on('ready-to-show', () => {
      mainWindow.show();
      mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
