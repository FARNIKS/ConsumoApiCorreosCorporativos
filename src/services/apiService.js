import apiClient from "../api/client";

export const genericService = {
  getEmployees: () => apiClient.get("/employees"),
  getBranches: () => apiClient.get("/branches"),
  getCountries: () => apiClient.get("/countries"),

  // Configuración Cumpleaños
  getBirthdayConfig: () => apiClient.get("/settings/birthday"),
  updateBirthdayConfig: (data) => apiClient.put("/settings/birthday", data),
  restoreBirthdayConfig: () => apiClient.post("/settings/birthday/restore"),

  // Configuración No Cumpleaños (Frases)
  getNoBirthdayConfig: () => apiClient.get("/settings/no-birthday"),
  updateNoBirthdayConfig: (data) =>
    apiClient.put("/settings/no-birthday", data),
  restoreNoBirthdayConfig: () =>
    apiClient.post("/settings/no-birthday/restore"),
};
