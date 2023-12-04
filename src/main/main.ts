/* eslint global-require: off, no-console: off, promise/always-return: off */

import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import Database from './database/database';

const CLIENT_ID = '1178469210385555556';

const client = require('discord-rich-presence')(CLIENT_ID);

const database = new Database();
const startTimestamp = new Date();

function updateRPC(time: string) {
  client.updatePresence({
    state: 'Cubing Away',
    details: `Session Best: ${time}`,
    startTimestamp,
    largeImageKey: 'main-cube',
  });
}

updateRPC('0.00');

let currentSession = 'default';

ipcMain.on('addTime', async (_, time: string, delay?: number) => {
  await database.addTime(time, currentSession, delay);
  const times = await database.getTimes(currentSession);
  const best = await database.getBestSinceProgramStart(currentSession);
  updateRPC(best);
  _.reply('sendTimes', JSON.stringify(times));
  console.log('Added time', time, 'to session', currentSession);
});

ipcMain.on('getTimes', async (_) => {
  const times = await database.getTimes(currentSession);
  _.reply('sendTimes', JSON.stringify(times));
  console.log('Sent times for session', currentSession);
});

ipcMain.on('getSessions', async (_) => {
  const sessions = await database.getSessions();
  _.reply('sendSessions', JSON.stringify(sessions));
  console.log('Sent sessions for session', currentSession);
});

ipcMain.on('setSession', async (_, session: string) => {
  currentSession = session;
  console.log('Set session to', session);
});

ipcMain.on('addSession', async (_, session: string) => {
  await database.addSession(session);
  console.log('Added session', session);
});
let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
