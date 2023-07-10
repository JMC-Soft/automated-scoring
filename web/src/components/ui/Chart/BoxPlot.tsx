'use client';

import React from 'react';

import { VictoryBoxPlot } from 'victory-box-plot';
import { VictoryScatter } from 'victory-scatter';
import { VictoryChart } from 'victory-chart';
import { VictoryAxis } from 'victory-axis';
import hexToRGBA from '@/lib/utils/colors';
import COLORS from '@/lib/constants/colors';

type Props = {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  point: number;
  categoryList: string[];
};

function BoxPlot({ min, q1, median, q3, max, point, categoryList }: Props) {
  return (
    <div className="bg-white px-2">
      <VictoryChart domainPadding={{ x: 25 }} domain={{ y: [0, 30] }}>
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: COLORS.text[500] }, // change color as needed
            ticks: { stroke: COLORS.text[500] }, // change color as needed
            tickLabels: {
              fontSize: 16,
              fontFamily: 'pretendard',
              fill: COLORS.text[500],
            },
          }}
        />
        <VictoryAxis // this is for the x-axis
          style={{
            axis: { stroke: COLORS.text[500] }, // change color as needed
            ticks: { stroke: COLORS.text[500] }, // change color as needed
            tickLabels: {
              fontSize: 16,
              fontFamily: 'pretendard',
              fill: COLORS.text[500],
            },
          }}
        />
        <VictoryBoxPlot
          horizontal
          style={{
            min: { stroke: COLORS.primary[500] },
            max: { stroke: COLORS.primary[500] },
            q1: {
              fill: hexToRGBA(COLORS.primary[500], 0.3),
              stroke: COLORS.primary[500],
            },
            q3: {
              fill: hexToRGBA(COLORS.primary[500], 0.3),
              stroke: COLORS.primary[500],
            },
            median: { stroke: COLORS.primary[500] },
            minLabels: { fill: COLORS.primary[500] },
            maxLabels: { fill: COLORS.primary[500] },
          }}
          data={categoryList.map((category) => {
            if (category === '총합')
              return {
                x: category,
                min,
                median, // q2 is the median
                q1,
                q3,
                max,
              };

            return {
              x: category,
              min: 3,
              median: 6, // q2 is the median
              q1: 4,
              q3: 7,
              max: 9,
            };
          })}
        />
        <VictoryScatter
          style={{ data: { fill: COLORS.accent[500] } }} // change color as needed
          size={3}
          data={categoryList.map((category) => {
            if (category === '총합')
              return {
                x: category,
                y: point,
              };
            return {
              x: category,
              y: 8,
            };
          })}
        />
      </VictoryChart>
    </div>
  );
}

export default BoxPlot;
