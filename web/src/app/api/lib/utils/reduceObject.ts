const reduceObject = <T>(
  obj: { [key: string | number]: T },
  callback: Function,
  initialVal: T,
) => {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => callback(acc, value, key),
    initialVal,
  );
};

export default reduceObject;
