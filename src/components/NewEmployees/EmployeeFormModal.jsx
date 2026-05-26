import React, { useState } from "react";
import Swal from "sweetalert2";
import "./EmployeeFormModal.css";

const EmployeeFormModal = ({
  employee,
  branches,
  departments,
  onClose,
  onSave,
  onRefresh,
}) => {
  const [formData, setFormData] = useState({
    nombre: employee?.nombre || "",
    departamento: employee?.departamento || "",
    empresa_code:
      employee?.empresa?.codigo ||
      employee?.empresa?.code ||
      employee?.empresa_code ||
      "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, enviado: false };

    try {
      await onSave(payload, employee?.id);
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: `Empleado ${employee ? "actualizado" : "registrado"} correctamente`,
        timer: 1500,
        showConfirmButton: false,
      });
      onRefresh();
      onClose();
    } catch (error) {
      const serverMsg =
        error.response?.data?.message || "Error al procesar los datos";
      Swal.fire("Error", serverMsg, "error");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-custom animate__animated animate__fadeInDown">
        <h3 className="modal-title">
          {employee ? "Editar Empleado" : "Nuevo Ingreso"}
        </h3>
        <form onSubmit={handleSubmit} className="form-container-grid">
          <div className="form-group full-width">
            <label>Nombre Completo</label>
            <input
              className="form-input"
              type="text"
              required
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
            />
          </div>

          <div className="form-group full-width">
            <label>Departamento</label>
            <select
              className="form-input"
              required
              value={formData.departamento}
              onChange={(e) =>
                setFormData({ ...formData, departamento: e.target.value })
              }
            >
              <option value="">Seleccione un departamento</option>
              {departments &&
                departments.map((dept, index) => (
                  <option key={index} value={dept}>
                    {dept}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group full-width">
            <label>Sede / Empresa</label>
            <select
              className="form-input"
              required
              value={formData.empresa_code}
              onChange={(e) =>
                setFormData({ ...formData, empresa_code: e.target.value })
              }
            >
              <option value="">Seleccione una sede</option>
              {branches &&
                branches.map((branch) => (
                  <option key={branch.code} value={branch.code}>
                    {branch.company_name} - {branch.country_name}
                  </option>
                ))}
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              {employee ? "Actualizar" : "Registrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeFormModal;
