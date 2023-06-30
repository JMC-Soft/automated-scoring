'use client';

import { Fragment, useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

function HydrationZustand({ children }: Props) {
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait till Next.js rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return isHydrated ? <>{children}</> : null;
}

export default HydrationZustand;
