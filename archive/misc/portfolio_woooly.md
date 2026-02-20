# 🧠 Woooly: AI 심리상담 내담자 시뮬레이터
> **상담 수련생을 위한 우울증 내담자 페르소나 AI**

## 1. 프로젝트 개요 (Project Overview)
**'Woooly(우울이)'**는 심리상담 수련생들이 실제 내담자와 대화하는 것과 같은 경험을 할 수 있도록 설계된 **AI 내담자 시뮬레이터**입니다.
단순한 챗봇이 아니라, 상담 회기(Session)의 진행에 따라 **'방어적 태도(Resistance)'에서 '통찰 및 변화(Insight)'로 심리 상태가 변화**하는 입체적인 페르소나를 구현했습니다.

*   **개발 기간:** 2024.11 - 현재
*   **역할:** AI Engineer & Full Stack Developer (기획, 모델링, 프론트엔드 개발 전담)
*   **주요 목표:** 초거대 언어 모델(Llama-3 70B)을 미세 조정(Fine-tuning)하여 임상적으로 타당한 우울증 내담자의 발화 패턴 구현

---

## 2. 기술 스택 (Tech Stack)

| 구분 | 사용 기술 |
| :--- | :--- |
| **AI Model** | **Llama-3 70B**, **Unsloth**, **LoRA**, **DPO (Direct Preference Optimization)** |
| **Frontend** | **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, Framer Motion |
| **Backend / Infra** | Python, PyTorch, OpenAI API (Custom Interface), NVIDIA H200 (Training) |
| **Data** | Hugging Face Datasets, Custom JSONL Pipeline |

---

## 3. 핵심 기능 (Key Features)

### 🤖 1. 동적 페르소나 진화 (Dynamic Persona Evolution)
상담의 진행 단계에 따라 AI의 성격과 반응이 실시간으로 변화합니다.
*   **Session 1 (초기):** 무기력, 단답형 대답, 상담사에 대한 불신 및 방어적 태도 구현.
*   **Session 5 (중기/종결):** 라포(Rapport) 형성 후, 자신의 감정을 솔직하게 표현하고 변화 의지를 보이는 'Change Talk' 구사.
*   **구현 방식:** 대화 턴(Turn) 수를 추적하여 프론트엔드에서 자동으로 시스템 프롬프트를 교체하고, UI 테마를 변경하는 **Phase Transition System** 개발.

### 🧠 2. 고도화된 한국어 상담 모델 (Advanced Counseling LLM)
기존 LLM의 기계적인 말투를 배제하고, 실제 우울증 환자의 언어 습관을 학습시켰습니다.
*   **SFT (Supervised Fine-Tuning):** 한국어 상담 데이터셋(`kmi.json`)을 기반으로 Alpaca 포맷을 적용하여 1차 학습.
*   **DPO (Direct Preference Optimization):** '치료적으로 의미 있는 반응(Chosen)'과 '일반적인 챗봇 반응(Rejected)'을 구분하여 학습시킴으로써, 상담 시뮬레이션에 특화된 답변 유도.

### 🎨 3. 몰입형 UI/UX (Immersive Interface)
사용자가 상담에 온전히 집중할 수 있도록 감성적인 인터페이스를 구축했습니다.
*   **Glass Jelly Design:** Tailwind CSS v4를 활용한 글래스모피즘(Glassmorphism)과 유동적인 그라디언트 배경 적용.
*   **Mood Interaction:** 페르소나의 상태(Session 1 vs 5)에 따라 배경 색상과 아이콘, 조명 효과가 실시간으로 변화하여 내담자의 심리 변화를 시각적으로 전달.

---

## 4. 기술적 도전 및 해결 과정 (Technical Challenges & Solutions)

### 🛑 Challenge 1: "AI가 너무 똑똑하고 친절해요"
기본 Llama-3 모델은 너무 논리적이고 도움을 주려는(Helpful) 성향이 강해, 우울증 환자의 '저항(Resistance)'을 표현하지 못하는 문제가 있었습니다.
*   **Solution:** **DPO(선호도 최적화)**를 도입했습니다.
    *   *Rejected Data:* "제가 도와드릴까요?", "운동을 해보시는 건 어때요?" (조언형/AI스러운 답변)
    *   *Chosen Data:* "몰라요, 그냥 다 귀찮아요.", "선생님이 제 마음을 어떻게 알아요?" (방어적/감정적 답변)
    *   위 데이터 쌍을 구축하여 모델이 '친절한 조수'가 아닌 '힘든 내담자'처럼 행동하도록 강화학습을 수행했습니다.

### ⚡ Challenge 2: 70B 모델의 학습 비용과 속도
70B 파라미터 모델을 풀 파인튜닝(Full Fine-tuning)하기에는 자원이 부족했습니다.
*   **Solution:** **Unsloth** 라이브러리와 **QLoRA (4-bit Quantization)** 기술을 적용했습니다.
    *   메모리 사용량을 획기적으로 줄이고, 학습 속도를 2배 이상 가속화하여 제한된 GPU 자원(H200) 내에서 효율적으로 실험을 반복할 수 있었습니다.

---

## 5. 성과 (Outcomes)
*   **임상적 유사성 확보:** 실제 상담 축어록과 유사한 수준의 발화 패턴 구현 성공.
*   **교육 도구로서의 가능성:** 상담 수련생들이 실제 내담자를 만나기 전, 부담 없이 다양한 개입 기술을 연습해볼 수 있는 안전한 환경 제공.
*   **Full-Stack AI 개발:** 데이터 전처리부터 모델 학습, 서빙, 웹 클라이언트 구현까지 End-to-End 파이프라인 구축 경험 확보.
