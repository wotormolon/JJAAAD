import os
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
from please import analyze_image  # Importing from please.py
from geoloc import get_exif_data, get_gps_info  # Import GPS extraction functions
from pymongo import MongoClient, GEOSPHERE

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Ensure uploads folder exists
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Connect to MongoDB
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = MongoClient(MONGO_URI)
db = client["parking_signs_db"]
collection = db["scanned_signs"]

# Ensure geospatial index on location
collection.create_index([("location", GEOSPHERE)])

@app.route("/", methods=["GET"])
def home():
    """Serve an HTML upload form."""
    return '''
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Upload Image for Analysis</title>
    </head>
    <body>
        <h2>Upload an Image for Analysis</h2>
        <form action="/analyze" method="post" enctype="multipart/form-data">
            <input type="file" name="file" required>
            <br><br>
            <button type="submit">Upload</button>
        </form>
    </body>
    </html>
    '''

@app.route("/analyze", methods=["POST"])
def analyze():
    """Upload an image, analyze it, extract GPS coordinates, and store it in MongoDB."""
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        image_file = request.files["file"]

        # Secure filename
        filename = secure_filename(image_file.filename)
        image_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        image_file.save(image_path)

        # Extract GPS coordinates dynamically from the uploaded image
        exif_data = get_exif_data(image_path)
        gps_info = get_gps_info(exif_data) if exif_data else None

        # Analyze image with Gemini AI
        description = analyze_image(image_path, "In very short dotpoints, describe when and where parking is available, as well as the sign direction and times. If image is not a parking sign, please return 'THAT IS NOT A PARKING SIGN'")

        # Prepare MongoDB document
        document = {
            "image_path": image_path,  # Save uploaded file path
            "description": description,
            "location": {
                "type": "Point",
                "coordinates": [gps_info["longitude"], gps_info["latitude"]]
            } if gps_info else None
        }

        # Insert into MongoDB
        collection.insert_one(document)

        return f'''
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Image Analysis Result</title>
        </head>
        <body>
            <h2>Image Analysis Result</h2>
            <p><strong>Description:</strong> {description}</p>
            <p><strong>GPS Coordinates:</strong> {gps_info if gps_info else "No GPS data available"}</p>
            <br>
            <a href="/">Upload Another Image</a>
        </body>
        </html>
        '''

    except Exception as err:
        print(err)
        return jsonify({"error": str(err)}), 500

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
                "$maxDistance": max_distance
            }
        }
    }

    results = collection.find(query)
    response = [
        {
            "image_path": doc["image_path"],
            "description": doc["description"],
            "location": doc["location"]
        }
        for doc in results
    ]

    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
