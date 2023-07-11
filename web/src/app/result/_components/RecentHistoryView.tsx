import React from 'react';

function RecentHistoryView() {
  return (
    <div className="col-start-5 row-start-2 row-end-4 flex flex-col items-center bg-white py-4">
      <h2 className="py-2 text-2xl">채점 기록</h2>
      {Array(3)
        .fill(0)
        .map(() => (
          <article className="grid-cols-recent-history grid-rows-recent-history grid w-full flex-1 gap-x-4 gap-y-1 px-6 py-1">
            <div className="flex h-fit items-center justify-center self-center rounded bg-accent-500 px-1.5 py-1 text-xs text-white shadow">
              글짓기
            </div>
            <h2 className="cursor-pointer text-lg font-semibold">
              나의 위인전
            </h2>
            <span className="self-end text-sm text-gray-400 ">3일 전</span>
            <div className="h-full w-0.5 justify-self-center rounded-full bg-gray-200 py-2" />
            <div className="col-span-2 flex flex-col justify-evenly">
              <div>
                <span className="font-bold">총점 :</span> 28
              </div>
              <div className="flex gap-x-2">
                <div>
                  <span className="font-bold">표현 :</span> 9
                </div>
                <div>
                  <span className="font-bold">구성 :</span> 10
                </div>
                <div>
                  <span className="font-bold">내용 :</span> 9
                </div>
              </div>
              <div>글자 수 : 1520자</div>
              <div>문장 수 : 30문장</div>
            </div>
          </article>
        ))}
      <div className="py-1 font-bold text-gray-500 underline underline-offset-4">
        채점 기록 보러가기
      </div>
    </div>
  );
}

export default RecentHistoryView;
