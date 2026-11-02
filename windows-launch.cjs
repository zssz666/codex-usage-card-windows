'use strict';
const path = require('node:path');

function resolveLaunchAlias({localAppData, exists}) {
  if (typeof localAppData !== 'string' || !path.win32.isAbsolute(localAppData)) {
    throw new Error('LOCALAPPDATA must be an absolute Windows directory');
  }
  const executable = path.win32.join(localAppData, 'Microsoft', 'WindowsApps', 'chatgpt-desktop.exe');
  if (!exists(executable)) {
    throw new Error(`Codex application execution alias is missing: ${executable}`);
  }
  return executable;
}

function launchError(error) {
  return new Error(`Codex alias launch failed: ${error.message}`, {cause: error});
}

function launchStoreApp({executable, args, spawn}) {
  return new Promise((resolve, reject) => {
    let child;
    try {
      child = spawn(executable, args, {detached: true, stdio: 'ignore', windowsHide: false});
    } catch (error) {
      reject(launchError(error));
      return;
    }
    child.once('error', error => reject(launchError(error)));
    child.once('spawn', () => {
      child.unref();
      resolve({pid: child.pid});
    });
  });
}

module.exports = {resolveLaunchAlias, launchStoreApp};
