import React from 'react';
import clsx from 'clsx';

function WordTable({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'flex h-full flex-col gap-y-6 overflow-y-scroll bg-white px-4 py-6 text-center',
        className,
      )}
    >
      <table className="w-full flex-1 text-center">
        <thead>
          <tr className="bg-secondary-200 text-white">
            <td />
            <td className="h-8 border-l border-white px-1">용어</td>
            <td className="border-l border-white px-1">빈도수</td>
            <td className="border-l border-white px-1">품사</td>
          </tr>
        </thead>
        <tbody className="w-full">
          {Array(16)
            .fill(0)
            .map((v, i) => (
              <tr className="border-b">
                <td className="w-2/12 border-r">{i + 1}</td>
                <td className="w-4/12 border-r">나</td>
                <td className="w-2/12 border-r">{20 - i}</td>
                <td className="w-3/12">명사</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default WordTable;
