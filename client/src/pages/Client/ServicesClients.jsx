import React, { useState } from "react";
import axios from "axios";
import "./ServiceClients.css"
import Swal from 'sweetalert2'

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

  const validateForm = () => {
    const errors = [];

    // Nombre solo letras
    if (!form.nombre || !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(form.nombre)) {
      errors.push("El nombre solo puede contener letras y espacios.");
    }

    // Teléfono solo números
    if (!form.telefono || !/^\d{6,8}$/.test(form.telefono)) {
      errors.push("El teléfono debe contener solo números (6 a 8 dígitos).");
    }

    // Email válido
    if (
      !form.email ||
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)
    ) {
      errors.push("Ingrese un email válido.");
    }

    // Empresa (mínimo 2 caracteres)
    if (!form.empresa || form.empresa.trim().length < 2) {
      errors.push("La empresa debe tener al menos 2 caracteres.");
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (errors.length > 0) {
      Swal.fire({
        title: "¡Error!",
        text: errors.join("\n"),
        icon: "error",
        confirmButtonText: "Aceptar"
      });
      return;
    }

    try {
        axios.post(`${process.env.REACT_APP_SERVER_URL || "http://localhost:5005/api"}/services-clients`, 
          form, {
          headers: {
            "Content-Type": "application/json",
          },     
          }
        );
        Swal.fire({
          title: "¡Solicitud enviada con éxito!",
          icon: "success",
          draggable: true
        });
        setForm({
          nombre: "",
          telefono: "",
          email: "",
          empresa: ""
        });
    } catch (error) {
      Swal.fire({
        title: "¡Error!",
        text: "Hubo un problema al enviar tu solicitud. Por favor, intenta nuevamente.",
        icon: "error",
        confirmButtonText: "Aceptar"
      });
    } finally {
        setForm({
          nombre: "",
          telefono: "",
          email: "",
          empresa: ""
        });
      }
  };

  return (
    <div className="serv-container">
      <h1 className="serv-title">Servicios a Clientes</h1>

      <p className="serv-text">
        Brindamos soluciones estratégicas en Recursos Humanos diseñadas para empresas
        que buscan optimizar sus procesos, seleccionar talento y potenciar sus equipos.
      </p>

      <ul className="serv-list">
        <li>Servicio de Selección de Personal</li>
        <li>Evaluación de Perfil y Potencial</li>
        <li>Outplacement.</li>
        <li>Capacitación y Desarrollo</li>
      </ul>

      <h2 className="serv-subtitle">Solicitar propuesta de servicio</h2>

      <p className="serv-text">
        Indícanos tu nombre, teléfono, email y la empresa desde la cual nos contactás.
      </p>

      <form className="serv-form">
        <input
          name="nombre"
          value={form.nombre}
          onChange={(e) => {
            const value = e.target.value;
            if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/.test(value)) {
              handleChange(e);
            }
          }}
          placeholder="Nombre completo"
        />
        <input
          name="telefono"
          value={form.telefono}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              handleChange(e);
            }
          }}
          placeholder="Teléfono"
        />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="empresa" type="text" placeholder="Empresa" onChange={handleChange} required />
        <button type="submit"  className="serv-btn" onClick={handleSubmit}>Enviar Solicitud</button>
      </form>
    </div>

  );
}
