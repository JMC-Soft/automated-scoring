"use client";

import { ThreeCircles } from "react-loader-spinner";
import React from "react";

export default function Loading() {
  return (
    <div className="flex h-3/4 w-1/2 flex-col items-center justify-center gap-y-5 border-2 border-black text-gray-500">
      <ThreeCircles
        height="100"
        width="100"
        visible
        ariaLabel="three-circles-rotating"
        outerCircleColor="#15793E"
        innerCircleColor="#004529"
        middleCircleColor="#4CB063"
      />
      <span className="mt-4 text-2xl font-semibold">
        결과를 분석하고 있습니다.
      </span>
    </div>
  );
}
