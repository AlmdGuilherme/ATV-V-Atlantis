import { useEffect, useState } from "react";
import HospedagemCardList from "../components/HospedagemCardList/HospedagemCardList";
import type { Hospedagem } from "../interface/Hospedagem";

export default function ListaHospedagens() {
  const [hospedagens, setHospedagens] = useState<Hospedagem[]>([])
  const [error, setError] = useState(false)

  useEffect(() => {
    const carregar_hospedagens = async () => {
      try {
        const response = await fetch("http://localhost:3000/hospedagens")
        if (!response.ok) throw new Error("Erro ao buscar hospedagens")
        const data = await response.json()
        setHospedagens(data)
      } catch (error) {
        console.error("Erro: ", error)
        setError(true)
      }
    }

    carregar_hospedagens()
  }, [])

  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[100dvh] w-full text-white gap-10">
        <h2 className="text-red-500 text-xl font-bold">Erro ao buscar os dados dos clientes. Verifique o Backend.</h2>
      </div>
    )
  }
  return (
    <>
      <div className="flex items-center justify-center min-h-[100dvh] w-full text-white gap-10">
        <h2 className="absolute top-14 left-10 text-2xl font-bold">Hospedagens</h2>
        <div className=" p-4 flex items-center justify-center gap-2 w-[99%] h-[70dvh] flex-wrap overflow-auto customize-scroll">
            {hospedagens.map((hosp) => (
              <HospedagemCardList
                clientName={hosp.Cliente.nome}
                dataCheckIn={formatarData(hosp.dataCheckin)}
                dataCheckOut={formatarData(hosp.dataCheckout)}
                roomName={hosp.Acomodacao.nome}
                id={hosp.id}
              />
            ))}
        </div>
      </div>
    </>
  )
}