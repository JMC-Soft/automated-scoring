import './globals.css';
import { Nanum_Gothic_Coding } from 'next/font/google';
import React from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
// import useAuthStore from '@/store/authStore';
// import getUser from '@/lib/utils/api/getUser';
// import StoreInitializer from '@/components/StoreInitializer';

const notoSansKR = Nanum_Gothic_Coding({
  weight: ['400', '700'],
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
    <html lang="en">
      <body className={notoSansKR.className}>
        {/* <StoreInitializer user={user} isLoggedIn={!!user} /> */}
        <Header />
        <Sidebar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
