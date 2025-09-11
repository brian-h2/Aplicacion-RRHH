import React from 'react'
import { useNavigate } from "react-router-dom";
import "./Login.css"
import * as PATHS from '../../utils/paths';
import HomeIcon from '@mui/icons-material/Home';


export default function BackHome() {
   const navigate = useNavigate();

  const goHome = () => {
    navigate(PATHS.CLIENTDASHBOARD);
  };

  return (
    <a href="#" onClick={goHome} class="home-btn">🏠 Volver al inicio</a>
  );
}
