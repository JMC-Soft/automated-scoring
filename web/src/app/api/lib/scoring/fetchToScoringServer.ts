import ApiError from '@/app/api/lib/class/ApiError';

const fetchToScoringServer = async (essayText: string) => {
  // 주제에 맞는 서버에 essayText를 보내 채점 결과를 받아옴
  try {
    // if (type === '자기표현') {
    // }
    // if (type === '설득') {
    // }
    // if (type === '정보전달') {
    // }

    const result = await fetch(`${process.env.FLASK_SERVER_HIGH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ essayText }),
    });

    return await result.json();
  } catch (err) {
    throw ApiError.handleError(err);
  }
};

export default fetchToScoringServer;
