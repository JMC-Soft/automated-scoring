import { NextRequest, NextResponse } from 'next/server';
import ApiError from '@/app/api/lib/class/ApiError';
import findEssayById from '@/app/api/repository/essay/findEssayById';
import {
  EssayEntity,
  EssayResponseDto,
  ScoringResponseDto,
  Statistics,
} from '@/app/api/lib/types';
import findEssayByUidAndOrderBy from '@/app/api/repository/essay/findEssayByUidAndOrderBy';
import {
  CONT_STATISTICS,
  EXP_STATISTICS,
  HIGH_DATA_TOTAL_NUMBER,
  ORG_STATISTICS,
  TOTAL_STATISTICS,
} from '@/app/api/const/dataSet';
import reduceObject from '@/app/api/lib/utils/reduceObject';
import calculateGrade from '@/app/api/lib/scoring/calculateGrade';

export async function GET(
  req: NextRequest,
  { params }: { params: { essayId: string } },
) {
  try {
    const { essayId: rawEssayId } = params;
    const essayId = rawEssayId.replace(/"/g, '');

    // EssayId로 EssayEntity를 찾아서 반환
    const essayEntity: EssayEntity = await findEssayById(essayId);

    // 사용자 정보로 ScoringResult 세개를 찾아서 반환
    let resultHistory = null;
    if (essayEntity.uid) {
      const docs = await findEssayByUidAndOrderBy({
        uid: essayEntity.uid,
        orderBy: 'createdAt',
        orderType: 'desc',
        N: 3,
      });

      resultHistory = docs.map((doc) => {
        const { uid: essayUid, ...remainEssay } = doc.data() as EssayEntity;
        const res: EssayResponseDto & { essayId: string } = {
          ...remainEssay,
          essayId: doc.id,
        };
        return res;
      });
    }
    const sr = essayEntity.scoringResult;
    if (!sr) {
      throw new ApiError('채점 결과가 없습니다.', 404, '채점 결과가 없습니다.');
    }

    // essayEntity 중에서 필요한 것만 추출하고, scoringResult 에서 결과값을 재조합하여 반환한다.
    const { countCharacters, countSentences, total, exp, org, cont } = sr;

    const percentageCallback = (sum: number) => {
      return (acc: number, value: number, key: number) => {
        if (Number(key) < sum) {
          return acc + value;
        }
        return acc;
      };
    };

    const subResult = (
      STATISTICS: Statistics,
      sum: number,
      title: string = '종합',
    ) => {
      const { data, standardDeviation, ...remainStatistics } = STATISTICS;

      return {
        score: sum,
        grade: calculateGrade(sum, STATISTICS.max),
        title,
        percentage: Math.round(
          (reduceObject(STATISTICS.data, percentageCallback(sum), 0) /
            HIGH_DATA_TOTAL_NUMBER) *
            100,
        ),
        ...remainStatistics,
      };
    };
    const res: ScoringResponseDto = {
      countCharacters, // 글자수
      countSentences, // 문장수
      text: essayEntity.essayText,
      topic: essayEntity.topic,
      type: essayEntity.type,
      createdAt: essayEntity.createdAt,

      total: {
        ...subResult(TOTAL_STATISTICS, total.score),
      },
      exp: {
        ...subResult(EXP_STATISTICS, exp.score, exp.title),
        detail: exp.detail,
      },
      org: {
        ...subResult(ORG_STATISTICS, org.score, org.title),
        detail: org.detail,
      },
      cont: {
        ...subResult(CONT_STATISTICS, cont.score, cont.title),
        detail: cont.detail,
      },

      resultHistory,
    };

    return NextResponse.json(res, { status: 200 });
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ msg: err.resMessage }, { status: err.status });
    }

    console.log('stack: GET /api/v1/evaluate/[essayId]/result');
    console.log(err);
    return NextResponse.json({ msg: '서버 오류입니다.' }, { status: 500 });
  }
}

export async function POST() {
  return NextResponse.json({ msg: '잘못된 요청입니다.' }, { status: 404 });
}
