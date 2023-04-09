const { app, BrowserWindow, ipcMain } = require("electron");
var fs = require("fs");
const electronDialog = require('electron').dialog;
  
function open_save_dialog(window, options) {
    // Return selected path back to the UI
    return electronDialog.showSaveDialog(window, options)
        .then((result) => { if (result) { return result; } })
        .catch((error) => { console.error('System file dialog error: ' + error); });
}

function save_project_as(_event, project, window) {
    let options = {
      filters: [{
        name: "Cardinal Designs",
          extensions: ["crdnl"]
        }]
      };
  
    // Return the path to display in the UI
    return open_save_dialog(window, options)
      .then((result) => {
        // Returns "undefined" if dialog is cancelled
        if (result.canceled) { return; }
        project.filename = result.filePath;
        fs.writeFile(result.filePath, JSON.stringify(project), function(err) {
            if (err) throw err;
        });
      return result.filePath;
    });
}

function save_project(_event, filename, project, window) {
    project.filename = filename;
    fs.writeFile(filename, JSON.stringify(project), function(err) {
        if (err) throw err;
    });
}

module.exports = {
    save_project_as,
    save_project
}