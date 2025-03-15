from install_packages import install

# Mapping package names to their import names
required_packages = {
    "google-generativeai": "google.generativeai",
    "Pillow": "PIL",
    "pymongo": "pymongo"
}

# Install missing packages
for package_name, import_name in required_packages.items():
    install(import_name)

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