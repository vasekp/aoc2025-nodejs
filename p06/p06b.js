const fs = require('fs');

const fname = 'input';
const input = new TextDecoder()
  .decode(fs.readFileSync(fname))
  .trim().split('\n')
  .map(line => line.split(''));

const w = input[0].length;

let total = 0;
const ops = [];
let op;

function commit() {
  if(op == '+')
    total += ops.reduce((a, e) => a + e);
  else
    total += ops.reduce((a, e) => a * e);
  ops.length = 0;
}


for(let x = 0; x < w; x++) {
  const column = input.map(line => line[x]);
  if(column.every(x => x == ' ')) {
    commit();
    continue;
  }
  const last = column.pop();
  if(last == '+' || last == '*') op = last;
  ops.push(+column.filter(x => x != ' ').join(''));
}
commit();

console.log(total);
