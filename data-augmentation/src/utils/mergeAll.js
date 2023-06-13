const fs = require("fs");
const xlsx = require("xlsx");

const TITLE = ["ass1", "ass2", "con1", "con2", "lan1", "lan2"];
const TYPE = ["train"];
const DA_TYPES = ["tokenize", "shuffle"];

TITLE.forEach((title) => {
  TYPE.forEach((type) => {
    makeTrainFile(title, type);
  });
});

function makeTrainFile(title, type) {
  const FILE_PATH = `./data/train_data/${title}_${type}`;
  const daData = DA_TYPES.reduce((prev, daType) => {
    return [
      ...prev,
      ...JSON.parse(
        fs.readFileSync(
          `./data/train_data/${title}_${type}_${daType}.json`,
          "utf-8"
        )
      ),
    ];
  }, []);

  const originData = JSON.parse(fs.readFileSync(`${FILE_PATH}.json`, "utf-8"));

  const result = [...originData, ...daData].map((data) => ({
    text: data.text,
    label: data.label,
  }));

  const newWs = xlsx.utils.json_to_sheet(result);
  let wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, newWs, "Sheet1");
  xlsx.writeFile(wb, `./data/train_data/${title}_${type}_all.xlsx`);
}
