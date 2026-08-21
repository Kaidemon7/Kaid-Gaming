const { spawn, exec } = require('child_process');
const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = 3000;
const dir = path.dirname(process.execPath || __dirname);
const serverPath = path.join(dir, 'server.js');
const htmlPath = path.join(dir, 'GitHubIndex.html');

console.log('');
console.log('  ============================');
console.log('    Kaid Web Browser Launcher');
console.log('  ============================');
console.log('');

if (!fs.existsSync(serverPath)) {
  console.log('  ERROR: server.js not found in ' + dir);
  console.log('  Put server.js next to this .exe');
  console.log('');
  console.log('  Press any key to exit...');
  process.stdin.resume();
  process.stdin.once('data', () => process.exit(1));
  return;
}

if (!fs.existsSync(htmlPath)) {
  console.log('  ERROR: GitHubIndex.html not found in ' + dir);
  console.log('  Put the HTML file next to this .exe');
  console.log('');
  console.log('  Press any key to exit...');
  process.stdin.resume();
  process.stdin.once('data', () => process.exit(1));
  return;
}

console.log('  Starting proxy server on port ' + PORT + '...');

const server = spawn(process.execPath || 'node', [serverPath], {
  cwd: dir,
  stdio: ['ignore', 'pipe', 'pipe'],
  detached: false
});

server.stdout.on('data', (data) => {
  const msg = data.toString().trim();
  if (msg) console.log('  [server] ' + msg);
});

server.stderr.on('data', (data) => {
  const msg = data.toString().trim();
  if (msg && !msg.includes('EADDRINUSE')) console.log('  [server] ' + msg);
});

server.on('error', (err) => {
  console.log('  Failed to start server: ' + err.message);
  console.log('');
  console.log('  Press any key to exit...');
  process.stdin.resume();
  process.stdin.once('data', () => process.exit(1));
});

server.on('exit', (code) => {
  if (code !== null && code !== 0) {
    console.log('  Server exited with code ' + code);
  }
});

function waitForServer(callback, attempts) {
  attempts = attempts || 0;
  if (attempts > 30) {
    callback(new Error('Server did not start in time'));
    return;
  }
  http.get('http://localhost:' + PORT + '/status', (res) => {
    let data = '';
    res.on('data', (c) => data += c);
    res.on('end', () => {
      try {
        const j = JSON.parse(data);
        if (j.ok) callback(null);
        else callback(new Error('Bad response'));
      } catch(e) { callback(e); }
    });
  }).on('error', () => {
    setTimeout(() => waitForServer(callback, attempts + 1), 300);
  });
}

function findBrowser() {
  const candidates = [
    path.join(process.env['PROGRAMFILES'] || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
    path.join(process.env['PROGRAMFILES(X86)'] || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
    path.join(process.env['LOCALAPPDATA'] || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
    path.join(process.env['PROGRAMFILES'] || '', 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
    path.join(process.env['PROGRAMFILES(X86)'] || '', 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
    path.join(process.env['LOCALAPPDATA'] || '', 'Microsoft', 'Edge', 'Application', 'msedge.exe')
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return null;
}

waitForServer((err) => {
  if (err) {
    console.log('  ERROR: ' + err.message);
    console.log('');
    console.log('  Press any key to exit...');
    process.stdin.resume();
    process.stdin.once('data', () => { server.kill(); process.exit(1); });
    return;
  }

  console.log('  Proxy server is running!');
  console.log('  Opening browser...');

  const browser = findBrowser();
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');

  if (browser) {
    exec('"' + browser + '" --app="' + fileUrl + '" --user-data-dir="' + (process.env['TEMP'] || '.') + '\\KaidBrowser" --disable-extensions --no-first-run --disable-default-apps --disable-popup-blocking', (e) => {
      if (e && e.code !== 0) console.log('  Browser closed');
    });
    console.log('  Browser opened! Keep this window open.');
  } else {
    console.log('  No Chrome/Edge found. Opening default browser...');
    exec('start "" "' + fileUrl + '"');
  }

  console.log('');
  console.log('  ============================');
  console.log('    Server: http://localhost:' + PORT);
  console.log('    Close this window to stop');
  console.log('  ============================');
  console.log('');

  process.on('SIGINT', () => { server.kill(); process.exit(0); });
  process.on('SIGTERM', () => { server.kill(); process.exit(0); });
});

process.on('uncaughtException', () => {});
