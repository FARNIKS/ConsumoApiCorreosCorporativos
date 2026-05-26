import { useState, useCallback } from "react";
import { genericService } from "../services/apiService";

export const useNewEmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [history, setHistory] = useState([]);
  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [empRes, histRes, branchRes, deptRes] = await Promise.allSettled([
        genericService.getNewEmployees(),
        genericService.getHistoryEmployees(),
        genericService.getBranches(),
        genericService.getDepartments(),
      ]);

      setEmployees(
        empRes.status === "fulfilled" ? empRes.value.data.data || [] : [],
      );
      setHistory(
        histRes.status === "fulfilled" ? histRes.value.data.data || [] : [],
      );
      setBranches(
        branchRes.status === "fulfilled" ? branchRes.value.data.data || [] : [],
      );

      const depts =
        deptRes.status === "fulfilled"
          ? deptRes.value.data.data || deptRes.value.data || []
          : [];
      setDepartments(Array.isArray(depts) ? depts : []);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveEmployee = async (data, id = null) => {
    return id
      ? await genericService.updateNewEmployee(id, data)
      : await genericService.createNewEmployee(data);
  };

  return {
    employees,
    history,
    branches,
    departments,
    loading,
    fetchData,
    saveEmployee,
  };
};
