export const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://automated-scoring.vercel.app/api/v1'
    : 'http://localhost:3000/api/v1';

export const EMAIL_REG_EXP = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

export const SUBJECTS = [
  {
    name: '초등학교',
    topics: [
      '카피레프트 운동에 대한 본인의 의견을 작성',
      '익명성에 대한 본인의 의견',
      '폭력 예방 방법',
      '과학의 발전에 대한 본인의 생각',
      '미디어 발전과 사용방법',
    ],
  },
  {
    name: '중학교',
    topics: [
      '에너지 절약에 대한 본인의 의견',
      '사회적 불평등에 대한 본인의 생각 작성',
      '비혼주의자에 대한 본인의 의견',
      '동물 사육에 대한 본인의 의견',
      '남한과 북한의 통일에 대한 본인의 생각',
    ],
  },
  {
    name: '고등학교',
    topics: [
      '생물학적으로 다른 남,여에 대한 본인의 생각 작성',
      '지적 재산권에 대한 본인의 생각 작성',
      '평가에 대한 본인의 의견',
      '나의 위인전',
      '소중함을 잃었던 경험',
    ],
  },
];

export enum GradeMap {
  'E' = 1,
  'D' = 2,
  'C' = 3,
  'B' = 4,
  'A' = 5,
}
