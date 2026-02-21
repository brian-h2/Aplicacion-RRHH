import React, { useState } from "react";
import axios from "axios"; 
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const EmailSubscription = () => {
   useEffect(() => {
      AOS.init({duration: 1000})
    }, [])
  
  const [email, setEmail] = useState(""); // State to track the email input
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const emailService = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005/api", // Fallback to localhost
  });


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    try {
      await emailService.post("/emails", { email }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSuccessMessage("¡Gracias por suscribirte!");
      setErrorMessage(""); // Clear error messages
      setEmail(""); // Reset email input
    } catch (error) {
      console.error("Error al suscribirte:", error);
      setSuccessMessage(""); // Clear success messages
      setErrorMessage("Hubo un problema al suscribirte. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="fourth-part-about-emailing" data-aos="fade-up">
      <h1>Me interesa recibir las oportunidades laborales</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Tu email aquí"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Suscribirme</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default EmailSubscription;
