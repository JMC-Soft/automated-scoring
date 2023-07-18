import React from 'react';
import { API_BASE_URL } from '@/lib/constants/constants';
import ResultView from '@/app/result/[id]/_components/ResultView';
import { EssayResult } from '@/lib/types';

async function Page({ params }: { params: { id: string } }) {
  const res = await fetch(`${API_BASE_URL}/evaluate/${params.id}/result`);
  const data: EssayResult = await res.json();

  return (
    <div className="h-[calc(100vh-4rem)] p-4">
      <ResultView data={data} />
    </div>
  );
}

export default Page;
