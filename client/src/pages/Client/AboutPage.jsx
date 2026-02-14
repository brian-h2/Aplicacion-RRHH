import nombrelogo from "./images/nombre-logo-4.png"
import EmailSubscription from "./EmailSubscription"
import { useLocation } from "react-router-dom";
import Footer from "./Footer.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect,useState } from "react";


export default function AboutPage() {
  const location = useLocation();

  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    AOS.init({duration: 1000})
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
    <div className="intro" data-aos="fade-down"  id="inicio">
          <img src={nombrelogo} alt="" /> 
  
    </div>

    <div className="first-part-about" data-aos="fade-up" id="inicio">
        <p>       
          Con el objetivo de brindar un servicio de calidad, nos focalizamos en detectar las necesidades de nuestros clientes, su cultura y estilos de trabajo. Para asegurar la calidad del proceso, contamos con una metodología diseñada por etapas bien definidas, la cual garantiza la excelencia y confiabilidad en los resultados.
        </p>
    </div>
    
    <div className="second-part-about" id="ventajas">
      <h2 
      style={{
        textAlign: 'center',
        color: '#2c3e50',
        fontSize: '2.5rem',
        marginBottom: '3rem',
        fontFamily: 'Inter',
        fontWeight: 600
      }}
      >
      NUESTRAS VENTAJAS COMPETITIVAS
      </h2>

      <div className="images-ventajas-competitivas">
        <div className="ventajas-competitivas" data-aos="flip-left">
          <img
            src="https://dfjx2uxqg3cgi.cloudfront.net/img/photo/215622/215622_00_2x.jpg?20200902023138="
            alt="Atracción y marca empleadora"
            loading="lazy"
          />
          <p>Atracción y retención del mejor talento<br />mediante una marca empleadora sólida</p>
        </div>

        <div className="ventajas-competitivas" data-aos="flip-left">
          <img
            src="https://pyjamahr.com/wp-content/uploads/2022/01/23.-2nd-image-Under-group-interview.jpg"
            alt="Selección y reclutamiento efectivo"
            loading="lazy"
          />
          <p>Procesos de selección eficaces<br />que identifican el talento ideal</p>
        </div>

        <div className="ventajas-competitivas" data-aos="flip-left">
          <img
            src="https://images.openai.com/static-rsc-1/0RU5JVgvGScnJgr3PBGO2ZDRD4o5Lwj5O6FrNL9DU6kjlkGxttuiz-Wu6g5X6qFKBu85CVO4GGhcIdz1XxKBygW8QtQB28JklFoDBzFRBz0mZCgMImq6JKxrjehW0U1c_2ja6y36_U9QxKJNFMjzkg"
            alt="Desarrollo de habilidades y capacitación"
            loading="lazy"
          />
          <p>Desarrollo continuo de habilidades<br />y programas de capacitación</p>
        </div>

        <div className="ventajas-competitivas" data-aos="flip-left">
          <img
            src="https://www-assets.perkbox.com/media/6737/i960/c12f34b11c1b0b98a73e.jpg"
            alt="Gestión del desempeño y alto rendimiento"
            loading="lazy"
          />
          <p>Gestión del desempeño<br />y cultura de alto rendimiento</p>
        </div>

        <div className="ventajas-competitivas" data-aos="flip-left">
          <img
            src="https://www.jazzhr.com/wp-content/uploads/2020/05/examples-of-workplace-diversity.jpg"
            alt="Diversidad, inclusión e innovación"
            loading="lazy"
          />
          <p>Diversidad e inclusión<br />que fomenta la innovación</p>
        </div>

        <div className="ventajas-competitivas" data-aos="flip-left">
          <img
            src="https://cdn2.hubspot.net/hubfs/4416146/Employee_Break_Room_Relax_Recharge_Ideas.png"
            alt="Bienestar y compromiso del empleado"
            loading="lazy"
          />
          <p>Bienestar y compromiso del empleado<br />para mayor productividad</p>
        </div>

        <div className="ventajas-competitivas" data-aos="flip-left">
          <img
            src="https://ethisphere.com/wp-content/uploads/leader-addressing-team-during-business-meeting-1024x536.jpg"
            alt="Optimización de costos y cumplimiento"
            loading="lazy"
          />
          <p>Optimización de costos y cumplimiento<br />reduciendo rotación y riesgos</p>
        </div>

        <div className="ventajas-competitivas" data-aos="flip-left">
          <img
            src="https://blog.vikingdirect.ie/wp-content/uploads/2025/01/featured_image-23.png"
            alt="Cultura organizacional y comunicación interna"
            loading="lazy"
          />
          <p>Cultura organizacional fuerte<br />y comunicación interna efectiva</p>
        </div>
      </div>
    </div>

    <div className="third-part-about"  data-aos="fade-down" id="servicios">
      <h1>NUESTRO SERVICIO DE SELECCIóN</h1>
      <p>
        Somos un equipo de profesionales con más de 20 años de trayectoria en empresas en las áreas de Recursos Humanos, liderando, gestionando y acompañando procesos de gestión de las personas y potenciando el capital humano en las organizaciones. Somos especialistas en acompañar a empresas en procesos de reclutamiento y selección de perfiles especialistas, analistas y líderes (Jefes, Gerentes y Directores), perfiles de tecnología, perfiles para posiciones de base, selecciones masivas, evaluaciones psicotécnicas, de perfil y potencial con técnicas como el análisis del Discurso de Eliot Jaques, evaluaciones socio-ambientales y crediticias, procesos de evaluación para promociones internas, servicios de Outplacement y cambio de cultura organizacional. Intervenimos en las organizaciones brindando soporte y acompañamiento que permitan el crecimiento de las personas y las organizaciones logrando mayor satisfacción y eficiencia.
      </p>
    </div>

    <EmailSubscription />

    <div  className="five-part-about" id="footer"><Footer/>
    </div>
</div>

  )
}
