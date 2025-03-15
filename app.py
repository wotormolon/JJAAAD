from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient, GEOSPHERE
import google.generativeai as genai
from PIL import Image
import os
import hashlib
from datetime import datetime
from werkzeug.utils import secure_filename
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["parking_signs_db"]
collection = db["scanned_signs"]

collection.create_index([("location", GEOSPHERE)])

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def get_image_hash(image_path):
    """Generate a hash for the image to check for duplicates."""
    with open(image_path, "rb") as f:
        return hashlib.md5(f.read()).hexdigest()

def analyze_image(image_path):
    """Process the image using Gemini API."""
    model = genai.GenerativeModel(model_name="gemini-1.5-flash")

    with Image.open(image_path) as img:
        response = model.generate_content(
            ["Can you describe this parking sign?", img],
            stream=False
        )

    return response.text.strip()

@app.route("/upload", methods=["POST"])
def upload_image():
    """Upload an image with location and store in MongoDB."""
    
    if "image_file" not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    image_file = request.files["image_file"]
    latitude = request.form.get("latitude", type=float)
    longitude = request.form.get("longitude", type=float)

    if not latitude or not longitude:
        return jsonify({"error": "Latitude and longitude are required"}), 400

    # Save image
    filename = secure_filename(image_file.filename)
    image_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    image_file.save(image_path)

    # Generate description
    description = analyze_image(image_path)

    # Get image hash
    image_hash = get_image_hash(image_path)

    # Store in MongoDB
    document = {
        "image_path": image_path,
        "image_hash": image_hash,
        "description": description,
        "location": {
            "type": "Point",
            "coordinates": [longitude, latitude]
        },
        "created_at": datetime.utcnow()
    }

    collection.insert_one(document)

    return jsonify({"message": "Image uploaded successfully!", "description": description})

@app.route("/search", methods=["GET"])
def search_nearby_signs():
    """Find parking signs near a given location within a max distance (meters)."""
    
    latitude = request.args.get("latitude", type=float)
    longitude = request.args.get("longitude", type=float)
    max_distance = request.args.get("max_distance", default=500, type=int)

    if not latitude or not longitude:
        return jsonify({"error": "Latitude and longitude are required"}), 400

    query = {
        "location": {
            "$near": {
                "$geometry": {
                    "type": "Point",
                    "coordinates": [longitude, latitude]
                },
                "$maxDistance": max_distance  # Distance in meters
            }
        }
    }

    results = collection.find(query)
    response = [
        {"image_path": doc["image_path"], "description": doc["description"], "location": doc["location"]}
        for doc in results
    ]

    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)