import React, { useState, useEffect } from "react";
import "./MailPreview.css";

const MailPreview = ({ activeTab, config = {} }) => {
  const [imageError, setImageError] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Usamos setTimeout(..., 0) para que React procese el renderizado
    // antes de realizar cambios de estado, evitando el error de cascada.
    const timer = setTimeout(() => {
      // 1. Si no estamos en la pestaña de cumpleaños, reseteamos estados de forma segura
      if (activeTab !== "birthday") {
        setIsTyping(false);
        setImageError(false);
        return;
      }

      // 2. Lógica de validación de banner
      const url = config?.banner_url;
      const isEmpty = !url || url.trim() === "";

      if (isEmpty) {
        setImageError(true);
        setIsTyping(false);
        return;
      }

      setIsTyping(true);
      setImageError(false);

      // 3. Validación asíncrona de la imagen
      const loadTimer = setTimeout(() => {
        const img = new Image();

        const timeoutFallback = setTimeout(() => {
          img.src = "";
          setImageError(true);
          setIsTyping(false);
        }, 3000);

        img.onload = () => {
          clearTimeout(timeoutFallback);
          setImageError(false);
          setIsTyping(false);
        };

        img.onerror = () => {
          clearTimeout(timeoutFallback);
          setImageError(true);
          setIsTyping(false);
        };

        img.src = url;
      }, 500);

      return () => clearTimeout(loadTimer);
    }, 0);

    return () => clearTimeout(timer);
  }, [config?.banner_url, activeTab]);

  return (
    <section className="preview-column">
      <div className="preview-title">Vista Previa del Correo Electrónico</div>

      <div className="email-container">
        <div className="mail-preview-card">
          {activeTab === "birthday" &&
            (isTyping ? (
              <div className="blade-img-placeholder">
                <span>🔍 Validando URL...</span>
              </div>
            ) : imageError || !config?.banner_url ? (
              <div className="blade-img-placeholder">
                <span>🖼️ Imagen no disponible</span>
              </div>
            ) : (
              <img
                src={config.banner_url}
                alt="Banner"
                className="banner"
                onError={() => setImageError(true)}
              />
            ))}

          <div className="content">
            {activeTab === "birthday" ? (
              <>
                <p className="intro-text">
                  {config.intro_text || "Texto de introducción..."}
                </p>
                <div className="company-group">
                  <h3 className="company-header">🥳 COSTA RICA › EL ORBE</h3>
                  <ul className="employee-list">
                    <li className="employee-item">🎂 Usuario de Prueba</li>
                  </ul>
                </div>
                <div className="closing-section">
                  <p>{config.main_body || "Cuerpo del mensaje..."}</p>
                  <p>
                    <strong>
                      {config.closing_text || "Texto de cierre..."}
                    </strong>
                  </p>
                </div>
                <div className="phrase-box">
                  <p className="phrase-text">"Frase célebre de ejemplo"</p>
                </div>
              </>
            ) : (
              <div className="closing-section">
                <p className="intro-text">
                  {config.intro_text || "Texto de introducción..."}
                </p>
                <p>{config.main_body || "Sin novedades para mostrar..."}</p>
                <div className="phrase-box">
                  <p className="phrase-text">"Frase célebre de ejemplo"</p>
                </div>
              </div>
            )}
          </div>

          <div className="footer">
            <p>
              Atentamente, <br />
              <strong>{config.sign_off || "Firma aquí"}</strong> <br />
              &copy; {new Date().getFullYear()} OBGROUP
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MailPreview;
