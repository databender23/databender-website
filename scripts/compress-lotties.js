/**
 * Lottie Compression Script
 * - Reduces decimal precision for smaller file sizes
 * - Uses lottie-compress for image optimization
 * - Minifies JSON output
 */

const fs = require('fs');
const path = require('path');
const LottieCompress = require('lottie-compress').default;

const ANIMATIONS_DIR = path.join(__dirname, '../public/animations');
const DECIMAL_PRECISION = 2; // Reduce from 6+ decimals to 2

/**
 * Recursively reduce decimal precision in animation data
 * This can save 15-30% on vector-heavy animations
 */
function reducePrecision(obj, precision = DECIMAL_PRECISION) {
  if (typeof obj === 'number') {
    // Round to specified decimal places
    const multiplier = Math.pow(10, precision);
    return Math.round(obj * multiplier) / multiplier;
  }
  if (Array.isArray(obj)) {
    return obj.map(item => reducePrecision(item, precision));
  }
  if (typeof obj === 'object' && obj !== null) {
    const result = {};
    for (const key of Object.keys(obj)) {
      result[key] = reducePrecision(obj[key], precision);
    }
    return result;
  }
  return obj;
}

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
      // For vector-only files, reduce precision and minify
      console.log(`  [${filename}] Vector-only - reducing precision...`);
      const optimized = reducePrecision(jsonData);
      const minified = JSON.stringify(optimized);
      const minifiedSize = Buffer.byteLength(minified);

      fs.writeFileSync(jsonPath, minified);
      const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
      console.log(`  [${filename}] ${formatSize(originalSize)} → ${formatSize(minifiedSize)} (${savings}% savings)`);
      return { filename, originalSize, newSize: minifiedSize, compressed: true };
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
