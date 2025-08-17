//extracting needed libraries from electron to build the window
// const {anyName:app, anyOtherName: BrowserWindow} = require('electron');
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
//creating the window
let win

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (win) {
      if (win.isMinimized()) win.restore();
      win.show();
      win.focus();
    }
  });
}


function createWindow (){
     win = new BrowserWindow({
        width: 850,
        height: 500,
        icon: path.join(__dirname,'assets/icon.png'), // Use the preload script to expose APIs


        webPreferences:{
            nodeIntegration: false, // Disable Node.js integration from the UI for security
            contextIsolation: true, // Enable context isolation for security
            preload: path.join(__dirname, 'preload.js'), // Use the preload script to expose APIs
        },
        frame: false, // Remove the window frame
        transparent: true, // Make the window transparent
    })
    if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173'); 
    }
    else {
        win.loadFile(path.join(__dirname, '../dist/index.html')) // Load the React app running on Vite
    }
    // Load the React app running on Vite
    // win.loadUrl(`file://${path.join(__dirname, '../build/index.html')}`); // Load the React app from the build directory
}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
}
);
ipcMain.on('window-minimize', () => {
    win.minimize();
})
ipcMain.on('window-close', () => {
    win.close();
});