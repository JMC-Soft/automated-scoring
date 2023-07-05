interface DataPoint {
  x: number;
  y: number;
}

export default function createNormalDistData(
  mean: number,
  sd: number,
  start: number,
  end: number,
  step: number = 1,
): DataPoint[] {
  const data: DataPoint[] = [];
  for (let i = start; i <= end; i += step) {
    const x = i;
    const y =
      (1 / (sd * Math.sqrt(2 * Math.PI))) *
      Math.exp(-0.5 * ((x - mean) / sd) ** 2);
    data.push({ x, y });
  }
  return data;
}
