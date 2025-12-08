const fs = require('fs');

const fname = 'input';

const input = new TextDecoder()
  .decode(fs.readFileSync(fname))
  .trim().split('\n')
  .map(line => line.trim().split(',').map(x => +x));

const dists = [];
for(let x = 0; x < input.length; x++) {
  for(let y = 0; y < x; y++) {
    const diff = [];
    for(let i = 0; i < 3; i++)
      diff.push(input[x][i] - input[y][i]);
    dists.push([x, y, Math.hypot(...diff)]);
  }
}
dists.sort((x, y) => x[2] - y[2]);

const map = new Map();
const heads = [...input.keys()];
for([x, y, _] of dists) {
  let px = +x, py = +y;
  while(true) {
    const p = map.get(px) ?? px;
    if(p == px) break;
    else px = p;
  }
  while(true) {
    const p = map.get(py) ?? py;
    if(p == py) break;
    else py = p;
  }
  const index = heads.indexOf(px);
  if(index != -1 && px != py) {
    heads.splice(index, 1);
  }
  map.set(px, py);
  if(heads.length == 1) {
    console.log(input[x][0] * input[y][0]);
    break;
  }
}
