import ApiError from '@/app/api/lib/class/ApiError';
import { db } from '@/app/api/config/firebase.admin';

const saveEssay = async ({
  topic,
  essayText,
}: {
  topic: string;
  essayText: string;
}) => {
  try {
    const doc = db.collection('Essay').doc();

    await doc.set({
      topic,
      essayText,
    });
  } catch (err) {
    ApiError.handleError(err);
  }
};

export default saveEssay;
