import os
import subprocess

def chat(prompt, size):
    print("Current directory:", os.getcwd())  # Print current directory
    model_path = "/home/varund2003/work/llama.cpp/models/4B/openhermes-2.5-mistral-7b.Q4_K_M.gguf"
    print("Using model path:", model_path)  # Print model path
    command = f"/home/varund2003/work/llama.cpp/build/bin/llama-cli -m \"{model_path}\" -p \"{prompt}\" -n {size} -e"
    
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    
    if result.returncode != 0:
        print("Error:", result.stderr)
    return result.stdout

if __name__ == "__main__":
    user_input = input("You: ")
    tokens = input("output tokens: ")
    response = chat(user_input, tokens)
    print("Bot:", response)
