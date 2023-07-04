import { ScoringResponseDto } from '@/app/api/lib/types';
import getEachScore from '@/app/api/lib/scoring/getEachScore';

const getScoreResult = async (essayText: string) => {
  // 서버에 essayText를 보내 채점 결과를 받아옴
  const result = await fetch(`${process.env.FLASK_SERVER_HIGH}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ essayText }),
  });

  const { exp, org, cont }: ScoringResponseDto = await result.json();

  // 각 채점 결과를 계산해서 반환Dto 생성
  const scoreResDto = await getEachScore(exp, org, cont);

  return scoreResDto;
};

export default getScoreResult;
