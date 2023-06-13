const xlsx = require("xlsx");
const TARGETS = require("./const");
const fs = require("fs");
const PREPROCESS_JSON = require("../../data/origin/preprocess.json");

const TITLE = ["ass1", "ass2", "con1", "con2", "lan1", "lan2"];
const TYPE = ["train", "test"];

TITLE.forEach((title) => {
  TYPE.forEach((type) => {
    const filePath = `./data/train_data/${title}_${type}`;
    const workbook = xlsx.readFile(`${filePath}.xlsx`);
    const ws = workbook.Sheets[workbook.SheetNames[0]];
    const parsedJson = xlsx.utils.sheet_to_json(ws);

    const result = parsedJson.map((data) => {
      const { text, label } = data;
      let newText = text;

      TARGETS.forEach((value, key) => {
        if (Array.isArray(key)) {
          key.forEach((el) => {
            newText = newText.replaceAll(el, value);
          });
          return;
        }

        if (key instanceof RegExp) {
          newText = newText.replace(key, value);
          return;
        }

        newText = newText.replaceAll(key, value);
      });

      const idx = PREPROCESS_JSON.find((data) => data.answer === newText).idx;

      return {
        text: newText,
        label,
        idx,
      };
    });

    fs.writeFile(`${filePath}.json`, JSON.stringify(result), (err) => {});

    const newWs = xlsx.utils.json_to_sheet(result);
    let wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, newWs, "Sheet1");
    xlsx.writeFile(wb, `./${filePath}.xlsx`);
  });
});
