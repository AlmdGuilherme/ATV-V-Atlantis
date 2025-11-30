import { Link } from "react-router-dom";

export default function Clientes() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[100dvh] w-full text-white gap-10">
        <div className="w-fit-conter flex flex-col items-center justify-center">
          <h1 className="text-6xl text-white font-bold">Atlantis Water Park</h1>
          <p>Aqui você tem acesso as ações relacionadas aos clientes.</p>
          <p className="opacity-[.5]">Aqui você ver todos os clientes, cadastrá-los e gerenciar suas informações.</p>
        </div>
        <div className="flex w-full gap-2 items-center justify-center">
          <Link to='/lista-clientes' 
            className='w-fit-content bg-blue-800/80 text-blue-500 font-bold p-4 rounded-sm shadow-md hover:bg-blue-900/75'>
            Lista de clientes
          </Link>
          <Link to='/cadastro-cliente' 
            className='w-fit-content bg-blue-800/80 text-blue-500 font-bold p-4 rounded-sm shadow-md hover:bg-blue-900/75 '>
            Cadastrar clientes
          </Link>
        </div>
      </div>
    </>
  )
}
