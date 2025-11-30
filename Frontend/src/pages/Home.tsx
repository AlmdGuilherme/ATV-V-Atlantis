import { Link } from "react-router-dom";

export default function Home() {
  return(
    <>
      <div className="flex flex-col items-center justify-center h-[100dvh] w-full text-white gap-10">
        <div className="w-fit-conter flex flex-col items-center justify-center">
          <h1 className="text-6xl text-white font-bold">Atlantis Water Park</h1>
          <p>Bem vindo ao site do Atlantis!</p>
          <p className="opacity-[.5]">Sua área para ver os clientes e modifica-los</p>
        </div>
        <div className="flex w-full gap-2 items-center justify-center">
          <Link to='/hospedagens' 
            className='w-fit-content bg-blue-800/80 text-blue-500 font-bold p-4 rounded-sm shadow-md hover:bg-blue-900/75'>
            Hospedagens
          </Link>
          <Link to='/clientes' 
            className='w-fit-content bg-blue-800/80 text-blue-500 font-bold p-4 rounded-sm shadow-md hover:bg-blue-900/75 '>
            Clientes
          </Link>
          <Link to='/cadastro-estadia' 
            className='w-fit-content bg-blue-800/80 text-blue-500 font-bold p-4 rounded-sm shadow-md hover:bg-blue-900/75 '>
            Hospedar-se
          </Link>
        </div>
      </div>
    </>
  )
}