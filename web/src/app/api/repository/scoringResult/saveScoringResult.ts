import ApiError from '@/app/api/lib/class/ApiError';
import { db } from '@/app/api/config/firebase.admin';
import { EssayResponseDto, ScoringResultEntity } from '@/app/api/lib/types';

const saveScoringResult = async (
  essayId: string,
  uid: string | null,
  topic: string,
  essayRes: EssayResponseDto,
) => {
  try {
    const doc = db.collection('ScoringResult').doc();

    const date = new Date();
    const createdAt = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const scoringResult: ScoringResultEntity = {
      countCharacters: essayRes.countCharacters,
      countSentences: essayRes.countSentences,
      createdAt,
      essayId,
      uid,
      topic,
      candidate: essayRes.candidate,
      total: essayRes.total,
      exp: essayRes.exp,
      org: essayRes.org,
      cont: essayRes.cont,
    };

    await doc.set(scoringResult);

    return doc.id;
  } catch (err) {
    throw ApiError.handleError(err);
  }
};

export default saveScoringResult;
