import { useState } from "react";
import { Plus, List, Users, X, Calendar, Building2, CheckSquare, FileText, Orbit } from "lucide-react";

const STAGE_CONFIG = {
  investigation: {
    label: "형사조사",
    color: "#ef4444",
    lightColor: "#fecaca",
    radius: 140,
  },
  preparation: {
    label: "수감 전 준비",
    color: "#f59e0b",
    lightColor: "#fed7aa",
    radius: 200,
  },
  incarceration: {
    label: "수감 중",
    color: "#3b82f6",
    lightColor: "#bfdbfe",
    radius: 260,
  },
  reintegration: {
    label: "재사회화",
    color: "#10b981",
    lightColor: "#a7f3d0",
    radius: 320,
  },
};

const AddEventModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    stage: "investigation",
    title: "",
    date: "",
    agency: "",
    tasks: [""],
    documents: [""],
  });

  if (!isOpen) return null;

  const addTask = () => {
    setFormData({ ...formData, tasks: [...formData.tasks, ""] });
  };

  const updateTask = (index, value) => {
    const newTasks = [...formData.tasks];
    newTasks[index] = value;
    setFormData({ ...formData, tasks: newTasks });
  };

  const addDocument = () => {
    setFormData({ ...formData, documents: [...formData.documents, ""] });
  };

  const updateDocument = (index, value) => {
    const newDocs = [...formData.documents];
    newDocs[index] = value;
    setFormData({ ...formData, documents: newDocs });
  };

  const handleSave = () => {
    const cleanData = {
      ...formData,
      tasks: formData.tasks.filter(t => t.trim()),
      documents: formData.documents.filter(d => d.trim()),
    };
    onSave(cleanData);
    onClose();
  };

  const currentStage = STAGE_CONFIG[formData.stage];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">일정 추가하기</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Stage Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">단계 선택</label>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(STAGE_CONFIG).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setFormData({ ...formData, stage: key })}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.stage === key
                      ? "border-current shadow-lg"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  style={{
                    borderColor: formData.stage === key ? config.color : undefined,
                    backgroundColor: formData.stage === key ? config.lightColor : undefined,
                  }}
                >
                  <div className="font-semibold text-gray-800">{config.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                일정 제목
              </label>
              <input
                type="text"
                placeholder="예: 1차 조사, 입소일"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">날짜</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Building2 className="w-4 h-4 inline mr-1" />
                  관련 기관
                </label>
                <input
                  type="text"
                  placeholder="예: 검찰청, 교정시설"
                  value={formData.agency}
                  onChange={(e) => setFormData({ ...formData, agency: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Tasks */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              <CheckSquare className="w-4 h-4 inline mr-1" />
              해야 할 일
            </label>
            <div className="space-y-2">
              {formData.tasks.map((task, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`할 일 ${index + 1}`}
                  value={task}
                  onChange={(e) => updateTask(index, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ))}
              <button
                onClick={addTask}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                + 할 일 추가
              </button>
            </div>
          </div>

          {/* Documents */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              <FileText className="w-4 h-4 inline mr-1" />
              필요한 서류/준비물
            </label>
            <div className="space-y-2">
              {formData.documents.map((doc, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`서류/준비물 ${index + 1}`}
                  value={doc}
                  onChange={(e) => updateDocument(index, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ))}
              <button
                onClick={addDocument}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                + 서류/준비물 추가
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 font-medium transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-lg text-white font-medium transition-all shadow-lg"
            style={{
              backgroundColor: currentStage.color,
            }}
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
};

const OrbitCalendar = ({ events, selectedEventId, onEventSelect, currentStage }) => {
  const svgSize = 800;
  const center = svgSize / 2;

  const getEventPosition = (event) => {
    const config = STAGE_CONFIG[event.stage];
    const angleRad = (event.angle * Math.PI) / 180;
    return {
      x: center + config.radius * Math.cos(angleRad),
      y: center + config.radius * Math.sin(angleRad),
      angle: event.angle,
    };
  };

  return (
    <div className="relative">
      <svg width={svgSize} height={svgSize} className="drop-shadow-2xl">
        <defs>
          <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.1" />
          </radialGradient>
          
          {Object.entries(STAGE_CONFIG).map(([key, config]) => (
            <radialGradient key={key} id={`glow-${key}`}>
              <stop offset="0%" stopColor={config.color} stopOpacity="0.4" />
              <stop offset="100%" stopColor={config.color} stopOpacity="0" />
            </radialGradient>
          ))}
        </defs>

        <circle cx={center} cy={center} r={380} fill="url(#bgGradient)" />

        {Object.entries(STAGE_CONFIG).map(([key, config], index) => (
          <g key={key}>
            <circle
              cx={center}
              cy={center}
              r={config.radius}
              fill="none"
              stroke={config.color}
              strokeWidth="1.5"
              strokeOpacity="0.3"
              strokeDasharray="4 4"
            />
            
            <circle
              cx={center}
              cy={center}
              r={config.radius}
              fill="none"
              stroke={`url(#glow-${key})`}
              strokeWidth="20"
              opacity="0.2"
            />

            <text
              x={center + config.radius + 15}
              y={center + (index * 8) - 5}
              fill={config.color}
              fontSize="13"
              fontWeight="600"
              className="pointer-events-none"
            >
              {config.label}
            </text>
          </g>
        ))}

        {events.map((event) => {
          const pos = getEventPosition(event);
          const config = STAGE_CONFIG[event.stage];
          const isSelected = selectedEventId === event.id;

          return (
            <g
              key={event.id}
              className="cursor-pointer transition-all duration-300"
              onClick={() => onEventSelect(event)}
            >
              {isSelected && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="16"
                  fill={config.color}
                  opacity="0.2"
                  className="animate-ping"
                />
              )}

              <circle
                cx={pos.x}
                cy={pos.y}
                r={isSelected ? "8" : "6"}
                fill={config.color}
                stroke="#ffffff"
                strokeWidth="2"
                className="transition-all duration-300"
              />

              <circle
                cx={pos.x}
                cy={pos.y}
                r="12"
                fill="transparent"
                className="hover:fill-white hover:fill-opacity-10"
              />

              {isSelected && (() => {
                let cardX = pos.x + 15;
                let cardY = pos.y + 15;
                
                if (event.angle > 90 && event.angle < 270) {
                  cardX = pos.x - 155;
                }
                
                if (event.angle > 180) {
                  cardY = pos.y - 75;
                }

                return (
                  <g>
                    <foreignObject
                      x={cardX}
                      y={cardY}
                      width="140"
                      height="60"
                      className="overflow-visible"
                    >
                      <div className="bg-white rounded-lg shadow-lg p-2 border-2 animate-in fade-in zoom-in duration-300"
                           style={{ borderColor: config.color }}>
                        <div className="text-xs font-bold text-gray-800 truncate">
                          {event.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {event.date}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          클릭하여 자세히 보기 →
                        </div>
                      </div>
                    </foreignObject>
                  </g>
                );
              })()}
            </g>
          );
        })}

        <g>
          <circle cx={center} cy={center} r="90" fill="#0f172a" opacity="0.9" />
          <circle
            cx={center}
            cy={center}
            r="90"
            fill="none"
            stroke="#64748b"
            strokeWidth="2"
            strokeOpacity="0.3"
          />

          <text
            x={center}
            y={center - 20}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="12"
            fontWeight="500"
          >
            지금 단계
          </text>
          <text
            x={center}
            y={center + 5}
            textAnchor="middle"
            fill="#ffffff"
            fontSize="18"
            fontWeight="700"
          >
            {currentStage}
          </text>
          <text
            x={center}
            y={center + 25}
            textAnchor="middle"
            fill="#64748b"
            fontSize="10"
            className="max-w-[160px]"
          >
            일정 등록시 자동 안내
          </text>
        </g>
      </svg>
    </div>
  );
};

const TimelineView = ({ events, selectedEventId, onEventSelect }) => {
  const sortedEvents = [...events].sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  const groupedEvents = {
    investigation: [],
    preparation: [],
    incarceration: [],
    reintegration: [],
  };

  sortedEvents.forEach(event => {
    groupedEvents[event.stage].push(event);
  });

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-8 space-y-8">
      {Object.entries(STAGE_CONFIG).map(([stageKey, config]) => {
        const stageEvents = groupedEvents[stageKey];
        if (stageEvents.length === 0) return null;

        return (
          <div key={stageKey}>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: config.color }}
              />
              <h3 className="text-xl font-bold text-white">{config.label}</h3>
              <div className="flex-1 h-px bg-gray-700" />
            </div>

            <div className="space-y-3">
              {stageEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => onEventSelect(event)}
                  className={`bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border-2 cursor-pointer transition-all hover:bg-slate-800 ${
                    selectedEventId === event.id
                      ? "border-current shadow-lg"
                      : "border-slate-700 hover:border-slate-600"
                  }`}
                  style={{
                    borderColor: selectedEventId === event.id ? config.color : undefined,
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-1">
                        {event.title}
                      </h4>
                      <p className="text-sm text-gray-400">
                        📅 {event.date}
                        {event.agency && <span className="ml-3">🏢 {event.agency}</span>}
                      </p>
                      {event.tasks && event.tasks.length > 0 && (
                        <div className="mt-3 space-y-1">
                          {event.tasks.slice(0, 2).map((task, idx) => (
                            <div key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                              <span className="text-gray-500">•</span>
                              <span>{task}</span>
                            </div>
                          ))}
                          {event.tasks.length > 2 && (
                            <div className="text-xs text-gray-500">
                              +{event.tasks.length - 2}개 더보기
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div
                      className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: config.color }}
                    >
                      {config.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const DetailPanel = ({ event }) => {
  if (!event) {
    return (
      <div className="w-96 border-l border-slate-700 bg-slate-900/50 backdrop-blur-sm p-8 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="text-4xl mb-4">📅</div>
          <p className="text-sm">일정을 선택하면</p>
          <p className="text-sm">상세 정보가 표시됩니다</p>
        </div>
      </div>
    );
  }

  const config = STAGE_CONFIG[event.stage];

  return (
    <div className="w-96 border-l border-slate-700 bg-white overflow-y-auto">
      <div className="p-6 border-b" style={{ backgroundColor: config.lightColor }}>
        <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
             style={{ backgroundColor: config.color, color: 'white' }}>
          {config.label}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{event.title}</h2>
        <p className="text-gray-600 text-sm flex items-center gap-2">
          <span className="font-semibold">📅 {event.date}</span>
          {event.agency && <span className="text-gray-400">• {event.agency}</span>}
        </p>
      </div>

      {event.tasks && event.tasks.length > 0 && (
        <div className="p-6 border-b">
          <div className="flex items-center gap-2 mb-4">
            <CheckSquare className="w-5 h-5" style={{ color: config.color }} />
            <h3 className="font-bold text-gray-800">이 일정 전까지 해야 할 일</h3>
          </div>
          <div className="space-y-3">
            {event.tasks.map((task, index) => (
              <div key={index} className="flex items-start gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <div className="w-5 h-5 rounded border-2 border-gray-300 flex-shrink-0 mt-0.5 group-hover:border-gray-400 transition-colors" />
                <span className="text-sm text-gray-700">{task}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {event.documents && event.documents.length > 0 && (
        <div className="p-6 border-b">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5" style={{ color: config.color }} />
            <h3 className="font-bold text-gray-800">필요한 서류 / 준비물</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {event.documents.map((doc, index) => (
              <div
                key={index}
                className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700 text-center border border-gray-200 hover:border-gray-300 transition-colors"
              >
                {doc}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5" style={{ color: config.color }} />
          <h3 className="font-bold text-gray-800">가족이 도울 수 있는 것</h3>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-gray-700 leading-relaxed">
            {event.stage === "investigation" && "조사 과정을 함께 준비하고, 필요한 서류를 미리 챙겨둘 수 있습니다."}
            {event.stage === "preparation" && "입소에 필요한 준비물을 함께 확인하고, 정서적 지지를 제공할 수 있습니다."}
            {event.stage === "incarceration" && "정기적인 면회와 편지를 통해 지속적인 소통을 유지할 수 있습니다."}
            {event.stage === "reintegration" && "사회 복귀 과정에서 취업이나 주거 문제를 함께 해결할 수 있습니다."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [viewMode, setViewMode] = useState("orbit");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [events, setEvents] = useState([
    {
      id: "inv-1",
      title: "1차 조사",
      date: "2025.01.15",
      stage: "investigation",
      angle: 45,
      tasks: ["출석 통지서 확인하기", "변호사 상담 예약", "조사 준비물 확인"],
      documents: ["신분증", "인감증명서"],
      agency: "검찰청",
    },
    {
      id: "inv-2",
      title: "2차 조사",
      date: "2025.01.22",
      stage: "investigation",
      angle: 100,
      tasks: ["증거자료 준비", "진술 내용 정리"],
      documents: ["증거자료", "진술서"],
      agency: "검찰청",
    },
    {
      id: "prep-1",
      title: "입소 준비",
      date: "2025.03.01",
      stage: "preparation",
      angle: 150,
      tasks: ["준비물 리스트 확인", "가족 지원 안내 받기", "입소 서류 준비"],
      documents: ["세면도구", "속옷 3벌", "운동화", "신분증 사본"],
      agency: "교정시설",
    },
    {
      id: "prep-2",
      title: "서류 제출",
      date: "2025.02.25",
      stage: "preparation",
      angle: 190,
      tasks: ["신분증 사본 제출", "주민등록등본 제출"],
      documents: ["신분증 사본", "주민등록등본"],
      agency: "교정시설",
    },
    {
      id: "incar-1",
      title: "첫 면회일",
      date: "2025.03.15",
      stage: "incarceration",
      angle: 230,
      tasks: ["면회 신청 확인", "면회 준비물 안내"],
      agency: "교정시설",
    },
    {
      id: "incar-2",
      title: "교육 프로그램",
      date: "2025.05.01",
      stage: "incarceration",
      angle: 270,
      tasks: ["교육 프로그램 신청", "수료증 준비"],
      agency: "교정시설",
    },
    {
      id: "rein-1",
      title: "출소일",
      date: "2025.09.01",
      stage: "reintegration",
      angle: 310,
      tasks: ["출소 절차 안내 받기", "소지품 확인"],
      agency: "교정시설",
    },
    {
      id: "rein-2",
      title: "직업훈련",
      date: "2025.09.15",
      stage: "reintegration",
      angle: 350,
      tasks: ["취업지원 프로그램 신청", "기술교육 과정 등록"],
      agency: "고용센터",
    },
  ]);

  const handleSaveEvent = (formData) => {
    const newEvent = {
      ...formData,
      id: `event-${Date.now()}`,
      angle: Math.random() * 360,
    };
    setEvents([...events, newEvent]);
  };

  const selectedEvent = events.find((e) => e.id === selectedEventId) || null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <span className="text-4xl">🌍</span>
                Life Orbit 캘린더
              </h1>
              <p className="text-sm text-slate-400 mt-2">
                절차형 궤도 캘린더 - 수사부터 재사회화까지 한눈에
              </p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/40"
            >
              <Plus className="w-4 h-4" />
              일정 추가
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
          {viewMode === "orbit" ? (
            <OrbitCalendar
              events={events}
              currentStage="형사조사"
              onEventSelect={(event) => setSelectedEventId(event.id)}
              selectedEventId={selectedEventId}
            />
          ) : (
            <TimelineView
              events={events}
              selectedEventId={selectedEventId}
              onEventSelect={(event) => setSelectedEventId(event.id)}
            />
          )}
        </div>

        <DetailPanel event={selectedEvent} />
      </main>

      <div className="border-t border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setViewMode(viewMode === "orbit" ? "timeline" : "orbit")}
              className="px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-full flex items-center gap-2 transition-all"
            >
              {viewMode === "orbit" ? (
                <>
                  <List className="w-4 h-4" />
                  타임라인 보기
                </>
              ) : (
                <>
                  <Orbit className="w-4 h-4" />
                  원형 보기
                </>
              )}
            </button>
            <button className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-full flex items-center gap-2 shadow-lg shadow-orange-500/20 transition-all hover:shadow-orange-500/40">
              <Users className="w-4 h-4" />
              SOs 상담 요청
            </button>
          </div>
        </div>
      </div>

      <AddEventModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveEvent}
      />
    </div>
  );
}