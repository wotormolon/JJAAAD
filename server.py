import os
from flask import Flask, jsonify, request, render_template
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
            <br>
            <a href="/">Upload Another Image</a>
        </body>
        </html>
        '''
    
    except Exception as err:
        print(err)
        return jsonify({"error": str(err)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
