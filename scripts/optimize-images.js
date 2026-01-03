const imagemin = require('imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const webp = require('imagemin-webp');
const glob = require('glob');
const path = require('path');
const fs = require('fs').promises;

(async () => {
  try {
    const files = glob.sync('assets/images/*.{jpg,jpeg,png}', { nocase: true });
    if (!files.length) {
      console.log('No images found in assets/images/. Add PNG/JPG files and run the optimizer.');
      return;
    }

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      const basename = path.basename(file, ext);
      console.log('Optimizing', file);

      // Optimize JPG/PNG and overwrite original
      const optimized = await imagemin([file], {
        plugins: [
          mozjpeg({quality: 80}),
          pngquant({quality: [0.7, 0.85]})
        ]
      });

      if (optimized && optimized[0] && optimized[0].data) {
        await fs.writeFile(file, optimized[0].data);
        console.log('Wrote optimized:', file);
      }

      // Create WebP version next to original
      const webpBuffer = await imagemin([file], {
        plugins: [
          webp({quality: 75})
        ]
      });

      if (webpBuffer && webpBuffer[0] && webpBuffer[0].data) {
        const webpPath = path.join(path.dirname(file), basename + '.webp');
        await fs.writeFile(webpPath, webpBuffer[0].data);
        console.log('Wrote WebP:', webpPath);
      }
    }

    console.log('Image optimization complete.');
  } catch (err) {
    console.error('Image optimization failed:', err);
    process.exit(1);
  }
})();
