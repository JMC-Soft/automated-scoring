import ApiError from '@/app/api/lib/class/ApiError';

const fetchToScoringServer = async (essayText: string, server: string) => {
  // 주제에 맞는 서버에 essayText를 보내 채점 결과를 받아옴
  try {
    const result = await fetch(server, {
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
