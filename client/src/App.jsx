import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import BookList from "./pages/BookList";
import RootLayout from "./layouts/RootLayout";
import { useAuthContext } from "./contexts/AuthContext";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ExplorePage from "./pages/ExplorePage";
import ExploreUsersPage from "./pages/ExploreUsersPage";
import UserProfile from "./pages/UserProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import {Flex, Spinner } from '@chakra-ui/react'

export default function App() {
  const authVariables = useAuthContext();
  const isUserAuthed = authVariables.isUserAuthed;
  console.log(authVariables.isLoading, authVariables.isUserAuthed)
  return authVariables.isLoading ? (
    <Flex h={"100vh"} justifyContent={"center"} alignItems={"center"}>
      <Spinner/>
    </Flex>
  ) : (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route
            path="/"
            element={
              isUserAuthed ? (
                <BookList pageTitle={"All Book Entries"} category={""} />
              ) : (
                <LandingPage />
              )
            }
          />
          {/* public routes */}
          <Route path="/login" element={<LoginPage logOrRegValue={true} />} />
          <Route
            path="/register"
            element={<LoginPage logOrRegValue={false} />}
          />
          <Route path="*" element={<NotFound />} />
          {/* Private routes */}
          <Route
            path="/reading"
            element={
              <ProtectedRoute isUserAuthed={isUserAuthed}>
                <BookList
                  pageTitle={"Currently Reading"}
                  category={"In Progress"}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/starting"
            element={
              <ProtectedRoute isUserAuthed={isUserAuthed}>
                <BookList pageTitle={"Not Started"} category={"Not Started"} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/completed"
            element={
              <ProtectedRoute isUserAuthed={isUserAuthed}>
                <BookList pageTitle={"Completed"} category={"Completed"} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dropped"
            element={
              <ProtectedRoute isUserAuthed={isUserAuthed}>
                <BookList pageTitle={"Dropped"} category={"Dropped"} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore"
            element={
              <ProtectedRoute isUserAuthed={isUserAuthed}>
                <ExplorePage />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/me"
            element={
              <ProtectedRoute isUserAuthed={isUserAuthed}>
                <UserProfile isOriginalUser={true} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute isUserAuthed={isUserAuthed}>
                <ExploreUsersPage />
              </ProtectedRoute>
            }
          />
          <Route path="/users">
            <Route
              path=":username"
              element={
                <ProtectedRoute isUserAuthed={isUserAuthed}>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}
