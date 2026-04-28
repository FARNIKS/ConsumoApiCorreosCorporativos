import React, { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Settings from "./pages/MailSettings";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    navigate("/");
  };

  return (
    <Routes>
      {/* Ruta de Login - Le pasamos la prop que espera */}
      <Route
        path="/login"
        element={<Login onLoginSuccess={handleLoginSuccess} />}
      />

      {/* Ruta de Inicio */}
      <Route
        path="/"
        element={
          <Layout user={user}>
            <Home />
          </Layout>
        }
      />

      {/* Ruta de Configuración de Correos */}
      <Route
        path="/settings"
        element={
          <Layout user={user}>
            <Settings />
          </Layout>
        }
      />

      {/* Redirección por defecto si no encuentra la ruta */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
