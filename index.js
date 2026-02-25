import { app,BrowserWindow } from "electron";
import path from 'path';
import { dirname } from "path";
import { fileURLToPath } from "url";
import { firstConfig } from "./src/helpers.js";
import apiServer from "./src/api/server.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 440,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    autoHideMenuBar: true,
    resizable: false,
    icon: path.join(__dirname, 'src/assets', 'icon.png') // PNG para Linux, ICO para Windows // PNG para Linux, ICO para Windows
  });

  win.loadFile('src/public/index.html');
}

app.whenReady().then(async()=>{
  await firstConfig();
  apiServer();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});