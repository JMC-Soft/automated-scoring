import { type NextRequest, NextResponse } from 'next/server';
import saveEssay from '@/app/api/repository/essay/saveEssay';
import getScoringResult from '@/app/api/lib/scoring/getScoringResult';

export async function POST(req: NextRequest) {
  const { topic, essayText } = await req.json();

  // essay를 db에 저장
  await saveEssay({ topic, essayText });

  // essay를 scoring server에 보내 채점 결과 객체를 반환
  const scoreResDto = await getScoringResult(essayText);

  return NextResponse.json(scoreResDto, { status: 200 });
}

export async function GET() {
  console.log('GET');
}
