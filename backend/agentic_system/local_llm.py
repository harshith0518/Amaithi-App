import requests
import os

def call_local_llm(prompt):
    url = f"{os.getenv('OLLAMA_HOST')}/api/generate"
    
    data = {
        "model": os.getenv('QWEN_14b_MODEL'),
        "prompt": prompt,
        "stream": False
    }

    response = requests.post(url, json=data)

    if response.status_code == 200:
        return response.json().get("response", "")
    else:
        raise Exception(f"Error calling local LLM: {response.status_code} - {response.text}")