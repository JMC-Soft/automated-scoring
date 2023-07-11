import React from 'react';
import { BoxPlot } from '@/components/ui/Chart';
import { Statistic, SubStatistic } from '@/lib/types';

function BoxPlotView({
  total,
  exp,
  cont,
  org,
}: {
  total: Statistic;
  exp: SubStatistic;
  cont: SubStatistic;
  org: SubStatistic;
}) {
  return (
    <div className="bg-white px-3 py-2">
      <BoxPlot
        labels={['표현', '구성', '내용', '종합']}
        statistics={[total, exp, cont, org]}
        className="h-full w-full"
      />
    </div>
  );
}

export default BoxPlotView;
