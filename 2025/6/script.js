const fs = require("fs");
const dataBuffer = fs.readFileSync("input.txt");
const data = dataBuffer
  .toString()
  .split(/\n+/)
  .map((line) => line.split(/\s+/));

// part 1
let sum = 0;
for (let c = 0; c < data.at(-1)?.length; c++) {
  const operation = data.at(-1)?.[c];
  const opFn = (prev, val) => {
    if (operation === "+") return prev + val;
    if (operation === "*") return prev * val;
    throw Error(`unsupported op ${operation}`);
  };
  let colAnswer = operation === "+" ? 0 : 1;
  for (let r = 0; r < data.length - 1; r++) {
    colAnswer = opFn(colAnswer, Number(data[r][c]));
  }
  sum += colAnswer;
}
console.log(sum); // sum of answers = 4412382293768

// part 2
// spacing/positioning of digits matters 💀💀💀
// so we have to re-parse the data while cognizant of column lengths
let cMathSum = 0;
const colLengths = [];
for (let c = 0; c < data.at(-1)?.length; c++) {
  let colLength = 0;
  for (let r = 0; r < data.length - 1; r++) {
    colLength = Math.max(colLength, data[r][c].length);
  }
  colLengths.push(colLength);
}
const paddedData = dataBuffer
  .toString()
  .split(/\n+/)
  .map((line) => {
    const paddedLine = [];
    const chars = line.split("");
    let p = 0;
    colLengths.forEach((len) => {
      let e = "";
      for (let j = 0; j < len; j++) {
        e += chars.at(p + j);
      }
      p += len + 1;
      paddedLine.push(e);
    });
    return paddedLine;
  });

for (let c = 0; c < paddedData.at(-1)?.length; c++) {
  const operation = paddedData.at(-1)?.[c].at(0);
  const opFn = (prev, val) => {
    if (operation === "+") return prev + val;
    if (operation === "*") return prev * val;
    throw Error(`unsupported op ${operation}`);
  };
  let colAnswer = operation === "+" ? 0 : 1;
  const colLength = colLengths[c];
  for (let p = colLength - 1; p >= 0; p--) {
    let num = "";
    for (let r = 0; r < paddedData.length - 1; r++) {
      num += paddedData[r][c].charAt(p);
    }
    colAnswer = opFn(colAnswer, Number(num));
  }
  cMathSum += colAnswer;
}
console.log(cMathSum); // cephalopod math sum = 7858808482092
