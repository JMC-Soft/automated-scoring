const fs = require("fs");
const xlsx = require("xlsx");

const TITLE = ["ass1", "ass2", "con1", "con2", "lan1", "lan2"];
const TYPE = ["train"];
const DA_TYPE = "tokenize";

TITLE.forEach((title) => {
  TYPE.forEach((type) => {
    makeTrainFile(title, type);
  });
});

function makeTrainFile(title, type) {
  const FILE_PATH = `./data/train_data/${title}_${type}`;
  const DA_PATH = `./data/train_data/${title}_${type}_${DA_TYPE}`;
  const originData = JSON.parse(fs.readFileSync(`${FILE_PATH}.json`, "utf-8"));
  const daData = JSON.parse(fs.readFileSync(`${DA_PATH}.json`, "utf-8"));
  const result = [...originData, ...daData].map((data) => ({
    text: data.text,
    label: data.label,
  }));

  const newWs = xlsx.utils.json_to_sheet(result);
  let wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, newWs, "Sheet1");
  xlsx.writeFile(wb, `${DA_PATH}_merged.xlsx`);
}
