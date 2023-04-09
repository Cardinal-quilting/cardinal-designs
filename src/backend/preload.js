const electron = require("electron");
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('API', {
    invoke: (channel, args) => {
        return ipcRenderer.invoke(channel, args);
    }
});