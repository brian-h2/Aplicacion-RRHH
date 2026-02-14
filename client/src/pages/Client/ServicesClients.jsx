import React, { useState } from "react";
import "./ServiceClients.css"

export default function ServiceClients() {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    email: "",
    empresa: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Formulario enviado correctamente");
  };

  return (
    <div className="serv-container">
    <h1 className="serv-title">Servicios a Clientes</h1>

    <p className="serv-text">
      Brindamos soluciones estratégicas en Recursos Humanos diseñadas para empresas
      que buscan optimizar sus procesos, seleccionar talento y potenciar sus equipos.
    </p>

    <ul className="serv-list">
      <li>Búsqueda y selección profesional</li>
      <li>Evaluación de competencias y perfiles laborales</li>
      <li>Consultoría en cultura y clima organizacional</li>
      <li>Capacitación y desarrollo profesional</li>
    </ul>

    <h2 className="serv-subtitle">Solicitar Cotización</h2>

    <p className="serv-text">
      Indícanos tu nombre, teléfono, email y la empresa desde la cual nos contactás.
    </p>

    <form className="serv-form" onSubmit={handleSubmit}>
      <input name="nombre" type="text" placeholder="Nombre completo" onChange={handleChange} required />
      <input name="telefono" type="text" placeholder="Teléfono" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="empresa" type="text" placeholder="Empresa" onChange={handleChange} required />
      <button type="submit" className="serv-btn">Enviar Solicitud</button>
    </form>
  </div>

  );
}
