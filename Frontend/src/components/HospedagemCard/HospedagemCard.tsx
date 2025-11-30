import './HospedagemCard.css'

interface HospedagemCardProps {
  roomName: String,
  climatization: boolean,
  suites: number,
  singleBeds: number,
  doubleBeds: number,
  garage: number,
  roomId: number
}

export default function HospedagemCard(props: HospedagemCardProps) {

  const climatizacao = props.climatization ? "Sim" : 'Não'

  return (
    <div className="hospedagem-card" key={props.roomId}>
      <h1 className='hospedagem-name'>{props.roomName}</h1>
      <div className='room-infos'>
        <p>Climatização: {climatizacao}</p>
        <p>Suítes: {props.suites}</p>
        <p>Cama Solteiro: {props.singleBeds}</p>
        <p>Cama Casal: {props.doubleBeds}</p>
        <p>Garagem: {props.garage}</p>
      </div>
    </div>
  )
}