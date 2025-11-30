import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

export default function RootLayout() {
  return(
    <>
    <div className="w-full min-h-[100dvh] h-auto bg-gradient-to-b from-blue-300 to-blue-900 flex flex-col">
      <Navbar/>
      <Outlet/>
    </div>
    
    </>
  )
}