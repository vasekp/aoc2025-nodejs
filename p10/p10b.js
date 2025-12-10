const fs = require('fs');

const input = new TextDecoder()
  .decode(fs.readFileSync('input'))
  .trim().split('\n');

let total = 0;
for(const line of input) {
  const [_, on_off, switches, jolt] = /\[(.*)\] (.*) {(.*)}/.exec(line);
  const jolts = jolt.split(',').map(x => +x);
  const sw = switches.replaceAll('(', '').replaceAll(')', '').split(' ')
    .map(s => s.split(',').map(x => +x));
  const nj = jolts.length;
  const ns = sw.length;
  const mx = jolts.map((_, ix) => sw.map(s => +s.some(x => x == ix)));
  const rhs = jolts;
  for(let n = 0; n < nj && n < ns; n++) {
    let px, py;
    let cx = 0;
    let div = rhs.slice(n).reduce(gcd);
    // Crossing fingers that we find a pivot suitable for an integer-valued particular solution
    a: for(py = n; py < nj; py++)
      for(px = n; px < ns; px++)
        if(mx[py][px] == 0)
          cx++;
        else if(div % mx[py][px] == 0)
          break a;
    if(cx == (nj - n) * (ns - n))
      break;
    if(py == nj) {
      console.error('pivot not found', mx, rhs);
      console.error('div', div, 'n', n, mx[n]);
    }
    if(py > n) {
      [mx[n], mx[py]] = [mx[py], mx[n]];
      [rhs[n], rhs[py]] = [rhs[py], rhs[n]];
    }
    if(px > n) {
      mx.forEach(row => { [row[n], row[px]] = [row[px], row[n]] });
    }
    let p = mx[n][n];
    for(let y = 0; y < nj; y++)
      if(y != n) {
        let m = mx[y][n];
        for(let x = 0; x < ns; x++)
          mx[y][x] = p * mx[y][x] - m * mx[n][x];
        rhs[y] = p * rhs[y] - m * rhs[n];
        let div = mx[y].reduce(gcd, rhs[y]);
        if(div == 0)
          continue;
        for(let x = 0; x < ns; x++)
          mx[y][x] /= div;
        rhs[y] /= div;
      }
  }
  const diag = [];
  for(let n = 0; n < ns && n < nj; n++)
    if(mx[n][n] != 0)
      diag.push(mx[n][n]);
  const mul = diag.reduce(lcm);
  const part = [];
  for(let n = 0; n < ns; n++) {
    if(n >= nj) {
      part.push(0);
    } else if(mx[n][n] == 0) {
      console.assert(rhs[n] == 0);
      part.push(0);
    } else {
      console.assert(rhs[n] % mx[n][n] == 0);
      part.push(rhs[n] / mx[n][n]);
    }
  }
  const homg = [];
  for(let n = diag.length; n < ns; n++) {
    const sol = mx[0].map(x => 0);
    sol[n] = mul;
    for(let m = 0; m < diag.length; m++)
      sol[m] = -mul / mx[m][m] * mx[m][n];
    homg.push(sol);
  }
  let min;
  if(homg.length == 0) {
    min = part.reduce((a, e) => a + e);
  } else {
    for(let sum = 0; ; sum++) {
      let lmin;
      let num_pos = 0;
      const coeff = homg.map(_ => 0);
      coeff[coeff.length - 1] = sum;
      while(true) {
        // Homogeneous solutions are constructed so that they have "mul" in the free elements,
        // but maybe some combination of them can be reduced by division to something smaller.
        const q = part.map((x, ix) => homg.reduce((a, e, ix2) => a + coeff[ix2] * e[ix], mul * x));
        if(q.every(x => x >= 0))
          num_pos += 1;
        if(q.every(x => x % mul == 0 && x >= 0)) {
          const s = q.reduce((a, e) => a + e) / mul;
          lmin = Math.min(lmin ?? s, s);
        }
        let i;
        for(i = 0; i < coeff.length; i++)
          if(coeff[i + 1] > 0) {
            coeff[i + 1]--;
            for(let j = 0; j < i; j++) {
              coeff[i] += coeff[j];
              coeff[j] = 0;
            }
            coeff[i]++;
            break;
          }
        if(i == coeff.length) break;
      }
      // I thought that num_pos would raise and then drop back (in which sum % mul == 0 would suffice),
      // but it tends to have some oscillations. Giving this more wiggle space is a hack that will unnecessarily
      // increase runtime in most cases, but it did the trick and I'm not spending any more time on this.
      if(min !== undefined && num_pos == 0 && sum % (10 * mul) == 0)
        break;
      else if(lmin !== undefined)
        min = Math.min(min ?? lmin, lmin);
    }
  } 
  total += min;
}
console.log(total);

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  if(a < b)
    [a, b] = [b, a];
  while(b != 0)
    [a, b] = [b, a % b];
  return a;
}

function lcm(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  return a * b / gcd(a, b);
}
