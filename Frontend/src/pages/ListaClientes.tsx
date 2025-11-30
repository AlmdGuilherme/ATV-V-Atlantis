import { useEffect, useState } from "react";
import ClientCard from "../components/ClientCard/ClientCard";
import type Cliente from "../interface/Cliente"; 

export default function ListaClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const carregar_clientes = async () => {
      try {
        const response = await fetch("http://localhost:3000/clientes");
        if (!response.ok) throw new Error("Falha na requisição");
        
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error("Erro: ", error);
        setError(true);
      }
    };

    carregar_clientes();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[100dvh] w-full text-white gap-10">
        <h2 className="text-red-500 text-xl font-bold">Erro ao buscar os dados dos clientes. Verifique o Backend.</h2>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-[100dvh] w-full text-white gap-10">
        <h2 className="absolute top-14 left-10 text-2xl font-bold">Clientes</h2>
        
        <div className="p-4 flex items-center justify-center gap-2 w-[99%] h-[70dvh] flex-wrap overflow-auto customize-scroll">
          
          {clientes.map((cliente) => (
            <ClientCard
              key={cliente.id} 
              clientId={cliente.id}
              clientName={cliente.nomeSocial || cliente.nome}
              clientType="Titular"
              clientDocument={
                 cliente.Documentos && cliente.Documentos.length > 0 
                 ? cliente.Documentos[0].numero 
                 : "S/ Doc"
              }
              clientAddress={
                cliente.Endereco 
                  ? `${cliente.Endereco.rua}, ${cliente.Endereco.numero} - ${cliente.Endereco.cidade}/${cliente.Endereco.estado}`
                  : "Endereço não cadastrado"
              }
              clientDependents={cliente.Dependentes?.map((dep) => dep.nome) || []}
            />
          ))}
          
        </div>
      </div>
    </>
  );
}