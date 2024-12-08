const fs = require("fs");
const dataBuffer = fs.readFileSync("input.txt");
const data = dataBuffer
  .toString()
  .split(/\n/)
  .map((v) => v.split(""));

// utils
const isInMap = ([y, x]) => {
  return y >= 0 && y < data.length && x >= 0 && x < data[0].length;
};
const getAntinodeCount = (withResonance) => {
  const nodes = {};
  data.forEach((row, i) => {
    row.forEach((v, j) => {
      if (v !== ".") {
        nodes[v] = [...(nodes?.[v] ?? []), [i, j]];
      }
    });
  });
  const antinodes = {};
  Object.keys(nodes).forEach((key) => {
    const nodeList = nodes[key];
    const antinodeList = [];
    for (let i = 0; i < nodeList.length; i++) {
      for (let j = i + 1; j < nodeList.length; j++) {
        const nodeTop = nodeList[i];
        const nodeBottom = nodeList[j];
        const yDiff = nodeBottom[0] - nodeTop[0];
        const xDiff = nodeBottom[1] - nodeTop[1];

        let nextUpwardAntinode = [nodeTop[0] - yDiff, nodeTop[1] - xDiff];
        let nextDownwardAntinode = [
          nodeBottom[0] + yDiff,
          nodeBottom[1] + xDiff,
        ];
        if (withResonance) {
          while (isInMap(nextUpwardAntinode)) {
            antinodeList.push(nextUpwardAntinode);
            nextUpwardAntinode = [
              nextUpwardAntinode[0] - yDiff,
              nextUpwardAntinode[1] - xDiff,
            ];
          }
          while (isInMap(nextDownwardAntinode)) {
            antinodeList.push(nextDownwardAntinode);
            nextDownwardAntinode = [
              nextDownwardAntinode[0] + yDiff,
              nextDownwardAntinode[1] + xDiff,
            ];
          }
        } else {
          if (isInMap(nextUpwardAntinode))
            antinodeList.push(nextUpwardAntinode);
          if (isInMap(nextDownwardAntinode))
            antinodeList.push(nextDownwardAntinode);
        }
        antinodes[key] = antinodeList;
      }
    }
  });
  const antinodeSet = new Set(
    Object.values(antinodes)
      .flat()
      .map((v) => v.join(","))
  );
  if (withResonance) {
    Object.values(nodes).forEach((list) => {
      if (list.length > 1) {
        list.forEach((v) => antinodeSet.add(v.join(",")));
      }
    });
  }
  return antinodeSet.size;
};

// part 1
console.log(getAntinodeCount(false)); // unique antinodes = 336

// part 2
console.log(getAntinodeCount(true)); // unique antinodes with resonance = 1131
