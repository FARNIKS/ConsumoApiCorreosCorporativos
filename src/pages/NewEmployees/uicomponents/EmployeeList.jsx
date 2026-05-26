import React from "react";
import CustomBootstrapTable from "../../../components/CustomBootstrapTable/CustomBootstrapTable";

const EmployeeList = ({ employees, onEdit, isLoading }) => {
  // 1. Definimos los eventos dentro del componente para mantener el scope de React
  const actionEvents = {
    "click .btn-edit": (e, val, row) => {
      e.preventDefault();
      onEdit(row); // <--- Esto envía TODO el objeto del empleado (con sede y departamento) al padre
    },
  };

  // 2. Trasladamos la configuración de columnas aquí adentro para poder inyectarle 'events'
  const columns = [
    { field: "nombre", title: "Nombre", sortable: true },
    { field: "departamento", title: "Departamento" },
    {
      field: "empresa.codigo",
      title: "Código",
      align: "center",
    },
    {
      field: "empresa.nombre",
      title: "Empresa",
      align: "center",
    },
    {
      field: "empresa.pais",
      title: "País",
      align: "center",
    },
    {
      field: "creado_el",
      title: "Creado el",
      align: "center",
    },
    {
      title: "Acciones",
      align: "center",
      events: actionEvents,
      formatter: () =>
        `<button class="btn-edit-custom btn-edit"><i class="bi bi-pencil-fill me-1"></i>Editar</button>`,
    },
  ];

  return (
    <CustomBootstrapTable
      columns={columns}
      data={employees}
      loadingMessage="Consultando empleados..."
      actionEvents={actionEvents}
      isLoading={isLoading}
    />
  );
};

export default EmployeeList;
