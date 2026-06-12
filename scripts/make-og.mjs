// Regenerate the social share card: node scripts/make-og.mjs
import sharp from 'sharp';

await sharp('scripts/og.svg', { density: 96 })
  .resize(1200, 630)
  .png()
  .toFile('public/og.png');

console.log('Wrote public/og.png');
