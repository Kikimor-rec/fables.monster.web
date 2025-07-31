import { readdir, stat } from 'fs/promises';
import sharp from 'sharp';
import path from 'path';

const walk = async dir => {
  for (const entry of await readdir(dir)) {
    const p = path.join(dir, entry);
    if ((await stat(p)).isDirectory()) {
      await walk(p);
    } else {
      const ext = path.extname(p).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const out = p.replace(ext, '.webp');
        if (out !== p) {
          await sharp(p)
            .resize({ width: 1600, withoutEnlargement: true })
            .webp({ quality: 80 })
            .toFile(out);
        }
      }
    }
  }
};

await walk('public');
