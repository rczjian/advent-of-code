const fs = require("fs");
const dataBuffer = fs.readFileSync("input.txt");
const data = dataBuffer.toString().split(",");
const ranges = data.map((range) => {
  const [first, last] = range.split("-");
  return [Number(first), Number(last)];
});

// part 1
const isInvalid = (num) => {
  const numStr = String(num);
  const len = numStr.length;
  if (len % 2 === 1) return false;
  const front = numStr.slice(0, len / 2);
  const back = numStr.slice(len / 2);
  return front === back;
};
let sumInvalid = 0;
ranges.forEach(([first, last]) => {
  for (let i = first; i <= last; i++) {
    if (isInvalid(i)) sumInvalid += i;
  }
});
console.log(sumInvalid); // sum of invalid IDs = 40398804950

// part 2
const isInvalidV2 = (num) => {
  const numStr = String(num);
  const len = numStr.length;
  const tokens = Array.from({ length: Math.ceil(len / 2) })
    .map((_, i) => i + 1)
    .map((v) => numStr.slice(0, v));

  for (const t of tokens) {
    if (len > 1 && len % t.length === 0) {
      const testStr = t.repeat(len / t.length);
      if (testStr === numStr) return true;
    }
  }
  return false;
};
let sumInvalidV2 = 0;
ranges.forEach(([first, last]) => {
  for (let i = first; i <= last; i++) {
    if (isInvalidV2(i)) sumInvalidV2 += i;
  }
});
console.log(sumInvalidV2); // sum of invalid (v2) IDs = 65794984339
