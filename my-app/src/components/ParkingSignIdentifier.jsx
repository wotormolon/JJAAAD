// import React, { useState, useEffect } from 'react';


// const translations = {
//     en: {
//         title: "Parking Sign Identifier",
//         selectLanguage: "Select Language",
//         chooseFile: "Choose File",
//         startAnalysis: "Start Analysis",
//         noImage: "No Image Selected",
//         waitingAnalysis: "Waiting for analysis...",
//         analyzing: "Analyzing...",
//         analysisComplete: "Analysis complete!",
//         recommendations: "→ Our Recommendations"
//     },
//     es: {
//         title: "Identificador de Señales de Estacionamiento",
//         selectLanguage: "Seleccionar Idioma",
//         chooseFile: "Seleccionar Archivo",
//         startAnalysis: "Iniciar Análisis",
//         noImage: "Ninguna Imagen Seleccionada",
//         waitingAnalysis: "Esperando análisis...",
//         analyzing: "Analizando...",
//         analysisComplete: "¡Análisis completado!",
//         recommendations: "→ Nuestras Recomendaciones"
//     },
//     fr: {
//         title: "Identificateur de Panneau de Stationnement",
//         selectLanguage: "Choisir la Langue",
//         chooseFile: "Choisir un Fichier",
//         startAnalysis: "Commencer l'Analyse",
//         noImage: "Aucune Image Sélectionnée",
//         waitingAnalysis: "En attente d'analyse...",
//         analyzing: "Analyse en cours...",
//         analysisComplete: "Analyse terminée!",
//         recommendations: "→ Nos Recommandations"
//     },
//     zh: {
//         title: "停车标志识别器",
//         selectLanguage: "选择语言",
//         chooseFile: "选择文件",
//         startAnalysis: "开始分析",
//         noImage: "未选择图片",
//         waitingAnalysis: "等待分析...",
//         analyzing: "分析中...",
//         analysisComplete: "分析完成！",
//         recommendations: "→ 我们的推荐"
//     },
//     ko: {
//         title: "주차 표지판 식별기",
//         selectLanguage: "언어 선택",
//         chooseFile: "파일 선택",
//         startAnalysis: "분석 시작",
//         noImage: "이미지 선택 안 됨",
//         waitingAnalysis: "분석 대기 중...",
//         analyzing: "분석 중...",
//         analysisComplete: "분석 완료!",
//         recommendations: "→ 우리의 추천"
//     },
//     ja: {
//         title: "駐車標識識別",
//         selectLanguage: "言語を選択",
//         chooseFile: "ファイルを選択",
//         startAnalysis: "分析を開始",
//         noImage: "画像が選択されていません",
//         waitingAnalysis: "分析待機中...",
//         analyzing: "分析中...",
//         analysisComplete: "分析完了!",
//         recommendations: "→ 私たちのおすすめ"
//     },
//     hi: {
//         title: "पार्किंग साइन पहचानकर्ता",
//         selectLanguage: "भाषा चुनें",
//         chooseFile: "फ़ाइल चुनें",
//         startAnalysis: "विश्लेषण प्रारंभ करें",
//         noImage: "कोई छवि चयनित नहीं",
//         waitingAnalysis: "विश्लेषण की प्रतीक्षा कर रहा है...",
//         analyzing: "विश्लेषण जारी है...",
//         analysisComplete: "विश्लेषण पूरा!",
//         recommendations: "→ हमारी सिफारिशें"
//     },
//     si: {
//         title: "නාParking සලකුණු හඳුනාගැනීම",
//         selectLanguage: "භාෂාව තෝරන්න",
//         chooseFile: "ගොනුව තෝරන්න",
//         startAnalysis: "විශ්ලේෂණය අරඹන්න",
//         noImage: "චිත්‍රයක් තෝරා නැත",
//         waitingAnalysis: "විශ්ලේෂණය සඳහා රැඳෙන්න...",
//         analyzing: "විශ්ලේෂණය සිදු වෙමින්...",
//         analysisComplete: "විශ්ලේෂණය සම්පූර්ණයි!",
//         recommendations: "→ අපේ නිර්දේශ"
//     }
// };

// const ParkingSignIdentifier = () => {
//     const [selectedLang, setSelectedLang] = useState('en');
//     const [image, setImage] = useState(null);
//     const [analysisStatus, setAnalysisStatus] = useState(translations[selectedLang].waitingAnalysis);
//     const [buttonDisabled, setButtonDisabled] = useState(true);

//     // Update the translation texts when language changes
//     useEffect(() => {
//         setAnalysisStatus(translations[selectedLang].waitingAnalysis);
//     }, [selectedLang]);

//     // Handle language change
//     const handleLanguageChange = (event) => {
//         setSelectedLang(event.target.value);
//     };

//     // Handle file selection
//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = () => {
//                 setImage(reader.result);
//                 setAnalysisStatus(translations[selectedLang].waitingAnalysis);
//                 setButtonDisabled(false);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     // Handle analysis simulation
//     const handleAnalysis = () => {
//         setAnalysisStatus(translations[selectedLang].analyzing);
//         setTimeout(() => {
//             setAnalysisStatus(translations[selectedLang].analysisComplete);
//         }, 2000);
//     };

//     // Navigate to recommendations page (placeholder function)
//     const goToRecommendations = () => {
//         alert("Navigate to recommendations page");
//     };

//     return (
//         <div className="app-container">
//             <div className="card">
//                 <h1>{translations[selectedLang].title}</h1>

//                 <label>{translations[selectedLang].selectLanguage}</label>
//                 <select onChange={handleLanguageChange} value={selectedLang}>
//                     <option value="en">English (Default)</option>
//                     <option value="es">Spanish</option>
//                     <option value="fr">French</option>
//                     <option value="zh">Chinese (中文)</option>
//                     <option value="ko">Korean (한국어)</option>
//                     <option value="ja">Japanese (日本語)</option>
//                     <option value="hi">Hindi (हिन्दी)</option>
//                     <option value="si">Sinhala (සිංහල)</option>
//                 </select>

//                 <div className="upload-section">
//                     <label className="upload-box">
//                         <input type="file" onChange={handleFileChange} accept="image/*" />
//                         {translations[selectedLang].chooseFile}
//                     </label>
//                 </div>

//                 <div className="image-placeholder">
//                     {image ? (
//                         <div className="image-container">
//                             <img src={image} alt="Uploaded" />
//                         </div>
//                     ) : (
//                         translations[selectedLang].noImage
//                     )}
//                 </div>

//                 <button className="analyze-button" onClick={handleAnalysis} disabled={buttonDisabled}>
//                     {translations[selectedLang].startAnalysis}
//                 </button>

//                 <p>{analysisStatus}</p>

//                 <button className="recommendations-btn" onClick={goToRecommendations}>
//                     {translations[selectedLang].recommendations}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ParkingSignIdentifier;

import React, { useState } from 'react';

const ParkingSignIdentifier = () => {
  const [image, setImage] = useState(null);
  const [outputText, setOutputText] = useState('Waiting for analysis...');
  const [language, setLanguage] = useState('English (Default)');

  const handleFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setOutputText('Analyzing image...'); // Placeholder text for future AI analysis
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">Parking Sign Identifier</h1>
        
        <label htmlFor="language" className="label">Select Language</label>
        <select
          id="language"
          className="dropdown"
          value={language}
          onChange={handleLanguageChange}
        >
          <option>English (Default)</option>
          <option>Spanish</option>
          <option>French</option>
        </select>

        {/* Upload Section */}
        <div className="upload-section">
          <label className="upload-box" htmlFor="fileInput">
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleFile}
            />
            <span>Choose File</span>
          </label>
        </div>

        {/* Placeholder Box (Adjusts to Image Size) */}
        <div className="placeholder-box" id="imageContainer">
          {image ? <img src={image} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} /> : 'No Image Selected'}
        </div>

        {/* Label for Dynamic Text (Under Placeholder Box) */}
        <label className="text-label" id="outputText">{outputText}</label>
      </div>
    </div>
  );
};

export default ParkingSignIdentifier;