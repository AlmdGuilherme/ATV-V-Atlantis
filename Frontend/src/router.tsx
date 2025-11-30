import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import Hospedagens from "./pages/Hospedagens";
import CadastroCliente from "./pages/CadastroCliente";
import Clientes from "./pages/Clientes";
import ListaAcomodacoes from "./pages/ListaAcomodacoes";
import ListaClientes from "./pages/ListaClientes";
import ListaHospedagens from "./pages/ListaHospedagens";
import CadastroEstadia from "./pages/CadastroEstadia";
import CadastroAcomodacao from "./pages/CadastroAcomodacao";
import EditarCliente from "./pages/EditarCliente";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    children: [
      {
        index: true,
        element: <Home/>
      }, {
        path:"hospedagens",
        element:<Hospedagens/>
      }, {
        path:"lista-hospedagens",
        element:<ListaHospedagens/>
      }, {
        path:"lista-acomodacoes",
        element: <ListaAcomodacoes/>
      }, 
      {
        path:"/cadastro-estadia",
        element: <CadastroEstadia/>
      }, {
        path:"cadastro-acomodacao",
        element: <CadastroAcomodacao/>
      },{
        path:"cadastro-cliente",
        element: <CadastroCliente/>
      }, {
        path:'clientes',
        element: <Clientes/>
      }, {
        path:"lista-clientes",
        element: <ListaClientes/>
      }, {
        path:"editar-cliente/:userDoc",
        element: <EditarCliente/>
      }
    ]
  }
])

export default router