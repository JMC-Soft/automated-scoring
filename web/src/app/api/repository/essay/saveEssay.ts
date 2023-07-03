import { EssayDto } from '@/app/api/lib/types';
import getDocRef from '@/app/api/lib/getDocRef';

const saveEssay = async ({ topic, essayText }: EssayDto) => {
  const docRef = getDocRef('Essay', 'test');

  await docRef.set({
    topic,
    essayText,
  });
};

export default saveEssay;
