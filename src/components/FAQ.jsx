import { useState } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const faqItems = [
  {
    q: '비용은 얼마인가요?',
    a: '기본 편지 1,800원(준등기)부터 시작합니다. 사진 동봉, 추가 콘텐츠 등 옵션에 따라 달라집니다.',
  },
  {
    q: '보내고 얼마나 걸리나요?',
    a: '평균 3~5일 내 도착합니다. 교정시설은 내부 검열 절차에 따라 1~2일 추가될 수 있어요.',
  },
  {
    q: '수감자도 답장 보낼 수 있나요?',
    a: '네, 손편지담기 기능으로 받은 편지를 사진 찍어 보관하고, 바로 답장도 작성할 수 있습니다.',
  },
  {
    q: '환불 가능한가요?',
    a: '발송 전이라면 전액 환불 가능합니다. 발송 후에는 환불이 어렵습니다.',
  },
];

export default function FAQ() {
  const sectionRef = useScrollAnimation();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12 fade-up">
          <p className="text-orange-500 font-medium mb-2">FAQ</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">자주 묻는 질문</h2>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden fade-up"
              style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 cursor-pointer text-left"
              >
                <span className="font-medium text-gray-900">{item.q}</span>
                <span className="text-xl text-gray-400 font-light transition-transform">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5 text-gray-600">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
