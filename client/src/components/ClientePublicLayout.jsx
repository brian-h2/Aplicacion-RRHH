import NavbarClient from "../pages/Client/NavbarClient";
import { Outlet } from "react-router-dom";

export default function ClientPublicLayout() {
  return (
    <>
      <NavbarClient />
      <Outlet />
    </>
  );
}