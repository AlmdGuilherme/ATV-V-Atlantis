export type TipoDocumento = 'RG' | 'CPF' | 'Passaporte';

export default interface Documento {
  id: number;
  tipo: TipoDocumento;
  numero: string;
  dataEmissao: Date;
  dataValidade: Date | null;
  clienteId: number | null;
  dependenteId: number | null;
}