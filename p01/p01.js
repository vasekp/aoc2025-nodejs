const fs = require('fs');

const fname = 'input';
const input = new TextDecoder().decode(fs.readFileSync(fname));

let x = 50;
let retA = 0;
let retB = 0;
for(const line of input.trimEnd().split('\n')) {
  const dir = line[0];
  const amt = +line.substring(1);
  const prev = x;
  x += (dir == 'R' ? 1 : -1) * amt;
  /** For part B **/
  if(prev * x < 0) retB++; // click once if we crossed zero
  retB += Math.floor(Math.abs(x) / 100); // click per each _00 (inclusive)
  if(x == 0) retB++; // separately click for *reaching* 0
  /** **/
  x = ((x%100) + 100) % 100;
  if(x == 0) retA++;
}
console.log(retA);
console.log(retB);
