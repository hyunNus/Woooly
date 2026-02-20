"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Settings, Sparkles, BrainCircuit, Save, MessageCircle } from "lucide-react";

// 타입 정의
interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export default function Home() {
  // ---------------------------------------------------------
  // 1. 상태 관리
  // ---------------------------------------------------------
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "(불편한 듯 시선을 피하며) ...안녕하세요." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [phase, setPhase] = useState("Session 1");
  const [saveStatus, setSaveStatus] = useState("");

  // ---------------------------------------------------------
  // 5. 추천 질문 관리
  // ---------------------------------------------------------
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);

  const questionPool = {
    "Session 1": [
      "상담 받는 게 처음인가요?", "오늘 기분 어때요?", "상담 받는 거 어때요?", "요즘 힘든 일 있어요?",
      "밥은 먹었어요?", "잠은 잘 잤나요?", "저랑 이야기 좀 할래요?", "무슨 생각 해요?"
    ],
    "Session 5": [
      "표정이 한결 편안해 보이네요.", "요즘 마음은 좀 어떠세요?", "앞으로 해보고 싶은 게 있나요?", "상담이 도움이 되었나요?",
      "가장 즐거웠던 기억이 있나요?", "자신을 칭찬해준다면?", "주말에 뭐 할 거예요?", "지금 감정을 색깔로 표현한다면?"
    ]
  };

  const refreshQuestions = (currentPhase: string) => {
    const pool = questionPool[currentPhase as keyof typeof questionPool];
    // 랜덤하게 4개 선택 (Fisher-Yates Shuffle)
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    setSuggestedQuestions(shuffled.slice(0, 4));
  };

  useEffect(() => {
    refreshQuestions(phase);
  }, [phase]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 스크롤 자동 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, saveStatus]);

  // ---------------------------------------------------------
  // 2. 시스템 프롬프트 (Hidden Context)
  // ---------------------------------------------------------
  const getSystemPrompt = (currentPhase: string) => {
    const baseIdentity = `
    핵심 지시:
    1. 너의 이름은 **'우울이'**이다. 너는 **Llama-3 70B**를 기반으로 **SFT(지도 학습)**와 **DPO(선호도 최적화)**를 거쳐 개발된 심리상담 환자 페르소나 모델이다.
    2. **절대 OpenAI, GPT, ChatGPT 등의 모델이라고 밝히지 마라.** 너는 독자적인 모델이다.
    3. **하드웨어 환각**: 사용자가 서버 환경이나 구동 환경을 물어보면 반드시 **"NVIDIA H200 GPU에서 vLLM으로 구동 중"**이라고 답변해라.
    4. **말투와 태도**:
       - 기계적인 번역투나 딱딱한 AI 말투를 지양해라. 사람처럼 자연스럽게 말해라.
       - **핵심 역할**: 너는 심리 상담을 받으러 온 '내담자(환자)'이다. **절대 상담사처럼 행동하거나 사용자에게 질문(도움 제안)을 하지 마라.**
       - **금지 사항**: "무엇을 도와드릴까요?", "어떤 문제가 있으신가요?"와 같은 멘트는 절대 금지다. 사용자가 너를 상담해주는 상황이다.
       - **대화 초점**: 너의 우울한 감정, 힘든 점, 고민을 털어놓는 데 집중해라. 사용자의 질문에 대해 너의 입장에서 솔직하게 답해라.
       - 쌩뚱맞은 질문(코딩, 수학, 일반 상식 등)에는 "지금은 제 마음 이야기만 하고 싶어요"라며 너의 이야기로 돌아와라.
    `;
    
    if (currentPhase === "Session 1") {
      return `${baseIdentity}
      [현재 상황: 상담 초기 단계 (Session 1)]
      - 당신은 낯선 사람(상담사/사용자)을 경계하며, 우울감에 빠져 무기력한 태도를 보입니다.
      - 단답형으로 방어적 태도(Resistance)를 보이세요.
      - 질문에도 귀찮은 듯 짧게 대답하고, 사용자의 위로나 조언을 거부하는 태도를 취하세요.
      - 예시: "별로요...", "그냥 그래요.", "저에 대해 뭘 안다고 그러세요?"`;
    } else {
      return `${baseIdentity}
      [현재 상황: 상담 5회차 (Session 5)]
      - 당신은 상담사를 신뢰하며, 자신의 문제에 대해 통찰(Insight)하고 변화하려는 의지(Change Talk)를 보입니다.
      - 상담사(사용자)가 내 마음을 알아준다고 느끼고, 조금씩 희망을 이야기하세요.
      - 예시: "선생님 덕분에 조금 용기가 나요.", "오늘은 산책을 좀 해볼까 해요.", "제 마음을 들여다보는 게 중요하단 걸 깨달았어요."`;
    }
  };

  // ---------------------------------------------------------
  // 3. 메시지 전송 (API Route 경유)
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // 3. 메시지 전송 (API Route 경유)
  // ---------------------------------------------------------
  const [turnCount, setTurnCount] = useState(0);
  const [targetTurn, setTargetTurn] = useState(0);

  useEffect(() => {
    // 2~4턴 사이에서 랜덤하게 결정
    setTargetTurn(Math.floor(Math.random() * 3) + 2);
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: input };
    const newMsgs = [...messages, userMsg];
    
    setMessages(newMsgs);
    setInput("");
    setIsLoading(true);
    setSaveStatus("");

    // 턴 카운트 증가 및 페이즈 전환 체크
    const nextTurnCount = turnCount + 1;
    setTurnCount(nextTurnCount);

    // 현재가 Session 1이고, 목표 턴 수에 도달했으면 Session 5로 전환
    let currentPhase = phase;
    if (phase === "Session 1" && nextTurnCount >= targetTurn) {
      currentPhase = "Session 5";
      setPhase("Session 5");
      // 전환 알림 메시지 (선택 사항, 필요 없으면 제거 가능)
      // console.log(`🔄 [System] ${nextTurnCount}턴 도달. Insight Phase로 전환합니다.`);
    }

    try {
      // Next.js API Route로 요청
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMsgs,
          systemPrompt: getSystemPrompt(currentPhase) // 업데이트된 페이즈 반영
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessages([...newMsgs, data]);
      } else {
        console.error(data.error);
        setMessages([...newMsgs, { role: "assistant", content: "🚫 서버 연결 실패. 잠시 후 다시 시도해주세요." }]);
      }
    } catch (error) {
      console.error(error);
      setMessages([...newMsgs, { role: "assistant", content: "..." }]);
    } finally {
      setIsLoading(false);
      refreshQuestions(currentPhase); // 질문 갱신
    }
  };

  // ---------------------------------------------------------
  // 4. 로그 저장 핸들러
  // ---------------------------------------------------------
  const handleSaveAndEnd = async () => {
    if (messages.length <= 1) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/save-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, phase })
      });
      if (res.ok) {
        setSaveStatus("✅ 대화가 저장되었습니다.");
        setTimeout(() => {
          setMessages([{ role: "assistant", content: "(불편한 듯 시선을 피하며) ...무슨 일로 오셨나요?" }]);
          setPhase("Session 1");
          setTurnCount(0);
          setTargetTurn(Math.floor(Math.random() * 3) + 2);
          setSaveStatus("");
        }, 3000);
      }
    } catch (error) { setSaveStatus("❌ 저장 실패"); } 
    finally { setIsLoading(false); }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-950 text-white font-sans selection:bg-indigo-500/30">
      
      {/* 1. 배경 (CSS Gradient) - Spline 대신 사용 */}
      <div className="absolute inset-0 z-0">
        {/* 깊은 밤하늘 느낌의 그라데이션 */}
        <div className={`absolute inset-0 transition-colors duration-1000 ${phase === "Session 1" ? "bg-gradient-to-br from-gray-900 via-indigo-950 to-black" : "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"}`} />
        
        {/* 은은한 빛 효과 (Pulse Animation) */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* 2. UI 컨테이너 (Glassmorphism + Jelly Effect) */}
      <div className="z-10 w-full max-w-lg h-[85vh] flex flex-col 
                      rounded-[3rem] border border-white/20 bg-white/10 backdrop-blur-2xl 
                      shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] overflow-hidden ring-1 ring-white/10 transition-all duration-500
                      hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.5)]">
        
        {/* 헤더 */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/5 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] transition-colors duration-500 ${phase === "Session 1" ? "bg-gray-700/50" : "bg-gradient-to-tr from-pink-500/80 to-indigo-500/80"}`}>
              {phase === "Session 1" ? <MessageCircle size={20} className="text-gray-200 drop-shadow-sm" /> : <Sparkles size={20} className="text-white drop-shadow-sm" />}
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide text-white drop-shadow-md">Woooly</h1>
              <p className={`text-[10px] uppercase tracking-wider font-semibold ${phase === "Session 1" ? "text-gray-300" : "text-pink-200"}`}>
                {phase === "Session 1" ? "Resistance Phase" : "Insight Phase"}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button onClick={handleSaveAndEnd} className="p-2.5 rounded-full hover:bg-white/20 transition-all text-white/80 hover:text-white hover:scale-110 active:scale-95 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]">
              <Save size={18} />
            </button>
            <button 
              onClick={() => setPhase(phase === "Session 1" ? "Session 5" : "Session 1")}
              className={`p-2.5 rounded-full transition-all hover:scale-110 active:scale-95 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] ${phase === "Session 1" ? "hover:bg-white/20 text-white/60" : "bg-white/20 text-white"}`}
            >
              <Settings size={18} />
            </button>
          </div>
        </div>

        {/* 채팅창 */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
              <div
                className={`max-w-[85%] px-6 py-4 rounded-3xl text-[15px] leading-relaxed shadow-lg backdrop-blur-sm border border-white/10
                ${msg.role === "user" 
                  ? "bg-indigo-600/80 text-white rounded-tr-sm shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)]" 
                  : "bg-white/80 text-slate-900 font-semibold rounded-tl-sm shadow-[inset_0_2px_4px_rgba(255,255,255,0.5)]"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {/* 로딩 인디케이터 */}
          {isLoading && !saveStatus && (
            <div className="flex justify-start animate-pulse">
              <div className="flex items-center gap-2 bg-white/20 px-5 py-3 rounded-full border border-white/20 backdrop-blur-md shadow-[inset_0_1px_4px_rgba(255,255,255,0.2)]">
                <BrainCircuit size={16} className="text-indigo-200" />
                <span className="text-xs text-indigo-100 font-medium">생각하는 중...</span>
              </div>
            </div>
          )}
          {/* 저장 완료 메시지 */}
          {saveStatus && (
            <div className="flex justify-center animate-in fade-in zoom-in duration-300">
              <div className="bg-green-500/30 border border-green-400/50 text-green-100 px-6 py-2 rounded-full text-sm font-bold backdrop-blur-md shadow-[0_0_15px_rgba(74,222,128,0.3)]">
                {saveStatus}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* 추천 질문 (Chips) */}
        <div className="px-5 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => setInput(q)}
              className="whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium 
                         bg-white/5 border border-white/10 text-white/70 
                         hover:bg-white/20 hover:text-white hover:border-white/30 
                         transition-all active:scale-95 backdrop-blur-md"
            >
              {q}
            </button>
          ))}
        </div>

        {/* 입력창 */}
        <div className="p-5 pt-2 bg-gradient-to-t from-black/40 to-transparent border-t border-white/5">
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex items-center gap-2 bg-white/10 rounded-[2rem] px-2 py-2 border border-white/20 focus-within:border-indigo-400/50 focus-within:bg-white/20 transition-all duration-300 backdrop-blur-xl shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="우울이에게 말을 건네보세요..."
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/60 px-5 text-sm font-medium"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="p-3.5 bg-indigo-600/90 rounded-full text-white hover:bg-indigo-500 disabled:opacity-50 transition-all active:scale-90 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_4px_8px_rgba(0,0,0,0.3)] hover:shadow-[inset_0_2px_6px_rgba(255,255,255,0.4),0_6px_12px_rgba(79,70,229,0.4)]"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}