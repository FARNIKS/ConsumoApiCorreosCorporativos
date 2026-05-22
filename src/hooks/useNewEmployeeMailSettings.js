import { useState, useEffect } from "react";
import { genericService } from "../services/apiService";
import Swal from "sweetalert2";

export const useNewEmployeeMailSettings = () => {
  const [activeTab, setActiveTab] = useState("general"); // general, friday-with, friday-no
  const [loading, setLoading] = useState(true);

  const [configs, setConfigs] = useState({
    general: {},
    "friday-with": {},
    "friday-no": {},
  });

  const fetchConfigs = async () => {
    setLoading(true);
    try {
      const [resGeneral, resFridayWith, resFridayNo] = await Promise.all([
        genericService.getNewEmployeeReportConfig(),
        genericService.getNewEmployeeReportRhConfig(),
        genericService.getNoNewEmployeeReportRhConfig(),
      ]);

      setConfigs({
        general: resGeneral.data.data || {},
        "friday-with": resFridayWith.data.data || {},
        "friday-no": resFridayNo.data.data || {},
      });
    } catch (error) {
      console.error(
        "Error al cargar configuraciones de nuevos empleados:",
        error,
      );
      Swal.fire(
        "Error",
        "No se pudieron obtener las plantillas del servidor.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfigs();
  }, []);

  const updateConfig = (newData) => {
    setConfigs((prev) => ({
      ...prev,
      [activeTab]: newData,
    }));
  };

  const handleUpdate = async () => {
    try {
      const currentConfig = configs[activeTab];
      if (activeTab === "general") {
        await genericService.updateNewEmployeeReportConfig(currentConfig);
      } else if (activeTab === "friday-with") {
        await genericService.updateNewEmployeeReportRhConfig(currentConfig);
      } else {
        await genericService.updateNoNewEmployeeReportRhConfig(currentConfig);
      }

      Swal.fire({
        icon: "success",
        title: "¡Guardado!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: "error", title: "Error al guardar los cambios" });
    }
  };

  const handleReset = async () => {
    const result = await Swal.fire({
      title: "¿Restaurar valores?",
      text: "Se aplicarán los textos originales de esta plantilla.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1e3a8a",
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        if (activeTab === "general")
          await genericService.restoreNewEmployeeReportConfig();
        else if (activeTab === "friday-with")
          await genericService.restoreNewEmployeeReportRhConfig();
        else await genericService.restoreNoNewEmployeeReportRhConfig();

        await fetchConfigs();
        Swal.fire({
          icon: "success",
          title: "Valores restaurados",
          timer: 1500,
        });
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "No se pudo restaurar.", "error");
        setLoading(false);
      }
    }
  };

  return {
    activeTab,
    setActiveTab,
    loading,
    currentConfig: configs[activeTab],
    updateConfig,
    handleUpdate,
    handleReset,
  };
};

export default useNewEmployeeMailSettings;
