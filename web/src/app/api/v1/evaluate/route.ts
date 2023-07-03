import { type NextRequest, NextResponse } from 'next/server';
import saveEssay from '@/app/api/repository/essay/saveEssay';

/**
 * TODO: 데이터를 받아 DB에 저장 후 해당 데이터를 AI Server로 보내는 로직
 */
export async function POST(req: NextRequest) {
  const { topic, essayText } = await req.json();
  await saveEssay({ topic, essayText });

  // AI 서버로 보내 결과를 받아왔다고 가정.
  // const result = await fetch('http://localhost:5000/high', {
  //   method: 'POST',
  // });

  const dummyData = {
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
  };

  return NextResponse.json(dummyData, { status: 200 });
}

export async function GET() {
  console.log('GET');
}
