const { app, BrowserWindow, ipcMain } = require("electron");
var fs = require("fs");
const electronDialog = require('electron').dialog;

function file_options() {
  return {
    filters: [{
      name: "Cardinal Designs",
        extensions: ["crdnl"]
      }]
    };
}
  
function open_save_dialog(window) {
  // Return selected path back to the UI
  return electronDialog.showSaveDialog(window, file_options())
      .then((result) => { if (result) { return result; } })
      .catch((error) => { console.error('System file dialog error: ' + error); });
}

function save_project_as(_event, project_data, window) {
    // Return the path to display in the UI
    return open_save_dialog(window).then((result) => {
      // returns "undefined" if dialog is cancelled
      if (result.canceled) { return; }
      fs.writeFile(result.filePath, project_data, function(err) {
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

function open_load_dialog(window) {
  // Return selected path back to the UI
  return electronDialog.showOpenDialog(window, file_options())
      .then((result) => { if (result) { return result; } })
      .catch((error) => { console.error('System file dialog error: ' + error); });
}


function load_project(_event, window) {
  return open_load_dialog(window).then((result) => {
    if (result.canceled) { return; }
    return JSON.parse(fs.readFileSync(result.filePaths[0]));
  });
}

module.exports = {
    save_project_as,
    save_project,
    load_project
}