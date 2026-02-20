import json
import os

notebook_path = r'c:\Users\user\OneDrive\바탕 화면\우울이_프로젝트\archive\original_notebooks\finetuning_최종.ipynb'

with open(notebook_path, 'r', encoding='utf-8') as f:
    nb = json.load(f)

cells = nb['cells']
setup_cells = cells[0:3]
sft_cells = cells[3:8]
dpo_cells = cells[8:19]
eval_cells = cells[19:]

def save_notebook(cells, path):
    new_nb = nb.copy()
    new_nb['cells'] = setup_cells + cells
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(new_nb, f, indent=1, ensure_ascii=False)
    print(f"Saved to {path}")

# SFT Notebook
os.makedirs(r'c:\Users\user\OneDrive\바탕 화면\우울이_프로젝트\train\sft', exist_ok=True)
save_notebook(sft_cells, r'c:\Users\user\OneDrive\바탕 화면\우울이_프로젝트\train\sft\train_sft.ipynb')

# DPO Notebook
os.makedirs(r'c:\Users\user\OneDrive\바탕 화면\우울이_프로젝트\train\dpo', exist_ok=True)
save_notebook(dpo_cells, r'c:\Users\user\OneDrive\바탕 화면\우울이_프로젝트\train\dpo\train_dpo.ipynb')

# Evaluation Notebook
os.makedirs(r'c:\Users\user\OneDrive\바탕 화면\우울이_프로젝트\evaluation', exist_ok=True)
save_notebook(eval_cells, r'c:\Users\user\OneDrive\바탕 화면\우울이_프로젝트\evaluation\evaluate.ipynb')
