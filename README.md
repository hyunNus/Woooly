# Woooly (우울이) Project 🐑

![Project Status](https://img.shields.io/badge/Status-Active-green)
![License](https://img.shields.io/badge/License-MIT-blue)

**Woooly** is an empathetic counseling AI agent designed to provide comfort and support. This repository contains the code for training the model and running the demonstration service.

## 📂 Repository Structure

```
Woooly/
├── data/                    # Training datasets (SFT, DPO)
│   ├── sft/                 # Supervised Fine-Tuning data
│   └── dpo/                 # Direct Preference Optimization data
├── demo/                    # Demonstration & Serving
│   ├── backend/             # vLLM Server & Model Merging (formerly 'ssh')
│   └── frontend/            # User Interface (formerly 'laptop')
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
Located in `demo/frontend`. A Next.js based specific interface for interacting with Woooly.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
