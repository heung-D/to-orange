import { useState, useEffect, useCallback } from 'react';

const aiDemoData = {
  greeting: {
    before: '안녕. 잘 지내?',
    after: '안녕, 잘 지내고 있는지 궁금해서 편지를 써본다.<br>많이 보고 싶었고, 네 소식을 기다렸단다.<br>언제나 너를 생각하고 있다는 거 잊지 마렴.',
    label: '인사말',
  },
  middle: {
    before: '요즘 많이 힘들지?',
    after: '요즘 많이 힘드시죠? 저도 그 마음 충분히 이해해요. 지금 당장은 어둡고 막막하게 느껴지겠지만, 이 시간도 분명 지나갈 거예요.',
    label: '중간',
  },
  closing: {
    before: '건강해. 또 연락할게.',
    after: '항상 건강하시길 바라요. 멀리서 늘 응원하고 있을게요. 다음에 또 편지 쓸게요. 사랑합니다.',
    label: '마무리',
  },
};

const reviews = [
  '"아버지가 울으셨대요" - 김OO님',
  '"10년만에 연락했어요" - 이OO님',
  '"면회 때 편지 얘기만 했대요" - 박OO님',
  '"출소하면 꼭 보답하겠다고..." - 최OO님',
  '"엄마한테 처음 사과했어요" - 정OO님',
  '"동생이 답장을 보내왔어요" - 강OO님',
];

const avatarStyles = [
  { bg: 'bg-orange-400', text: 'text-white' },
  { bg: 'bg-orange-100', text: 'text-orange-500' },
  { bg: 'bg-amber-100 border-orange-200', text: 'text-orange-500' },
  { bg: 'bg-orange-300', text: 'text-white' },
  { bg: 'bg-orange-500', text: 'text-white' },
];

const names = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임'];

export default function HeroSection() {
  const [liveCount, setLiveCount] = useState(84);
  const [todayCount, setTodayCount] = useState(1234);
  const [currentReview, setCurrentReview] = useState(reviews[0]);
  const [reviewVisible, setReviewVisible] = useState(true);
  const [avatars, setAvatars] = useState(
    names.slice(0, 5).map((name, i) => ({ name, style: avatarStyles[i] }))
  );

  const [activePart, setActivePart] = useState('greeting');
  const [beforeText, setBeforeText] = useState('');
  const [afterText, setAfterText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAfter, setShowAfter] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isGrayscale, setIsGrayscale] = useState(true);

  // Typing animation
  const typeText = useCallback((text, setter, isHtml = false, callback) => {
    setIsTyping(true);
    let i = 0;
    let current = '';

    const type = () => {
      if (i < text.length) {
        if (isHtml && text.substr(i, 4) === '<br>') {
          current += '<br>';
          i += 4;
        } else {
          current += text.charAt(i);
          i++;
        }
        setter(current);
        setTimeout(type, Math.random() * 30 + 20);
      } else {
        setIsTyping(false);
        callback?.();
      }
    };
    type();
  }, []);

  const applyAI = useCallback(
    (part) => {
      if (isTyping) return;

      setActivePart(part);
      setBeforeText('');
      setAfterText('');
      setIsLoading(false);
      setShowAfter(false);
      setIsGrayscale(true);

      const data = aiDemoData[part];

      typeText(data.before, setBeforeText, false, () => {
        setIsLoading(true);

        setTimeout(() => {
          setIsLoading(false);
          setShowAfter(true);
          setIsGrayscale(false);
          typeText(data.after, setAfterText, true);
        }, 1000);
      });
    },
    [isTyping, typeText]
  );

  // Auto-play on mount
  useEffect(() => {
    const timer = setTimeout(() => applyAI('greeting'), 500);
    return () => clearTimeout(timer);
  }, []);

  // Live count animation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount((prev) => {
        const change = Math.floor(Math.random() * 7) - 3;
        return Math.max(72, Math.min(96, prev + change));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Today count animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTodayCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Review roller
  useEffect(() => {
    const interval = setInterval(() => {
      setReviewVisible(false);
      setTimeout(() => {
        setCurrentReview((prev) => {
          const idx = reviews.indexOf(prev);
          return reviews[(idx + 1) % reviews.length];
        });
        setReviewVisible(true);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Avatar swap
  useEffect(() => {
    const interval = setInterval(() => {
      setAvatars((prev) => {
        const newAvatars = [...prev];
        const idx = Math.floor(Math.random() * newAvatars.length);
        newAvatars[idx] = {
          name: names[Math.floor(Math.random() * names.length)],
          style: avatarStyles[Math.floor(Math.random() * avatarStyles.length)],
        };
        return newAvatars;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className={`bg-white py-16 md:py-24 overflow-hidden relative transition-all duration-1000 ${
        isGrayscale ? 'grayscale' : ''
      }`}
    >
      {/* Animated Glow Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ transform: 'scaleX(-1)' }}>
        <div className="absolute -top-20 -left-20 w-[600px] h-[600px] animate-glow-move">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-300/25 via-yellow-200/20 to-transparent blur-3xl"></div>
        </div>
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] animate-glow-pulse">
          <div className="w-full h-full rounded-full bg-gradient-to-bl from-yellow-300/20 via-orange-200/15 to-transparent blur-3xl"></div>
        </div>
        <div className="absolute -bottom-32 left-1/3 w-[700px] h-[400px] animate-glow-scale">
          <div className="w-full h-full rounded-full bg-gradient-to-t from-orange-200/15 via-yellow-100/10 to-transparent blur-3xl"></div>
        </div>
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] animate-glow-fade">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-400/15 to-yellow-300/10 blur-2xl"></div>
        </div>
      </div>

      {/* Left Arrow */}
      <button className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:text-orange-500 hover:border-orange-200 transition-all z-20">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Arrow */}
      <button className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:text-orange-500 hover:border-orange-200 transition-all z-20">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Text + Button */}
          <div className="flex-1 text-center lg:text-left">
            {/* Live Users */}
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="flex -space-x-2">
                {avatars.map((avatar, i) => (
                  <div
                    key={i}
                    className={`live-avatar w-8 h-8 rounded-full ${avatar.style.bg} border border-white flex items-center justify-center ${avatar.style.text} text-xs font-light shadow-sm`}
                    style={{ animationDelay: `${i * 0.1}s, ${i * 0.1 + 0.5}s` }}
                  >
                    {avatar.name}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                <span className="text-sm text-gray-600">
                  <span className="font-bold text-orange-500">{liveCount}</span>명 접속 중
                </span>
              </div>
            </div>

            <h1 className="text-[44px] font-bold text-gray-900 leading-tight mb-4">
              AI가 당신의 마음을
              <br />
              더 따뜻하게 전해드려요
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">편지 쓰기부터 발송까지, 온라인으로 한 번에</p>

            <a
              href="/letter-service"
              className="cta-btn group relative inline-flex items-center justify-center bg-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105"
            >
              <span className="leaf-1 absolute -top-4 right-0 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 delay-100">
                <svg className="w-7 h-7 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
                </svg>
              </span>
              편지 쓰러 가기
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* Live Counter + Review */}
            <div className="mt-8 flex flex-col items-center lg:items-start gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>오늘 발송된 편지</span>
                <span className="font-bold text-orange-500 tabular-nums">{todayCount.toLocaleString()}</span>
                <svg className="w-3 h-3 text-orange-500 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4l8 8H4z" />
                </svg>
              </div>

              <div className="flex items-center gap-2 text-sm overflow-hidden h-5">
                <div className="flex items-center gap-0.5 shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <div className="relative overflow-hidden h-5 min-w-[200px]">
                  <p
                    className={`text-gray-600 whitespace-nowrap transition-all duration-500 ${
                      reviewVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                    }`}
                  >
                    {currentReview}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: AI Demo */}
          <div className="flex-1 w-full max-w-lg">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <span className="text-xs text-gray-400">{aiDemoData[activePart].label} 다듬기</span>
                <div className="w-16"></div>
              </div>

              <div className="p-6 min-h-[420px]">
                {/* Before */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-gray-400 font-medium">BEFORE</span>
                    <span className="text-xs text-gray-300">내가 쓴 문장</span>
                  </div>
                  <div className="bg-gray-100 rounded-xl p-4 border border-gray-200 min-h-[60px]">
                    <p className="text-gray-500 leading-relaxed text-sm">
                      {beforeText}
                      {isTyping && !showAfter && (
                        <span className="inline-block w-0.5 h-4 bg-gray-400 ml-0.5 animate-pulse"></span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Loading */}
                {isLoading && (
                  <div className="mb-4">
                    <div className="flex items-center justify-center gap-3 py-6">
                      <svg className="w-5 h-5 text-orange-500 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span className="text-sm text-orange-500 font-medium">AI로 마음전하기 변환 중...</span>
                    </div>
                  </div>
                )}

                {/* After */}
                {showAfter && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-orange-500 font-medium">AFTER</span>
                      <span className="text-xs text-orange-400">AI가 다듬은 문장</span>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-4 border border-orange-200 min-h-[120px]">
                      <p
                        className="text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: afterText }}
                      />
                      {isTyping && (
                        <span className="inline-block w-0.5 h-5 bg-orange-500 ml-0.5 animate-pulse"></span>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm text-gray-500 font-medium">✨ AI 다듬기</span>
                  <div className="flex gap-2">
                    {Object.entries(aiDemoData).map(([key, val]) => (
                      <button
                        key={key}
                        onClick={() => applyAI(key)}
                        className={`text-xs px-4 py-2 rounded-full transition-all duration-200 flex items-center gap-1.5 active:scale-95 ${
                          activePart === key
                            ? 'bg-orange-500 text-white shadow-sm'
                            : 'bg-gray-50 text-gray-600 hover:bg-orange-100 hover:text-orange-600'
                        }`}
                      >
                        {val.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4 text-center">버튼을 눌러 AI 다듬기를 체험해보세요</p>
          </div>
        </div>
      </div>
    </section>
  );
}
