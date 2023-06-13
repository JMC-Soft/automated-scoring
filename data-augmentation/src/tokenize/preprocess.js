const tokenData = require("../../data/DA/tokenize/token.json");
const fs = require("fs");

const result = tokenData.map((data) => {
  const { idx, answer, token } = data;
  const { sentences } = token;
  const newToken = sentences.reduce((prev, s) => {
    const { tokens } = s;
    const newTokens = tokens.reduce((prev, t) => {
      const { segments } = t;
      const newSegments = segments.reduce((prev, s) => {
        const { text, hint } = s;
        return [
          ...prev,
          {
            text: text.content,
            hint,
            start: text.beginOffset,
            end: text.beginOffset + text.length - 1,
          },
        ];
      }, []);
      return [...prev, ...newSegments];
    }, []);
    return [...prev, ...newTokens];
  }, []);

  const result = newToken.reduce((prev, t) => {
    if (t.text === ".") {
      return prev;
    }
    return [...prev, t];
  }, []);

  return {
    idx,
    answer,
    token: result,
  };
});

fs.writeFileSync(
  "./data/DA/tokenize/preprocessToken.json",
  JSON.stringify(result)
);
