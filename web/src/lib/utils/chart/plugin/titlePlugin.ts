import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { TitleOptions } from 'chart.js';
import pretendard from '@/lib/constants/fonts';

export default function titlePlugin({
  title,
  size = 16,
  weight = '500',
  position = 'top',
}: TitlePluginOptions): _DeepPartialObject<TitleOptions> | undefined {
  return {
    display: true,
    position,
    text: title,
    font: {
      size,
      weight,
      family: pretendard.style.fontFamily,
    },
  };
}

export type TitlePluginOptions = {
  title: string;
  size?: number;
  weight?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
};
