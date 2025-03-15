from pymongo import MongoClient
import google.generativeai as genai
from PIL import Image
import os
import hashlib
from glob import glob
from datetime import datetime

# MongoDB Configuration
MONGO_URI = "mongodb://localhost:27017"  # Replace with your Atlas URI if using MongoDB Cloud
DB_NAME = "parking_signs_db"
COLLECTION_NAME = "scanned_signs"

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

# Configure Gemini API
genai.configure(api_key="AIzaSyDzuQTCml69JzMvKv3jrzOdLKMc5XSUgdI")

def get_image_hash(image_path):
    """Generate a hash for the image to check for duplicates."""
    with open(image_path, "rb") as f:
        return hashlib.md5(f.read()).hexdigest()

def analyze_image(image_path, prompt):
    """Process the image using Gemini API."""
    model = genai.GenerativeModel(model_name="gemini-1.5-flash")

    with Image.open(image_path) as img:
        response = model.generate_content(
            [prompt, img],
            stream=False
        )

    return response.text.strip()

def store_result(image_path, description):
    """Store the analyzed result into MongoDB."""
    image_hash = get_image_hash(image_path)

    # Check if the image already exists in MongoDB
    existing = collection.find_one({"image_hash": image_hash})
    
    if existing:
        print(f"Image {image_path} already exists in the database.")
    else:
        document = {
            "image_path": image_path,
            "image_hash": image_hash,
            "description": description,
            "created_at": datetime.utcnow()
        }
        collection.insert_one(document)
        print(f"Saved: {image_path} -> {description}")

def retrieve_previous_results():
    """Fetch all stored parking sign descriptions."""
    results = collection.find().sort("created_at", -1)  # Sort by latest
    return list(results)

# Main Execution
if __name__ == "__main__":
    # Get images from the local folder
    image_files = glob(os.path.join(os.path.dirname(__file__), "*.png"))
    
    if image_files:
        image_path = image_files[0]  # Example: process first image
        prompt = "Can you tell me what the sign means?"
        result = analyze_image(image_path, prompt)

        # Store in MongoDB
        store_result(image_path, result)

        # Retrieve and display previous results
        previous_results = retrieve_previous_results()
        for doc in previous_results:
            print(f"Image: {doc['image_path']}, Description: {doc['description']}, Timestamp: {doc['created_at']}")
    else:
        print("No images found.")