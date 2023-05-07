import './App.css'
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import BookList from './pages/BookList';
import RootLayout from "./layouts/RootLayout"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/reading" element={<BookList listType={"reading"}/>}/>
      <Route path="/completed" element={<BookList listType={"completed"}/>}/>
      <Route path="/dropped" element={<BookList listType={"dropped"}/>}/>
    </Route>
  )
);

function App() {

  return (
    <RouterProvider router={router}/>    
  )
}

export default App