export default function calcDayDiff(startDate: Date, endDate: Date) {
  const msInDay = 24 * 60 * 60 * 1000;

  return Math.round(
    Math.abs(endDate.getTime() - startDate.getTime()) / msInDay,
  );
}
