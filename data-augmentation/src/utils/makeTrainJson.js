const fs = require("fs");
const ORIGIN_DATA = require("../../data/origin/data.json");

const TITLE = ["ass1", "ass2", "con1", "con2", "lan1", "lan2"];
const TYPE = ["train"];
const DA_TYPE = "tokenize";

const DA_JSON = require(`../../data/DA/${DA_TYPE}/${DA_TYPE}DA.json`);

TITLE.forEach((title) => {
  TYPE.forEach((type) => makeJson(title, type));
});

function makeJson(title, type) {
  const trainDataList = require(`../../data/train_data/${title}_${type}.json`);
  const idxList = trainDataList.map((data) => {
    const { idx } = data;
    const label = ORIGIN_DATA.find((data) => data.idx === idx)[title];
    return { idx, label };
  });
  idxList.push({ idx: 0, label: 0 });
  idxList.push({ idx: 4000, label: 4 });

  // console.log(idxList.find((data) => data.idx === 4000));

  const result = DA_JSON.reduce((prev, data) => {
    const { idx, text } = data;
    const label = idxList.find((data) => data.idx === idx)?.label;
    if (isNaN(label)) {
      return prev;
    }
    return [...prev, { text, label }];
  }, []);

  fs.writeFileSync(
    `./data/train_data/${title}_${type}_${DA_TYPE}.json`,
    JSON.stringify(result)
  );

  const numOfResult = {};
  Array(5)
    .fill(0)
    .forEach((_, idx) => {
      numOfResult[idx] = result.filter((data) => data.label === idx).length;
    });
  console.table(numOfResult);
}
