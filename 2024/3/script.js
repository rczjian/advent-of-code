const fs = require("fs");
const dataBuffer = fs.readFileSync("input.txt");
const data = dataBuffer.toString();

// part 1
const re = /mul\(\d{1,3},\d{1,3}\)/g;
const exprList = data.match(re);
let sum = 0;
exprList.forEach((v) => {
  const commaSeparatedNumbers = v.slice(4, -1);
  const [num1, num2] = commaSeparatedNumbers.split(",");
  sum += num1 * num2;
});
console.log(sum); // sum of uncorrupted multiplications = 180233229

// part 2
const re2 = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g;
const exprList2 = data.match(re2);
let enabled = true;
let sum2 = 0;
exprList2.forEach((v) => {
  if (/don't\(\)/.test(v)) {
    enabled = false;
  } else if (/do\(\)/.test(v)) {
    enabled = true;
  } else {
    if (enabled) {
      const commaSeparatedNumbers = v.slice(4, -1);
      const [num1, num2] = commaSeparatedNumbers.split(",");
      sum2 += num1 * num2;
    }
  }
});
console.log(sum2); // sum of enabled uncorrupted multiplications = 95411583
