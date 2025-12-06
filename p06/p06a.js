const fs = require('fs');

const fname = 'input';
const input = new TextDecoder()
  .decode(fs.readFileSync(fname))
  .trim().split('\n')
  .map(line => line.trim().split(/ +/));

const ops = input.pop();
const nums = input.map(line => line.map(num => +num));

let total = 0;
for(let i = 0; i < ops.length; i++) {
  if(ops[i] == '+')
    total += nums.map(line => line[i]).reduce((a, e) => a + e);
  else
    total += nums.map(line => line[i]).reduce((a, e) => a * e);
}
console.log(total);
