const fs = require("fs");
const dataBuffer = fs.readFileSync("input.txt");
const data = dataBuffer
  .toString()
  .split(/\n/)
  .map((v) => v.split("").map((x) => Number(x)));

// part 1
const trailheads = [];
data.forEach((row, i) => {
  row.forEach((v, j) => {
    if (v === 0) trailheads.push([i, j]);
  });
});

const searchValidAdjacents = ([i, j], n) => {
  const adjacents = [];
  if (data?.[i]?.[j - 1] === n) adjacents.push([i, j - 1]);
  if (data?.[i]?.[j + 1] === n) adjacents.push([i, j + 1]);
  if (data?.[i - 1]?.[j] === n) adjacents.push([i - 1, j]);
  if (data?.[i + 1]?.[j] === n) adjacents.push([i + 1, j]);
  return adjacents;
};

let sumScores = 0;
trailheads.forEach(([i, j]) => {
  let n = 0;
  let test = [[i, j]];
  while (n < 9) {
    let nextTest = [];
    test.forEach((x) => {
      nextTest = [...nextTest, ...searchValidAdjacents(x, n + 1)];
    });
    test = nextTest;
    n++;
  }
  const peaks = new Set(test.map((v) => v.join(",")));
  const score = peaks.size;
  sumScores += score;
});
console.log(sumScores); // sum of trailhead scores = 538

// part 2
const getRating = ([i, j]) => {
  let rating = 0;
  // dfs
  const stack = [{ coords: [i, j], elevation: 0 }];
  while (stack.length > 0) {
    const v = stack.pop();
    if (v.elevation === 9) rating++;
    searchValidAdjacents(v.coords, v.elevation + 1).forEach((x) =>
      stack.push({ coords: x, elevation: v.elevation + 1 })
    );
  }
  return rating;
};
let sumRatings = 0;
trailheads.forEach((v) => {
  sumRatings += getRating(v);
});
console.log(sumRatings); // sum of trailhead ratings = 1110
