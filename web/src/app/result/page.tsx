'use client';

import React, { useState } from 'react';
import ResultSection from './_components/ResultSection';
import ReviewSection from '@/components/ReviewSection';
import useStore from '@/lib/hooks/useStore';
import useEssayStore from '@/store/essayStore';

function Page() {
  const data = useStore(useEssayStore, (state) => state.result);
  const [isOpen, setIsOpen] = useState(false);

  if (!data) return null;

  return (
    <main className="bg-gradient-gray relative flex">
      <ReviewSection data={data} isOpen={isOpen} setIsOpen={setIsOpen} />
      <ResultSection data={data} />
    </main>
  );
}

export default Page;
