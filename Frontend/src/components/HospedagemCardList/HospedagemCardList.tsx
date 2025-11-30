import './HospedagemCardList.css'

interface HospedagemCardListProps {
  id: number
  clientName: string,
  roomName: string,
  dataCheckIn: string;
  dataCheckOut: string;
}

export default function HospedagemCardList(props: HospedagemCardListProps) {
  return (
    <div className="hospedagem-card-list" key={props.id}>
      <div className='hospedagem-client-infos'>
        <h1>Cliente: {props.clientName}</h1>
        <p>Acomodação: {props.roomName}</p>
      </div>
      <div className='hospedagem-date'>
        <p>Check-in: {props.dataCheckIn}</p>
        <p>Check-out: {props.dataCheckOut}</p>
      </div>
    </div>
  )
}