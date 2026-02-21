# Woooly (우울이) Project 🐑

![Project Status](https://img.shields.io/badge/Status-Active-green)
![License](https://img.shields.io/badge/License-MIT-blue)

**Woooly (우울이)** is a dynamic psychological counseling patient persona model designed for doctors and researchers.
(우울이는 동적인 심리상담 환자 페르소나로, 의사나 연구자들을 위한 페르소나 모델입니다.)

This repository contains the code for training the model and running the demonstration service.

- 🎥 **Demo Video**: [Watch on YouTube](https://youtu.be/SM93h0spbR4?si=-wjuonxqmZmwGO0K)
- 🤗 **Hugging Face Model**: [hyunNus/Woooly-SFT-DPO-70B](https://huggingface.co/hyunNus/Woooly-SFT-DPO-70B)

## 📂 Repository Structure

```
Woooly/
├── data/                    # Training datasets (SFT, DPO)
│   ├── sft/                 # Supervised Fine-Tuning data
│   └── dpo/                 # Direct Preference Optimization data
├── demo/                    # Demonstration & Serving
│   ├── backend/             # vLLM Server & Model Merging
│   ├── frontend_demo/       # vLLM connected Next.js Client
│   └── frontend_gpt_api/    # GPT API connected Next.js Client (For UI Testing)
├── train/                   # Model Training
│   ├── sft/                 # SFT Training Notebooks
│   └── dpo/                 # DPO Training Notebooks
├── evaluation/              # Model Evaluation Notebooks
├── archive/                 # Legacy files (ignored)
├── requirements.txt         # Dependencies
└── README.md                # Documentation
```

## 🚀 Getting Started

### Prerequisites

- Python 3.10+
- PyTorch 2.4.0+ (Recommended for H200/A100 optimization)
- CUDA-enabled GPU

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/hyunNus/Woooly.git
   cd Woooly
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## 🧠 Training

### 1. Supervised Fine-Tuning (SFT)
Navigate to `train/sft/` and run the `train_sft.ipynb` notebook to train the base model using the provided SFT dataset.

### 2. Direct Preference Optimization (DPO)
After SFT, use `train/dpo/train_dpo.ipynb` to align the model with human preferences using the DPO dataset.

### 3. Evaluation
Run benchmarks using the notebooks in the `evaluation/` directory.

## 💻 Demonstration

### Backend (Server)
Located in `demo/backend`. Includes scripts for merging the LoRA adapters (`merge_model.ipynb`) and serving the model via vLLM.

### Frontend (Client)
Located in `demo/frontend_demo` (vLLM version) and `demo/frontend_gpt_api` (GPT API version).

#### 🌟 Experience the Chatbot UI (Quick Start)
If you just want to experience the UI quickly without running the heavy model server, you can use the GPT API frontend version:

1. Navigate to the GPT frontend directory:
   ```bash
   cd demo/frontend_gpt_api/woooly-client
   ```
2. Install dependencies & add your API key:
   ```bash
   npm install
   # Create a .env.local file and set OPENAI_API_KEY="your-key"
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) to chat!

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
