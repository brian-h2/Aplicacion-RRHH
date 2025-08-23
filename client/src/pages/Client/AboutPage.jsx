import React from 'react'
import portada_gestion from "./images/portada_gestion.jpg"
import nombrelogo from "./images/nombrelogo-3.png"
import EmailSubscription from "./EmailSubscription"

export default function AboutPage() {
  return (
    <div>
        <div className="intro">
            <img src={nombrelogo} alt="" /> 
   
        </div>
      <div className="first-part-about">
          <p>       
            Somos un equipo de profesionales con más de 20 años de trayectoria en empresas en las áreas de Recursos Humanos, liderando, gestionando y acompañando procesos de gestión de las personas y potenciando el capital humano en las organizaciones. Somos especialistas en acompañar a empresas en procesos de reclutamiento y selección de perfiles especialistas, analistas y líderes (Jefes, Gerentes y Directores), perfiles de tecnología, perfiles para posiciones de base, selecciones masivas, evaluaciones psicotécnicas, de perfil y potencial con técnicas como el análisis del Discurso de Eliot Jaques, evaluaciones socio-ambientales y crediticias, 
            procesos de evaluación para promociones internas, servicios de Outplacement y cambio de cultura organizacional. Intervenimos en las organizaciones brindando soporte y acompañamiento que permitan el crecimiento de las personas y las organizaciones logrando mayor satisfacción y eficiencia
          </p>
      </div>
     <div className="second-part-about">
    
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
  <div className="ventajas-competitivas">
    <img
      src="https://cdn.abacus.ai/images/81e48232-bf84-4f6e-8c24-201f69476480.png"
      alt="Atracción y marca empleadora"
      loading="lazy"
    />
    <p>Atracción y retención del mejor talento<br />mediante una marca empleadora sólida</p>
  </div>

  <div className="ventajas-competitivas">
    <img
      src="https://cdn.abacus.ai/images/59365343-dac2-4420-b293-db77e207b674.png"
      alt="Selección y reclutamiento efectivo"
      loading="lazy"
    />
    <p>Procesos de selección eficaces<br />que identifican el talento ideal</p>
  </div>

  <div className="ventajas-competitivas">
    <img
      src="https://cdn.abacus.ai/images/2b63bd7f-9410-44d3-8d0c-439784338d27.png"
      alt="Desarrollo de habilidades y capacitación"
      loading="lazy"
    />
    <p>Desarrollo continuo de habilidades<br />y programas de capacitación</p>
  </div>

  <div className="ventajas-competitivas">
    <img
      src="https://cdn.abacus.ai/images/7c732af2-670f-4aa0-994d-2ed07128b1a5.png"
      alt="Gestión del desempeño y alto rendimiento"
      loading="lazy"
    />
    <p>Gestión del desempeño<br />y cultura de alto rendimiento</p>
  </div>

  <div className="ventajas-competitivas">
    <img
      src="https://cdn.abacus.ai/images/47d00e17-4004-49b0-9bbc-bdd5a75c00c1.png"
      alt="Diversidad, inclusión e innovación"
      loading="lazy"
    />
    <p>Diversidad e inclusión<br />que fomenta la innovación</p>
  </div>

  <div className="ventajas-competitivas">
    <img
      src="https://cdn.abacus.ai/images/291ae7ad-1f38-4a23-97f1-0698571f9107.png"
      alt="Bienestar y compromiso del empleado"
      loading="lazy"
    />
    <p>Bienestar y compromiso del empleado<br />para mayor productividad</p>
  </div>

  <div className="ventajas-competitivas">
    <img
      src="https://cdn.abacus.ai/images/5676db3f-6740-4b43-b12a-e9a79da771c8.png"
      alt="Optimización de costos y cumplimiento"
      loading="lazy"
    />
    <p>Optimización de costos y cumplimiento<br />reduciendo rotación y riesgos</p>
  </div>

  <div className="ventajas-competitivas">
    <img
      src="https://cdn.abacus.ai/images/7ba20cd7-13aa-44a6-a794-d2f068a2323c.png"
      alt="Cultura organizacional y comunicación interna"
      loading="lazy"
    />
    <p>Cultura organizacional fuerte<br />y comunicación interna efectiva</p>
  </div>
</div>

   
</div>
<div className="third-part-about">
    <h1>NUESTRO SERVICIO DE SELECCIóN</h1>
    <p>
      Con el objetivo de brindar un servicio de calidad, nos focalizamos en detectar las necesidades de nuestros clientes, su cultura y estilos de trabajo.
      Para asegurar la calidad del proceso, contamos con una metodología diseñada por etapas bien definidas, la cual garantiza la excelencia y confiabilidad en los resultados.
    </p>
</div>
<EmailSubscription />
<div className="five-part-about">
<img className='portada-gestion-about' src={portada_gestion} alt="" />
</div>
</div>

  )
}
