import React from 'react'
import foto1 from "./images/logoCeciliaMenta.png";
import "./Navbar.css"
import {NavLink} from "react-router-dom";
import { useState } from 'react';


export default function NavbarClient() {
  const [open, setOpen] = useState(false);

  // Cierra el menú al navegar
  const closeMenu = () => setOpen(false);

  return (
    <nav className="navbar" role="navigation" aria-label="Principal">
      <div className="container">
        <div className="navbar-img">
          <NavLink to="/clientdashboard/about" aria-label="Inicio">
            <img src={foto1} alt="Cecilia Menta" />
          </NavLink>
        </div>

        {/* Botón hamburguesa solo visible en mobile (controlado por CSS) */}
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="navmenu"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen(o => !o)}
        >
          {/* Podés reemplazar por un ícono SVG */}
          <span aria-hidden="true">☰</span>
        </button>

        <div id="navmenu" className={`navbar-etiquetas ${open ? 'is-open' : ''}`}>
          <NavLink
            to="/clientdashboard/about"
            className="btn-navbar"
            onClick={closeMenu}
          >
            Inicio
          </NavLink>

          <NavLink
            to="/dashboard/post-job"
            className="btn-navbar"
            onClick={closeMenu}
          >
            ¿Qué hacemos?
          </NavLink>

          <NavLink
            to="/clientdashboard/clientjobs"
            className="btn-navbar"
            onClick={closeMenu}
          >
            Oportunidades de empleo
          </NavLink>

          {/* Si querés un CTA destacado */}
          {/* <NavLink
            to="/clientdashboard/contact"
            className="btn-navbar primary"
            onClick={closeMenu}
          >
            Contacto
          </NavLink> */}
        </div>
      </div>
    </nav>
  );
}
