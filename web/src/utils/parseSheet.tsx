import { read, utils } from "xlsx";

const filter = async (jsonData: Array<any>) => {
  await jsonData.forEach((data) => {
    if (!data)
      throw new Error(
        "파일의 형식이 잘못되었습니다. \n 지정된 형식을 따라주세요."
      );
    if (Object.keys(data).length > 1)
      throw new Error(
        "파일의 형식이 잘못되었습니다. \n 지정된 형식을 따라주세요."
      );
  });
};

const parseSheet = async (file: File) => {
  if (!file) return;
  const fileData = await file.arrayBuffer();
  const workBook = read(fileData);
  const workSheet = workBook.Sheets[workBook.SheetNames[0]];
  const jsonData =  utils.sheet_to_json(workSheet);

  await filter(jsonData);
  return jsonData;
};

export default parseSheet;
