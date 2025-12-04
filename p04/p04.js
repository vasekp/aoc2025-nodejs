const fs = require('fs');

const fname = 'input';
const input = new TextDecoder()
  .decode(fs.readFileSync(fname))
  .trim().split('\n')
  .map(line => line.split(''));

const h = input.length;
const w = input[0].length;

const occup = (x, y) => x >= 0 && x < w && y >= 0 && y < h && input[y][x] == '@';

const neighs = (x, y) => {
  let res = 0;
  for(let dx = -1; dx <= 1; dx++)
    for(let dy = -1; dy <= 1; dy++)
      if(dx != 0 || dy != 0)
        res += +occup(x + dx, y + dy);
  return res;
};

let totalA = 0;
for(let y = 0; y < h; y++) {
  for(let x = 0; x < w; x++) {
    totalA += occup(x, y) && neighs(x, y) < 4;
  }
}
console.log(totalA);

let totalB = 0;
let rmv = [];
do {
  rmv = [];
  for(let y = 0; y < h; y++) {
    for(let x = 0; x < w; x++) {
      if(occup(x, y) && neighs(x, y) < 4) {
        totalB++;
        rmv.push([x, y]);
      }
    }
  }
  for([x, y] of rmv) {
    input[y][x] = '.';
  }
} while(rmv.length > 0);
console.log(totalB);
