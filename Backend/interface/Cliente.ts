import Documento from "./Documento";
import Endereco from "./Endereco";
import { Hospedagem } from "./Hospedagem";
import Dependente from "./Dependente"; // Faltava importar isso

export default interface Cliente {
  id: number;
  nome: string;
  nomeSocial: string;
  tipo: string;
  dataNascimento: string;
  Endereco: Endereco | null; 
  Documentos: Documento[];
  Dependentes: Dependente[];
  Hospedagens: Hospedagem[];
}