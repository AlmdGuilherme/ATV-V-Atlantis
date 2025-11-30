import type Dependente from "./Dependente";
import type Documento from "./Documento";
import type Endereco from "./Endereco";
import type { Hospedagem } from "./Hospedagem";

export default interface Cliente {
  id: number;
  nome: string;
  nomeSocial: string;
  dataNascimento: string;
  tipo: string;
  Endereco: Endereco | null;
  Documentos: Documento[];
  Dependentes: Dependente[];
  Hospedagens: Hospedagem[];
}