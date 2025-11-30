import type { Acomodacao } from "./Acomodacao";
import type Cliente from "./Cliente";

export type StatusHospedagem = 'reservado' | 'ocupado' | 'disponível';

export interface Hospedagem {
  id: number;
  dataCheckin: string;
  dataCheckout: string;
  status: StatusHospedagem; 
  Cliente: Cliente;
  Acomodacao: Acomodacao;
}