/**
 * Lottie Compression Script
 * Uses lottie-compress to optimize JSON files, then converts to .lottie format
 */

const fs = require('fs');
const path = require('path');
const LottieCompress = require('lottie-compress').default;

const ANIMATIONS_DIR = path.join(__dirname, '../public/animations');

async function compressLottie(jsonPath) {
  const filename = path.basename(jsonPath);

  try {
    // Read the JSON file
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const originalSize = fs.statSync(jsonPath).size;

    // Check if it has embedded images (assets with "p" property containing base64)
    const hasImages = jsonData.assets?.some(asset =>
      asset.p && (asset.p.startsWith('data:') || asset.e === 1)
    );

    if (hasImages) {
      console.log(`  [${filename}] Has embedded images - compressing...`);

      // Compress with lottie-compress
      const compressor = new LottieCompress(jsonData, {
        quality: [0.6, 0.8],
        traceformInto: 'pngMixWebp'
      });

      const compressed = await compressor.execute();

      // Write compressed JSON
      const compressedJson = JSON.stringify(compressed);
      fs.writeFileSync(jsonPath, compressedJson);

      const newSize = Buffer.byteLength(compressedJson);
      const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
      console.log(`  [${filename}] ${formatSize(originalSize)} → ${formatSize(newSize)} (${savings}% savings)`);

      return { filename, originalSize, newSize, compressed: true };
    } else {
      // For vector-only files, just minify the JSON
      const minified = JSON.stringify(jsonData);
      const minifiedSize = Buffer.byteLength(minified);

      if (minifiedSize < originalSize) {
        fs.writeFileSync(jsonPath, minified);
        const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
        console.log(`  [${filename}] Minified: ${formatSize(originalSize)} → ${formatSize(minifiedSize)} (${savings}% savings)`);
        return { filename, originalSize, newSize: minifiedSize, compressed: true };
      } else {
        console.log(`  [${filename}] Already optimized (${formatSize(originalSize)})`);
        return { filename, originalSize, newSize: originalSize, compressed: false };
      }
    }
  } catch (error) {
    console.error(`  [${filename}] Error: ${error.message}`);
    return { filename, error: error.message };
  }
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + 'B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + 'KB';
  return (bytes / (1024 * 1024)).toFixed(1) + 'MB';
}

async function main() {
  console.log('Lottie Compression Script\n');
  console.log('Scanning:', ANIMATIONS_DIR);

  // Get all JSON files
  const jsonFiles = fs.readdirSync(ANIMATIONS_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => path.join(ANIMATIONS_DIR, f));

  console.log(`Found ${jsonFiles.length} JSON files\n`);

  let totalOriginal = 0;
  let totalNew = 0;

  for (const jsonPath of jsonFiles) {
    const result = await compressLottie(jsonPath);
    if (result.originalSize) {
      totalOriginal += result.originalSize;
      totalNew += result.newSize || result.originalSize;
    }
  }

  console.log('\n--- Summary ---');
  console.log(`Total original: ${formatSize(totalOriginal)}`);
  console.log(`Total new: ${formatSize(totalNew)}`);
  console.log(`Total savings: ${((totalOriginal - totalNew) / totalOriginal * 100).toFixed(1)}%`);
}

main().catch(console.error);
