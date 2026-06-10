"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { questions, breadPersonalities, calculateResult, BreadType } from "@/lib/quiz-data";

type Phase = "intro" | "quiz" | "result";

const INITIAL_SCORES: Record<BreadType, number> = {
  sweet: 0,
  buttery: 0,
  classic: 0,
  savory: 0,
};

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
  exit: (dir: number) => ({
    x: dir < 0 ? 60 : -60,
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.25, ease: "easeIn" as const },
  }),
};

const FLOATING_EMOJIS = ["🥐", "🍞", "🥖", "🧁", "🍩", "🥨", "🍰", "🫓"];

export default function BreadQuiz() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<BreadType, number>>(INITIAL_SCORES);
  const [direction, setDirection] = useState(1);
  const [resultType, setResultType] = useState<BreadType | null>(null);
  const [answerHistory, setAnswerHistory] = useState<string[]>([]);

  const question = questions[currentQ];
  const total = questions.length;
  const progress = ((currentQ + (selected ? 1 : 0)) / total) * 100;

  const handleSelect = useCallback(
    (answerId: string) => {
      if (selected) return;
      setSelected(answerId);

      const answer = question.answers.find((a) => a.id === answerId)!;
      const newScores = { ...scores };
      Object.entries(answer.scores).forEach(([key, val]) => {
        newScores[key as BreadType] += val;
      });

      setTimeout(() => {
        setScores(newScores);
        setAnswerHistory((prev) => [...prev, answerId]);
        setSelected(null);
        setDirection(1);

        if (currentQ < total - 1) {
          setCurrentQ((prev) => prev + 1);
        } else {
          const result = calculateResult(newScores);
          setResultType(result);
          setPhase("result");
        }
      }, 480);
    },
    [selected, question, scores, currentQ, total],
  );

  const handleBack = useCallback(() => {
    if (currentQ === 0 || selected) return;

    const prevQuestion = questions[currentQ - 1];
    const lastAnswerId = answerHistory[currentQ - 1];
    if (!lastAnswerId) return;

    const lastAnswer = prevQuestion.answers.find((a) => a.id === lastAnswerId);
    if (!lastAnswer) return;

    const newScores = { ...scores };
    Object.entries(lastAnswer.scores).forEach(([key, val]) => {
      newScores[key as BreadType] -= val;
    });

    setScores(newScores);
    setAnswerHistory((prev) => prev.slice(0, -1));
    setDirection(-1);
    setCurrentQ((prev) => prev - 1);
  }, [currentQ, selected, scores, answerHistory]);

  const handleRestart = () => {
    setPhase("intro");
    setCurrentQ(0);
    setScores(INITIAL_SCORES);
    setAnswerHistory([]);
    setSelected(null);
    setResultType(null);
    setDirection(1);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "#FFFBF5" }}>
      {/* Decorative blobs */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #fcd34d, transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #fb923c, transparent)" }}
      />

      <AnimatePresence mode="wait">
        {phase === "intro" && <IntroScreen key="intro" onStart={() => setPhase("quiz")} />}
        {phase === "quiz" && (
          <QuizScreen
            key="quiz"
            question={question}
            currentQ={currentQ}
            total={total}
            progress={progress}
            selected={selected}
            direction={direction}
            onSelect={handleSelect}
            onBack={handleBack}
          />
        )}
        {phase === "result" && resultType && (
          <ResultScreen key="result" resultType={resultType} scores={scores} onRestart={handleRestart} />
        )}
      </AnimatePresence>

      {/* Floating background emojis */}
      {FLOATING_EMOJIS.map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl select-none pointer-events-none opacity-10"
          style={{
            left: `${8 + ((i * 12.5) % 90)}%`,
            top: `${10 + ((i * 17) % 80)}%`,
          }}
          animate={{
            y: [0, -12, 0],
            rotate: [0, i % 2 === 0 ? 8 : -8, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  );
}

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
      exit={{ opacity: 0, y: -24, transition: { duration: 0.3 } }}
    >
      <motion.div
        className="text-7xl mb-6"
        animate={{ rotate: [-5, 5, -5], y: [0, -8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        🍞
      </motion.div>

      <div className="text-center mb-3">
        <span className="inline-block bg-amber-100 text-amber-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
          빵 성격 유형 테스트
        </span>
      </div>

      <h1 className="text-4xl font-black text-center text-stone-900 mb-3 leading-tight">
        나의 빵먹빵
        <br />
        <span className="text-amber-500">스타일</span>은?
      </h1>

      <p className="text-stone-500 text-center text-sm mb-10 max-w-xs leading-relaxed">
        10가지 질문으로 알아보는 나만의 빵 취향 유형 🥐
        <br />
        선택하면 바로 다음 문항으로 넘어가요
      </p>

      <motion.button
        className="relative px-10 py-4 rounded-2xl text-white font-bold text-lg shadow-lg overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)" }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={onStart}
      >
        <motion.div
          className="absolute inset-0 opacity-0 hover:opacity-100"
          style={{ background: "linear-gradient(135deg, #fbbf24 0%, #fb923c 100%)" }}
        />
        <span className="relative">테스트 시작하기 →</span>
      </motion.button>

      {/* <div className="flex items-center gap-6 mt-12">
        {["달콤 몽상가", "버터 요정", "담백 장인", "짭짤 탐험가"].map((label, i) => (
          <motion.div
            key={label}
            className="flex flex-col items-center gap-1"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
          >
            <span className="text-xl">{["🍓", "🥐", "🥖", "🧀"][i]}</span>
            <span className="text-[10px] text-stone-400 font-medium whitespace-nowrap">{label}</span>
          </motion.div>
        ))}
      </div> */}
    </motion.div>
  );
}

function QuizScreen({
  question,
  currentQ,
  total,
  progress,
  selected,
  direction,
  onSelect,
  onBack,
}: {
  question: (typeof questions)[0];
  currentQ: number;
  total: number;
  progress: number;
  selected: string | null;
  direction: number;
  onSelect: (id: string) => void;
  onBack: () => void;
}) {
  const canGoBack = currentQ > 0 && !selected;

  return (
    <motion.div
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1 bg-stone-200">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #f59e0b, #f97316)" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
        <div className="flex items-center justify-between px-5 pt-3 pb-2 bg-[#FFFBF5]/80 backdrop-blur-sm">
          <span className="text-xs font-semibold text-amber-600 tracking-wider">
            Q{currentQ + 1} / {total}
          </span>
          <div className="flex gap-1">
            {Array.from({ length: total }).map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{
                  background: i <= currentQ ? "#f59e0b" : "#e5e7eb",
                  transform: i === currentQ ? "scale(1.4)" : "scale(1)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Question area */}
      <div className="relative flex-1 flex flex-col px-6 pt-14 pb-10 max-w-md mx-auto w-full">
        {/* Back button - floating chip */}
        <AnimatePresence>
          {canGoBack && (
            <motion.button
              key="back"
              className="absolute left-6 top-11 z-20 flex items-center gap-1 text-[11px] font-bold text-stone-500 hover:text-amber-600 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-stone-200"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              whileHover={{ x: -2, borderColor: "#fbbf24" }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              aria-label="이전 질문"
            >
              <span className="text-xs leading-none">←</span>
              <span>이전 질문</span>
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={question.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-col pt-8"
          >
            {/* Editorial question header */}
            <motion.div
              className="mb-7"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.4 }}
            >
              {/* Discreet label with decorative line */}
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-[10px] tracking-[0.3em] text-amber-600 font-bold">
                  Q · {String(currentQ + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-amber-200 via-amber-100 to-transparent" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-stone-300 font-medium">
                  {String(total).padStart(2, "0")}
                </span>
              </div>

              {/* Question text - editorial */}
              <h2 className="text-[21px] font-semibold text-stone-900 leading-[1.55] whitespace-pre-line tracking-[-0.01em]">
                {question.question}
              </h2>
            </motion.div>

            {/* Refined answer cards */}
            <div className="flex flex-col gap-2.5">
              {question.answers.map((answer, i) => {
                const isSelected = selected === answer.id;
                const isOther = selected !== null && !isSelected;

                return (
                  <motion.button
                    key={answer.id}
                    className="group relative w-full rounded-2xl p-3.5 text-left overflow-hidden"
                    style={{
                      background: isSelected ? "#fffbeb" : "white",
                      border: `1.5px solid ${isSelected ? "#f59e0b" : "#f1efea"}`,
                      boxShadow: isSelected
                        ? "0 6px 20px rgba(245,158,11,0.18)"
                        : "0 1px 2px rgba(0,0,0,0.02)",
                      opacity: isOther ? 0.4 : 1,
                      cursor: selected ? "default" : "pointer",
                    }}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{
                      opacity: isOther ? 0.4 : 1,
                      y: 0,
                      transition: {
                        opacity: { duration: 0.2 },
                        y: { duration: 0.35, delay: 0.15 + i * 0.06, ease: "easeOut" },
                      },
                    }}
                    whileHover={
                      !selected
                        ? {
                            borderColor: "#fbbf24",
                            y: -2,
                            boxShadow: "0 6px 18px rgba(245,158,11,0.12)",
                          }
                        : {}
                    }
                    whileTap={!selected ? { scale: 0.985 } : {}}
                    onClick={() => onSelect(answer.id)}
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Letter badge - prominent */}
                      <div
                        className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-all"
                        style={{
                          background: isSelected
                            ? "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)"
                            : "#fafaf9",
                          color: isSelected ? "white" : "#a8a29e",
                          border: isSelected ? "0" : "1px solid #f1efea",
                          boxShadow: isSelected ? "0 2px 8px rgba(245,158,11,0.3)" : "none",
                        }}
                      >
                        {answer.id}
                      </div>

                      {/* Main text */}
                      <p
                        className="flex-1 font-bold text-[13.5px] leading-[1.45] whitespace-pre-line"
                        style={{ color: isSelected ? "#78350f" : "#292524" }}
                      >
                        {answer.text}
                      </p>

                      {/* Emoji accent */}
                      <motion.span
                        className="flex-shrink-0 text-[22px]"
                        animate={{
                          scale: isSelected ? 1.15 : 1,
                          rotate: isSelected ? [0, -8, 8, 0] : 0,
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        {answer.emoji}
                      </motion.span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function KakaoIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 3C6.477 3 2 6.582 2 11.027c0 2.836 1.8 5.332 4.52 6.852l-1.146 4.263c-.1.372.29.672.619.46L10.93 19.8A11.67 11.67 0 0 0 12 19.054c5.523 0 10-3.582 10-8.027C22 6.582 17.523 3 12 3z" />
    </svg>
  );
}

function ResultScreen({
  resultType,
  scores,
  onRestart,
}: {
  resultType: BreadType;
  scores: Record<BreadType, number>;
  onRestart: () => void;
}) {
  const personality = breadPersonalities[resultType];
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  const handleKakaoShare = () => {
    if (!window.Kakao?.isInitialized()) {
      alert("카카오 앱 키가 설정되지 않았습니다.\n.env.local에 NEXT_PUBLIC_KAKAO_APP_KEY를 입력해주세요.");
      return;
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? window.location.origin;

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `나의 빵 유형은 ${personality.emoji} ${personality.title}`,
        description: `${personality.subtitle}\n\n나도 어떤 빵 유형인지 테스트해보기 👇`,
        imageUrl: `${baseUrl}/api/og?type=${resultType}`,
        imageWidth: 800,
        imageHeight: 400,
        link: {
          webUrl: baseUrl,
          mobileWebUrl: baseUrl,
        },
      },
      buttons: [
        {
          title: "나도 테스트하기",
          link: {
            webUrl: baseUrl,
            mobileWebUrl: baseUrl,
          },
        },
      ],
    });
  };

  const typeLabels: Record<BreadType, string> = {
    sweet: "달콤",
    buttery: "버터",
    classic: "담백",
    savory: "짭짤",
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-start px-5 py-10 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full max-w-sm">
        {/* Result card */}
        <motion.div
          className="rounded-3xl overflow-hidden shadow-2xl mb-5"
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          {/* Header gradient */}
          <div
            className="relative px-7 pt-10 pb-8 text-center overflow-hidden"
            style={{ background: personality.gradient }}
          >
            {/* Sparkle decorations */}
            <motion.span
              className="absolute left-5 top-6 text-2xl select-none"
              animate={{ y: [0, -8, 0], rotate: [0, 14, 0], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              ✨
            </motion.span>
            <motion.span
              className="absolute right-7 top-10 text-xl select-none"
              animate={{ y: [0, -6, 0], rotate: [0, -10, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 0.4, ease: "easeInOut" }}
            >
              ⭐
            </motion.span>
            <motion.span
              className="absolute right-5 bottom-24 text-lg select-none"
              animate={{ scale: [1, 1.25, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: 0.8, ease: "easeInOut" }}
            >
              💫
            </motion.span>
            <motion.span
              className="absolute left-8 bottom-28 text-sm select-none"
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.2, ease: "easeInOut" }}
            >
              ✨
            </motion.span>
            <motion.span
              className="absolute left-1/2 top-3 text-xs select-none"
              animate={{ opacity: [0.3, 0.9, 0.3], y: [0, -4, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, delay: 0.6 }}
            >
              ✨
            </motion.span>

            {/* Emoji stage with glow + circle */}
            <motion.div
              className="relative inline-block mb-4"
              initial={{ scale: 0, rotate: -20 }}
              animate={{
                scale: 1,
                rotate: 0,
                transition: { delay: 0.25, type: "spring", stiffness: 240, damping: 18 },
              }}
            >
              {/* Glow */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-white/40 blur-2xl" />

              {/* Stage circle */}
              <motion.div
                className="relative w-28 h-28 rounded-full bg-white/35 backdrop-blur-sm flex items-center justify-center border-4 border-white/40 shadow-xl"
                animate={{ rotate: [-4, 4, -4], y: [0, -3, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-6xl drop-shadow-md">{personality.emoji}</span>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.45 } }}>
              <p className="text-white/85 text-xs font-semibold tracking-[0.2em] uppercase mb-1.5">
                나의 빵 유형
              </p>
              <h2 className="text-white text-3xl font-black mb-1.5 drop-shadow-sm">{personality.title}</h2>
              <p className="text-white/90 text-sm font-medium">{personality.subtitle}</p>
            </motion.div>
          </div>

          {/* Body */}
          <motion.div
            className="bg-white px-6 py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5 } }}
          >
            {/* Keywords */}
            <div className="flex flex-wrap gap-2 mb-5">
              {personality.keywords.map((kw) => (
                <span
                  key={kw}
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{
                    background: personality.cardGradient,
                    color: personality.accent,
                  }}
                >
                  # {kw}
                </span>
              ))}
            </div>

            {/* Summary highlights */}
            <div className="space-y-2 mb-6">
              {personality.summary.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                  style={{ background: personality.cardGradient }}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { delay: 0.6 + i * 0.1, duration: 0.35, ease: "easeOut" },
                  }}
                >
                  <span
                    className="text-lg w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0"
                    style={{ boxShadow: `0 2px 8px ${personality.accent}25` }}
                  >
                    {item.icon}
                  </span>
                  <span className="text-sm font-bold text-stone-800 leading-snug">{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Score bar */}
            <div className="mb-6">
              <p className="text-xs font-bold text-stone-400 tracking-wider uppercase mb-3">빵 취향 분포</p>
              <div className="space-y-2.5">
                {(Object.entries(scores) as [BreadType, number][])
                  .sort((a, b) => b[1] - a[1])
                  .map(([type, score]) => (
                    <div key={type} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-stone-500 w-10 text-right">{typeLabels[type]}</span>
                      <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: type === resultType ? personality.gradient : "#d6d3d1",
                          }}
                          initial={{ width: 0 }}
                          animate={{
                            width: `${totalScore > 0 ? (score / totalScore) * 100 : 0}%`,
                            transition: { delay: 0.6, duration: 0.8, ease: "easeOut" },
                          }}
                        />
                      </div>
                      <span className="text-xs text-stone-400 w-6">{score}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Recommended breads */}
            <div>
              <p className="text-xs font-bold text-stone-400 tracking-wider uppercase mb-3">추천 빵</p>
              <div className="grid grid-cols-2 gap-2">
                {personality.recommendedBreads.map((bread) => (
                  <div
                    key={bread.name}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-stone-700"
                    style={{ background: personality.cardGradient }}
                  >
                    <span>{bread.emoji}</span>
                    <span className="text-xs">{bread.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Kakao share button */}
        <motion.button
          className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2.5 mb-3"
          style={{ background: "#FEE500", color: "#3A1D1E" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.7 } }}
          whileHover={{ scale: 1.02, filter: "brightness(0.96)" }}
          whileTap={{ scale: 0.97 }}
          onClick={handleKakaoShare}
        >
          <KakaoIcon />
          카카오톡으로 공유하기
        </motion.button>

        {/* Restart button */}
        <motion.button
          className="w-full py-4 rounded-2xl font-bold text-base border-2 border-stone-200 text-stone-600 bg-white"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.8 } }}
          whileHover={{ scale: 1.02, borderColor: "#f59e0b", color: "#f59e0b" }}
          whileTap={{ scale: 0.97 }}
          onClick={onRestart}
        >
          🔁 다시 테스트하기
        </motion.button>

        <motion.p
          className="text-center text-xs text-stone-300 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.9 } }}
        >
          빵먹빵 스타일 테스트 🍞
        </motion.p>
      </div>
    </motion.div>
  );
}
