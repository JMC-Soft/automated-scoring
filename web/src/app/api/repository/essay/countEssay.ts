import getColRef from '@/app/api/lib/getColRef';

const countEssay = async () => {
  const essayColRef = getColRef('Essay');
  const snapshot = await essayColRef.get();

  return snapshot.size;
};

export default countEssay;
