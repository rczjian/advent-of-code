const fs = require("fs");
const dataBuffer = fs.readFileSync("input.txt");
const data = dataBuffer
  .toString()
  .split(/\n/)
  .map((v) => v.split(""));

// utils
const getNextCoords = (currRow, currCol, direction) => {
  let nextRow, nextCol;
  switch (direction) {
    case 0: // up
      nextRow = currRow - 1;
      nextCol = currCol;
      break;
    case 1: // right
      nextRow = currRow;
      nextCol = currCol + 1;
      break;
    case 2: // down
      nextRow = currRow + 1;
      nextCol = currCol;
      break;
    case 3: // left
      nextRow = currRow;
      nextCol = currCol - 1;
      break;
    default:
      throw new Error("invalid direction");
  }
  return [nextRow, nextCol];
};
const runPath = (map) => {
  const dirtyMap = map.map((v) => v.slice());
  let currRow = dirtyMap.findIndex((row) => row.includes("^"));
  let currCol = dirtyMap[currRow].findIndex((row) => row.includes("^"));
  let direction = 0;
  const touched = {}; // for part 2 - to detect loops

  while (true) {
    dirtyMap[currRow][currCol] = "X";
    if (touched[[currRow, currCol]]?.includes(direction))
      throw new Error("loop");
    touched[[currRow, currCol]] = [
      ...(touched?.[[currRow, currCol]] ?? []),
      direction,
    ];

    let [nextRow, nextCol] = getNextCoords(currRow, currCol, direction);
    if (!dirtyMap[nextRow]?.[nextCol]) break;
    while (dirtyMap[nextRow][nextCol] === "#") {
      direction = (direction + 1) % 4;
      [nextRow, nextCol] = getNextCoords(currRow, currCol, direction);
    }
    currRow = nextRow;
    currCol = nextCol;
  }
  return dirtyMap;
};

// part 1
const pathMap = runPath(data);
const distinctVisited = pathMap
  .map((row) => row.join(""))
  .join("")
  .match(/X/g).length;
console.log(distinctVisited); // distinct visited positions = 5461

// part 2
const visited = [];
pathMap.forEach((row, i) => {
  row.forEach((v, j) => {
    if (v === "X") {
      visited.push([i, j]);
    }
  });
});
let loopCount = 0;
visited.forEach(([i, j]) => {
  const mapCopy = data.map((v) => v.slice());
  mapCopy[i][j] = "#";
  try {
    runPath(mapCopy);
  } catch (e) {
    if (e.message === "loop") loopCount++;
  }
});
console.log(loopCount); // loop scenarios = 1836
