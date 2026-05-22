import { useState, useEffect } from "react";
import { genericService } from "../services/apiService";
import Swal from "sweetalert2";

export const useNewEmployeeFriday = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [loadingPause, setLoadingPause] = useState(false);
  const [isProcessingManual, setIsProcessingManual] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await genericService.getFridayReportStatus();
        setIsPaused(response.data.is_paused);
      } catch (error) {
        console.error(
          "Error al obtener estado del reporte del viernes:",
          error,
        );
      }
    };
    fetchStatus();
  }, []);

  const handleTogglePause = async () => {
    const action = isPaused ? "REANUDAR" : "PAUSAR";
    const result = await Swal.fire({
      title: `¿Confirmar ${action} Viernes?`,
      text: "Afectará la notificación automática de gestión humana.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: isPaused ? "#10b981" : "#ef4444",
      cancelButtonColor: "#6b7280",
    });

    if (result.isConfirmed) {
      setLoadingPause(true);
      try {
        const response = await genericService.toggleFridayReport();
        setIsPaused(response.data.is_paused);
        Swal.fire({
          icon: "success",
          title: response.data.is_paused
            ? "Servicio Pausado"
            : "Servicio Activo",
          text: response.data.message,
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error al ejecutar reporte manual:", error);

        Swal.fire("Error", "No se pudo cambiar el estado del reporte", "error");
      } finally {
        setLoadingPause(false);
      }
    }
  };

  const runManualSend = async () => {
    const result = await Swal.fire({
      title: "¿Ejecutar reporte de RH manual?",
      text: "Se consolidarán los nuevos ingresos y se enviará el correo a RH ahora.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1e3a8a",
      cancelButtonColor: "#ef4444",
    });

    if (result.isConfirmed) {
      setIsProcessingManual(true);
      try {
        const response = await genericService.runFridayReportManual();
        Swal.fire({
          icon: response.data.status === "success" ? "success" : "info",
          title: "Resultado",
          text: response.data.message,
          confirmButtonColor: "#1e3a8a",
        });
      } catch (error) {
        console.error("Error al ejecutar reporte manual:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo despachar el reporte manual.",
        });
      } finally {
        setIsProcessingManual(false);
      }
    }
  };

  return {
    isPaused,
    handleTogglePause,
    loadingPause,
    isProcessingManual,
    runManualSend,
  };
};
