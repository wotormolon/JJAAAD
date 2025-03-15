import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
from please import analyze_image  # Importing from please.py

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Ensure uploads folder exists
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

@app.route("/analyze", methods=["POST"])
def analyze():
    """Upload an image and analyze it using Gemini API."""
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        image_file = request.files["file"]

        # Secure filename
        filename = secure_filename(image_file.filename)
        image_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        image_file.save(image_path)

        # Analyze image
        description = analyze_image(image_path, "")

        return jsonify({"description": description})

    except Exception as err:
        print(err)
        return jsonify({"error": str(err)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
