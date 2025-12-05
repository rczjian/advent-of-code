const fs = require("fs");
const dataBuffer = fs.readFileSync("input.txt");
const data = dataBuffer.toString().split(/\s+/);

const freshRanges = data
  .filter((v) => v.includes("-"))
  .map((r) => r.split("-").map(Number));
const ingredients = data.filter((v) => !!v && !v.includes("-")).map(Number);
// part 1
let freshCount = 0;
ingredients.forEach((i) => {
  for (const range of freshRanges) {
    if (i >= range[0] && i <= range[1]) {
      freshCount++;
      break;
    }
  }
});
console.log(freshCount); // no of fresh ingredients = 505

// part 2
// Set implementation does not work - RangeError: Set maximum size exceeded
const sorted = freshRanges.toSorted((range1, range2) => range1[0] - range2[0]);
const merged = [];
for (const range of sorted) {
  if (merged.length === 0) {
    merged.push(range);
  }
  const latestRange = merged.at(-1);
  if (latestRange[1] >= range[0]) {
    if (range[1] > latestRange[1]) latestRange[1] = range[1];
  } else merged.push(range);
}
let count = 0;
merged.forEach((range) => {
  count += range[1] - range[0] + 1;
});
console.log(count); // unique fresh id count = 344423158480189
