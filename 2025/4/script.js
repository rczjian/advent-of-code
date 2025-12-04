const fs = require("fs");
const dataBuffer = fs.readFileSync("input.txt");
const grid = dataBuffer
  .toString()
  .split(/\s+/)
  .map((v) => v.split(""));

const countAdjacentRolls = (i, j) => {
  let count = 0;
  if (grid[i - 1]?.[j - 1] === "@") count++;
  if (grid[i - 1]?.[j] === "@") count++;
  if (grid[i - 1]?.[j + 1] === "@") count++;
  if (grid[i][j - 1] === "@") count++;
  if (grid[i][j + 1] === "@") count++;
  if (grid[i + 1]?.[j - 1] === "@") count++;
  if (grid[i + 1]?.[j] === "@") count++;
  if (grid[i + 1]?.[j + 1] === "@") count++;
  return count;
};

// part 1
let accessibleCount = 0;
const isAccessible = (i, j) => {
  return countAdjacentRolls(i, j) < 4;
};
for (let r = 0; r < grid.length; r++) {
  const row = grid[r];
  for (let c = 0; c < row.length; c++) {
    if (row[c] === "@" && isAccessible(r, c)) accessibleCount++;
  }
}
console.log(accessibleCount); // accessible rolls = 1505

// part 2
let removedCount = 0;
do {
  accessibleCount = 0;
  for (let r = 0; r < grid.length; r++) {
    const row = grid[r];
    for (let c = 0; c < row.length; c++) {
      if (row[c] === "@" && isAccessible(r, c)) {
        accessibleCount++;
        removedCount++;
        grid[r][c] = "x";
      }
    }
  }
} while (accessibleCount > 0);
console.log(removedCount); // removable rolls = 9182
