import { EssayDto } from '@/app/api/lib/types';
import { v4 } from 'uuid';
import getDocRef from '@/app/api/lib/getDocRef';

const saveEssay = async ({ topic, essayText }: EssayDto) => {
  // reference: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/uuid/uuid-tests.ts
  const uuid4 = v4();
  const docRef = getDocRef('Essay', uuid4);

  await docRef.set({
    topic,
    essayText,
  });
};

export default saveEssay;
