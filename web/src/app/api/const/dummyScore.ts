const dummyScore = {
  exp: {
    title: '표현',
    detail: [
      { title: '문법의 적절성', score: 2, average: 2.4 },
      {
        title: '단어 사용의 적절성',
        score: 3,
      },
      {
        title: '문장 표현의 적절성',
        score: 3,
      },
    ],
  },
  org: {
    title: '구성',
    detail: [
      { title: '문단 내 구조의 적절성', score: 2, average: 2.4 },
      {
        title: '문단 간 구조의 적절성',
        score: 2,
      },
      {
        title: '구조의 일관성',
        score: 2,
      },
      {
        title: '분량의 적절성',
        score: 2,
      },
    ],
  },
  cont: {
    title: '내용',
    detail: [
      { title: '주제의 명료성', score: 2, average: 2.4 },
      {
        title: '근거의 적절성',
        score: 3,
      },
      {
        title: '프롬프트 독해력',
        score: 3,
      },
    ],
  },
  wordCloud: {
    준경: 10,
    큐티: 9,
    귀욤: 5,
    뽀짝: 7,
    귀여움: 8,
    한씨: 2,
    혼나야됨: 2,
    기집: 1,
  },
};

export default dummyScore;
