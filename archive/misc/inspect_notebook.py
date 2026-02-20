import json
import os

notebook_path = r'c:\Users\user\OneDrive\바탕 화면\우울이_프로젝트\archive\original_notebooks\finetuning_최종.ipynb'

with open(notebook_path, 'r', encoding='utf-8') as f:
    nb = json.load(f)

print(f"Total cells: {len(nb['cells'])}")

for i, cell in enumerate(nb['cells']):
    source = "".join(cell['source'])
    if "SFT" in source or "DPO" in source:
        print(f"Cell {i} ({cell['cell_type']}):")
        print(source[:200])
        print("-" * 20)
