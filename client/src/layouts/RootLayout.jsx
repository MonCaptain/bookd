import { Outlet } from "react-router-dom";
import SidebarWithHeader from "../components/SidebarWithHeader";

export default function RootLayout(){

  return (
    <>
      <SidebarWithHeader>
        <Outlet/>
      </SidebarWithHeader>
    </>
  )
}