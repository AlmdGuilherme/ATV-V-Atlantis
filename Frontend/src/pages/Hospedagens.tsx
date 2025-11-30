import { Link } from "react-router-dom";

export default function Hospedagens () {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[100dvh] w-full text-white gap-10">
        <div className="w-fit-conter flex flex-col items-center justify-center">
          <h1 className="text-6xl text-white font-bold">Atlantis Water Park</h1>
          <p>Aqui você pode conferir nossas Hospedagens</p>
          <p className="opacity-[.5]">Sua área para ver as hospedagens e cadastra-las</p>
        </div>
        <div className="flex w-full gap-2 items-center justify-center">
          <Link to='/lista-acomodacoes' 
            className='w-fit-content bg-blue-800/80 text-blue-500 font-bold p-4 rounded-sm shadow-md hover:bg-blue-900/75'>
            Lista acomodações
          </Link>
          <Link to='/lista-hospedagens' 
            className='w-fit-content bg-blue-800/80 text-blue-500 font-bold p-4 rounded-sm shadow-md hover:bg-blue-900/75'>
            Lista hospedagens
          </Link>
          <Link to='/cadastro-acomodacao' 
            className='w-fit-content bg-blue-800/80 text-blue-500 font-bold p-4 rounded-sm shadow-md hover:bg-blue-900/75 '>
            Cadastrar Acomodação
          </Link>
          <Link to='/cadastro-estadia' 
            className='w-fit-content bg-blue-800/80 text-blue-500 font-bold p-4 rounded-sm shadow-md hover:bg-blue-900/75 '>
            Cadastrar Estadia
          </Link>
        </div>
      </div>
    </>
  )
}