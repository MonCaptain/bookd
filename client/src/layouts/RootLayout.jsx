import { Outlet } from "react-router-dom";
import SidebarWithHeader from "../components/SidebarWithHeader";
import { useAuthContext } from "../contexts/AuthContext";
import NavBar from "../components/NavBar";

export default function RootLayout() {
  const authVariables = useAuthContext();
  const isUserAuthed = authVariables.isUserAuthed;

  return isUserAuthed ? (
    <SidebarWithHeader>
      <Outlet />
    </SidebarWithHeader>
  ) : (
    <>
    <NavBar/>
      <Outlet />
    </>
  );
}
