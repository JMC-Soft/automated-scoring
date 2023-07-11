import React from 'react';
import { BoxPlot } from '@/components/ui/Chart';

function BoxPlotView() {
  return (
    <div className="bg-white px-3 py-2">
      <BoxPlot className="h-full w-full" />
    </div>
  );
}

export default BoxPlotView;
