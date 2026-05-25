import React from "react";
import "./ManualSendButton.css";

const ManualSendButton = ({
  onClick,
  isProcessing,
  label = "Enviar ahora",
}) => {
  return (
    <button
      className="btn-manual-send"
      onClick={onClick}
      disabled={isProcessing}
      type="button"
    >
      <i
        className={`bi ${isProcessing ? "bi-arrow-repeat spin" : "bi-send-fill"}`}
      ></i>
      <span className="text-send-button">
        {isProcessing ? "Procesando..." : label}
      </span>
    </button>
  );
};

export default ManualSendButton;
