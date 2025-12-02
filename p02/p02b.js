const fs = require('fs');

const fname = 'input';
const input = new TextDecoder()
  .decode(fs.readFileSync(fname))
  .replaceAll('\n', '');

let totalA = 0, totalB = 0;
for(range of input.split(',')) {
  const [first, last] = range.split('-');
  for(let x = +first; x <= +last; x++) {
    if(/^(.*)\1$/.test(x.toString())) {
      totalA += x;
    }
    if(/^(.*)\1+$/.test(x.toString())) {
      totalB += x;
    }
  }
}
console.log(totalA);
console.log(totalB);
