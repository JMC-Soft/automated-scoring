import { db } from '@/app/api/config/firebase.admin';
import { WordCloudEntity } from '@/app/api/lib/types';
import ApiError from '@/app/api/lib/class/ApiError';

const saveWordCloud = async (wordCloud: WordCloudEntity, docId?: string) => {
  try {
    const doc = docId
      ? db.collection('WordCloud').doc(docId)
      : db.collection('WordCloud').doc();

    await doc.set(wordCloud);

    return { doc, wordCloud };
  } catch (err) {
    throw ApiError.handleError(err);
  }
};

export default saveWordCloud;
