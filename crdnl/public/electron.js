const path = require("path");

const { app, BrowserWindow } = require("electron");

require("dotenv").config();

function createWindow() {
  // create the browser window.
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // take the full screen
  win.maximize();

  // set the image for the MacOS dock
  if( process.platform=="darwin" ) {
    console.log(__dirname);
    app.dock.setIcon(__dirname + "/CardinalDockLogo.png");
  }

  // and load the index.html of the app.
  win.loadURL(`http://localhost:${process.env.PORT}`);

  // open the DevTools
  if( process.env.SHOW_DEV_TOOLS==1 ) { win.webContents.openDevTools(/*{ mode: "detach" }*/); }
}

// this method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});