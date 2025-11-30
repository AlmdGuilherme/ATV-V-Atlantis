export enum StatusHospedagem {
  RESERVADO = 'reservado',
  OCUPADO = 'ocupado',    
  DISPONIVEL = 'disponível'
}

export interface Hospedagem {
  id: number;
  dataCheckin: Date;
  dataCheckout: Date;
  status: StatusHospedagem; 
  clienteId: number;
  acomodacaoId: number;
}