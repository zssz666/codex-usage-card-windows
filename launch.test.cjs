'use strict';
const assert = require('node:assert/strict');
const {test} = require('node:test');
const {EventEmitter} = require('node:events');
const launcher = require('./windows.cjs');
const LOCAL_APP_DATA = 'C:\\Users\\Test User\\AppData\\Local';
const EXPECTED_ALIAS = 'C:\\Users\\Test User\\AppData\\Local\\Microsoft\\WindowsApps\\chatgpt-desktop.exe';
const DEBUG_ARGS = ['--remote-debugging-address=127.0.0.1', '--remote-debugging-port=39222'];

test('Store launch resolves the registered alias outside the protected package directory', () => {
  const executable = launcher.resolveLaunchAlias({
    localAppData: LOCAL_APP_DATA,
    exists: file => file === EXPECTED_ALIAS
  });
  assert.equal(executable, EXPECTED_ALIAS);
});

test('a missing execution alias produces an explicit error', () => {
  assert.throws(() => launcher.resolveLaunchAlias({
    localAppData: LOCAL_APP_DATA, exists: () => false
  }), /Codex application execution alias is missing/);
});

test('an unavailable local application directory produces an explicit error', () => {
  assert.throws(() => launcher.resolveLaunchAlias({
    localAppData: undefined, exists: () => true
  }), /LOCALAPPDATA/);
});

test('Store activation preserves debug arguments and waits for process creation', async () => {
  const calls = [];
  const child = new EventEmitter();
  child.pid = 123;
  child.unref = () => {};
  const result = await launcher.launchStoreApp({
    executable: EXPECTED_ALIAS,
    args: DEBUG_ARGS,
    spawn: (...args) => {
      calls.push(args);
      process.nextTick(() => child.emit('spawn'));
      return child;
    }
  });
  assert.equal(result.pid, 123);
  assert.equal(calls.length, 1);
  assert.equal(calls[0][0], EXPECTED_ALIAS);
  assert.deepEqual(calls[0][1], DEBUG_ARGS);
  assert.equal(calls[0][2].detached, true);
});

test('an asynchronous access denial is surfaced with the original error', async () => {
  const child = new EventEmitter();
  const original = Object.assign(new Error('spawn EPERM'), {code: 'EPERM'});
  await assert.rejects(launcher.launchStoreApp({
    executable: EXPECTED_ALIAS, args: DEBUG_ARGS,
    spawn: () => {
      process.nextTick(() => child.emit('error', original));
      return child;
    }
  }), error => error.cause === original && /Codex alias launch failed/.test(error.message));
});

test('a synchronous access denial is surfaced with the original error', async () => {
  const original = Object.assign(new Error('spawn EPERM'), {code: 'EPERM'});
  await assert.rejects(launcher.launchStoreApp({
    executable: EXPECTED_ALIAS, args: DEBUG_ARGS,
    spawn: () => { throw original; }
  }), error => error.cause === original && /Codex alias launch failed/.test(error.message));
});
