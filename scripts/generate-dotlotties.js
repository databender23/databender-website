/**
 * Generate .lottie files from JSON
 * Uses @dotlottie/dotlottie-js to convert JSON to .lottie format
 */

const fs = require('fs');
const path = require('path');

const ANIMATIONS_DIR = path.join(__dirname, '../public/animations');

async function generateDotLottie(jsonPath) {
  const filename = path.basename(jsonPath, '.json');
  const lottiePath = path.join(ANIMATIONS_DIR, `${filename}.lottie`);

  try {
    // Dynamic import for ESM module
    const { DotLottie } = await import('@dotlottie/dotlottie-js');

    // Read the JSON file
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

    // Create DotLottie instance
    const dotLottie = new DotLottie();

    // Add the animation
    await dotLottie.addAnimation({
      id: filename,
      data: jsonData
    });

    // Build and get the buffer
    const buffer = await dotLottie.toArrayBuffer();

    // Write to file
    fs.writeFileSync(lottiePath, Buffer.from(buffer));

    const jsonSize = fs.statSync(jsonPath).size;
    const lottieSize = fs.statSync(lottiePath).size;
    const ratio = ((lottieSize / jsonSize) * 100).toFixed(1);

    console.log(`  ${filename}: JSON ${formatSize(jsonSize)} → .lottie ${formatSize(lottieSize)} (${ratio}% of original)`);

    return { filename, jsonSize, lottieSize };
  } catch (error) {
    console.error(`  ${filename}: Error - ${error.message}`);
    return { filename, error: error.message };
  }
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + 'B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + 'KB';
  return (bytes / (1024 * 1024)).toFixed(1) + 'MB';
}

async function main() {
  console.log('Generating .lottie files from JSON\n');

  // Get all JSON files
  const jsonFiles = fs.readdirSync(ANIMATIONS_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => path.join(ANIMATIONS_DIR, f));

  console.log(`Processing ${jsonFiles.length} files...\n`);

  let totalJson = 0;
  let totalLottie = 0;

  for (const jsonPath of jsonFiles) {
    const result = await generateDotLottie(jsonPath);
    if (result.jsonSize) {
      totalJson += result.jsonSize;
      totalLottie += result.lottieSize;
    }
  }

  console.log('\n--- Summary ---');
  console.log(`Total JSON: ${formatSize(totalJson)}`);
  console.log(`Total .lottie: ${formatSize(totalLottie)}`);
  console.log(`Compression: ${((1 - totalLottie / totalJson) * 100).toFixed(1)}% smaller`);
}

main().catch(console.error);
