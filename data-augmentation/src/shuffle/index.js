const dataList = require("../../data/origin/data.json");
const fs = require("fs");

const resultJson = [];

dataList.forEach((data) => {
  const { idx, answer } = data;

  const sentences = answer
    .trim()
    .split(". ")
    .map((sentence, i) => {
      if (sentence[sentence.length - 1] !== ".") {
        return sentence.trim() + ".";
      }
      return sentence.trim();
    });
  //sentences: ["안녕","반가워",...]
  let count = 0;
  let dupCount = 0;
  const set = new Set();
  while (count < 16) {
    const shuffledSentences = shuffle(sentences).join(" ").trim();

    if (!set.has(shuffledSentences)) {
      set.add(shuffledSentences);
      resultJson.push({ idx, text: shuffledSentences });
      count++;
    } else {
      dupCount += 1;
      if (dupCount > 1000) {
        console.log(idx, "중복 100회 초과");
        break;
      }
      console.log(idx, "중복");
    }
  }
});
fs.writeFile(
  "./data/DA/shuffle/shuffleDA.json",
  JSON.stringify(resultJson),
  (err) => {}
);

const result = resultJson.reduce((prev, curr) => {
  const { idx } = curr;
  if (prev[idx]) {
    prev[idx] += 1;
  } else {
    prev[idx] = 1;
  }
  return prev;
}, {});

console.log(result);

// shuffle 구현
function shuffle(array) {
  const result = [];
  const copiedArray = [...array];
  while (copiedArray.length !== 0) {
    const randomIndex = Math.floor(Math.random() * copiedArray.length);
    const randomItem = copiedArray.splice(randomIndex, 1)[0];
    result.push(randomItem);
  }
  return result;
}
