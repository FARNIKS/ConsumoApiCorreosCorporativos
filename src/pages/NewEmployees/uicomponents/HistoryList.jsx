import React from "react";
import CustomBootstrapTable from "../../../components/CustomBootstrapTable/CustomBootstrapTable";

const COLUMNS_CONFIG = [
  { field: "nombre", title: "Nombre" },
  { field: "departamento", title: "Depto" },
  {
    field: "empresa.nombre",
    title: "Empresa",
    align: "center",
  },
  {
    field: "fecha_envio",
    title: "Fecha Envío",
    sortable: true,
    align: "center",
  },
];

const HistoryList = ({ history, isLoading }) => {
  return (
    <CustomBootstrapTable
      columns={COLUMNS_CONFIG}
      data={history}
      loadingMessage="Consultando historial..."
      isLoading={isLoading}
    />
  );
};

export default HistoryList;
