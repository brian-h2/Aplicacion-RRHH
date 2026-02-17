import React from 'react'
import { useNavigate } from "react-router-dom";
import "./Login.css"
import * as PATHS from '../../utils/paths';

export default function BackHome() {

  const navigate = useNavigate();

  const goHome = () => {
    navigate(PATHS.CLIENTDASHBOARD);
  };

  return (
    <button 
      onClick={goHome} 
      className="home-btn"
      type="button"
    >
      🏠 Volver al inicio
    </button>
  );
}
