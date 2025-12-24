import useScrollAnimation from '../hooks/useScrollAnimation';

const footerData = [
  {
    title: 'To-orange',
    content: '마음을 전하는 가장 따뜻한 방법.<br>편지 한 장이 길을 잃지 않도록.',
  },
  {
    title: '서비스',
    links: [
      { text: '편지쓰기', url: '/letter-service' },
      { text: '받은편지함', url: '/inbox' },
      { text: '타임캡슐', url: '/timecapsule' },
      { text: '오렌지나무', url: '/orange-tree' },
    ],
  },
  {
    title: '고객지원',
    links: [
      { text: '이용가이드', url: '/guide' },
      { text: '공지사항', url: '/notice' },
      { text: '1:1 문의', url: '/inquiry' },
      { text: '자주묻는질문', url: '/faq' },
    ],
  },
  {
    title: '문의',
    content: 'support@to-orange.kr<br>평일 10:00 - 18:00',
  },
];

export default function Footer() {
  const sectionRef = useScrollAnimation();

  return (
    <footer ref={sectionRef} className="bg-stone-900 text-gray-400 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {footerData.map((section, index) => (
            <div key={index} className={`fade-up fade-up-delay-${index}`}>
              <h4
                className={`${
                  section.title === 'To-orange' ? 'text-white font-bold text-lg' : 'text-white font-semibold'
                } mb-4`}
              >
                {section.title}
              </h4>
              {section.content && (
                <p
                  className="text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              )}
              {section.links && (
                <ul className="space-y-2 text-sm">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a href={link.url} className="hover:text-white transition-colors">
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 pt-8 text-sm text-center fade-up fade-up-delay-4">
          <p>&copy; 2024 To-orange. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
