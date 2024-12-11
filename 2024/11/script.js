const fs = require("fs");
const dataBuffer = fs.readFileSync("input.txt");
const data = dataBuffer.toString().split(" ");

// utils
const iterate = (stones) => {
  const newStones = [];
  stones.forEach((stone) => {
    if (stone === "0") newStones.push("1");
    else if (stone.length % 2 === 0) {
      const newLength = stone.length / 2;
      newStones.push(Number(stone.slice(0, newLength)).toString());
      newStones.push(Number(stone.slice(newLength)).toString());
    } else newStones.push((Number(stone) * 2024).toString());
  });
  return newStones;
};
const iterateV2 = (stoneCounts) => {
  const newStoneCounts = {};
  const addToMap = (key, value) => {
    if (newStoneCounts[key]) newStoneCounts[key] += value;
    else newStoneCounts[key] = value;
  };
  Object.keys(stoneCounts).forEach((stone) => {
    if (stone === "0") addToMap("1", stoneCounts[stone]);
    else if (stone.length % 2 === 0) {
      const newLength = stone.length / 2;
      addToMap(
        Number(stone.slice(0, newLength)).toString(),
        stoneCounts[stone]
      );
      addToMap(Number(stone.slice(newLength)).toString(), stoneCounts[stone]);
    } else addToMap((Number(stone) * 2024).toString(), stoneCounts[stone]);
  });
  return newStoneCounts;
};

// part 1
let stones = data;
for (let i = 0; i < 25; i++) {
  stones = iterate(stones);
}
console.log(stones.length); // number of stones after 25 blinks = 200446

// part 2
let stoneCounts = {};
data.forEach((stone) => {
  if (stoneCounts[stone]) stoneCounts++;
  else stoneCounts[stone] = 1;
});
for (let i = 0; i < 75; i++) {
  stoneCounts = iterateV2(stoneCounts);
}
const total = Object.values(stoneCounts).reduce((acc, v) => acc + v);
console.log(total); // number of stones after 75 blinks = 238317474993392
