const fs = require('fs');

const fname = 'input';
let [ranges, ids] = new TextDecoder()
  .decode(fs.readFileSync(fname))
  .trim().split('\n\n')
  .map(list => list.split('\n'));

ranges = ranges.map(str => str.split('-').map(x => +x))
ids = ids.map(str => +str);

let totalA = 0;
for(const id of ids) {
  if(ranges.some(([a, b]) => id >= a && id <= b))
    totalA++;
}
console.log(totalA);

let fixed = [];
for([a, b] of ranges) {
  let tmp = [];
  for([x, y] of fixed) {
    if(y < a || x > b) {
      tmp.push([x, y]);
      continue;
    }
    if(x < a)
      tmp.push([x, a - 1]);
    if(y > b)
      tmp.push([b + 1, y]);
  }
  tmp.push([a, b]);
  fixed = tmp;
}
const totalB = fixed.map(([x, y]) => y - x + 1).reduce((a, e) => a + e);
console.log(totalB);
