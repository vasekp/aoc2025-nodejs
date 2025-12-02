const fs = require('fs');

const fname = 'input';
const input = new TextDecoder()
  .decode(fs.readFileSync(fname))
  .replaceAll('\n', '');

let total = 0;
for(range of input.split(',')) {
  const [first, last] = range.split('-');
  const firstLen = first.length;
  const lastLen = last.length;
  const firstRpt = firstLen % 2 == 0
    ? +first.substring(0, firstLen / 2).repeat(2)
    : null;
  const lastRpt = lastLen % 2 == 0
    ? +last.substring(0, lastLen / 2).repeat(2)
    : null;
  if(firstLen == lastLen) {
    if(firstLen % 2 == 0) {
      console.assert(firstRpt !== null && lastRpt !== null);
      const q = +('1' + '0'.repeat(firstLen / 2 - 1) + '1');
      const cnt = (lastRpt - firstRpt) / q + 1;
      total += (lastRpt + firstRpt) / 2 * cnt;
      if(lastRpt > last) total -= lastRpt;
      if(firstRpt < first) total -= firstRpt;
    }
  } else {
    console.assert(lastLen - firstLen == 1);
    if(firstLen % 2 == 0) {
      const lastFL = +('9'.repeat(firstLen));
      const q = +('1' + '0'.repeat(firstLen / 2 - 1) + '1');
      let cnt = (lastFL - firstRpt) / q + 1;
      total += (lastFL + firstRpt) / 2 * cnt;
      if(firstRpt < first) total -= firstRpt;
    }
    if(lastLen % 2 == 0) {
      const firstLL = +('1' + '0'.repeat(lastLen / 2 - 1)).repeat(2);
      const q = +('1' + '0'.repeat(lastLen / 2 - 1) + '1');
      let cnt = (lastRpt - firstLL) / q + 1;
      total += (lastRpt + firstLL) / 2 * cnt;
      if(lastRpt > last) total -= lastRpt;
    }
  }
}
console.log(total);
