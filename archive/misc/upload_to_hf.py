import os
from huggingface_hub import HfApi, login

def upload_file_to_hf(file_path, repo_id, token=None):
    """
    Uploads a file to Hugging Face Hub.

    Args:
        file_path (str): Path to the local file.
        repo_id (str): Hugging Face repository ID (e.g., 'username/dataset_name').
        token (str, optional): Hugging Face write token. If None, assumes user is logged in via CLI.
    """
    if token:
        login(token=token)
    
    api = HfApi()
    
    # Check if repo exists, if not create it
    try:
        api.repo_info(repo_id=repo_id, repo_type="dataset")
        print(f"Repository {repo_id} already exists.")
    except Exception:
        print(f"Repository {repo_id} not found. Creating it...")
        api.create_repo(repo_id=repo_id, repo_type="dataset", exist_ok=True)

    file_name = os.path.basename(file_path)
    print(f"Uploading {file_name} to {repo_id}...")
    
    try:
        api.upload_file(
            path_or_fileobj=file_path,
            path_in_repo=file_name,
            repo_id=repo_id,
            repo_type="dataset"
        )
        print("Upload successful!")
        print(f"File URL: https://huggingface.co/datasets/{repo_id}/blob/main/{file_name}")
    except Exception as e:
        print(f"An error occurred during upload: {e}")

if __name__ == "__main__":
    # Configuration
    FILE_PATH = "dpo_train_data.jsonl"
    # User needs to replace 'your-username' with their actual HF username
    # or we can ask for input. For now, I'll ask for input in the script or use a placeholder.
    # But better to make it interactive or robust.
    
    print("This script uploads 'dpo_train_data.jsonl' to Hugging Face.")
    username = input("Enter your Hugging Face username: ").strip()
    if not username:
        print("Username is required.")
        exit(1)
        
    REPO_NAME = "KMI_dpo_train_data"
    REPO_ID = f"{username}/{REPO_NAME}"
    
    # Check for token in env or ask
    token = os.environ.get("HF_TOKEN")
    if not token:
        token = input("Enter your Hugging Face Write Token (hidden input not supported here, paste it): ").strip()
    
    if not os.path.exists(FILE_PATH):
        print(f"Error: File {FILE_PATH} not found in current directory.")
        exit(1)
        
    upload_file_to_hf(FILE_PATH, REPO_ID, token)
