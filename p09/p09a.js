const fs = require('fs');

const input = new TextDecoder()
  .decode(fs.readFileSync('input'))
  .trim().split('\n')
  .map(line => line.trim().split(',').map(x => +x));

let msize = 0;
for(const [x1, y1] of input)
  for(const [x2, y2] of input) {
    const size = (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);
    if(size > msize)
      msize = size;
  }
console.log(msize);
