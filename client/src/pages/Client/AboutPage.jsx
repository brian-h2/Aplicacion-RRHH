import nombrelogo from "./images/nombre-logo-4.png"
import EmailSubscription from "./EmailSubscription"
import ImageGallery from "../../components/ImageGallery.jsx";
import { useLocation } from "react-router-dom";
import Footer from "./Footer.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import image from "../../sources/2.jpg";
import imageServicio from "../../sources/5.png";
import imageHeader from "../../sources/header.jpeg";


export default function AboutPage() {
  const location = useLocation();

  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  // Escuchamos cambios en la URL (hash)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setActiveSection(id);   // guardamos en estado
      // limpiamos el hash de la URL
      window.history.replaceState(null, "", location.pathname);
    } else {
      setActiveSection(null); // inicio por defecto
    }
  }, [location]);

  // Cuando cambia activeSection → scroll suave
  useEffect(() => {
    if (activeSection) {
      const element = document.getElementById(activeSection);
      if (element) {
        const navbarHeight = 100; // ajusta según el alto de tu navbar
        const y = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    } else {
      // si no hay sección activa, vamos al inicio
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeSection]);

  return (
    <div>
      <div className="hero-about" data-aos="fade-down" id="inicio">
        <div className="hero-content">

          <h1>
            Construimos <br />
            <span className="highlight">vínculos</span> que <br />
            transforman
          </h1>

          <p>
            Acompañamos encuentros genuinos entre personas y organizaciones,
            donde el trabajo se vive como un espacio de crecimiento, sentido
            y futuro compartido.
          </p>

          <div className="hero-buttons">
            <a href="#servicios" className="btn-primary">
              Nuestros Servicios ↗
            </a>

            <a href="/clientservice" className="btn-secondary">
              Hablemos hoy
            </a>
          </div>  
        </div>

        <div className="hero-image">
          <img src={imageHeader} alt="Personas colaborando" />

          <div className="experience-card">
            <span>Experiencia</span>
            <h3>+20 Años liderando procesos de personas</h3>
          </div>
        </div>
      </div>

              <ImageGallery />


      <div className="second-part-about" data-aos="fade-down" id="ventajas">

        <div className="mv-container">

          {/* MISIÓN */}
          <div className="mv-card mission">
            <div className="mv-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2l8 8-8 8-8-8 8-8z" />
              </svg>
            </div>
            <h3>Nuestra Misión</h3>
            <p>
              Acompañar a personas y organizaciones en procesos de selección y desarrollo,
              generando encuentros auténticos que potencien crecimiento, productividad
              y bienestar en relaciones laborales sostenibles.
            </p>
          </div>

          {/* VISIÓN */}
          <div className="mv-card vision">
            <div className="mv-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </div>
            <h3>Nuestra Visión</h3>
            <p>
              Ser referentes en selección humana y estratégica, donde cada búsqueda
              conecte propósito, talento y futuro.
            </p>
          </div>

        </div>

        {/* VALORES */}

        <div className="values-section">
          <h2>NUESTROS VALORES</h2>

          <div className="values-grid">

            {/* 1 */}
            <div className="value-item">
              <div className="value-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8">
                  <circle cx="9" cy="8" r="3" />
                  <circle cx="17" cy="8" r="3" />
                  <path d="M2 20c2-4 10-4 12 0" />
                  <path d="M12 20c1-3 7-3 9 0" />
                </svg>
              </div>
              <h4>Personas en el centro</h4>
              <p>
                Creemos que el verdadero valor de las organizaciones está en las personas
                y en los vínculos que construyen.
              </p>
            </div>

            {/* 2 */}
            <div className="value-item">
              <div className="value-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8">
                  <path d="M4 12l4-4 4 4 4-4 4 4" />
                  <path d="M8 16l4 4 4-4" />
                </svg>
              </div>
              <h4>Vínculos genuinos</h4>
              <p>
                Construimos relaciones basadas en la confianza, el respeto
                y el crecimiento mutuo.
              </p>
            </div>

            {/* 3 */}
            <div className="value-item">
              <div className="value-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8">
                  <path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <h4>Transparencia</h4>
              <p>
                Trabajamos con claridad, honestidad y coherencia
                en cada proceso y decisión.
              </p>
            </div>

            {/* 4 */}
            <div className="value-item">
              <div className="value-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8">
                  <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                </svg>
              </div>
              <h4>Escucha activa</h4>
              <p>
                Comprendemos en profundidad las necesidades, expectativas
                y contextos de personas y organizaciones.
              </p>
            </div>

            {/* 5 */}
            <div className="value-item">
              <div className="value-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8">
                  <rect x="3" y="7" width="18" height="13" rx="2" />
                  <path d="M8 7V5a4 4 0 0 1 8 0v2" />
                </svg>
              </div>
              <h4>Profesionalismo</h4>
              <p>
                Actuamos con experiencia, compromiso y responsabilidad,
                cuidando la calidad en cada intervención.
              </p>
            </div>

            {/* 6 */}
            <div className="value-item">
              <div className="value-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <h4>Mirada estratégica</h4>
              <p>
                Entendemos el negocio, la cultura y los desafíos organizacionales
                para generar soluciones alineadas y sostenibles.
              </p>
            </div>

          </div>
        </div>

      </div>



      <div className="third-part-about" data-aos="fade-down" id="servicios">

        <div className="third-wrapper">

          <div className="third-image">
            <img src={imageServicio} alt="Proceso de selección de personal" />
          </div>

          <div className="third-content">
            <h1>NUESTROS SERVICIOS DE SELECCIÓN</h1>

            <div className="third-text">
              <p>
                Somos un equipo de profesionales con más de 20 años de trayectoria en Recursos Humanos, liderando y acompañando procesos de gestión de personas en organizaciones diversas.
              </p>

              <p>
                En Cecilia Menta creemos que el trabajo importa: es el espacio donde las personas crecen y las organizaciones se fortalecen.
              </p>

              <div className="highlight-box">
                <p>
                  Actuamos como puente entre personas y organizaciones, priorizando la experiencia del candidato, el ajuste cultural y los objetivos del negocio.
                </p>
              </div>

              <p>
                Brindamos un servicio cercano y profesional, enfocado en generar vínculos laborales sostenibles en el tiempo.
              </p>
            </div>

          </div>

        </div>
      </div>

      <div className="services-detail-section" data-aos="fade-down">

        <div className="services-grid">


          {/* 1 */}
          <div className="service-card">
            <span className="service-number">01</span>
            <div className="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 7h18M6 7V5a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v2M6 7h12v13H6z" />
              </svg>
            </div>
            <h3>Servicio de Selección de Personal</h3>
            <p>
              Procesos estratégicos y humanos para conectar talento y organización,
              garantizando ajuste cultural y sostenibilidad.
            </p>
            <ul>
              <li>Análisis del puesto y contexto</li>
              <li>Reclutamiento estratégico multicanal</li>
              <li>Entrevistas por competencias</li>
              <li>Evaluación psicotécnica</li>
              <li>Seguimiento post incorporación</li>
            </ul>
          </div>

          {/* 2 */}
          <div className="service-card">
            <span className="service-number">02</span>
            <div className="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 19h16M6 17V9M12 17V5M18 17v-7" />
              </svg>
            </div>
            <h3>Evaluación de Perfil y Potencial</h3>
            <p>
              Evaluaciones profundas para decisiones estratégicas basadas en
              información confiable.
            </p>
            <ul>
              <li>Evaluación psicotécnica</li>
              <li>Análisis de competencias</li>
              <li>Evaluación de potencial</li>
              <li>Informe integral con proyección</li>
            </ul>
          </div>

          {/* 3 */}
          <div className="service-card">
            <span className="service-number">03</span>
            <div className="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 12h18M12 3l9 9-9 9" />
              </svg>
            </div>

            <h3>Outplacement</h3>
            <p>
              Procesos de transición laboral acompañados con contención y estrategia.
            </p>
            <ul>
              <li>Acompañamiento individual</li>
              <li>Estrategia de reinserción laboral</li>
              <li>Optimización de CV</li>
              <li>Fortalecimiento de marca empleadora</li>
            </ul>
          </div>

          {/* 4 */}
          <div className="service-card">
            <span className="service-number">04</span>
            <div className="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 3l10 6-10 6L2 9l10-6zm0 13v5" />
              </svg>
            </div>

            <h3>Capacitación y Desarrollo</h3>
            <p>
              Gestión del talento alineada a cultura, desempeño y crecimiento.
            </p>
            <ul>
              <li>Programas de capacitación</li>
              <li>Gestión del desempeño</li>
              <li>Planes de carrera</li>
              <li>Desarrollo de equipos</li>
            </ul>
          </div>

        </div>

      </div>


      <EmailSubscription />

      <div className="five-part-about" id="footer"><Footer />
      </div>
    </div>

  )
}
