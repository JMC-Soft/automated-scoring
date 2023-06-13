const fs = require("fs");

const TITLE = ["ass1", "ass2", "con1", "con2", "lan1", "lan2"];

const TARGET_DATA = require(`../../data/origin/data.json`);
TITLE.forEach((title) => {
  const result = {};
  console.log(`${title} : ${TARGET_DATA.length}`);
  [0, 1, 2, 3, 4].forEach((v) => {
    const numOfLabel = TARGET_DATA.filter((data) => data[title] === v).length;
    result[v] = numOfLabel;
  });
  console.table(result);
});
