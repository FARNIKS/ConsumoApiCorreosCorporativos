import React from "react";
import { Link } from "react-router-dom";
import { House, Mail, LogOut, Menu, ChevronLeft, Globe } from "lucide-react";
import "./Sidebar.css";

const Sidebar = ({ collapsed, setCollapsed, onLogout }) => {
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        {!collapsed && (
          <span className="brand">
            <i className="bi bi-globe-americas"> EL ORBE</i>
          </span>
        )}
        <button onClick={() => setCollapsed(!collapsed)} className="toggle-btn">
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        <Link to="/" className="nav-item">
          <House size={22} />
          {!collapsed && <span>Inicio</span>}
        </Link>
        <Link to="/settings" className="nav-item">
          <Mail size={22} />
          {!collapsed && <span>Configurar Correos</span>}
        </Link>
      </nav>

      <div className="sidebar-user">
        <div className="user-badge">
          <div className="avatar">MJ</div>
          {!collapsed && (
            <div className="user-info">
              <span className="user-name">Miguel J.</span>
              <span className="user-role">Desarrollador</span>
            </div>
          )}
        </div>
      </div>

      <div className="sidebar-footer">
        <button onClick={onLogout} className="btn-logout-sidebar">
          <LogOut size={22} />
          {!collapsed && <span>Cerrar Sesión</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
