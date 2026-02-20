import React from "react";
import "./NotFound.css";
import { FaSadTear } from "react-icons/fa";
function NotFount({ message, movieType, submit }) {
  const errorMessage = message? `${message}` : `There is no ${movieType} under this input ${submit}`
 
  return (
    <div className="parent-error">
    <div className="error">
      <p style={{ fontWeight: "bold" }}><FaSadTear className="color"/>{errorMessage}<FaSadTear className="color"/></p>
    </div>
    </div>
  );
}

export default NotFount;
