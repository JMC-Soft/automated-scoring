const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const preprocessData = require("../../data/origin/data.json");
const fs = require("fs");

puppeteer.use(StealthPlugin());

(async () => {
  const FILE_PATH = "./data/DA/tokenize/token.json";
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 },
  });

  const page = await browser.newPage();
  await page.goto("https://bareun.ai/demo/tokenDemo");
  const start = require("../../data/DA/tokenize/token.json").length;
  for (let i = start; i < preprocessData.length; i++) {
    const tokenData = JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
    const { answer, idx } = preprocessData[i];
    const token = JSON.parse(await tokenize(page, answer));
    const newData = [...tokenData, { idx, answer, token }];
    fs.writeFileSync(FILE_PATH, JSON.stringify(newData), (err) => {});
  }
  await page.close();
  await browser.close();
})();

async function tokenize(page, answer) {
  // 지우기 버튼 클릭
  await page.waitForSelector(
    "div.v-window-item.v-window-item--active #input-group-1 > div > div > button"
  );
  await page.click(
    "div.v-window-item.v-window-item--active #input-group-1 > div > div > button"
  );

  // 텍스트 입력
  await page.waitForSelector(
    "div.v-window-item.v-window-item--active textarea"
  );
  await page.type("div.v-window-item.v-window-item--active textarea", answer);

  // 분석 버튼 누르기
  await page.waitForSelector(
    "div.v-window-item.v-window-item--active  form > div.right > button"
  );
  await page.click(
    "div.v-window-item.v-window-item--active  form > div.right > button"
  );
  // 분석 결과 복사 버튼 눌러서 클립보드에 저장
  await page.waitForSelector(
    "#app > div > div > main > div > div > div.v-row > div.v-col.rightCol > div > div > div.v-window-item.v-window-item--active > div > div.card.w-100.ml-auto.mr-auto.mb-50.aliceblue > div > div.flexjcsb > button"
  );
  try {
    await page.click(
      "#app > div > div > main > div > div > div.v-row > div.v-col.rightCol > div > div > div.v-window-item.v-window-item--active > div > div.card.w-100.ml-auto.mr-auto.mb-50.aliceblue > div > div.flexjcsb > button"
    );
  } catch (e) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    await page.click(
      "#app > div > div > main > div > div > div.v-row > div.v-col.rightCol > div > div > div.v-window-item.v-window-item--active > div > div.card.w-100.ml-auto.mr-auto.mb-50.aliceblue > div > div.flexjcsb > button"
    );
  }
  // 클립보드에서 분석 결과 가져오기
  return await page.evaluate(() => {
    return navigator.clipboard.readText();
  });
}
