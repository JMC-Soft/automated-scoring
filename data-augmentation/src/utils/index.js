

const {
  AUGMENTED_MAP,
  GPT_MODEL,
  SYSTEM_MESSAGE,
  API_KEY2,
  API_KEY3,
  API_KEY,
} = require("../const");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: API_KEY2,
});

const openai = new OpenAIApi(configuration);

async function getCompletion(data, type, count = 0) {
  const { temperature, frequency_penalty, presence_penalty, keyCommand } =
    AUGMENTED_MAP[type];
  const message = data.answer;

  try {
    const completion = await openai.createChatCompletion({
      model: GPT_MODEL,
      messages: createMessage(message, keyCommand),
      max_tokens: 2048,
      temperature: temperature,
      top_p: 1,
      frequency_penalty: frequency_penalty,
      presence_penalty: presence_penalty,
    });
    const results = completion.data.choices.map((choice) => {
      console.log(data.idx, choice.message.content);
      return JSON.parse(choice.message.content);
    });
    return results;
  } catch (e) {
    console.log(data.idx, e);
    if (count < 2) {
      return await getCompletion(data, type, count + 1);
    }
    return [[{ mod_1: "", mod_2: "", mod_3: "" }]];
  }

  function createMessage(message, keyCommand) {
    return [
      {
        role: "system",
        content: SYSTEM_MESSAGE,
      },
      {
        role: "user",
        content: SYSTEM_MESSAGE,
      },
      {
        role: "assistant",
        content:
          "Hello! How can I assist you today with Korean dataAugmentation augmentation?",
      },
      {
        role: "user",
        content:
          `Original data : "${message}"\n` +
          "\n" +
          "Data augmentation request: Data enrichment on a paragraph-by-paragraph basis, not sentence-by-sentence. It doesn't matter which augmentation method you use. The number and content of sentences should not change.\n" +
          "\n" +
          `Key data augmentation request: ${keyCommand}\n` +
          "\n" +
          "Amount of Data augmentation : 3",
      },
    ];
  }
}



module.exports = {
  getCompletion,
  // parseExcel,
};
