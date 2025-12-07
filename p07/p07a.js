const fs = require('fs');

const fname = 'input';
const input = new TextDecoder()
  .decode(fs.readFileSync(fname))
  .trim().split('\n')
  .map(line => line.trim().split(''));

let pos = new Set([input.shift().indexOf('S')]);
let splits = 0;
for(line of input) {
  let newPos = new Set();
  for(x of pos) {
    if(line[x] == '^') {
      splits++;
      newPos.add(x - 1);
      newPos.add(x + 1);
    } else
      newPos.add(x);
  }
  pos = newPos;
}
console.log(splits);
