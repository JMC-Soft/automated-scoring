const fs = require("fs");
const TARGETS = require("./const");
const TITLE_LIST = ["zeroDA", "perfectDA"];

TITLE_LIST.forEach((title) => {
  const dataList = require(`../../data/origin/${title}.json`);
  const score = title === "zeroDA" ? 0 : 4;

  const result = dataList.map((data) => {
    const { answer, idx } = data;
    let newAnswer = answer;

    TARGETS.forEach((value, key) => {
      if (Array.isArray(key)) {
        key.forEach((el) => {
          newAnswer = newAnswer.replaceAll(el, value);
        });
        return;
      }

      if (key instanceof RegExp) {
        newAnswer = newAnswer.replace(key, value);
        return;
      }

      newAnswer = newAnswer.replaceAll(key, value);
    });

    return {
      idx: idx ? idx : score * 1000,
      answer: newAnswer,
    };
  });

  fs.writeFile(
    `./data/origin/preprocess${title.replace(/\b[a-z]/, (letter) =>
      letter.toUpperCase()
    )}.json`,
    JSON.stringify(result),
    (err) => {}
  );
});
