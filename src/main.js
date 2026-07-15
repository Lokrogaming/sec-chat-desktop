const { app, BrowserWindow, shell, session } = require('electron');

const SEC_CHAT_URL = 'https://sec-chat.lovable.app';

function createWindow() {
  const window = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 900,
    minHeight: 620,
    title: 'Sec Chat',
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      sandbox: true,
      nodeIntegration: false
    }
  });

  window.loadURL(SEC_CHAT_URL);

  // Links, die eine neue Browserseite öffnen sollen, bleiben außerhalb der App.
  window.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  window.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith(SEC_CHAT_URL)) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });
}

app.whenReady().then(() => {
  // Akzeptiert Berechtigungsanfragen nur für die eingebettete Sec-Chat-Seite.
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    const allowedPermissions = new Set(['notifications', 'clipboard-sanitized-write']);
    callback(webContents.getURL().startsWith(SEC_CHAT_URL) && allowedPermissions.has(permission));
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
