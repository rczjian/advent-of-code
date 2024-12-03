const fs = require("fs");
const dataBuffer = fs.readFileSync("input.txt");
const data = dataBuffer.toString().split(/\s+/);
const lists = [[], []];
data.forEach((v, i) => {
  if (i % 2) {
    lists[0].push(v);
  } else {
    lists[1].push(v);
  }
});

// part 1
const sortedLists = [lists[0].toSorted(), lists[1].toSorted()];
let sumOfDiff = 0;
sortedLists[0].forEach((v, i) => {
  sumOfDiff += Math.abs(v - sortedLists[1][i]);
});
console.log(sumOfDiff); // total distance = 3714264

// part 2
let similarityScore = 0;
lists[0].forEach((v) => {
  const count = lists[1].filter((x) => x === v).length;
  similarityScore += v * count;
});
console.log(similarityScore); // similarity score = 18805872
