import React from 'react';
import { SubStatistic } from '@/lib/types';
import BoxPlot from '@/components/ui/Chart/BoxPlot';

function BoxPlotView({
  exp,
  cont,
  org,
}: {
  exp: SubStatistic;
  cont: SubStatistic;
  org: SubStatistic;
}) {
  return (
    <div className="bg-white px-3 py-2">
      <BoxPlot
        labels={['표현', '구성', '내용']}
        statistics={[exp, org, cont]}
        className="h-full w-full"
      />
    </div>
  );
}

export default BoxPlotView;
