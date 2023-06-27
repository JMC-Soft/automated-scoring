import './globals.css';
import { Noto_Sans_KR } from 'next/font/google';
import React from 'react';
import Index from '@/components/ui/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata = {
  title: '한국어 에세이 자동채점',
  description: '한국어 에세이 자동채점 프로그램',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={notoSansKR.className}>
        <Index />
        <Sidebar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
