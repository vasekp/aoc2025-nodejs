const fs = require('fs');

const fname = 'input';
const input = new TextDecoder()
  .decode(fs.readFileSync(fname))
  .trim().split('\n')
  .map(line => line.trim().split(''));

let traj = new Map();
traj.set(input.shift().indexOf('S'), 1);
for(line of input) {
  let newTraj = new Map();
  for(let [x, num] of traj) {
    if(line[x] == '^') {
      newTraj.set(x - 1, (newTraj.get(x - 1) ?? 0) + num);
      newTraj.set(x + 1, (newTraj.get(x + 1) ?? 0) + num);
    } else
      newTraj.set(x, (newTraj.get(x) ?? 0) + num);
  }
  traj = newTraj;
}
console.log(traj.values().reduce((a, e) => a + e));
