import React from "react";
import "./ManualSendButton.css";

const ManualSendButton = ({ onClick, isProcessing }) => {
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
      {/* Texto completo para pantallas grandes */}
      <span className="text-send-button text-btn-full">
        {isProcessing ? "Enviando..." : "Enviar ahora"}
      </span>
      {/* Texto vacío o corto para conservar el tamaño responsivo en móviles */}
      <span className="text-send-button text-btn-short"></span>
    </button>
  );
};

export default ManualSendButton;
