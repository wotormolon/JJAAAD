import os
from flask import Flask, jsonify, request
from PIL import Image
import google.generativeai as genai
from install_packages import install
from werkzeug.utils import secure_filename
from please import analyze_image
from flask_cors import CORS


# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Route for analyzing an image
@app.route("/analyze", methods=["POST"])  
def analyze():
    try:
        image_files = request.form.get('file')
        return analyze_image(image_files, '')
    except Exception as err:
        print(err)
        return None

if __name__ == "__main__":
    app.run(debug=True)
