#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Files to sync from root to public folder
const filesToSync = [
  'index.html',
  'script.js', 
  'style.css'
];

// Directories to sync
const dirsToSync = [
  'public/images',
  'certificates',
  'certificates/Resume',
  'certificates/Resume/AI_Engineer',
  'certificates/Resume/Data_Engineer',
  'certificates/Resume/Data_Scientist'
];

const rootDir = __dirname;
const publicDir = path.join(rootDir, 'public');

console.log('🔄 Syncing files from root to public folder...');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
  console.log('✅ Created public directory');
}

// Sync files
filesToSync.forEach(file => {
  const sourcePath = path.join(rootDir, file);
  const targetPath = path.join(publicDir, file);
  
  if (fs.existsSync(sourcePath)) {
    // Copy file and preserve timestamp
    fs.copyFileSync(sourcePath, targetPath);
    const stats = fs.statSync(sourcePath);
    fs.utimesSync(targetPath, stats.atime, stats.mtime);
    console.log(`✅ Synced: ${file}`);
  } else {
    console.log(`⚠️  Source file not found: ${file}`);
  }
});

// Sync directories (copy contents)
dirsToSync.forEach(dir => {
  let sourcePath, targetPath;
  
  // Handle nested Resume directories
  if (dir.startsWith('certificates/Resume/')) {
    sourcePath = path.join(rootDir, dir);
    targetPath = path.join(rootDir, 'public', dir);
  } else if (dir === 'certificates') {
    sourcePath = path.join(rootDir, dir);
    targetPath = path.join(rootDir, 'public', dir);
  } else {
    sourcePath = path.join(rootDir, path.basename(dir));
    targetPath = path.join(rootDir, dir);
  }
  
  if (fs.existsSync(sourcePath)) {
    // Ensure target directory exists
    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath, { recursive: true });
    }
    
    // Copy directory contents
    const files = fs.readdirSync(sourcePath);
    files.forEach(file => {
      const srcFile = path.join(sourcePath, file);
      const tgtFile = path.join(targetPath, file);
      
      if (fs.statSync(srcFile).isFile()) {
        fs.copyFileSync(srcFile, tgtFile);
        console.log(`✅ Synced: ${dir.replace(rootDir + '/', '')}/${file}`);
      }
    });
  } else {
    console.log(`⚠️  Source directory not found: ${sourcePath}`);
  }
});

console.log('🎉 Sync completed! Files are now ready for deployment.');
