const fs = require("fs");
const dataBuffer = fs.readFileSync("input.txt");
const data = dataBuffer.toString().split(/\s+/);
const banks = data.map((bank) => bank.split("").map(Number));

const getLargestDigitAndIndex = (numbers) => {
  let largest = numbers[0];
  let index = 0;
  numbers.forEach((n, i) => {
    if (n > largest) {
      largest = n;
      index = i;
    }
  });
  return [largest, index];
};

const getLargestJoltage = (bank, size) => {
  let length = bank.length;
  let pointer = 0;
  let result = 0;
  Array.from({ length: size }).forEach((_, i) => {
    const [digit, index] = getLargestDigitAndIndex(
      bank.slice(pointer, length - (size - i - 1))
    );
    pointer += index + 1;
    result = result * 10 + digit;
  });
  return result;
};

// part 1
const totalJoltage = banks.reduce((acc, currBank) => {
  return acc + getLargestJoltage(currBank, 2);
}, 0);
console.log(totalJoltage); // total joltage = 17535

// part 2
const totalJoltageV2 = banks.reduce((acc, currBank) => {
  return acc + getLargestJoltage(currBank, 12);
}, 0);
console.log(totalJoltageV2); // total joltage = 173577199527257
