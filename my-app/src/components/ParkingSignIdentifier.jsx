import React from "react";
import "./ParkingSignIdentifier.css"; // Ensure the CSS is imported

const ParkingSignIdentifier = () => {
  return (
    <div className="container--0-">
      <svg width="577" height="784" viewBox="0 0 577 784" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="577" height="784" rx="63" fill="white" />
      </svg>

      <svg width="101" height="189" viewBox="0 0 101 189" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="100" height="188" fill="#4F4F4F" stroke="black" />
      </svg>

      <svg width="500" height="700" viewBox="0 0 500 700" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="500" height="700" rx="63" fill="#0A6514" fillOpacity="0.67" />
      </svg>

      <div className="text--0-">Parking Sign Identifier</div>

      {/* Upload Sign Section */}
      <div className="container--0-">
        <div className="container-0-1-0">
          <div className="text-1-2-1">Upload Sign</div>
        </div>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M28 4H12C10.9 4 9.9 4.4 9.2 5.2C8.4 6 8 6.9 8 8V40C8 41.1 8.4 42.1 9.2 42.8C9.9 43.6 10.9 44 12 44H36C37.1 44 38.1 43.6 38.8 42.8C39.6 42.1 40 41.1 40 40V16M28 4L40 16M28 4V16H40M24 36V24M18 30H30" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Language Selector */}
      <div className="container--0-">
        <div className="text-0-1-0">Select Language</div>
        <div className="container-0-1-2">
          <div className="text-1-2-0">English (Default)</div>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6L8 10L12 6" stroke="#1E1E1E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Placeholder for Identified Sign Output */}
      <svg width="446" height="363" viewBox="0 0 446 363" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="446" height="363" rx="20" fill="#D9D9D9" />
      </svg>
    </div>
  );
};

export default ParkingSignIdentifier;
