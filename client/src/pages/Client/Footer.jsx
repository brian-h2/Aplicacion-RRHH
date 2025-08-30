import "./Footer.css"
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
  <footer className="footer">
      <div className="footer-content">
        {/* <img className="footer-image" src='https://cdn.abacus.ai/images/4480af9d-a8de-4886-ba31-4a2789c7760c.png' alt="Footer Fondo" /> */}
        {/* <div className="footer-logo">
          <img src={logoCeciliaMenta} alt="Cecilia Menta RRHH" /> 
        </div> */}
        <p className="footer-phrase">Uniendo intereses de personas con empresas</p>
        <div className="footer-socials">
            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/cecilia.menta.9/" ><i className="fab fa-facebook-f"></i></a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/cecilia-menta-429a3818/"><i className="fab fa-linkedin-in"></i></a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/c.menta/"><i className="fab fa-instagram"></i></a>
        </div>
        <p className="footer-copy">2025 - Cecilia Menta RRHH</p>
      </div>
    </footer>
  );
};

export default Footer;