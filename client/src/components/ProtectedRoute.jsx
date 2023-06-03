import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ isUserAuthed, children }) {
  return isUserAuthed ? children : <Navigate to={"/"} replace />;
}
