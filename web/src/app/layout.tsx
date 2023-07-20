import './globals.css';
import React from 'react';
import Header from '@/app/_components/Header';
import Footer from '@/app/_components/Footer';
import getUser from '@/lib/utils/api/getUser';
import StoreInitializer from '@/components/StoreInitializer';
import pretendard from '@/lib/constants/fonts';

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
    <html lang="ko">
      <body className={pretendard.variable}>
        <StoreInitializer user={user} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
