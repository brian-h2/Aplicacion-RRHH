import { useNavigate } from "react-router-dom";
import { FaBuilding, FaUser } from "react-icons/fa";
import "./SelectionRol.css"

export default function SeleccionRol() {
  const navigate = useNavigate();

  return (
    <div className="rol-container">
      <h2 className="rol-title">¿Cómo querés continuar?</h2>
      <p className="rol-text">Seleccioná la opción adecuada para continuar.</p>

      <div className="rol-buttons">
        <button
          className="rol-btn cliente"
          onClick={() => navigate("/servicios-clientes")}
        >
          <FaBuilding className="rol-icon" />
          Soy Cliente
        </button>

        <button
          className="rol-btn candidato"
          onClick={() => navigate("/oportunidades")}
        >
          <FaUser className="rol-icon" />
          Soy Candidato
        </button>
      </div>
    </div>
  );
}
