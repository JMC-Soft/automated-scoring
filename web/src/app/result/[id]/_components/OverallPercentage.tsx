'use client';

import React from 'react';
import HalfDoughnutChart from "@/components/ui/Chart/HalfDoughnutChart";

function OverallPercentage({ percentage }: { percentage: number }) {
  return (
    <div className="col-start-1 col-end-2 flex flex-col items-center bg-white py-4">
      <HalfDoughnutChart percentage={percentage} className="w-48 px-6" />
    </div>
  );
}

export default OverallPercentage;
