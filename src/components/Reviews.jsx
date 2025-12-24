import useScrollAnimation from '../hooks/useScrollAnimation';

const reviews = [
  {
    text: '뭐라고 써야 할지 막막했는데, AI가 초안 잡아줘서 금방 완성했어요. 덕분에 매주 편지 보내고 있어요.',
    author: '구치소 면회 가족',
  },
  {
    text: '훈련소 간 아들한테 매주 보내고 있어요. 답장 올 때마다 울컥해요. 사진도 같이 보낼 수 있어서 좋아요.',
    author: '훈련소 부모님',
  },
  {
    text: '바빠서 미루기만 했는데, 10분 만에 보내니까 마음이 놓이네요. 부모님께 정기적으로 보내려구요.',
    author: '일반편지 이용자',
  },
];

export default function Reviews() {
  const sectionRef = useScrollAnimation();

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12 fade-up">
          <p className="text-orange-500 font-medium mb-2">Review</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">편지를 보낸 분들의 이야기</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-6 fade-up"
              style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
            >
              <div className="flex text-orange-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">"{review.text}"</p>
              <p className="text-sm text-gray-500">{review.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
