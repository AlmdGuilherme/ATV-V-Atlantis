import { useParams } from "react-router-dom"
import FormularioEdicao from "../components/FormularioEdicao/FormularioEdicao"
import { useEffect, useState } from "react"
import type Cliente from "../interface/Cliente"

export default function EditarCliente() {
  const [cliente, setCliente] = useState<Cliente | null> (null)
  const [error, setError] = useState(false)
  const { userDoc } = useParams()

  useEffect(() => {
    const carregar_cliente = async () => {
      try {
        const response = await fetch(`http://localhost:3000/cliente/${userDoc}`)
        if (!response.ok) throw new Error("Erro ao carregar cliente")
        const data = await response.json()
        setCliente(data)
      } catch (error) {
        console.error("Erro: ", error)
        setError(true)
      }
    }
    
    carregar_cliente()
  }, [])

  console.log(cliente)

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[100dvh] w-full text-white gap-10">
        <h2 className="text-red-500 text-xl font-bold">Erro ao buscar os dados dos cliente. Verifique o Backend.</h2>
      </div>
    )
  }
  return (
    <>
      <div className="flex items-center justify-center min-h-[100dvh] w-full text-white gap-10">
        <h2 className="absolute top-14 left-10 text-2xl font-bold">Update de clientes</h2>
        <FormularioEdicao cliente={cliente}/>
      </div>
    </>
  )
}