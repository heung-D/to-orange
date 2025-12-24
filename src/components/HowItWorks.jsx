import { useState, useEffect } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const steps = [
  {
    num: 1,
    title: '받는 사람',
    sub: '수신자 선택',
    details: ['주소록에서 빠르게 선택', '새 수신자 추가 가능', '우편 종류 선택 (일반/등기/익일특급)', '교정시설 수용번호 자동 관리'],
    img: 'https://github.com/heung-D/to-orange/blob/main/1%EB%8B%A8%EA%B3%84.png?raw=true',
  },
  {
    num: 2,
    title: '편지지',
    sub: '디자인 선택',
    details: ['기본', '상용', '디자이너', 'AI'],
    isTag: true,
    img: 'https://github.com/heung-D/to-orange/blob/main/2%EB%8B%A8%EA%B3%84.png?raw=true',
  },
  {
    num: 3,
    title: '편지 작성',
    sub: 'AI 도움',
    highlight: true,
    details: ['처음 인사', '중간 내용', '마무리'],
    img: 'https://github.com/heung-D/to-orange/blob/main/3%EB%8B%A8%EA%B3%84.png?raw=true',
  },
  {
    num: 4,
    title: '미리보기',
    sub: '말투 변환',
    details: ['친근하게', '격식체', '엄마 말투', '친구 말투'],
    isTag: true,
    img: 'https://github.com/heung-D/to-orange/blob/main/4%EB%8B%A8%EA%B3%84_%EB%A7%90%ED%88%AC%EA%B0%95%ED%99%94.png?raw=true',
  },
  {
    num: 5,
    title: '사진 추가',
    sub: '인화 동봉',
    details: ['고품질 사진 인화지에 출력', '편지와 함께 동봉', '소중한 추억을 선물하세요'],
    img: 'https://github.com/heung-D/to-orange/blob/main/5%EB%8B%A8%EA%B3%84.png?raw=true',
  },
  {
    num: 6,
    title: '추가 옵션',
    sub: '콘텐츠 동봉',
    details: ['월간 식단표', '영화 편성표', '스도쿠/퍼즐', '최신 유머'],
    isTag: true,
    img: 'https://github.com/heung-D/to-orange/blob/main/%EB%8F%99%EB%B4%89%EC%84%9C%EB%B9%84%EC%8A%A4.png?raw=true',
  },
  {
    num: 7,
    title: '결제',
    sub: '발송 완료',
    details: ['기본 편지 1,800원~', '결제 후 평균 3~5일 내 도착'],
    img: 'https://github.com/heung-D/to-orange/blob/main/7%EB%8B%A8%EA%B3%84.png?raw=true',
  },
];

const deliverySteps = [
  {
    title: '편지 작성 완료',
    desc: '교정시설 반입 규정에 맞게 자동으로 정리됩니다',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  {
    title: '인쇄 (출력)',
    desc: '전용 인쇄소에서 고해상도로 출력, 깨끗하고 선명하게 품질 관리',
    icon: 'M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z',
  },
  {
    title: '동봉 작업',
    desc: '사진, 향기, 작은 선물 등 선택한 항목을 정성스럽게 동봉',
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  },
  {
    title: '발송 및 배송 추적',
    desc: '우체국을 통해 정식 발송, 접수 → 배송 → 도착 과정을 직접 확인 가능',
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z',
  },
];

export default function HowItWorks() {
  const sectionRef = useScrollAnimation();
  const [activeProcess, setActiveProcess] = useState(1);
  const [currentStep, setCurrentStep] = useState(3);

  // Auto-roll steps
  useEffect(() => {
    if (activeProcess !== 1) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev >= 7 ? 1 : prev + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, [activeProcess]);

  const step = steps[currentStep - 1];

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12 fade-up">
          <p className="text-orange-500 font-medium mb-2">How it works</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">편지, 이렇게 전달됩니다</h2>
          <p className="text-gray-500">막막한 첫 문장부터 안전한 전달까지, 전 과정을 함께합니다</p>
        </div>

        {/* Process Toggle */}
        <div className="flex justify-center mb-10 fade-up fade-up-delay-1">
          <div className="inline-flex bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setActiveProcess(1)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                activeProcess === 1 ? 'bg-orange-500 text-white' : 'text-gray-500'
              }`}
            >
              <span className="hidden sm:inline">Step 1.</span> 내가 할 일
            </button>
            <button
              onClick={() => setActiveProcess(2)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                activeProcess === 2 ? 'bg-orange-500 text-white' : 'text-gray-500'
              }`}
            >
              <span className="hidden sm:inline">Step 2.</span> To-orange가 할 일
            </button>
          </div>
        </div>

        {/* Process 1: User Steps */}
        {activeProcess === 1 && (
          <div className="fade-up fade-up-delay-2">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-orange-500 font-medium">Step 1</p>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">온라인에서 편지 쓰기</h3>
                </div>
              </div>
              <div className="hidden md:block text-right">
                <p className="text-sm text-gray-400">예상 소요시간</p>
                <p className="text-lg font-bold text-orange-500">5~10분</p>
              </div>
            </div>

            {/* Step Cards */}
            <div className="grid grid-cols-4 md:grid-cols-7 gap-2 md:gap-3 mb-6">
              {steps.map((s) => (
                <button
                  key={s.num}
                  onClick={() => setCurrentStep(s.num)}
                  className={`group rounded-xl p-3 md:p-4 border-2 transition-all text-center cursor-pointer ${
                    currentStep === s.num
                      ? 'bg-orange-50 border-orange-300'
                      : 'bg-white border-gray-100 hover:border-orange-300'
                  }`}
                >
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform ${
                      s.highlight ? 'shadow-lg shadow-orange-500/30' : ''
                    }`}
                  >
                    <span className="text-white font-bold text-sm md:text-base">{s.num}</span>
                  </div>
                  <p className={`font-semibold text-xs md:text-sm ${s.highlight ? 'text-orange-600' : 'text-gray-900'}`}>
                    {s.title}
                  </p>
                  <p className={`text-xs hidden md:block mt-1 ${s.highlight ? 'text-orange-400' : 'text-gray-400'}`}>
                    {s.sub}
                  </p>
                </button>
              ))}
            </div>

            {/* Step Detail */}
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{step.num}</span>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900">{step.title}</p>
                    <p className="text-sm text-gray-500">{step.sub}</p>
                  </div>
                </div>

                <div className="mb-6 min-h-[420px] flex items-center justify-center">
                  {step.img && (
                    <img
                      src={step.img}
                      alt={step.title}
                      className="max-h-[420px] mx-auto rounded-xl shadow-lg transition-opacity duration-300"
                    />
                  )}
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  {step.details.map((detail, i) => (
                    <span
                      key={i}
                      className="text-xs bg-white text-gray-600 px-3 py-1.5 rounded-full border border-gray-200 flex items-center gap-1"
                    >
                      {!step.isTag && (
                        <svg className="w-4 h-4 text-orange-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => setActiveProcess(2)}
                className="inline-flex items-center text-orange-500 font-semibold hover:text-orange-600"
              >
                결제 완료 후, To-orange가 이렇게 전달해요
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Process 2: Delivery Steps */}
        {activeProcess === 2 && (
          <div className="fade-up fade-up-delay-2">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-orange-600 font-medium">Step 2</p>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">To-orange가 안전하게 전달</h3>
                </div>
              </div>
              <div className="hidden md:block text-right">
                <p className="text-sm text-gray-400">평균 소요시간</p>
                <p className="text-lg font-bold text-orange-600">3~5일</p>
              </div>
            </div>

            <div className="bg-orange-50 rounded-xl p-4 mb-8 border border-orange-100 text-center text-orange-700">
              <span className="font-semibold">편지 한 장이 길을 잃지 않도록</span>
              <br />
              <span className="text-sm">가장 멀리 있는 마음이, 가장 안전하게 닿도록</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {deliverySteps.map((s, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                      </svg>
                    </div>
                    <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">STEP {i + 1}</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1 text-sm">{s.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => setActiveProcess(1)}
                className="inline-flex items-center text-gray-500 font-medium hover:text-gray-700"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                이전 단계 다시 보기
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
