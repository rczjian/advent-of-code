const fs = require("fs");
const dataBuffer = fs.readFileSync("input.txt");
const data = dataBuffer
  .toString()
  .split(/\n/)
  .map((v) => v.split(""));

// utils
const countHorizontals = (arr) => {
  let count = 0;
  arr.forEach((row) => {
    const str = row.join("");
    const re = /xmas/gi;
    const re2 = /samx/gi;
    count += str.match(re)?.length ?? 0;
    count += str.match(re2)?.length ?? 0;
  });
  return count;
};
const countVerticals = (arr) => {
  let count = 0;
  const columns = [];
  arr.forEach((row, i) => {
    row.forEach((v, j) => {
      if (i === 0) columns[j] = v;
      else columns[j] += v;
    });
  });
  columns.forEach((str) => {
    const re = /xmas/gi;
    const re2 = /samx/gi;
    count += str.match(re)?.length ?? 0;
    count += str.match(re2)?.length ?? 0;
  });
  return count;
};
const countDiagonalsFromTopLeft = (arr) => {
  let count = 0;
  const diagonals = [];
  arr.forEach((row, i) => {
    row.forEach((v, j) => {
      if (i === 0) diagonals[j] = v;
      else if (j === 0) diagonals[row.length - 1 + i] = v;
      else if (j - i >= 0) diagonals[j - i] += v;
      else diagonals[row.length - 1 + i - j] += v;
    });
  });
  diagonals.forEach((str) => {
    const re = /xmas/gi;
    const re2 = /samx/gi;
    count += str.match(re)?.length ?? 0;
    count += str.match(re2)?.length ?? 0;
  });
  return count;
};
const countDiagonalsFromTopRight = (arr) => {
  let count = 0;
  const diagonals = [];
  arr.forEach((row, i) => {
    row.forEach((v, j) => {
      if (i === 0) diagonals[j] = v;
      else if (i !== 0 && j === row.length - 1)
        diagonals[row.length - 1 + i] = v;
      else diagonals[i + j] += v;
    });
  });
  diagonals.forEach((str) => {
    const re = /xmas/gi;
    const re2 = /samx/gi;
    count += str.match(re)?.length ?? 0;
    count += str.match(re2)?.length ?? 0;
  });
  return count;
};
const totalCount = (arr) => {
  return (
    countHorizontals(arr) +
    countVerticals(arr) +
    countDiagonalsFromTopLeft(arr) +
    countDiagonalsFromTopRight(arr)
  );
};

// part 1
const count = totalCount(data);
console.log(count); // XMAS appearances = 2633

// part 2
const hasMS = (x, y) => {
  return (x === "M" && y === "S") || (x === "S" && y === "M");
};
let crossMasCount = 0;
data.forEach((row, i) => {
  row.forEach((v, j) => {
    if (i === 0 || j === 0 || i === data.length - 1 || j === row.length - 1)
      return;
    if (
      v === "A" &&
      hasMS(data[i - 1][j - 1], data[i + 1][j + 1]) &&
      hasMS(data[i + 1][j - 1], data[i - 1][j + 1])
    )
      crossMasCount++;
  });
});
console.log(crossMasCount); // X-MAS appearances = 1936
