const fs = require("fs");
const dataBuffer = fs.readFileSync("input.txt");
const data = dataBuffer.toString().split(/\s+/);

// part 1
const getNextNumber = (current, instruction) => {
  const direction = instruction.charAt(0);
  const clicks = Number(instruction.slice(1));
  switch (direction) {
    case "L":
      return (100 + ((current - clicks) % 100)) % 100;
    case "R":
      return (current + clicks) % 100;
    default:
      throw new Error("invalid direction");
  }
};
let zeroCount = 0;
let pointer = 50;
data.forEach((instruction) => {
  pointer = getNextNumber(pointer, instruction);
  if (pointer === 0) zeroCount++;
});
console.log(zeroCount); // number of zeroes = 1180

// part 2
const getZeroCrosses = (current, instruction) => {
  const direction = instruction.charAt(0);
  const clicks = Number(instruction.slice(1));
  switch (direction) {
    case "L": {
      const next = current - clicks;
      // +ve => +ve
      // +ve => 0
      // +ve => -ve
      // 0 => -ve
      if (next > 0) return 0;
      return Math.abs(Math.floor((next - 1) / 100)) + (current === 0 ? -1 : 0);
    }
    case "R": {
      const next = current + clicks;
      if (next < 100) return 0;
      return Math.floor(next / 100);
    }
    default:
      throw new Error("invalid direction");
  }
};
let zeroCrosses = 0;
let pointer2 = 50;
data.forEach((instruction) => {
  zeroCrosses += getZeroCrosses(pointer2, instruction);
  pointer2 = getNextNumber(pointer2, instruction);
});
console.log(zeroCrosses); // zero crosses = 6892
