const ORIGINAL = require("../../data/origin/preprocess.json");
const ZERO_DA = require("../../data/origin/preprocessZeroDA.json");
const PERFECT_DA = require("../../data/origin/preprocessPerfectDA.json");
const PARSE_DATA = require("../../data/origin/parse.json");
const fs = require("fs");

const TITLE = ["ass1", "ass2", "con1", "con2", "lan1", "lan2"];

const result = [...ORIGINAL, ...PERFECT_DA, ...ZERO_DA].map((data) => {
  const { idx } = data;
  const target = PARSE_DATA.find((v) => v.idx === idx);

  if (idx % 1000 !== 0) {
    const {
      assignment1,
      content1,
      language1,
      assignment2,
      content2,
      language2,
    } = target;
    return {
      ...data,
      ass1: assignment1,
      ass2: assignment2,
      con1: content1,
      con2: content2,
      lan1: language1,
      lan2: language2,
    };
  }
  const q = Math.floor(idx / 1000);
  return {
    ...data,
    ass1: q,
    ass2: q,
    con1: q,
    con2: q,
    lan1: q,
    lan2: q,
  };
});

fs.writeFileSync("./data/origin/data.json", JSON.stringify(result));
