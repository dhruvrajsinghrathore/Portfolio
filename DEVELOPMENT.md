# 🚀 Development & Deployment Guide

## 📁 Project Structure

This project uses a hybrid architecture with automatic file synchronization:

```
personal_portfolio_boltai/
├── index.html          # Main portfolio file (edit here)
├── script.js           # JavaScript functionality (edit here)  
├── style.css           # Styling (edit here)
├── public/             # Deployment folder (auto-synced)
│   ├── index.html      # Copy of main file
│   ├── script.js       # Copy of script file
│   ├── style.css       # Copy of style file
│   └── images/         # Images folder
├── src/                # React app wrapper
├── dist/               # Build output (auto-generated)
└── sync-files.js       # Sync script
```

## 🛠️ Available Scripts

### Development
```bash
npm run dev           # Start development server
npm run sync          # Manual sync files from root to public
npm run sync:watch    # Auto-sync files on changes (run in separate terminal)
```

### Building & Deployment
```bash
npm run build         # Sync files and build for production
npm run preview       # Preview production build
```

### Utilities
```bash
npm run lint          # Run ESLint
```

## 🔄 How File Syncing Works

**Automatic Syncing:**
- When you run `npm run build`, files are automatically synced before building
- The `prebuild` script ensures your changes are always included in deployments

**Manual Syncing:**
- Run `npm run sync` to manually sync files from root to public folder
- Use `npm run sync:watch` for real-time syncing during development

**What gets synced:**
- `index.html` → `public/index.html`
- `script.js` → `public/script.js`
- `style.css` → `public/style.css`
- `certificates/` → `public/certificates/`

## 📦 Deployment Process

1. **Make changes** to files in root directory (`index.html`, `script.js`, `style.css`)
2. **Run build command**: `npm run build`
3. **Deploy** the `dist/` folder to GitHub Pages or your hosting platform

The build process automatically:
- Syncs your files to the public folder
- Builds the React app
- Creates production-ready files in `dist/`

## 🎯 Best Practices

### For Development:
1. Edit files in the root directory only
2. Use `npm run sync:watch` for automatic syncing
3. Test changes with `npm run dev`

### Before Deployment:
1. Run `npm run build` to sync and build
2. Test locally with `npm run preview`
3. Deploy the `dist/` folder

### File Management:
- **Never edit files in `public/` or `dist/` directly**
- **Always edit the root files** - they will sync automatically
- The sync script preserves file timestamps and handles directory structures

## 🔧 Troubleshooting

### Changes not visible after deployment?
- Run `npm run sync` to manually sync files
- Check that you're editing root files, not files in `public/`

### Build errors?
- Ensure all files exist in root directory
- Run `npm run sync` before building

### Sync issues?
- Check file permissions
- Ensure `sync-files.js` has execute permissions
- Verify source files exist in root directory

## 🌐 GitHub Pages Deployment

The build process creates a `dist/` folder that's ready for GitHub Pages deployment. The folder contains:
- Built React app
- Synced portfolio files
- All assets and certificates

Simply deploy the contents of `dist/` to your GitHub Pages branch for live updates.
