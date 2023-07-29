import React from 'react';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full p-4 desktopWide:aspect-[1/0.4484]">{children}</div>
  );
}

export default Layout;
