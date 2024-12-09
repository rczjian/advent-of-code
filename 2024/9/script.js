const fs = require("fs");
const dataBuffer = fs.readFileSync("input.txt");
const data = dataBuffer.toString();

// part 1
const getLayout = (diskMap) => {
  const map = diskMap.match(/.{1,2}/g);
  const layout = [];
  map.forEach((v, i) => {
    const fileLength = Number(v[0]);
    const freeLength = Number(v[1] ?? 0);
    for (let j = 0; j < fileLength; j++) {
      layout.push(i);
    }
    for (let j = 0; j < freeLength; j++) {
      layout.push(-1);
    }
  });
  return layout;
};
const compactLayout = (layout) => {
  let nextIndex = layout.length - 1;
  for (let i = 0; i < nextIndex; i++) {
    if (layout[i] === -1) {
      layout[i] = layout[nextIndex];
      layout[nextIndex] = -1;
      do {
        nextIndex--;
      } while (layout[nextIndex] === -1);
    }
  }
  return layout;
};
const getFragmentedChecksum = (layout) => {
  let checksum = 0;
  let i = 0;
  while (layout[i] !== -1) {
    checksum += i * layout[i];
    i++;
  }
  return checksum;
};
console.log(getFragmentedChecksum(compactLayout(getLayout(data)))); // fragmented checksum = 6390180901651

// part 2
const getBlocks = (diskMap) => {
  const blocks = [];
  diskMap.split("").forEach((v, i) => {
    blocks.push({
      id: i % 2 ? -1 : i / 2,
      size: Number(v),
    });
  });
  return blocks;
};
const compactBlocks = (blocks) => {
  for (let i = blocks.length - 1; i >= 0; i--) {
    const file = blocks[i];
    if (file.id !== -1) {
      for (let j = 0; j < i; j++) {
        const space = blocks[j];
        if (space.id !== -1) continue;
        if (space.size >= file.size) {
          const diff = space.size - file.size;
          if (diff === 0) blocks.splice(j, 1, file);
          else {
            blocks.splice(j, 1, file, { id: -1, size: diff });
            i++;
          }
          blocks[i] = { id: -1, size: file.size };
          break;
        }
      }
    }
  }
};
const convertBlocksToLayout = (blocks) => {
  const layout = [];
  blocks.forEach((v) => {
    for (let i = 0; i < v.size; i++) layout.push(v.id);
  });
  return layout;
};
const getChecksum = (layout) => {
  let checksum = 0;
  layout.forEach((v, i) => {
    if (v !== -1) checksum += i * v;
  });
  return checksum;
};
const blocks = getBlocks(data);
compactBlocks(blocks);
const layout = convertBlocksToLayout(blocks);
console.log(getChecksum(layout)); // compacted checksum = 6412390114238
