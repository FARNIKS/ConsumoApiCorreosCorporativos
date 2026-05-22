import React from "react";
import "./NewEmployeeSettingsForm.css";

const NewEmployeeSettingsForm = ({
  activeTab,
  config,
  onConfigChange,
  onSave,
  onReset,
}) => {
  const handleChange = (field, value) => {
    onConfigChange({ ...config, [field]: value });
  };

  // Renderizar título adaptativo
  const getFormTitle = () => {
    if (activeTab === "general") return "Editar Plantilla General (Lunes)";
    if (activeTab === "friday-with")
      return "Editar Reporte para RH (Con Ingresos)";
    return "Editar Reporte para RH (Sin Ingresos)";
  };

  return (
    <aside className="form-column">
      <div className="glass-card" key={activeTab}>
        <h3>{getFormTitle()}</h3>

        {/* Campo Condicional: Título (Solo para Reportes de RH del Viernes) */}
        {activeTab !== "general" && (
          <div className="input-field">
            <label>Título del Reporte</label>
            <input
              type="text"
              value={config.title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>
        )}

        {/* Campo Condicional: URL Banner (Solo para Plantilla General del Lunes) */}
        {activeTab === "general" && (
          <div className="input-field">
            <label>URL Banner Informativo</label>
            <input
              type="text"
              value={config.banner_url || ""}
              onChange={(e) => handleChange("banner_url", e.target.value)}
            />
          </div>
        )}

        {/* Campo Común: Introducción */}
        <div className="input-field">
          <label>Texto de Introducción</label>
          <textarea
            rows="3"
            value={config.intro_text || ""}
            onChange={(e) => handleChange("intro_text", e.target.value)}
          />
        </div>

        {/* Campo Condicional: Cuerpo Principal (Solo para Plantilla General del Lunes) */}
        {activeTab === "general" && (
          <div className="input-field">
            <label>Cuerpo del Mensaje (Estructura de Bienvenida)</label>
            <textarea
              rows="4"
              value={config.main_body || ""}
              onChange={(e) => handleChange("main_body", e.target.value)}
            />
          </div>
        )}

        {/* Campo Común: Despedida */}
        <div className="input-field">
          <label>Texto de Cierre (Despedida)</label>
          <input
            type="text"
            value={config.closing_text || ""}
            onChange={(e) => handleChange("closing_text", e.target.value)}
          />
        </div>

        {/* Campo Común: Firma */}
        <div className="input-field">
          <label>Firma Institucional</label>
          <input
            type="text"
            value={config.sign_off || ""}
            onChange={(e) => handleChange("sign_off", e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button className="btn-save-config" onClick={onSave}>
            Guardar Plantilla
          </button>
          <button className="btn-reset-config" onClick={onReset}>
            Restaurar Defectos
          </button>
        </div>
      </div>
    </aside>
  );
};

export default NewEmployeeSettingsForm;
