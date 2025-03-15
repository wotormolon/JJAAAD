import subprocess
import sys

# Function to install packages if not already installed
def install(package):
    try:
        __import__(package)
    except ImportError:
        subprocess.run([sys.executable, "-m", "pip", "install", package])

# List of required packages
required_packages = ["google-generativeai", "Pillow"]

# Install missing packages
for package in required_packages:
    install(package)


import google.generativeai as genai
from PIL import Image
import os
from glob import glob

# Initialize Gemini API
genai.configure(api_key="AIzaSyDzuQTCml69JzMvKv3jrzOdLKMc5XSUgdI")

# Analyze the image
def analyze_image(image_path, prompt):
    model = genai.GenerativeModel(model_name="gemini-1.5-flash")
    
    with Image.open(image_path) as img:
        response = model.generate_content(
            [prompt, img],
            stream=False
        )
    
    return response.text

# Example usage
# currently creates an array of image paths from the local folder, picks the first one
image_files = glob(os.path.join(os.path.dirname(__file__), "*.png"))
image_path = image_files[0]
prompt = "Can you tell me what the sign means"
result = analyze_image(image_path, prompt)
print("Analysis Result:", result)