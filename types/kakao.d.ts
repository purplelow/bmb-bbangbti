interface KakaoShareLink {
  webUrl?: string;
  mobileWebUrl?: string;
  androidExecutionParams?: string;
  iosExecutionParams?: string;
}

interface KakaoShareContent {
  title: string;
  imageUrl: string;
  imageWidth?: number;
  imageHeight?: number;
  description?: string;
  link: KakaoShareLink;
}

interface KakaoShareButton {
  title: string;
  link: KakaoShareLink;
}

interface KakaoShareFeedOptions {
  objectType: "feed";
  content: KakaoShareContent;
  social?: {
    likeCount?: number;
    commentCount?: number;
    sharedCount?: number;
    viewCount?: number;
  };
  buttons?: KakaoShareButton[];
}

declare global {
  interface Window {
    Kakao?: {
      init: (apiKey: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: KakaoShareFeedOptions) => void;
      };
    };
  }
}

export {};
