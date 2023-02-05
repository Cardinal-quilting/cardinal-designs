const { app, BrowserWindow } = require('electron')

require('dotenv').config()

function createWindow () {
  // create the browser window.
  const win = new BrowserWindow({ webPreferences: { nodeIntegration: true } });

  // maximize the window by default
  win.maximize();

  // set the image for the MacOS dock
  if( process.platform=='darwin' ) {
    app.dock.setIcon(__dirname + '/../src/figures/logos/CardinalDockLogo.png');
  }

  // load the index.html from a url
  win.loadURL(`http://localhost:${process.env.PORT}`);

  // open the DevTools
  if( process.env.SHOW_DEV_TOOLS==1 ) { win.webContents.openDevTools(); }
}

// this method will be called when Electron has finished initialization 
// and is ready to create browser windows; 
// some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if( process.platform!=='darwin' ) { app.quit(); }
});

app.on('activate', () => {
  // on macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.  
  if( BrowserWindow.getAllWindows().length===0 ) { createWindow(); }
});