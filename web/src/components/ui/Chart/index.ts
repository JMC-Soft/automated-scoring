import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
  ArcElement,
} from 'chart.js';

export { RadarChart } from './RadarChart';
export { TwiceBarChart } from './TwiceBarChart';
export { HalfDoughnutChart } from './HalfDoughnutChart';
export { DoughnutChart } from './DoughnutChart';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  ArcElement,
);
