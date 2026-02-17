import React, { useState } from 'react';
import foto1 from "./images/logoCeciliaMenta.png";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { FaHome, FaStar, FaBriefcase, FaHandsHelping } from "react-icons/fa";

export default function NavbarClient() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <nav className="navbar" role="navigation" aria-label="Principal">
      <div className="container">

        {/* Logo + Nombre */}
        <div className="navbar-img">
          <NavLink to="/clientdashboard/about#inicio" aria-label="Inicio">
            <div className="title-photo">
              <img src={foto1} alt="Cecilia Menta" />
            </div>
          </NavLink>
          <h2>Cecilia Menta</h2>
        </div>

        {/* Botón hamburguesa */}
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="navmenu"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen(o => !o)}
        >
          <span aria-hidden="true">☰</span>
        </button>

        {/* Menú */}
        <div id="navmenu" className={`navbar-etiquetas ${open ? 'is-open' : ''}`}>

          {/* 📌 INICIO */}
          <NavLink
            to="/clientdashboard/about#inicio"
            className="btn-navbar"
            onClick={closeMenu}
          >
            <span className="icon-text">
              <FaHome />
              Inicio
            </span>
          </NavLink>

          {/* ⭐ VENTAJAS */}
          <NavLink
            to="/clientdashboard/about#ventajas"
            className="btn-navbar"
            onClick={closeMenu}
          >
            <span className="icon-text">
              <FaStar />
              Ventajas
            </span>
          </NavLink>

          {/* 🧰 QUÉ HACEMOS */}
          <NavLink
            to="/clientdashboard/about#servicios"
            className="btn-navbar"
            onClick={closeMenu}
          >
            <span className="icon-text">
              <FaHandsHelping />
              ¿Qué hacemos?
            </span>
          </NavLink>

           {/* 💼 SERVICIOS A CLIENTES */}
          <NavLink
            to="/clientservice"
            className="btn-navbar"
            onClick={closeMenu}
          >
            <span className="icon-text">
              <FaBriefcase />
              Servicio a Clientes
            </span>
          </NavLink>

          {/* 💼 OPORTUNIDADES */}
          <NavLink
            to="/clientdashboard/clientjobs"
            className="btn-navbar btn-jobs"
            onClick={closeMenu}
          >
            <span className="icon-text">
              <FaBriefcase />
              Oportunidades
            </span>
          </NavLink>

        </div>

        {/* ⚙ PANEL ADMIN */}
          <NavLink 
            to="/login"
            className="btn-navbar btn-admin"
            onClick={closeMenu}
          >
            <AdminPanelSettingsIcon className="admin-icon" />
          </NavLink>

      </div>
    </nav>
  );
}
