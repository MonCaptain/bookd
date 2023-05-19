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
import LoginPage from "./pages/LoginPage";
import ExplorePage from "./pages/ExplorePage";
import ExploreUsersPage from "./pages/ExploreUsersPage";
import UserProfile from "./pages/UserProfile";

const authedRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<BookList pageTitle={"All Book Entries"} category={""}/>} />
      <Route path="/reading" element={<BookList pageTitle={"Currently Reading"} category={"In Progress"} />} />
      <Route path="/starting" element={<BookList pageTitle={"Not Started"} category={"Not Started"} />} />
      <Route path="/completed" element={<BookList pageTitle={"Completed"} category={"Completed"}/>} />
      <Route path="/dropped" element={<BookList pageTitle={"Dropped"} category={"Dropped"}/>} />
      <Route path="/users" element={<ExploreUsersPage />}/>
      <Route path="/users">
        <Route path=":username" element = {<UserProfile />}/>
      </Route>
        <Route path="/me" element={<UserProfile isOriginalUser = {true} />} />
      <Route path="/explore" element={<ExplorePage />} />
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
  return authVariables.isLoading ? (
    <></>
  ) : (
    <>
      <RouterProvider router={isUserAuthed ? authedRouter : notAuthedRouter} />;
    </>
  );
}

export default App;
