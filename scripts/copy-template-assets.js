const fs = require('fs').promises;
const path = require('path');

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else if (entry.isFile()) {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function main() {
  const siteRoot = path.resolve(__dirname, '..');
  const templateRoot = path.resolve(siteRoot, '..', 'template');
  const publicDir = path.join(siteRoot, 'public');

  try {
    const assetsSrc = path.join(templateRoot, 'assets');
    const vendorSrc = path.join(templateRoot, 'vendor');

    // Copy assets and vendor if they exist
    await copyDir(assetsSrc, path.join(publicDir, 'assets'))
      .catch(err => { console.warn('No assets to copy or copy error:', err.message); });
    await copyDir(vendorSrc, path.join(publicDir, 'vendor'))
      .catch(err => { console.warn('No vendor to copy or copy error:', err.message); });

    console.log('Template assets (assets/, vendor/) copied into public/');
  } catch (err) {
    console.error('Failed copying template assets:', err);
    process.exit(1);
  }
}

main();
