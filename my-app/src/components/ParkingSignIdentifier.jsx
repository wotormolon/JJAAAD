import React, { useState } from "react";
import "./ParkingSignIdentifier.css";

const ParkingSignIdentifier = () => {
  const [image, setImage] = useState(null);
  const [outputText, setOutputText] = useState("Waiting for analysis...");

  // Handle file upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setOutputText("Analyzing image..."); // Placeholder text for AI analysis
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        {/* Title */}
        <h1 className="title">Parking Sign Identifier</h1>

        {/* Language Selector */}
        <label htmlFor="language" className="label">Select Language</label>
        <select id="language" className="dropdown">
          <option>English (Default)</option>
          <option>Spanish</option>
          <option>French</option>
        </select>

        {/* Upload Section */}
        <div className="upload-section">
          <label className="upload-box">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <span>Choose File</span>
          </label>
        </div>

        {/* Placeholder Box (Shows Uploaded Image Dynamically) */}
        <div className="placeholder-box">
          {image ? (
            <img src={image} alt="Uploaded" className="uploaded-image" />
          ) : (
            "No Image Selected"
          )}
        </div>

        {/* Dynamic Text Label (Updates when Image is Uploaded) */}
        <label className="text-label">{outputText}</label>
      </div>
    </div>
  );
};

export default ParkingSignIdentifier;