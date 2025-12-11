const fs = require('fs');

const input = new TextDecoder()
  .decode(fs.readFileSync('input'))
  .trim().split('\n');

const map = new Map();
for(line of input) {
  const list = line.split(' ');
  const start = list.shift().substring(0, 3);
  map.set(start, list);
}

function paths(start, end) {
  let counts = new Map();
  counts.set(start, 1);
  let result = 0;
  while(counts.values().reduce((a, e) => a + e, 0) > 0) {
    const ncounts = new Map();
    for(const [key, val] of counts) {
      const q = counts.get(key);
      for(out of map.get(key) ?? []) {
        ncounts.set(out, (ncounts.get(out) ?? 0) + q);
      }
    }
    counts = ncounts;
    result += counts.get(end) ?? 0;
    counts.set(end, 0);
  }
  return result;
}

console.log(paths('you', 'out'));
console.log(
  paths('svr', 'dac') * paths('dac', 'fft') * paths('fft', 'out')
  + paths('svr', 'fft') * paths('fft', 'dac') * paths('dac', 'out'));
