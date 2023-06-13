const fs = require("fs");
const tokenDataList = require("../../data/DA/tokenize/preprocessToken.json");

const FILE_PATH = "./data/DA/tokenize/tokenizeDA.json";
const DA_FOR_DATA = 16;

const json = [];
tokenDataList.forEach((data) => {
  const { idx, answer, token } = data;
  let count = 0;
  let dupCount = 0;
  const set = new Set();
  while (count < DA_FOR_DATA) {
    // 0.1 ~ 0.2 사이의 숫자 랜덤으로 뽑기
    const randomSeed = 0.05;
    const randomTokenList = token
      .reduce((prev, curr) => {
        if (Math.random() < randomSeed) {
          return [...prev, curr];
        }
        return prev;
      }, [])
      .sort((a, b) => a.start - b.start);

    let temp = answer;
    randomTokenList.forEach((t) => {
      const { start, end } = t;
      for (let i = start; i <= end; i++) {
        temp = replaceChar(temp, "*", i);
      }
    });
    const newAnswer = temp.replaceAll("*", "");
    const result = { idx, text: newAnswer };
    if (!set.has(newAnswer)) {
      set.add(newAnswer);
      json.push(result);
      count++;
    } else {
      dupCount += 1;
      if (dupCount > 100) {
        console.log(idx, "중복 100회 초과");
        break;
      }
      console.log(idx, "중복");
    }
  }
});

fs.writeFileSync(FILE_PATH, JSON.stringify(json));

// 각 idx 별 개수 세기
const result = json.reduce((prev, curr) => {
  const { idx } = curr;
  if (prev[idx]) {
    prev[idx] += 1;
  } else {
    prev[idx] = 1;
  }
  return prev;
}, {});

console.log(result);

function replaceChar(origString, replaceChar, index) {
  let firstPart = origString.substr(0, index);
  let lastPart = origString.substr(index + 1);

  let newString = firstPart + replaceChar + lastPart;
  return newString;
}
