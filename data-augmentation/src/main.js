const { CHUNK_SIZE } = require("./const");
const fs = require("fs");
const { getCompletion } = require("./utils");

const jsonData = require("../data/origin/preprocess.json");
const filePath = `./data/misspellingDA.json`;

async function main(type = "misspelling") {
  const chunks = [];
  for (let i = 0; i < jsonData.length; i += CHUNK_SIZE) {
    chunks.push(jsonData.slice(i, i + CHUNK_SIZE));
  }

  for (const chunk of chunks) {
    await Promise.all(
      chunk.map(async (data) => {
        const results = await getCompletion(data, type);
        const json = JSON.parse(fs.readFileSync(filePath, "utf8"));

        results.forEach((result) => {
          [1, 2, 3].forEach((i) => {
            const text =
              result[`mod_${i}`]?.length > 0
                ? result[`mod_${i}`]
                : result[`augmentation_${i}`];
            if (text) {
              json.push({
                idx: data.idx,
                text,
              });
            }
          });
        });

        fs.writeFileSync(filePath, JSON.stringify(json), () => {});
      })
    );
  }
}

module.exports = { main };
