const AUGMENTED_MAP = {
  misspelling: {
    temperature: 0.69,
    frequency_penalty: 0.16,
    presence_penalty: 0.16,
    keyCommand:
      "The content will not change. Must be as misspelled as the original dataAugmentation.",
  },
  reordering: {
    temperature: 0.69,
    frequency_penalty: 0.16,
    presence_penalty: 0.16,
    keyCommand:
      "The content will not change. Replace two or more words with another word of the same meaning with misspelled. Intentionally rearrange the order of the sentences. Must be as misspelled as the original data.",
  },
  misspelling_backward: {
    temperature: 0.65,
    frequency_penalty: 0.17,
    presence_penalty: 0.17,
    keyCommand:
      "The content will not change. Replace one or more words with another words with misspelled. The last one or more sentences must be misspelled. Must be as misspelled as the original data. Intentionally rearrange the order of the last three sentences.",
  },
  shuffle_and_replace: {
    temperature: 0.64,
    frequency_penalty: 0.18,
    presence_penalty: 0.16,
    keyCommand:
      "You have to shuffle the sentences except for the first one. Replace two or more words with another word of the same meaning with misspelled.  Must be as misspelled as the original data.",
  },
  replace: {
    temperature: 0.74,
    frequency_penalty: 0.3,
    presence_penalty: 0.38,
    keyCommand:
      "Shuffle the sentences except for the first one. Replace two or more words with another word of the same meaning with misspelled.  Must be as misspelled as the original data.",
  },
};

const API_KEY = "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";
const API_KEY2 = "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";
const API_KEY3 = "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";
const CHUNK_SIZE = 22;
const GPT_MODEL = "gpt-3.5-turbo";
const SYSTEM_MESSAGE =
  "You are a data augmentation expert AI specialising in Korean data augmentation in natural language processing. In particular, you are strong at generating data from foreigners who are not fluent in Korean. In addition, you have a perfect grasp of the number of misspellings and vocabulary level in a given sentence. You should answer according to the example format below without any explanation.\n" +
  "Example format\n" +
  "{\n" +
  '"mod_1" : "data",\n' +
  '"mod_2" : "data",\n' +
  '"mod_3" : "data"\n' +
  "}";

module.exports = {
  AUGMENTED_MAP,
  API_KEY,
  API_KEY2,
  API_KEY3,
  CHUNK_SIZE,
  GPT_MODEL,
  SYSTEM_MESSAGE,
};
