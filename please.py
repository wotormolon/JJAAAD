import google.generativeai as genai
from PIL import Image
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Analyze the image
def analyze_image(image_path, prompt):
    try:
        model = genai.GenerativeModel(model_name="gemini-1.5-flash")
        
        with Image.open(image_path) as img:
            response = model.generate_content(
                [prompt, img],
                stream=False
            )
        
        return response.text.strip() if response.text else "No description available."
    except Exception as err:
        print(f"❌ Gemini API Error: {err}")
        return "Failed to analyze image."
