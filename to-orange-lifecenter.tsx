import React, { useState } from 'react';
import { Heart, Scale, MessageCircle, Gift, Home, AlertCircle, Phone, Book, Volume2, CheckCircle, Clock, Bell, ChevronRight, ArrowLeft } from 'lucide-react';

export default function LifeCenterMain() {
  const [activeNav, setActiveNav] = useState('라이프센터');
  const [selectedSituation, setSelectedSituation] = useState(null);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  const navItems = [
    { name: '홈', icon: Home },
    { name: '마음전하기', icon: Heart },
    { name: '법률도우미', icon: Scale },
    { name: '커뮤니티', icon: MessageCircle },
    { name: '기부나눔', icon: Gift },
    { name: '라이프센터', icon: Book },
    { name: '고객센터', icon: Phone }
  ];

  const situations = [
    {
      id: 'investigation',
      title: '경찰 조사를 받았어요',
      subtitle: '또는 받을 예정이에요',
      icon: '🚨',
      color: 'border-orange-500'
    },
    {
      id: 'pre-detention',
      title: '가족이 곧 수감돼요',
      subtitle: '무엇을 준비해야 할까요',
      icon: '📦',
      color: 'border-gray-400'
    },
    {
      id: 'detained',
      title: '가족이 지금 수감 중이에요',
      subtitle: '어떻게 도와줄 수 있을까요',
      icon: '💌',
      color: 'border-gray-400'
    },
    {
      id: 'post-release',
      title: '출소를 앞두고 있어요',
      subtitle: '사회 복귀를 준비하고 싶어요',
      icon: '🌱',
      color: 'border-gray-400'
    }
  ];

  const todosMap = {
    investigation: [
      {
        id: 1,
        title: '변호사 선임하기',
        description: '첫 조사 전까지 꼭 준비하세요',
        urgency: 'high',
        deadline: '오늘까지',
        timeLeft: '2시간 남음'
      },
      {
        id: 2,
        title: '조사 받을 때 주의사항 확인',
        description: '진술서 작성 전 꼭 읽어보세요',
        urgency: 'high',
        deadline: '오늘',
        timeLeft: '오늘'
      },
      {
        id: 3,
        title: '가족에게 상황 알리기',
        description: '도움받을 수 있는 사람을 찾으세요',
        urgency: 'medium',
        deadline: '이번 주',
        timeLeft: '3일 남음'
      },
      {
        id: 4,
        title: '필요한 서류 준비하기',
        description: '신분증, 인감증명서 등',
        urgency: 'low',
        deadline: '다음 주',
        timeLeft: '7일 남음'
      }
    ],
    'pre-detention': [
      {
        id: 1,
        title: '입소 준비물 체크리스트 확인',
        description: '반입 가능한 물품을 확인하세요',
        urgency: 'high',
        deadline: '오늘까지',
        timeLeft: '오늘'
      },
      {
        id: 2,
        title: '출소복 구매하기',
        description: '투오렌지 공식몰에서 구매 가능',
        urgency: 'high',
        deadline: '입소 3일 전',
        timeLeft: '2일 남음'
      },
      {
        id: 3,
        title: '접견 절차 알아보기',
        description: '가족이 면회 오는 방법',
        urgency: 'medium',
        deadline: '이번 주',
        timeLeft: '5일 남음'
      },
      {
        id: 4,
        title: '심리적 준비하기',
        description: '입소 전 마음가짐 안내',
        urgency: 'low',
        deadline: '다음 주',
        timeLeft: '10일 남음'
      }
    ],
    detained: [
      {
        id: 1,
        title: '이번 달 접견 예약하기',
        description: '매월 4회까지 가능합니다',
        urgency: 'high',
        deadline: '이번 주',
        timeLeft: '4일 남음'
      },
      {
        id: 2,
        title: '편지 보내기',
        description: '서신 규정을 확인하세요',
        urgency: 'medium',
        deadline: '자유',
        timeLeft: '언제든지'
      },
      {
        id: 3,
        title: '생활비 송금하기',
        description: '매월 정기 송금 설정 가능',
        urgency: 'medium',
        deadline: '이번 주',
        timeLeft: '6일 남음'
      },
      {
        id: 4,
        title: '도서 주문하기',
        description: '독서로 시간을 보낼 수 있어요',
        urgency: 'low',
        deadline: '자유',
        timeLeft: '언제든지'
      }
    ],
    'post-release': [
      {
        id: 1,
        title: '취업 지원 프로그램 신청',
        description: '출소 1개월 전부터 가능',
        urgency: 'high',
        deadline: '이번 주',
        timeLeft: '3일 남음'
      },
      {
        id: 2,
        title: '주거 지원 알아보기',
        description: '임시 거처가 필요하신가요?',
        urgency: 'high',
        deadline: '출소 전',
        timeLeft: '10일 남음'
      },
      {
        id: 3,
        title: '사회복귀 교육 참여',
        description: '실전 면접 준비 등',
        urgency: 'medium',
        deadline: '출소 후',
        timeLeft: '14일 남음'
      },
      {
        id: 4,
        title: '지역 지원기관 연결',
        description: '지속적인 상담과 지원',
        urgency: 'low',
        deadline: '출소 후',
        timeLeft: '20일 남음'
      }
    ]
  };

  const currentTodos = todosMap[selectedSituation] || [];
  const currentSituation = situations.find(s => s.id === selectedSituation);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">T</span>
              </div>
              <span className="text-base font-bold text-gray-900">To-orange</span>
            </div>
            <div className="flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.name === activeNav;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveNav(item.name)}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all ${
                      isActive
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Voice Guide Button - Fixed */}
      <button
        onClick={() => setVoiceEnabled(!voiceEnabled)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center z-50 transition-all ${
          voiceEnabled ? 'bg-orange-500' : 'bg-gray-800'
        } hover:scale-110`}
      >
        <Volume2 className="w-6 h-6 text-white" />
      </button>

      {/* Main Content */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Step 1: Situation Selection */}
        {!selectedSituation && (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">라이프센터</h1>
              <p className="text-lg text-gray-600">지금 어떤 상황이신가요?</p>
              <p className="text-sm text-gray-500 mt-1">상황에 맞는 정보와 할 일을 안내해드립니다</p>
            </div>

            {/* SOS Button */}
            <div className="mb-8">
              <button className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl p-5 flex items-center justify-between transition-all shadow-lg hover:shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="text-xl font-bold">긴급 도움이 필요하세요?</p>
                    <p className="text-red-100 text-sm">24시간 상담 가능 · 즉시 연결</p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Situation Cards */}
            <div className="space-y-4 mb-8">
              {situations.map((situation) => (
                <button
                  key={situation.id}
                  onClick={() => setSelectedSituation(situation.id)}
                  className="w-full bg-white border-2 border-gray-200 hover:border-orange-500 rounded-xl p-6 text-left transition-all hover:shadow-md"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{situation.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {situation.title}
                      </h3>
                      <p className="text-gray-600">{situation.subtitle}</p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-400" />
                  </div>
                </button>
              ))}
            </div>

            {/* Help Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">혼자가 아닙니다</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    어려운 시간을 겪고 계신 당사자분과 가족분들께 필요한 정보와 따뜻한 지원을 드리고자 합니다.
                  </p>
                  <div className="flex space-x-2">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all">
                      전화 상담하기
                    </button>
                    <button className="bg-white border border-gray-300 hover:border-gray-400 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium transition-all">
                      자주 묻는 질문
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Step 2: Todo List */}
        {selectedSituation && (
          <>
            {/* Back Button & Header */}
            <button
              onClick={() => setSelectedSituation(null)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">상황 다시 선택하기</span>
            </button>

            <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-6 mb-8">
              <div className="flex items-start space-x-3">
                <div className="text-3xl">{currentSituation?.icon}</div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {currentSituation?.title}
                  </h2>
                  <p className="text-gray-600">{currentSituation?.subtitle}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">지금 해야 할 일</h2>
              <p className="text-gray-600">긴급한 순서대로 정리했습니다</p>
            </div>

            <div className="space-y-4">
              {currentTodos.map((todo, index) => (
                <div
                  key={todo.id}
                  className={`bg-white border-2 rounded-xl p-6 transition-all hover:shadow-md ${
                    todo.urgency === 'high'
                      ? 'border-orange-500'
                      : todo.urgency === 'medium'
                      ? 'border-gray-300'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Priority Number */}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 ${
                          todo.urgency === 'high'
                            ? 'bg-orange-500 text-white'
                            : todo.urgency === 'medium'
                            ? 'bg-gray-300 text-gray-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {index + 1}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            {todo.title}
                          </h3>
                          {todo.urgency === 'high' && (
                            <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap">
                              긴급
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">
                          {todo.description}
                        </p>
                        <div className="flex items-center space-x-4 text-gray-500 text-sm">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span className="font-medium">{todo.timeLeft}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Bell className="w-4 h-4" />
                            <span>{todo.deadline}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="ml-4 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-all flex items-center space-x-2 whitespace-nowrap">
                      <span>시작하기</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Simple Footer */}
      <footer className="border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-5 h-5 bg-orange-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">T</span>
                </div>
                <span className="font-bold text-gray-900 text-sm">To-orange</span>
              </div>
              <p className="text-gray-500 text-xs">따뜻한 연결, 새로운 시작</p>
            </div>
            <div className="text-right text-sm text-gray-600">
              <p className="font-medium mb-1 text-xs">24시간 긴급 지원</p>
              <p className="text-xl font-bold text-gray-900">1588-0000</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Voice Guide Indicator */}
      {voiceEnabled && (
        <div className="fixed bottom-24 right-6 bg-gray-900 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg">
          음성 안내 켜짐
        </div>
      )}
    </div>
  );
}