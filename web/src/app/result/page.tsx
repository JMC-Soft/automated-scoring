'use client';

import React, { useState } from 'react';
import ResultSection from '@/components/ResultSection';
import ReviewSection from '@/components/ReviewSection';

function Page() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="relative flex">
      <ReviewSection isOpen={isOpen} setIsOpen={setIsOpen} />
      <ResultSection />
    </main>
  );
}

export default Page;
