import json

notebook_path = r'c:\Users\user\OneDrive\바탕 화면\우울이_프로젝트\archive\original_notebooks\finetuning_최종.ipynb'

with open(notebook_path, 'r', encoding='utf-8') as f:
    nb = json.load(f)

for i, cell in enumerate(nb['cells']):
    source = "".join(cell['source'])
    if "DPO" in source:
        print(f"Cell {i} contains DPO:")
        print(source[:300])
        print("==" * 20)
