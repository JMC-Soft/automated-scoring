import ApiError from '@/app/api/lib/class/ApiError';

const fetchToWordCloudServer = async (essayText: string) => {
  try {
    const fetchResult = await fetch(`${process.env.WORD_CLOUD_SERVER}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ essayText }),
    });

    const result: { [key: string]: number } = await fetchResult.json();
    console.log('wordcloud 분석 결과: ', result);

    return result;
  } catch (err) {
    throw ApiError.handleError(err);
  }
};

export default fetchToWordCloudServer;
