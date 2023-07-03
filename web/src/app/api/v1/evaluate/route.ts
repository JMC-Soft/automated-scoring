import { type NextRequest, NextResponse } from 'next/server';
import saveEssay from '@/app/api/repository/essay/saveEssay';
import { HIGH_DATA_TOTAL_NUMBER } from '@/app/api/const/dataSet';
import countEssay from '@/app/api/repository/essay/countEssay';

export async function POST(req: NextRequest) {
  const { topic, essayText } = await req.json();
  await saveEssay({ topic, essayText });

  /**
   * TODO: AI Server로 essayText를 보내고 결과를 받아오는 과정 추가로 구현해야함.
   */
  // const result = await fetch('http://localhost:5000/high', {
  //   method: 'POST',
  // });

  const highCount = await countEssay();
  const candidate = HIGH_DATA_TOTAL_NUMBER + highCount;

  const dummyData = {
    candidate,
    scoreResult: {
      totalScore: 20,
      totalPercentage: 15.1,
      exp: {
        score: 5,
        average: 5,
        grade: 3,
        sub: [3, 2, 1],
      },
      org: {
        score: 5,
        average: 5,
        grade: 2,
        sub: [2, 2, 1, 3],
      },
      con: {
        score: 3,
        average: 3,
        grade: 5,
        sub: [1, 1, 1],
      },
    },
  };

  return NextResponse.json(dummyData, { status: 200 });
}

export async function GET() {
  console.log('GET');
}
