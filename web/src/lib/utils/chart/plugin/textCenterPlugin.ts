import { Plugin } from 'chart.js';

export type TextCenterPluginOptions = {
  title: string;
  color?: string;
};

const textCenterPlugin = ({
  title,
  color,
}: TextCenterPluginOptions): Plugin<'doughnut'> => ({
  id: 'textCenter',
  afterDatasetsDraw: (chart) => {
    const { ctx } = chart;
    ctx.save();
    ctx.font = 'bold 1.75rem pretendard';
    ctx.fillStyle = color ?? '#000033';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      title,
      chart.getDatasetMeta(0).data[0].x,
      chart.getDatasetMeta(0).data[0].y,
    );
  },
});

export default textCenterPlugin;
