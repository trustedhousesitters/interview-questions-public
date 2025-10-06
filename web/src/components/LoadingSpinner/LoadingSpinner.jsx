import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = ({ size = 50, color = "#00AFA2" }) => {
  return (
    <div className="loading-container">
      <svg
        className="spinner"
        width={size}
        height={size}
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="31.4 31.4"
        />
      </svg>
    </div>
  );
};

export default LoadingSpinner;
