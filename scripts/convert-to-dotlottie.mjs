import { DotLottie } from '@dotlottie/dotlottie-js';
import fs from 'fs';
import path from 'path';

const dir = process.argv[2] || './public/animations';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

let totalJsonSize = 0;
let totalLottieSize = 0;

async function convertFile(file) {
  const filePath = path.join(dir, file);
  const outputPath = path.join(dir, file.replace('.json', '.lottie'));

  const jsonContent = fs.readFileSync(filePath, 'utf8');
  const jsonSize = Buffer.byteLength(jsonContent);
  totalJsonSize += jsonSize;

  try {
    const animationData = JSON.parse(jsonContent);

    const dotLottie = new DotLottie();
    await dotLottie.addAnimation({
      id: path.basename(file, '.json'),
      data: animationData,
    });

    const built = await dotLottie.build();
    const buffer = await built.toArrayBuffer();
    fs.writeFileSync(outputPath, Buffer.from(buffer));

    const lottieSize = buffer.byteLength;
    totalLottieSize += lottieSize;

    const reduction = ((jsonSize - lottieSize) / jsonSize * 100).toFixed(1);
    console.log(`${file}: ${(jsonSize/1024).toFixed(0)}KB -> ${(lottieSize/1024).toFixed(0)}KB (-${reduction}%)`);
  } catch (e) {
    console.error(`Error converting ${file}: ${e.message}`);
  }
}

async function main() {
  for (const file of files) {
    await convertFile(file);
  }

  const totalReduction = ((totalJsonSize - totalLottieSize) / totalJsonSize * 100).toFixed(1);
  console.log(`\nTotal: ${(totalJsonSize/1024).toFixed(0)}KB -> ${(totalLottieSize/1024).toFixed(0)}KB (-${totalReduction}%)`);
}

main();
