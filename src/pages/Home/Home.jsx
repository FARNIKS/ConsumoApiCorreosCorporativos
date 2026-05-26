import React, { useState } from "react";
import EmployeeList from "./ui-components/EmployeeList";
import BranchList from "./ui-components/BranchList";
import "./Home.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("employees");

  return (
    <div className="dashboard-container">
      {/* --- ENCABEZADO CORREGIDO --- */}
      <div className="dashboard-header">
        <div className="header-content-wrapper">
          <div className="dashboard-header-meta">
            <h2 className="dashboard-title">Panel Administrativo</h2>
            <p className="dashboard-subtitle">
              Control de cumpleaños corporativo
            </p>
          </div>
          {/* Espacio reservado por si en el futuro agregas un botón de exportar o filtros globales */}
          <div className="header-actions-group"></div>
        </div>
      </div>

      <div className="dashboard-card">
        {/* Simplificado quitando el 'ul/li' para que responda directo al CSS global de botones */}
        <div className="nav-tabs-custom">
          <button
            className={`tab-button ${activeTab === "employees" ? "active" : ""}`}
            onClick={() => setActiveTab("employees")}
          >
            <i className="bi bi-people me-2"></i>Empleados
          </button>
          <button
            className={`tab-button ${activeTab === "branches" ? "active" : ""}`}
            onClick={() => setActiveTab("branches")}
          >
            <i className="bi bi-geo-alt me-2"></i>Sucursales
          </button>
        </div>

        <div className="tab-content-area">
          {activeTab === "employees" && <EmployeeList key="tab-emp" />}
          {activeTab === "branches" && <BranchList key="tab-bra" />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
