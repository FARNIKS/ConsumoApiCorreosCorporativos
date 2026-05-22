import { useState, useEffect } from "react";
import { genericService } from "../services/apiService";
import Swal from "sweetalert2";

export const useNewEmployeeMonday = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [loadingPause, setLoadingPause] = useState(false);
  const [isProcessingManual, setIsProcessingManual] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await genericService.getMondayProcessStatus();
        setIsPaused(response.data.is_paused);
      } catch (error) {
        console.error("Error al obtener estado del proceso del lunes:", error);
      }
    };
    fetchStatus();
  }, []);

  const handleTogglePause = async () => {
    const action = isPaused ? "REANUDAR" : "PAUSAR";
    const result = await Swal.fire({
      title: `¿Confirmar ${action} Lunes?`,
      text: "Afectará el proceso de envío masivo automático programado.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: isPaused ? "#10b981" : "#ef4444",
      cancelButtonColor: "#6b7280",
    });

    if (result.isConfirmed) {
      setLoadingPause(true);
      try {
        const response = await genericService.toggleMondayProcess();
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
        Swal.fire(
          "Error",
          "No se pudo cambiar el estado del servicio",
          "error",
        );
      } finally {
        setLoadingPause(false);
      }
    }
  };

  const runManualSend = async () => {
    const result = await Swal.fire({
      title: "¿Ejecutar envío masivo del Lunes?",
      text: "Se enviará el reporte de ingresos a toda la organización de inmediato.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1e3a8a",
      cancelButtonColor: "#ef4444",
    });

    if (result.isConfirmed) {
      setIsProcessingManual(true);
      try {
        const response = await genericService.runMondayProcessManual();
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
          text: "No se pudo procesar el envío manual.",
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
