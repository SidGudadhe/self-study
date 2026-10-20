const { spawn } = require('child_process');
const path = require('path');

let startCount = 0;

function runServer() {
  startCount++;
  console.log(`[Supervisor] Starting CogniStudy server (Run #${startCount}) on http://0.0.0.0:3000...`);

  const nextBin = path.join(__dirname, 'node_modules', 'next', 'dist', 'bin', 'next');
  const child = spawn(process.execPath, [nextBin, 'start', '-p', '3000', '-H', '0.0.0.0'], {
    cwd: __dirname,
    stdio: 'inherit',
    env: { ...process.env, PORT: '3000', HOSTNAME: '0.0.0.0' },
  });

  child.on('error', (err) => {
    console.error('[Supervisor] Failed to spawn Next.js process:', err);
  });

  child.on('exit', (code, signal) => {
    console.warn(`[Supervisor] Next.js process exited (code=${code}, signal=${signal}). Restarting in 1.5s...`);
    setTimeout(runServer, 1500);
  });
}

process.on('SIGINT', () => {
  console.log('[Supervisor] Shutting down...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('[Supervisor] Terminating...');
  process.exit(0);
});

runServer();
