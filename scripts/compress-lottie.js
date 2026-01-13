const fs = require('fs');
const path = require('path');

const dir = process.argv[2] || './public/animations';

// Reduce number precision to 2 decimal places
function reducePrecision(obj) {
  if (typeof obj === 'number') {
    return Math.round(obj * 100) / 100;
  }
  if (Array.isArray(obj)) {
    return obj.map(reducePrecision);
  }
  if (obj && typeof obj === 'object') {
    const result = {};
    for (const key of Object.keys(obj)) {
      result[key] = reducePrecision(obj[key]);
    }
    return result;
  }
  return obj;
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const sizeBefore = Buffer.byteLength(content);
  totalBefore += sizeBefore;

  try {
    const json = JSON.parse(content);
    const compressed = reducePrecision(json);
    const minified = JSON.stringify(compressed);
    const sizeAfter = Buffer.byteLength(minified);
    totalAfter += sizeAfter;

    fs.writeFileSync(filePath, minified);
    const reduction = ((sizeBefore - sizeAfter) / sizeBefore * 100).toFixed(1);
    console.log(`${file}: ${(sizeBefore/1024).toFixed(0)}KB -> ${(sizeAfter/1024).toFixed(0)}KB (-${reduction}%)`);
  } catch (e) {
    console.error(`Error processing ${file}: ${e.message}`);
  }
}

console.log(`\nTotal: ${(totalBefore/1024).toFixed(0)}KB -> ${(totalAfter/1024).toFixed(0)}KB (-${((totalBefore-totalAfter)/totalBefore*100).toFixed(1)}%)`);
