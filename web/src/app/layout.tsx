import './globals.css';
import { Nanum_Gothic } from 'next/font/google';
import React from 'react';
import clsx from 'clsx';
import Header from '@/components/ui/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
// import useAuthStore from '@/store/authStore';
// import getUser from '@/lib/utils/api/getUser';
// import StoreInitializer from '@/components/StoreInitializer';

const notoSansKR = Nanum_Gothic({
  weight: ['400', '700', '800'],
  subsets: ['latin'],
});

export const metadata = {
  title: '한국어 에세이 자동채점',
  description: '한국어 에세이 자동채점 프로그램',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = await getUser();

  // if (user) {
  //   useAuthStore.setState({ user, isLoggedIn: true });
  // }

  return (
    <html lang="en" className="min-h-screen">
      <body
        className={clsx(
          'grid min-h-screen grid-cols-body grid-rows-body',
          notoSansKR.className,
        )}
      >
        {/* <StoreInitializer user={user} isLoggedIn={!!user} /> */}
        <Header />
        <Sidebar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
