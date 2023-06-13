const fs = require("fs");

const TITLE = ["ass1", "ass2", "con1", "con2", "lan1", "lan2"];
const TYPE = ["train", "test"];
const DA_TYPE = "shuffle";

TITLE.forEach((title) => {
  TYPE.forEach((type) => {
    const TARGET_DATA = require(`../../data/train_data/${title}_${type}.json`);

    const result = {};
    console.log(`${title}_${type} : ${TARGET_DATA.length}`);
    [0, 1, 2, 3, 4].forEach((v) => {
      const numOfLabel = TARGET_DATA.filter((data) => data.label === v).length;
      result[v] = numOfLabel;
    });
    console.table(result);

    if (type === "test") return;

    const DA_DATA = require(`../../data/train_data/${title}_${type}_${DA_TYPE}.json`);
    const result2 = {};
    console.log(`${title}_${type}_${DA_TYPE} : ${DA_DATA.length}`);
    [0, 1, 2, 3, 4].forEach((v) => {
      const numOfLabel = DA_DATA.filter((data) => data.label === v).length;
      result2[v] = numOfLabel;
    });
    console.table(result2);
  });
});
