import ApiError from '@/app/api/lib/class/ApiError';
import { db } from '@/app/api/config/firebase.admin';

const saveEssay = async ({
  topic,
  essayText,
  uid,
}: {
  topic: string;
  essayText: string;
  uid: string | null;
}) => {
  try {
    const doc = db.collection('Essay').doc();

    await doc.set({
      topic,
      essayText,
      uid,
    });
  } catch (err) {
    ApiError.handleError(err);
  }
};

export default saveEssay;
