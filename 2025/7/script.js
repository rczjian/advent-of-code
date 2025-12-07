const fs = require("fs");
const dataBuffer = fs.readFileSync("input.txt");
const manifold = dataBuffer
  .toString()
  .split(/\n/)
  .map((l) => l.split(""));
const startIndex = manifold[0].findIndex((v) => v === "S");

// part 1
const beamIndices = new Set();
let splitCount = 0;
beamIndices.add(startIndex);
manifold.forEach((row, i) => {
  if (i % 2 === 1) return;
  const addBeam = (beam) => {
    if (beam >= 0 && beam < row.length) beamIndices.add(beam);
  };
  beamIndices.forEach((beam) => {
    if (row[beam] === "^") {
      addBeam(beam - 1);
      addBeam(beam + 1);
      beamIndices.delete(beam);
      splitCount++;
    }
  });
});
console.log(splitCount); // no. of times beam will be split = 1717

// part 2
const timelineCountMap = new Map();
timelineCountMap.set(startIndex, 1);
manifold.forEach((row, i) => {
  if (i % 2 === 1) return;
  const addTimeline = (timeline, count) => {
    if (timeline >= 0 && timeline < row.length) {
      timelineCountMap.set(
        timeline,
        (timelineCountMap.get(timeline) ?? 0) + count
      );
    }
  };
  timelineCountMap.forEach((count, timeline) => {
    if (row[timeline] === "^") {
      addTimeline(timeline - 1, count);
      addTimeline(timeline + 1, count);
      timelineCountMap.delete(timeline);
    }
  });
});
let timelineCount = 0;
timelineCountMap.forEach((v) => (timelineCount += v));
console.log(timelineCount); // no. of timelines = 231507396180012
