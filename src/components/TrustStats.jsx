import useScrollAnimation from '../hooks/useScrollAnimation';

const stats = [
  { value: '12,847', label: '전달 완료' },
  { value: '100+', label: '교정시설 발송' },
  { value: '3일', label: '평균 도착 기간' },
  { value: '4.8', label: '이용자 만족도' },
];

export default function TrustStats() {
  const sectionRef = useScrollAnimation();

  return (
    <section ref={sectionRef} className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 text-center shadow-sm fade-up`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <p className="text-3xl md:text-4xl font-bold text-orange-500 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
