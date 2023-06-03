import SidebarWithHeader from "../components/SidebarWithHeader";
import { useAuthContext } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";

export default function RootLayout({ children }) {
  const authVariables = useAuthContext();
  const isUserAuthed = authVariables.isUserAuthed;
  // do not render SideBarWithHeader if the user attempts to navigate to a route that doesn't exist
  const location = useLocation()
  const isNotFound = !(
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/reading" ||
    location.pathname === "/starting" ||
    location.pathname === "/completed" ||
    location.pathname === "/dropped" ||
    location.pathname === "/explore" ||
    location.pathname === "/me" ||
    location.pathname === "/users" ||
    location.pathname.startsWith("/users/")
  );

  return isUserAuthed && !isNotFound ? (
    <SidebarWithHeader>{children}</SidebarWithHeader>
  ) : (
    <>{children}</>
  );
}
