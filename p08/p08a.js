const fs = require('fs');

const fname = 'input';
const time = 1000;

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
for(let t = 0; t < time; t++) {
  let [x, y, _] = dists[t];
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
  map.set(px, py);
}

const sizeMap = new Map();
for(let x in input) {
  let px = +x;
  while(true) {
    const p = map.get(px) ?? px;
    if(p == px) break;
    else px = p;
  }
  sizeMap.set(px, (sizeMap.get(px) ?? 0) + 1);
}

let sizes = [...sizeMap.values()];
sizes.sort((x, y) => y - x);
sizes.length = 3;
console.log(sizes.reduce((x, y) => x * y));
