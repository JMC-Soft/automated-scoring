const scorePercentageCallback = (sum: number) => {
  return (acc: number, value: number, key: number) => {
    if (Number(key) < sum) {
      return acc + value;
    }
    return acc;
  };
};

export default scorePercentageCallback;
