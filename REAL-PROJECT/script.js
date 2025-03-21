const fileInput = document.getElementById("fileInput");
const imageContainer = document.getElementById("imageContainer");
const outputText = document.getElementById("outputText");
const analyzeButton = document.getElementById("analyzeButton");
const imagePlaceholder = document.getElementById("imagePlaceholder");
const languageSelector = document.getElementById("language");
const recommendationButton = document.getElementById("recommendationsButton");

const translations = {
    en: {
        title: "Parking Sign Identifier",
        selectLanguage: "Select Language",
        chooseFile: "Choose File",
        startAnalysis: "Start Analysis",
        noImage: "No Image Selected",
        waitingAnalysis: "Waiting for analysis...",
        analyzing: "Analyzing...",
        analysisComplete: "Analysis complete!",
        recommendations: "→ Our Recommendations"
    },
    es: {
        title: "Identificador de Señales de Estacionamiento",
        selectLanguage: "Seleccionar Idioma",
        chooseFile: "Seleccionar Archivo",
        startAnalysis: "Iniciar Análisis",
        noImage: "Ninguna Imagen Seleccionada",
        waitingAnalysis: "Esperando análisis...",
        analyzing: "Analizando...",
        analysisComplete: "¡Análisis completado!",
        recommendations: "→ Nuestras Recomendaciones"
    },
    fr: {
        title: "Identificateur de Panneau de Stationnement",
        selectLanguage: "Choisir la Langue",
        chooseFile: "Choisir un Fichier",
        startAnalysis: "Commencer l'Analyse",
        noImage: "Aucune Image Sélectionnée",
        waitingAnalysis: "En attente d'analyse...",
        analyzing: "Analyse en cours...",
        analysisComplete: "Analyse terminée!",
        recommendations: "→ Nos Recommandations"
    },
    zh: {
        title: "停车标志识别器",
        selectLanguage: "选择语言",
        chooseFile: "选择文件",
        startAnalysis: "开始分析",
        noImage: "未选择图片",
        waitingAnalysis: "等待分析...",
        analyzing: "分析中...",
        analysisComplete: "分析完成！",
        recommendations: "→ 我们的推荐"
    },
    ko: {
        title: "주차 표지판 식별기",
        selectLanguage: "언어 선택",
        chooseFile: "파일 선택",
        startAnalysis: "분석 시작",
        noImage: "이미지 선택 안 됨",
        waitingAnalysis: "분석 대기 중...",
        analyzing: "분석 중...",
        analysisComplete: "분석 완료!",
        recommendations: "→ 우리의 추천"
    },
    ja: {
        title: "駐車標識識別",
        selectLanguage: "言語を選択",
        chooseFile: "ファイルを選択",
        startAnalysis: "分析を開始",
        noImage: "画像が選択されていません",
        waitingAnalysis: "分析待機中...",
        analyzing: "分析中...",
        analysisComplete: "分析完了!",
        recommendations: "→ 私たちのおすすめ"
    },
    hi: {
        title: "पार्किंग साइन पहचानकर्ता",
        selectLanguage: "भाषा चुनें",
        chooseFile: "फ़ाइल चुनें",
        startAnalysis: "विश्लेषण प्रारंभ करें",
        noImage: "कोई छवि चयनित नहीं",
        waitingAnalysis: "विश्लेषण की प्रतीक्षा कर रहा है...",
        analyzing: "विश्लेषण जारी है...",
        analysisComplete: "विश्लेषण पूरा!",
        recommendations: "→ हमारी सिफारिशें"
    },
    si: {
        title: "නාParking සලකුණු හඳුනාගැනීම",
        selectLanguage: "භාෂාව තෝරන්න",
        chooseFile: "ගොනුව තෝරන්න",
        startAnalysis: "විශ්ලේෂණය අරඹන්න",
        noImage: "චිත්‍රයක් තෝරා නැත",
        waitingAnalysis: "විශ්ලේෂණය සඳහා රැඳෙන්න...",
        analyzing: "විශ්ලේෂණය සිදු වෙමින්...",
        analysisComplete: "විශ්ලේෂණය සම්පූර්ණයි!",
        recommendations: "→ අපේ නිර්දේශ"
    }
};

// Function to change text based on selected language
function changeLanguage() {
    const selectedLang = languageSelector.value;

    document.getElementById("title").innerText = translations[selectedLang].title;
    document.getElementById("selectLanguage").innerText = translations[selectedLang].selectLanguage;
    document.getElementById("chooseFile").innerText = translations[selectedLang].chooseFile;
    analyzeButton.innerText = translations[selectedLang].startAnalysis;
    imagePlaceholder.innerText = translations[selectedLang].noImage;
    outputText.innerText = translations[selectedLang].waitingAnalysis;
    recommendationButton.innerText = translations[selectedLang].recommendations;
}

// Add event listener for language change
languageSelector.addEventListener("change", changeLanguage);

// Handle file selection
fileInput.addEventListener("change", function () {
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            imagePlaceholder.style.display = "none";
            imageContainer.innerHTML = `<img src="${reader.result}" alt="Uploaded Image">`;
            imageContainer.style.display = "block";
            analyzeButton.disabled = false;
            outputText.innerText = translations[languageSelector.value].waitingAnalysis;
        };
        reader.readAsDataURL(file);
    }
});

// Function to dynamically adjust text box height
function adjustTextBoxHeight() {
    outputText.style.height = "auto"; // Reset height
    outputText.style.height = outputText.scrollHeight + "px"; // Set new height dynamically
}

// Handle analysis button click
analyzeButton.addEventListener("click", function () {
    const file = fileInput.files[0];
    if (!file) {
        outputText.innerText = "No file selected.";
        return;
    }

    outputText.innerText = "Analyzing...";
    adjustTextBoxHeight();

    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            outputText.innerText = "Error: " + data.error;
        } else {
            outputText.innerText = `Analysis complete!\n\nDescription:\n${data.description}\n`;
        }
        adjustTextBoxHeight();
    })
    .catch(error => {
        console.error("Error:", error);
        outputText.innerText = "Analysis failed.";
        adjustTextBoxHeight();
    });
});

// Function to navigate to recommendations page
function goToRecommendations() {
    window.location.href = "index2.html";
}
