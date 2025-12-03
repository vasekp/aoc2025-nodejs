const fs = require('fs');

const fname = 'test';
const input = new TextDecoder()
  .decode(fs.readFileSync(fname));

let totalA = 0;
for(line of input.trim().split('\n')) {
  const [max1, ix1] = [...line.substring(0, line.length - 1)]
    .reduce((acc, curr, ix) => +curr > acc[0] ? [+curr, ix] : acc, [0, -1]);
  const max2 = [...line.substring(ix1 + 1)]
    .reduce((acc, curr) => Math.max(acc, +curr), 0);
  totalA += max1 * 10 + max2
}
console.log(totalA);

let totalB = 0;
const count = 12;
for(line of input.trim().split('\n')) {
  let prevIx = -1;
  let x = 0;
  for(let dig = 0; dig < count; dig++) {
    const [max, ix] = [...line.substring(prevIx + 1, line.length - (count - dig - 1))]
      .reduce((acc, curr, ix) => +curr > acc[0] ? [+curr, ix] : acc, [0, prevIx]);
    x = x * 10 + max;
    prevIx = ix + prevIx + 1;
  }
  totalB += x;
}
console.log(totalB);
