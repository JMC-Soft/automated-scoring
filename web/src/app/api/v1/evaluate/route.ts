import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/api/config/firebase.admin';

const docRef = db.collection('data').doc('data');

/**
 * TODO: 데이터를 받아 DB에 저장 후 해당 데이터를 AI Server로 보내는 로직
 */
export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log(data);

  await docRef.set({
    data,
  });

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
