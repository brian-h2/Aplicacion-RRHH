import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import logoCeciliaMenta from '../Client/images/logoCeciliaMenta.png'
import "./Footer.css"


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* <img className="footer-image" src='https://cdn.abacus.ai/images/4480af9d-a8de-4886-ba31-4a2789c7760c.png' alt="Footer Fondo" /> */}
        {/* <div className="footer-logo">
          <img src={logoCeciliaMenta} alt="Cecilia Menta RRHH" /> 
        </div> */}
        <p className="footer-phrase">Uniendo intereses de personas con empresas</p>
        <div className="footer-socials">
            <a href="https://facebook.com"><i className="fab fa-facebook-f"></i></a>
            <a href="https://linkedin.com"><i className="fab fa-linkedin-in"></i></a>
            <a href="https://instagram.com"><i className="fab fa-instagram"></i></a>
        </div>
        <p className="footer-copy">2025 - Cecilia Menta RRHH</p>
      </div>
    </footer>
  );
};

export default Footer;