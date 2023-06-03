import SidebarWithHeader from "../components/SidebarWithHeader";
import { useAuthContext } from "../contexts/AuthContext";

export default function RootLayout({ children }) {
  const authVariables = useAuthContext();
  const isUserAuthed = authVariables.isUserAuthed;
  return isUserAuthed ? (
    <SidebarWithHeader>{children}</SidebarWithHeader>
  ) : (
    <>{children}</>
  );
}
