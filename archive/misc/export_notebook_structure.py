import json

notebook_path = r'c:\Users\user\OneDrive\바탕 화면\우울이_프로젝트\archive\original_notebooks\finetuning_최종.ipynb'
output_path = r'c:\Users\user\OneDrive\바탕 화면\우울이_프로젝트\archive\misc\structure.txt'

with open(notebook_path, 'r', encoding='utf-8') as f:
    nb = json.load(f)

with open(output_path, 'w', encoding='utf-8') as f:
    for i, cell in enumerate(nb['cells']):
        source = "".join(cell['source']).strip()
        first_line = source.split('\n')[0] if source else "[Empty]"
        f.write(f"Cell {i} ({cell['cell_type']}): {first_line}\n")
