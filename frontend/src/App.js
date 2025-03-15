import React, { useState } from "react";
import axios from "axios";

function App() {
  const [fileName, setFileName] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");

  // Function to handle file upload and send to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    
    // Send the file to the backend (Flask API)
    try {
      const response = await axios.post("http://127.0.0.1:5000/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setAnalysisResult(response.data.result); 
    } catch (error) {
      console.error("Error analyzing file:", error);
    }
  };

  return (
    <div className="App">
      <h1>Street Sign Identifier</h1>
      
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleSubmit} 
      />
      
      <div>
        <h2>Analysis Result:</h2>
        <p>{analysisResult}</p>
      </div>
    </div>
  );
}

export default App;
