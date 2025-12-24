import { useState, useEffect } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const transcripts = [
  {
    text: '머리 안 쓰면 진짜 굳어요. 그거 풀면서 버텼어요.\n놀이가 아닌 생존방법이죠.\n부끄러워서 차마 스도쿠 보내달라고 말은 못했어요.',
    name: '김OO씨',
    age: 37,
    period: '3년 수감',
    released: '2024년 출소',
    category: '스도쿠',
  },
  {
    text: '유머책 하나로 방 전체가 돌려봤어요.\n웃을 일이 있어야 하루가 가요.\n그거 없으면 진짜 아무 말도 안 하고 하루가 끝나요.',
    name: '박OO씨',
    age: 45,
    period: '5년 수감',
    released: '2023년 출소',
    category: '유머',
  },
  {
    text: '면회 때 할 말이 없으면 가족도 점점 멀어져요.\n서로 뭘 물어봐야 할지 모르겠는 거예요.\n질문지 하나가 대화를 살렸어요.',
    name: '이OO씨',
    age: 29,
    period: '2년 수감',
    released: '2024년 출소',
    category: '100가지 질문',
  },
  {
    text: '나가는 날을 알고 나서부터 준비할 수 있었어요.\n그 전까진 그냥 버티는 거였는데,\n날짜가 생기니까 계획이 생기더라고요.',
    name: '최OO씨',
    age: 41,
    period: '4년 수감',
    released: '2023년 출소',
    category: '가석방 계산기',
  },
  {
    text: '나가자마자 일하려면 안에서 미리 따야 해요.\n바깥에서 뭐가 필요한지 알아야 준비를 하죠.\n그 정보가 없으면 막막해요.',
    name: '정OO씨',
    age: 33,
    period: '3년 수감',
    released: '2024년 출소',
    category: '직업훈련',
  },
];

export default function AudioInterviewSection() {
  const sectionRef = useScrollAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [audioBars, setAudioBars] = useState(Array(20).fill(8));

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / 30;
        if (newProgress >= 100) {
          setCurrentIndex((idx) => (idx + 1) % transcripts.length);
          return 0;
        }
        return newProgress;
      });

      // Animate audio bars
      setAudioBars(Array(20).fill(0).map(() => Math.random() * 24 + 8));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const transcript = transcripts[currentIndex];
  const time = `0:${String(currentIndex * 3).padStart(2, '0')}`;
  const totalProgress = (currentIndex * 20) + (progress / 5);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <div className="mb-12 fade-up">
          <p className="text-orange-500 font-medium mb-2">To Orange 인터넷편지 서비스</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            재소자들에게 바깥세상을 느끼게 해줄 유일한 창구
          </h2>
          <p className="text-gray-500">
            투오렌지는 편지를 대신 써주는 서비스를 넘어, 재소자가 고립된 공간에서도 세상의 온기와 삶의 흐름을 느낄 수 있게 합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Left: Audio + Interview */}
          <div className="flex flex-col gap-6 fade-up fade-up-delay-1">
            {/* Audio Player */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-end justify-center gap-[2px] h-8 mb-4">
                {audioBars.map((height, i) => (
                  <div
                    key={i}
                    className="w-1 bg-gray-300 rounded-full transition-all duration-100"
                    style={{ height: `${height}px` }}
                  />
                ))}
              </div>

              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                  <svg className="w-4 h-4 ml-1 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </div>
                <span className="text-gray-500 text-sm font-mono w-12">{time}</span>
                <div className="flex-1 h-1 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-orange-500 rounded-full transition-all"
                    style={{ width: `${totalProgress}%` }}
                  />
                </div>
                <span className="text-gray-500 text-sm font-mono w-12">0:15</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                  />
                </svg>
              </div>
              <p className="text-center text-gray-500 text-sm">🔇 이 목소리는 바깥에 들리지 않습니다.</p>
            </div>

            {/* Interview Text */}
            <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-50 rounded-2xl p-6 shadow-sm border border-yellow-100 flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-orange-500 font-mono text-sm">{time}</span>
                <span className="text-orange-400 text-sm font-medium">[{transcript.category}]</span>
              </div>
              <p className="text-gray-800 text-xl leading-relaxed whitespace-pre-line mb-4">
                "{transcript.text}"
              </p>
              <p className="text-gray-400 text-sm">
                — {transcript.name} ({transcript.age}) / {transcript.period} / {transcript.released}
              </p>
            </div>
          </div>

          {/* Right: Image */}
          <div className="flex items-center justify-center bg-gray-50 rounded-2xl p-8 fade-up fade-up-delay-2">
            <img
              src="https://github.com/heung-D/to-orange/blob/main/%EB%8F%99%EB%B4%89_%ED%9D%B0%EC%83%89%EB%B0%B0%EA%B2%BD.png?raw=true"
              alt="추가 옵션 - 콘텐츠 동봉"
              className="rounded-xl shadow-lg max-w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
