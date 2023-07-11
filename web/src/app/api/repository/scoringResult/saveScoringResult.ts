import ApiError from '@/app/api/lib/class/ApiError';
import { db } from '@/app/api/config/firebase.admin';
import { EssayResponseDto, ScoringResultEntity } from '@/app/api/lib/types';
import makeCreatedAt from '@/app/api/lib/makeCreatedAt';

const saveScoringResult = async (
  essayId: string,
  uid: string | null,
  topic: string,
  essayRes: EssayResponseDto,
) => {
  try {
    const doc = db.collection('ScoringResult').doc();

    const scoringResult: ScoringResultEntity = {
      countCharacters: essayRes.countCharacters,
      countSentences: essayRes.countSentences,
      createdAt: makeCreatedAt(),
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
