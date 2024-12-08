const fs = require("fs");
const dataBuffer = fs.readFileSync("input.txt");
const data = dataBuffer
  .toString()
  .split(/\n/)
  .map((v) => {
    const [value, _inputs] = v.split(": ");
    return { value, inputs: _inputs.split(" ") };
  });

//utils
const getValidSum = (operators) => {
  let sumValid = 0;
  data.forEach((equation) => {
    let testStrings = [];
    equation.inputs.forEach((v) => {
      if (testStrings.length === 0) testStrings = [v];
      else {
        let updatedTestStrings = [];
        operators.forEach((op) => {
          if (op === "+" || op === "*") {
            updatedTestStrings = [
              ...updatedTestStrings,
              ...testStrings.map((str) => `(${str}${op}${v})`),
            ];
          } else if (op === "||") {
            updatedTestStrings = [
              ...updatedTestStrings,
              ...testStrings.map((str) => `(${eval(str)}${v})`),
            ];
          }
        });
        testStrings = updatedTestStrings;
      }
    });
    for (let i = 0; i < testStrings.length; i++) {
      const val = Number(equation.value);
      if (eval(testStrings[i]) === val) {
        sumValid += val;
        return;
      }
    }
  });
  return sumValid;
};

// part 1
console.log(getValidSum(["+", "*"])); // total calibration result = 7885693428401

// part 2
console.log(getValidSum(["+", "*", "||"])); // updated total calibration result = 348360680516005
