const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 800,
    frame: false,
    titleBarStyle: "hidden",
    icon: path.join(__dirname, "assets/icons/icon.png"),
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.setMenuBarVisibility(false);
  win.setTitle("JS-GAME");
  win.loadFile(path.join(__dirname, "index.html"));
  win.webContents.on("did-finish-load", () => {
    win.webContents.insertCSS(
      fs.readFileSync(path.join(__dirname, "style.css"), "utf8")
    );
  });
};

ipcMain.on("minimize-window", () => {
  if (win) {
    win.minimize();
  }
});

ipcMain.on("close-window", () => {
  if (win) {
    win.close();
  }
});

app.whenReady().then(() => createWindow());
app.on("window-all-closed", () => app.quit());
app.commandLine.appendSwitch("ignore-gpu-blacklist");
app.commandLine.appendSwitch("disable-gpu");
app.commandLine.appendSwitch("disable-gpu-compositing");
