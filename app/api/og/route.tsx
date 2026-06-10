import { ImageResponse } from "next/og";

const config = {
  sweet: {
    title: "달콤 몽상가",
    subtitle: "세상 모든 단 빵을 사랑하는 당신",
    bg: "#f43f5e",
    emoji: "🍓",
  },
  buttery: {
    title: "버터 요정",
    subtitle: "고소함의 끝판왕, 버터의 화신",
    bg: "#f59e0b",
    emoji: "🥐",
  },
  classic: {
    title: "담백 장인",
    subtitle: "기본 빵의 진정한 가치를 아는 사람",
    bg: "#92400e",
    emoji: "🥖",
  },
  savory: {
    title: "짭짤 탐험가",
    subtitle: "자극적인 풍미를 쫓는 미식 모험가",
    bg: "#ea580c",
    emoji: "🧀",
  },
} as const;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = (searchParams.get("type") ?? "sweet") as keyof typeof config;
  const c = config[type] ?? config.sweet;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: c.bg,
          color: "white",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Background circles */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 240,
            height: 240,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -40,
            left: -40,
            width: 180,
            height: 180,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.08)",
          }}
        />

        <div style={{ fontSize: 100, marginBottom: 16, display: "flex" }}>
          {c.emoji}
        </div>

        <div
          style={{
            fontSize: 20,
            opacity: 0.85,
            marginBottom: 10,
            letterSpacing: "0.15em",
            display: "flex",
          }}
        >
          나의 빵먹빵 유형은
        </div>

        <div
          style={{
            fontSize: 60,
            fontWeight: 900,
            display: "flex",
            marginBottom: 12,
          }}
        >
          {c.title}
        </div>

        <div
          style={{
            fontSize: 22,
            opacity: 0.8,
            display: "flex",
            marginBottom: 36,
          }}
        >
          {c.subtitle}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 28px",
            border: "2px solid rgba(255,255,255,0.5)",
            borderRadius: 40,
            fontSize: 18,
            opacity: 0.9,
          }}
        >
          나도 테스트해보기 →
        </div>
      </div>
    ),
    { width: 800, height: 400 }
  );
}
