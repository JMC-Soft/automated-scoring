import React from 'react';
import Link from 'next/link';
import SignUpForm from '@/app/signup/components/SignUpForm';

function Page() {
  return (
    <div className="flex w-1/3 flex-col self-center justify-self-center text-xl">
      <SignUpForm />
    </div>
  );
}

export default Page;
