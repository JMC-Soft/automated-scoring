const getGrade = (score: number, MAX_SCORE: number): 'A' | 'B' | 'C' => {
  if (score >= MAX_SCORE * 0.9) {
    return 'A';
  }
  if (score >= MAX_SCORE * 0.8) {
    return 'B';
  }

  return 'C';
};

export default getGrade;
