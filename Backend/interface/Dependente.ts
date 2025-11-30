import Documento from "./Documento";

export default interface Dependente {
  id: number;  
  nome: string;
  dataNascimento: Date;
  clienteId: number;         
  documento?: Documento; 
}