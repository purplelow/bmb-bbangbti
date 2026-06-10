"use client";

import Script from "next/script";

export default function KakaoScript() {
  const appKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;

  if (!appKey) return null;

  return (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init(appKey);
        }
      }}
    />
  );
}
