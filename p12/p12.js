const fs = require('fs');

const input = new TextDecoder()
  .decode(fs.readFileSync('input'))
  .trim().split('\n\n');

const prob = input.pop()
  .split('\n')
  .map(line => {
    const [size, counts] = line.split(': ');
    return {
      size: size.split('x').map(x => +x),
      counts: counts.split(' ').map(x => +x)
    };
  });

const tiles = input.map(tile => {
  return tile.split('\n')
    .slice(1)
    .map(line => line.split('').map(x => ({'.': 0, '#': 1})[x]));
});

const sizes = tiles.map(tile => tile.map(row => row.reduce((a, e) => a + e)).reduce((a, e) => a + e));

let total = 0;
for(const p of prob) {
  const ts = p.counts.map((c, ix) => c * sizes[ix]).reduce((a, e) => a + e);
  const cnt = p.counts.reduce((a, e) => a + e);
  const area = p.size[0] * p.size[1];
  const subArea = Math.floor(p.size[0] / 3) * Math.floor(p.size[1] / 3);
  if(ts > area)
    total += 0;
  else if(cnt <= subArea)
    total += 1;
  else
    console.log(ts, area, ub);
}
console.log(total);
