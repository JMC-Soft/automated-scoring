const makeCreatedAt = () => {
  const date = new Date();

  const pad = (num: number) => {
    return String(num).padStart(2, '0');
  };

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  const createdAt = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return createdAt;
};

export default makeCreatedAt;
