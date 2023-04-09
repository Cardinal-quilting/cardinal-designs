const { app, BrowserWindow, ipcMain } = require('electron');
const electronDialog = require('electron').dialog;

const path = require("path");
const { electron } = require('process');

var fs = require("fs");

const { save_project_as, save_project } = require(path.join(__dirname, "backend/save_and_load.js"));

require('dotenv').config();

// prevent garbage collection
let window;

function createWindow () {
  const preload_script_path = path.join(__dirname, "backend/preload.js");

  // create the browser window.
  const window = new BrowserWindow({ 
    webPreferences: { 
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: true,
      preload: preload_script_path
    } 
  });

  // maximize the window by default
  window.maximize();

  // set the image for the MacOS dock
  if( process.platform=='darwin' ) {
    app.dock.setIcon(__dirname + '/../src/figures/logos/CardinalDockLogo.png');
  }

  // load the index.html from a url
  window.loadURL(`http://localhost:${process.env.PORT}`);

  // open the DevTools
  if( process.env.SHOW_DEV_TOOLS==1 ) { window.webContents.openDevTools(); }
}

// handle saving the project
ipcMain.handle("save_project_as", function save_as(_event, data) { return save_project_as(_event, data, window); });
ipcMain.handle("save_project", function save(_event, data) { save_project(_event, data[0], data[1], window); });

// this method will be called when Electron has finished initialization 
// and is ready to create browser windows; 
// some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if( process.platform!=="darwin" ) { app.quit(); }
});

app.on('activate', () => {
  // on macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.  
  if( BrowserWindow.getAllWindows().length===0 ) { createWindow(); }
});