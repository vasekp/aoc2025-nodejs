const fs = require('fs');

const input = new TextDecoder()
  .decode(fs.readFileSync('input'))
  .trim().split('\n')
  .map(line => line.trim().split(',').map(x => +x));

function area_within(minX, minY, maxX, maxY) {
  let area = 0;
  let circum = 0;
  const clamp = ([x, y]) => [Math.min(Math.max(x, minX), maxX), Math.min(Math.max(y, minY), maxY)];
  let [prevX, prevY] = clamp(input[input.length - 1]);
  for(let [x, y] of input) {
    [x, y] = clamp([x, y]);
    if(x < prevX)
      area += (prevX - x) * y;
    else if(x > prevX)
      area -= (x - prevX) * y;
    circum += Math.abs(x - prevX) + Math.abs(y - prevY);
    prevX = x;
    prevY = y;
  }
  return area + circum/2 + 1;
}

let msize = 0;
for(const [x1, y1] of input)
  for(const [x2, y2] of input) {
    const rect = (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);
    const actual = area_within(Math.min(x1, x2), Math.min(y1, y2), Math.max(x1, x2), Math.max(y1, y2));
    if(actual < rect) continue;
    if(rect > msize)
      msize = rect;
  }
console.log(msize);
