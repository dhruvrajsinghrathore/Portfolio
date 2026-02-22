#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Files to watch for changes
const filesToWatch = [
  'index.html',
  'script.js',
  'style.css'
];

// Directories to watch
const dirsToWatch = [
  'public/images',
  'certificates'
];

const rootDir = __dirname;
const publicDir = path.join(rootDir, 'public');

console.log('👀 Starting file watcher for automatic sync...');
console.log('📁 Watching files:', filesToWatch.join(', '));
console.log('🔄 Press Ctrl+C to stop watching');

// Sync function (same as sync-files.js)
function syncFiles() {
  const filesToSync = [
    'index.html',
    'script.js', 
    'style.css'
  ];

  const dirsToSync = [
    'public/images',
    'certificates'
  ];

  filesToSync.forEach(file => {
    const sourcePath = path.join(rootDir, file);
    const targetPath = path.join(publicDir, file);
    
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, targetPath);
      const stats = fs.statSync(sourcePath);
      fs.utimesSync(targetPath, stats.atime, stats.mtime);
      console.log(`✅ Synced: ${file}`);
    }
  });

  dirsToSync.forEach(dir => {
    const sourcePath = path.join(rootDir, path.basename(dir));
    const targetPath = path.join(rootDir, dir);
    
    if (fs.existsSync(sourcePath)) {
      if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
      }
      
      const files = fs.readdirSync(sourcePath);
      files.forEach(file => {
        const srcFile = path.join(sourcePath, file);
        const tgtFile = path.join(targetPath, file);
        
        if (fs.statSync(srcFile).isFile()) {
          fs.copyFileSync(srcFile, tgtFile);
        }
      });
    }
  });
}

// Watch for file changes
filesToWatch.forEach(file => {
  const filePath = path.join(rootDir, file);
  if (fs.existsSync(filePath)) {
    fs.watchFile(filePath, (curr, prev) => {
      if (curr.mtime !== prev.mtime) {
        console.log(`📝 Change detected in ${file}`);
        syncFiles();
      }
    });
  }
});

// Watch directories
dirsToWatch.forEach(dir => {
  const sourcePath = path.join(rootDir, path.basename(dir));
  if (fs.existsSync(sourcePath)) {
    fs.watch(sourcePath, { recursive: true }, (eventType, filename) => {
      if (filename) {
        console.log(`📁 Change detected in ${path.basename(dir)}/${filename}`);
        syncFiles();
      }
    });
  }
});

// Initial sync
syncFiles();
console.log('🎉 Watcher is active! Files will sync automatically on changes.');
