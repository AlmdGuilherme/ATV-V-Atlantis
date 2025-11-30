import FormularioHospedagem from "../components/FormularioHospedagem/FormularioHospedagem";

export default function CadastroEstadia() {
  return (
    <div className="flex items-center justify-center min-h-[100dvh] w-full text-white gap-10">
      <h2 className="absolute top-14 left-10 text-2xl font-bold">Cadastro de clientes</h2>
      <FormularioHospedagem/>
    </div>
  )
}