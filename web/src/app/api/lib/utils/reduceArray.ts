const reduceArray = <T, F>(arr: T[], callback: Function, initialVal: F) => {
  return arr.reduce((acc, cur) => callback(acc, cur), initialVal);
};

export default reduceArray;
