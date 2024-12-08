const fs = require("fs");
const dataBuffer = fs.readFileSync("input.txt");
const data = dataBuffer.toString().split("\n\n");
const rules = data[0].split("\n");
const updates = data[1]
  .split("\n")
  .map((v) => v.split(",").map((v) => Number(v)));

// part 1
const before = {}; // pages that must come before key
const after = {}; // pages that must come after key
rules.forEach((v) => {
  const [num1, num2] = v.split("|").map((v) => Number(v));
  if (!after[num1]) {
    after[num1] = [num2];
  } else {
    after[num1].push(num2);
  }
  if (!before[num2]) {
    before[num2] = [num1];
  } else {
    before[num2].push(num1);
  }
});

let sumValidMid = 0;
const invalids = [];
updates.forEach((update) => {
  let valid = true;
  update.forEach((page, i) => {
    for (let j = 0; j < i; j++) {
      if (after[page]?.includes(update[j])) valid = false;
    }
    for (let j = i + 1; j < update.length - 1; j++) {
      if (before[page]?.includes(update[j])) valid = false;
    }
  });
  if (valid) {
    const mid = update[(update.length - 1) / 2];
    sumValidMid += mid;
  } else {
    invalids.push(update);
  }
});
console.log(sumValidMid); // sum of middle page number of valid updates = 4814

// part 2
let sumInvalidMid = 0;
invalids.forEach((update) => {
  update.sort((a, b) => (after[a].includes(b) ? -1 : 1));
  const mid = update[(update.length - 1) / 2];
  sumInvalidMid += mid;
});
console.log(sumInvalidMid); // sum of middle page number of sorted invalid updates = 5448
