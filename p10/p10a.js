const fs = require('fs');

const input = new TextDecoder()
  .decode(fs.readFileSync('input'))
  .trim().split('\n');

let total = 0;
for(const line of input) {
  const [_, conf, switches, jolt] = /\[(.*)\] (.*) {(.*)}/.exec(line);
  const num = parseInt(conf.replaceAll('.', '0').replaceAll('#',1).split('').reverse().join(''), 2);;
  const sw = switches.replaceAll('(', '').replaceAll(')', '').split(' ')
    .map(s => s.split(',')
      .map(x => 1 << (+x))
      .reduce((a, e) => a + e))
  const max = 1 << sw.length;
  let minC = null;
  for(let i = 0; i < max; i++) {
    let q = 0;
    let c = 0;
    for(let j = 0; j < sw.length; j++)
      if((i & (1 << j)) != 0 ) {
        q ^= sw[j];
        c += 1;
      }
    if(q == num)
      minC = Math.min(minC ?? c, c);
  }
  total += minC;
}
console.log(total);
