const fs = require("fs");
const dataBuffer = fs.readFileSync("input.txt");
const data = dataBuffer
  .toString()
  .split(/\n/)
  .map((v) => v.split(" ").map((x) => Number(x)));

// utils
const isStrictlyIncreasing = (list) => {
  let isIncreasing = true;
  list.forEach((v, i) => {
    if (i === 0) return;
    const diff = v - list[i - 1];
    if (diff <= 0) isIncreasing = false;
  });
  return isIncreasing;
};
const isStrictlyDecreasing = (list) => {
  let isDecreasing = true;
  list.forEach((v, i) => {
    if (i === 0) return;
    const diff = v - list[i - 1];
    if (diff >= 0) isDecreasing = false;
  });
  return isDecreasing;
};
const hasSafeDifference = (list) => {
  let isSafe = true;
  list.forEach((v, i) => {
    if (i === 0) return;
    const diff = v - list[i - 1];
    if (Math.abs(diff) > 3) isSafe = false;
  });
  return isSafe;
};
const isSafeList = (list) => {
  return (
    (isStrictlyIncreasing(list) || isStrictlyDecreasing(list)) &&
    hasSafeDifference(list)
  );
};

// part 1
const unsafes = data.filter((v) => !isSafeList(v));
const safeCount = data.length - unsafes.length;
console.log(safeCount); // safe reports = 490

// part 2
let dampenedSafeCount = 0;
unsafes.forEach((v) => {
  for (let i = 0; i < v.length; i++) {
    if (isSafeList(v.toSpliced(i, 1))) {
      dampenedSafeCount++;
      return;
    }
  }
});
console.log(safeCount + dampenedSafeCount); // safe reports post-dampener = 536
