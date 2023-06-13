const UPLOAD_FILE_TYPE = {
    XLSX: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    XLS: "application/vnd.ms-excel",
    CSV: "text/csv",
};

const isValidFileType = (fileType: string):boolean => {
  return (
    fileType === UPLOAD_FILE_TYPE.XLSX ||
    fileType === UPLOAD_FILE_TYPE.XLS ||
    fileType === UPLOAD_FILE_TYPE.CSV
  );
}
export default isValidFileType;
