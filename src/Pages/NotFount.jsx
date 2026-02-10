import React from "react";
import "./NotFound.css";
function NotFount({ message, err }) {
  const handleClose = () => {
    err(false);
  };
  return (
    <div className="error">
      <p style={{ fontWeight: "bold" }}>{message}</p>
      <button
        style={{
          height: "30px",
          padding: "5px 10px",
          fontSize: "16px",
          borderRadius: "7px",
          border: "1px solid black",
          background: "transparent",
          color: "black",
          fontWeight: "bold"
        }}
        onClick={() => handleClose()}
      >
        close
      </button>
    </div>
  );
}

export default NotFount;
