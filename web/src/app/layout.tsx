import './globals.css';
import { Roboto } from 'next/font/google';
import React from 'react';
import clsx from 'clsx';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TapBar from '@/components/TapBar';
import getUser from '@/lib/utils/api/getUser';
import StoreInitializer from '@/components/StoreInitializer';

const notoSansKR = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-noto-sans-kr',
  preload: false,
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
  const user = await getUser();

  return (
    <html lang="en" className="min-h-screen">
      <body
        className={clsx(
          'grid min-h-screen grid-cols-body grid-rows-body',
          notoSansKR.variable,
        )}
      >
        <StoreInitializer user={user} isLoggedIn={!!user} />
        <Header />
        <TapBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
