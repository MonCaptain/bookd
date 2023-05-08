import "./App.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import BookList from "./pages/BookList";
import RootLayout from "./layouts/RootLayout";
import { useAuthContext } from "./contexts/AuthContext";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/loginPage";

const authedRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/* TODO: need to figure out what would be the index page the user will see upon login*/}
      {/* <Route index element={</>} /> */}
      <Route path="/reading" element={<BookList listType={"reading"} />} />
      <Route path="/completed" element={<BookList listType={"completed"} />} />
      <Route path="/dropped" element={<BookList listType={"dropped"} />} />
    </Route>
  )
);

const notAuthedRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<LandingPage />} />
      <Route path="/login" element={<LoginPage logOrRegValue={true} />} />
      <Route path="/register" element={<LoginPage logOrRegValue={false} />} />
    </Route>
  )
);

function App() {
  const authVariables = useAuthContext();
  const isUserAuthed = authVariables.isUserAuthed;
  return <RouterProvider router={ isUserAuthed ? authedRouter : notAuthedRouter}/>;
}

export default App;
