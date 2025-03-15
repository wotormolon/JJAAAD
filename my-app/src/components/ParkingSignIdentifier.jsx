<!DOCTYPE html>
<html lang="en">
<head>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Parking Sign Identifier</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
</head>
<body>

    <div class="app-container">
        <div class="card">
            <h1 class="title" id="title">Parking Sign Identifier</h1>

            <label for="language" class="label" id="selectLanguage">Select Language</label>
            <select id="language" class="dropdown">
                <option value="en">English (Default)</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="zh">Chinese (中文)</option>
                <option value="ko">Korean (한국어)</option>
                <option value="ja">Japanese (日本語)</option>
                <option value="hi">Hindi (हिन्दी)</option>
                <option value="si">Sinhala (සිංහල)</option>
            </select>

            <!-- Upload Section -->
            <div class="upload-section">
                <label class="upload-box" id="drop-area">
                    <input type="file" id="fileInput" accept="image/*">
                    <span id="chooseFile">Choose File</span>
                </label>
            </div>

            <!-- Image Placeholder Box -->
            <div class="image-placeholder" id="imagePlaceholder">No Image Selected</div>

            <!-- Image Container (Initially Hidden) -->
            <div class="image-container" id="imageContainer"></div>

            <!-- Analysis Button (Below Image) -->
            <button class="analyze-button" id="analyzeButton" disabled>Start Analysis</button>

            <!-- Label for Dynamic Text (Under Image) -->
            <label class="text-label" id="outputText">Waiting for analysis...</label>
        </div>
    </div>

    <script src="script.js"></script>
    <!-- Recommendations Navigation Button -->
    <button class="recommendations-btn" id="recommendationsButton" onclick="goToRecommendations()">
    → Our Recommendations
    </button>

</body>
</html>
