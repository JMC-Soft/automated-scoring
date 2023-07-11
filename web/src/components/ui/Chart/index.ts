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
  LineElement,
} from 'chart.js';
import {
  BoxPlotController,
  BoxAndWiskers,
} from '@sgratzl/chartjs-chart-boxplot';

export { RadarChart } from './RadarChart';
export { TwiceBarChart } from './TwiceBarChart';
export { HalfDoughnutChart } from './HalfDoughnutChart';
export { DoughnutChart } from './DoughnutChart';
export { BoxPlot } from './BoxPlot';

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
  LineElement,
  BoxPlotController,
  BoxAndWiskers,
);
