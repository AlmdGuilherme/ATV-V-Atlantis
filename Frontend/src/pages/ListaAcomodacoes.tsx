import { useEffect, useState } from "react";
import HospedagemCard from "../components/HospedagemCard/HospedagemCard";
import type { Acomodacao } from "../interface/Acomodacao";

export default function ListaAcomodacoes() {
  const [acomodacoes, setAcomodacoes] = useState<Acomodacao[]>([])
  const [error, setError] = useState(false);

  useEffect(() => {
    const carregar_acomodacoes = async () => {
      try {
        const response = await fetch("http://localhost:3000/acomodacoes")
        if (!response.ok) throw new Error("Falha ao buscar acomodações")
        const data = await response.json()
        setAcomodacoes(data)
      } catch (error) {
        console.error("Erro: ", error)
        setError(true)
      }
    }

    carregar_acomodacoes()
  }, [])

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[100dvh] w-full text-white gap-10">
        <h2 className="text-red-500 text-xl font-bold">Erro ao buscar os dados dos clientes. Verifique o Backend.</h2>
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center min-h-[100dvh] w-full text-white gap-10">
      <h2 className="absolute top-14 left-10 text-2xl font-bold">Acomodações</h2>
      <div className=" p-4 flex items-center gap-4 w-[90%] h-[70dvh] flex-wrap overflow-auto customize-scroll">
        {acomodacoes.map((acomod) => (
          <HospedagemCard 
            key={acomod.id}
            roomId={acomod.id}
            roomName={acomod.nome}
            climatization={acomod.climatizacao}
            suites={acomod.suites}
            singleBeds={acomod.camaSolteiro}
            doubleBeds={acomod.camaCasal}
            garage={acomod.garagem}
          />
        ))}
      </div>
    </div>
  )
}