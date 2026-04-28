import { useState, useEffect } from "react";
import { genericService } from "../services/apiService";
import Swal from "sweetalert2";

export const useMailSettings = () => {
  const [activeTab, setActiveTab] = useState("birthday");
  const [loading, setLoading] = useState(true);
  const [birthdayConfig, setBirthdayConfig] = useState({});
  const [noBirthdayConfig, setNoBirthdayConfig] = useState({});

  useEffect(() => {
    fetchConfigs();
  }, []);

  const fetchConfigs = async () => {
    try {
      const [resBirth, resNoBirth] = await Promise.all([
        genericService.getBirthdayConfig(),
        genericService.getNoBirthdayConfig(),
      ]);
      setBirthdayConfig(resBirth.data.data || {});
      setNoBirthdayConfig(resNoBirth.data.data || {});
    } catch (error) {
      console.error("Error al cargar configuraciones:", error);
    } finally {
      setLoading(false);
    }
  };

  const currentConfig =
    activeTab === "birthday" ? birthdayConfig : noBirthdayConfig;

  const updateConfig = (newData) => {
    if (activeTab === "birthday") setBirthdayConfig(newData);
    else setNoBirthdayConfig(newData);
  };

  const handleUpdate = async () => {
    const updateService =
      activeTab === "birthday"
        ? genericService.updateBirthdayConfig
        : genericService.updateNoBirthdayConfig;

    try {
      await updateService(currentConfig);
      Swal.fire({
        icon: "success",
        title: "¡Guardado!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({ icon: "error", title: "Error al guardar" });
    }
  };

  const handleReset = () => {
    Swal.fire({
      title: "¿Restaurar valores?",
      text: "Se aplicarán los textos originales.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1e3a8a",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          activeTab === "birthday"
            ? await genericService.restoreBirthdayConfig()
            : await genericService.restoreNoBirthdayConfig();
          await fetchConfigs();
          Swal.fire({
            icon: "success",
            title: "Valores restaurados",
            timer: 1500,
          });
        } catch (error) {
          console.log(error);
          Swal.fire("Error", "No se pudo restaurar.", "error");
          setLoading(false);
        }
      }
    });
  };

  return {
    activeTab,
    setActiveTab,
    loading,
    currentConfig,
    updateConfig,
    handleUpdate,
    handleReset,
  };
};
