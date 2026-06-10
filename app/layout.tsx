import type { Metadata } from "next";
import { IBM_Plex_Sans_KR, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import KakaoScript from "@/components/KakaoScript";

const plexSans = IBM_Plex_Sans_KR({
  variable: "--font-plex-sans",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_BASE_URL
    ? new URL(process.env.NEXT_PUBLIC_BASE_URL)
    : undefined,
  title: "빵먹빵 스타일 테스트 🍞",
  description:
    "11가지 질문으로 알아보는 나의 빵먹빵 유형 — 달콤 몽상가, 버터 요정, 담백 장인, 짭짤 탐험가 중 나는 어떤 빵일까?",
  openGraph: {
    title: "빵먹빵 스타일 테스트 🍞",
    description: "나는 어떤 빵 유형일까? 지금 바로 테스트해보세요!",
    images: ["/api/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className={`${plexSans.className} min-h-full flex flex-col`}>
        <KakaoScript />
        {children}
      </body>
    </html>
  );
}
