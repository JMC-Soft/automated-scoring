import ApiError from '@/app/api/lib/class/ApiError';
import TOPIC_ID_SERVER_MAP from '@/app/api/const/topicIdServerMap';
import fetchToWordCloudServer from '@/app/api/lib/wordCloud/fetchToWordCloudServer';

const fetchToScoringServer = async (
  essayText: string,
  id: keyof typeof TOPIC_ID_SERVER_MAP,
) => {
  // 주제에 맞는 서버에 essayText를 보내 채점 결과를 받아옴
  try {
    const URL_MAP = TOPIC_ID_SERVER_MAP[id];

    const scoringList = Object.values(URL_MAP).map(async (url) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ essayText }),
      });

      const result = await res.json();
      console.log(result, url);
      return result;
    });

    // wordCloud 추가
    const wordCloud = fetchToWordCloudServer(essayText);
    scoringList.push(wordCloud);

    const fetchResult = await Promise.all(scoringList);

    return fetchResult;
  } catch (err) {
    throw ApiError.handleError(err);
  }
};

export default fetchToScoringServer;
