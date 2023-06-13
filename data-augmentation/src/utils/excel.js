const xlsx = require("xlsx");
const fs = require("fs");

const parseJson = JSON.parse(fs.readFileSync("./parse.json", "utf-8"));
const type = "shuffle_and_replace";

const result = [];
parseJson.forEach((data) => {
  const {
    assignment1,
    assignment2,
    content1,
    content2,
    language1,
    language2,
    idx,
  } = data;
  const augmentationData = JSON.parse(
    fs.readFileSync(`./dataAugmentation/${idx}.json`, "utf-8")
  );
  const dataList = augmentationData["dataAugmentation"][type] || [];
  dataList.forEach((el) => {
    const item = {
      작문: el,
      "채점자1(과제)": assignment1,
      "채점자2(과제)": assignment2,
      "채점자1(내용)": content1,
      "채점자2(내용)": content2,
      "채점자1(언어)": language1,
      "채점자2(언어)": language2,
    };
    result.push(item);
  }); 
});

const newWs = xlsx.utils.json_to_sheet(result);
let wb = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(wb, newWs, "Sheet1");
xlsx.writeFile(wb, `./${type}.xlsx`);
