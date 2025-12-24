import useScrollAnimation from '../hooks/useScrollAnimation';

const features = [
  {
    title: '타임캡슐',
    desc: '여러 사람의 마음을 모아 특별한 날에 전해요. 출소일, 생일, 기념일에 흩어진 응원이 하나의 선물이 됩니다.',
    tags: ['가족 초대', '함께 편지쓰기', '선물 동봉'],
    url: '/timecapsule',
    cta: '타임캡슐 만들기',
    icon: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7',
  },
  {
    title: '오렌지나무',
    desc: '보낸 마음이 나무가 되어 자랍니다. 편지 한 통이 잎사귀로, 소중한 날이 열매로. 성장하는 나무를 함께 키워보세요.',
    tags: ['편지 = 잎사귀', '일정 = 열매', 'D-day 알림'],
    url: '/orange-tree',
    cta: '내 오렌지나무 보기',
    icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25',
  },
  {
    title: '손편지담기',
    desc: '받은 손편지, 사진 한 장으로 보관하세요. AI가 글씨를 읽어서 텍스트로 저장하고, 바로 답장도 쓸 수 있어요.',
    tags: ['OCR 인식', '디지털 보관', '바로 답장'],
    url: '/scan-letter',
    cta: '손편지 보관하기',
    icon: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9zM15 13a3 3 0 11-6 0 3 3 0 016 0z',
  },
];

export default function SpecialFeatures() {
  const sectionRef = useScrollAnimation();

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12 fade-up">
          <p className="text-orange-500 font-medium mb-2">Special Features</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">편지 그 이상의 경험</h2>
          <p className="text-gray-500">To-orange에서만 만날 수 있는 특별한 기능</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 fade-up"
              style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
            >
              <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{feature.desc}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {feature.tags.map((tag, i) => (
                  <span key={i} className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={feature.url}
                className="inline-flex items-center text-orange-500 font-medium text-sm hover:text-orange-600"
              >
                {feature.cta}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
