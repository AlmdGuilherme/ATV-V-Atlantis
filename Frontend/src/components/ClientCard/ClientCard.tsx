import { Link } from 'react-router-dom';
import './ClientCard.css'

interface ClientCardProps {
  clientId: number;
  clientName: string;
  clientType: 'Titular' | 'Dependente';
  clientDocument: string;
  clientAddress: string;
  clientDependents?: string[]
}

export default function ClientCard(props: ClientCardProps) {

  const handleDelete = async () => {
    const confirmacao = window.confirm(`Tem certeza que deseja excluir o cliente ${props.clientName}?`);
    if (!confirmacao) return;
    try {
      const response = await fetch(`http://localhost:3000/cliente/${props.clientId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        alert("Cliente excluído!");
        window.location.reload(); 
      } else {
        alert("Erro ao excluir. Tente novamente.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão com o servidor.");
    }
  }

  return (
    <div className="cliente-card">
      <div className='client-basic-infos'>
        <h2>{props.clientType}</h2>
        <span></span>
        <h2>{props.clientName}</h2>
      </div>
      
      <div className='client-address'>
        {props.clientAddress}
      </div>
      
      <div className='client-other-infos'>
        <h2>Dependentes: </h2>
        <div className='client-dependents'>
          {props.clientDependents && props.clientDependents.length > 0 ? (
            props.clientDependents.map((dependent, index) => (
              <p key={index} className='client-name'>{dependent}</p>
            ))
          ) : (
            <p>Não há dependentes cadastrados.</p>
          )}
        </div>
      </div>
      
      <div className='client-buttons'>
        <Link to={`/editar-cliente/${props.clientDocument}`} className='edit-client-button'>
          Editar cliente
        </Link>
        
        <button className='delete-button' onClick={handleDelete}>
          Excluir cliente
        </button>
      </div>
    </div>
  )
}