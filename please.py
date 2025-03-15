import google.generativeai as genai
from PIL import Image

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
image_path = "C:/Users/2ansg/OneDrive/Desktop/2025/Unihack/JJAAAD/helpp.png"
prompt = "Can you tell me what the sign means"
result = analyze_image(image_path, prompt)
print("Analysis Result:", result)