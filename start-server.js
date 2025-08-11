#!/usr/bin/env node

// Simple startup script for RunToSip server
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting RunToSip Server...\n');

// Check if server.js exists
import { promises as fs } from 'fs';
const serverPath = join(__dirname, 'server.js');

try {
  await fs.access(serverPath);
} catch (error) {
  console.error('❌ server.js not found!');
  console.log('Please make sure you are in the correct directory.');
  process.exit(1);
}

// Start the server
const server = spawn('node', ['server.js'], {
  stdio: 'inherit',
  cwd: __dirname
});

server.on('error', (error) => {
  console.error('❌ Failed to start server:', error.message);
  process.exit(1);
});

server.on('exit', (code) => {
  if (code !== 0) {
    console.error(`❌ Server exited with code ${code}`);
  } else {
    console.log('✅ Server stopped gracefully');
  }
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping server...');
  server.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Stopping server...');
  server.kill('SIGTERM');
});

console.log('📡 Server starting on port 3001...');
console.log('🌐 API available at: http://localhost:3001/api');
console.log('📱 Website available at: http://localhost:3001');
console.log('🔐 Admin password: kawasaki1822');
console.log('\nPress Ctrl+C to stop the server\n'); 