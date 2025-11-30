export default interface Endereco {
  id: number;
  clienteId: number;
  rua: string;
  numero: string;
  complemento: string | null;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}