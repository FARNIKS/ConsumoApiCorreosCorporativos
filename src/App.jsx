import React, { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Settings from "./pages/MailSettings/MailSettings";
import NewEmployeeMailSettings from "./pages/NewEmployeeMailSettings/NewEmployeeMailSettings";
import Login from "./pages/Login/Login";
import UserPage from "./pages/UserPage/UserPage";

function App() {
  // Corrección: Recuperar el estado inicial directamente de localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const navigate = useNavigate();

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    navigate("/");
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login onLoginSuccess={handleLoginSuccess} />}
      />

      <Route
        path="/"
        element={
          <Layout user={user}>
            <Home />
          </Layout>
        }
      />

      <Route
        path="/users"
        element={
          <Layout user={user}>
            <UserPage />
          </Layout>
        }
      />

      {/* Módulo de correos de Cumpleaños */}
      <Route
        path="/settings"
        element={
          <Layout user={user}>
            <Settings />
          </Layout>
        }
      />

      {/* Módulo de correos de Nuevos Empleados */}
      <Route
        path="/settings/new-employees"
        element={
          <Layout user={user}>
            <NewEmployeeMailSettings />
          </Layout>
        }
      />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
