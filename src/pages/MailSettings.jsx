import React from "react";
import { useMailSettings } from "../hooks/useMailSettings";
import SettingsForm from "../components/MailSettings/SettingsForm/SettingsForm";
import MailPreview from "../components/MailSettings/MailPreview/MailPreview";
import "../styles/MailSettings.css";

const MailSettings = () => {
  const {
    activeTab,
    setActiveTab,
    loading,
    currentConfig,
    updateConfig,
    handleUpdate,
    handleReset,
  } = useMailSettings();

  if (loading)
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );

  return (
    <div className="mail-settings-container">
      <header className="admin-page-header">
        <div className="header-decorator"></div>
        <div className="header-content">
          <h1>Panel de Configuración de Correos</h1>
          <p>Personaliza los comunicados automáticos de OBGROUP</p>
        </div>
      </header>

      <div className="tabs-navigation">
        <button
          className={activeTab === "birthday" ? "tab-active" : ""}
          onClick={() => setActiveTab("birthday")}
        >
          🎂 Cumpleaños
        </button>
        <button
          className={activeTab === "no-birthday" ? "tab-active" : ""}
          onClick={() => setActiveTab("no-birthday")}
        >
          💡 No cumpleaños
        </button>
      </div>

      <div className="settings-main-grid">
        <SettingsForm
          activeTab={activeTab}
          config={currentConfig}
          onConfigChange={updateConfig}
          onSave={handleUpdate}
          onReset={handleReset}
        />
        <MailPreview activeTab={activeTab} config={currentConfig} />
      </div>
    </div>
  );
};

export default MailSettings;
