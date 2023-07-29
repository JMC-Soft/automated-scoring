const fetchToWordCloudServer = async (essayText: string) => {
  const fetchResult = await fetch(`${process.env.WORD_CLOUD_SERVER}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ essayText }),
  });

  const result: { [key: string]: number } = await fetchResult.json();

  return result;
};

export default fetchToWordCloudServer;
