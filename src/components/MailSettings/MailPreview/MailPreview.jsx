import React from "react";
import "./MailPreview.css";

const MailPreview = ({ activeTab, config }) => {
  return (
    <section className="preview-column">
      <div className="preview-label">Vista Previa (Diseño Blade)</div>
      <div className="email-browser-frame">
        <div className="email-content-wrapper">
          {activeTab === "birthday" ? (
            <>
              <img
                src={config.banner_url}
                alt="Banner"
                className="blade-img-banner"
              />
              <p
                className="blade-text-intro"
                style={{ whiteSpace: "pre-line" }}
              >
                {config.intro_text}
              </p>
              <div className="country-section">
                <h3 className="company-header">📍 Costa Rica - EL ORBE:</h3>
                <ul className="employee-list">
                  <li className="employee-item">🎂 Usuario de Prueba</li>
                </ul>
              </div>
              <div style={{ marginTop: "25px" }}>
                <p style={{ whiteSpace: "pre-line" }}>{config.main_body}</p>
                <p>
                  <strong>{config.closing_text}</strong>
                </p>
              </div>
              <div className="birthday-phrase-box">
                <p style={{ margin: 0, color: "#856404" }}>
                  "Frase célebre de ejemplo"
                </p>
              </div>
            </>
          ) : (
            <>
              <p
                className="blade-text-intro"
                style={{ whiteSpace: "pre-line" }}
              >
                {config.intro_text}
              </p>
              <div className="no-birthday-phrase-box">
                <span className="phrase-title-preview">{config.main_body}</span>
                <p className="phrase-text-preview">
                  "La persistencia es el camino al éxito."
                </p>
              </div>
              <p style={{ whiteSpace: "pre-line" }}>{config.closing_text}</p>
            </>
          )}
          <div className="footer-preview">
            <p>
              Atentamente,
              <br />
              <strong>{config.sign_off}</strong>
              <br />
              &copy; {new Date().getFullYear()} OBGROUP
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MailPreview;
