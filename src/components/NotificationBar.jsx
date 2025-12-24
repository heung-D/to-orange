import { useState, useEffect } from 'react';

const notiNames = ['이OO', '김OO', '박OO', '최OO', '정OO', '강OO', '조OO', '신OO', '윤OO', '장OO', '한OO', '오OO', '서OO'];
const notiTimes = ['방금', '1분', '2분', '3분', '5분', '7분', '10분'];

export default function NotificationBar() {
  const [name, setName] = useState('이OO');
  const [time, setTime] = useState('3분');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setName(notiNames[Math.floor(Math.random() * notiNames.length)]);
        setTime(notiTimes[Math.floor(Math.random() * notiTimes.length)]);
        setIsVisible(true);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-400 h-11 flex items-center justify-center sticky top-0 z-50 overflow-hidden">
      <div
        className={`flex items-center gap-2 text-white text-sm transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
        }`}
      >
        <span className="opacity-80">✉️</span>
        <span>{time} 전</span>
        <span className="font-semibold">{name}님이 편지를 발송했습니다</span>
      </div>
    </div>
  );
}
