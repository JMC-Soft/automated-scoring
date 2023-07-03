import { EssayDto } from '@/app/api/lib/types';
import getColRef from '@/app/api/lib/getColRef';

const saveEssay = async ({ topic, essayText }: EssayDto) => {
  // const docRef = getDocRef('Essay');
  const colRef = await getColRef('Essay');
  const docRef = colRef.doc();

  await docRef.set({
    topic,
    essayText,
  });
};

export default saveEssay;
