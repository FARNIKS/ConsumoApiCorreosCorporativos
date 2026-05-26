import React, { useState, useEffect } from "react";
import { useNewEmployeeManagement } from "../../hooks/useNewEmployeeManagement";
import EmployeeFormModal from "../../components/NewEmployees/EmployeeFormModal";
import EmployeeList from "./uicomponents/EmployeeList";
import HistoryList from "./uicomponents/HistoryList";
import "./NewEmployeesPage.css";

const NewEmployeesPage = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const {
    branches,
    departments,
    employees,
    history,
    fetchData,
    saveEmployee,
    loading,
  } = useNewEmployeeManagement();

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (employee = null) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  return (
    <div className="dashboard-container">
      {/* --- ENCABEZADO CORREGIDO --- */}
      <div className="dashboard-header">
        <div className="header-content-wrapper">
          <div className="dashboard-header-meta">
            <h2 className="dashboard-title">Gestión de Nuevos Ingresos</h2>
            <p className="dashboard-subtitle">
              Administration de ingresos y registros históricos
            </p>
          </div>
          <div className="header-actions-group">
            <button
              className="btn-register-custom"
              onClick={() => handleOpenModal()}
            >
              + Nuevo Registro
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="tab-content-area">
          <div className="nav-tabs-custom">
            <button
              className={activeTab === "pending" ? "active" : ""}
              onClick={() => setActiveTab("pending")}
            >
              Nuevos Ingresos
            </button>
            <button
              className={activeTab === "history" ? "active" : ""}
              onClick={() => setActiveTab("history")}
            >
              Historial
            </button>
          </div>

          <div className="tab-panel-container" style={{ marginTop: "20px" }}>
            {activeTab === "pending" ? (
              <EmployeeList
                employees={employees || []}
                onEdit={handleOpenModal}
                isLoading={loading}
              />
            ) : (
              <HistoryList history={history || []} isLoading={loading} />
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <EmployeeFormModal
          employee={selectedEmployee}
          branches={branches}
          departments={departments}
          onClose={() => setShowModal(false)}
          onSave={saveEmployee}
          onRefresh={fetchData}
        />
      )}
    </div>
  );
};

export default NewEmployeesPage;
