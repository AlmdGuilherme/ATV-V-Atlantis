import { useEffect, useState, type FormEvent } from 'react';
import './FormularioHospedagem.css';
import { useNavigate } from 'react-router-dom';

interface ClienteResumo {
  id: number;
  nome: string;
  tipo: string;
  Documentos?: { numero: string }[]; 
}

interface AcomodacaoResumo {
  id: number;
  nome: string;
}

export default function FormularioHospedagem() {
  const [listaClientes, setListaClientes] = useState<ClienteResumo[]>([]);
  const [listaAcomodacoes, setListaAcomodacoes] = useState<AcomodacaoResumo[]>([]);

  const [clienteSelecionado, setClienteSelecionado] = useState('');
  const [acomodacaoSelecionada, setAcomodacaoSelecionada] = useState('');
  const [dataCheckin, setDataCheckin] = useState('');
  const [dataCheckout, setDataCheckout] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const resClientes = await fetch('http://localhost:3000/clientes');
        if (resClientes.ok) {
          const dataClientes = await resClientes.json();
          if (Array.isArray(dataClientes)) {
            const titulares = dataClientes.filter((c: ClienteResumo) => c.tipo === 'Titular');
            setListaClientes(titulares);
          }
        }

        const resAcomodacoes = await fetch('http://localhost:3000/acomodacoes');
        if (resAcomodacoes.ok) {
          const dataAcomodacoes = await resAcomodacoes.json();
          if (Array.isArray(dataAcomodacoes)) setListaAcomodacoes(dataAcomodacoes);
        }

      } catch (error) {
        console.error(error);
      }
    };
    carregarDados();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      clienteId: clienteSelecionado,
      acomodacaoId: acomodacaoSelecionada,
      dataCheckin,
      dataCheckout
    };

    try {
      const response = await fetch('http://localhost:3000/hospedagens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert('Hospedagem registrada com sucesso!');
        navigate('/lista-hospedagens');
      } else {
        const erro = await response.json();
        alert(`Erro: ${erro.error || 'Falha ao registrar'}`);
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão.');
    }
  };

  return (
    <>
      <form className='formulario-estadia' onSubmit={handleSubmit}>
        <h2>Registrar Estadia</h2>
        
        <div className='formulario-estadia-body'>
          
          <div className='estadia-infos'>
            <div className='estadia-select' style={{width: '100%'}}>
              <label htmlFor="cliente-select">Selecionar Cliente (Titular):</label>
              <select 
                id="cliente-select" 
                value={clienteSelecionado}
                onChange={e => setClienteSelecionado(e.target.value)}
                required
                style={{width: '100%', padding: '10px'}}
              >
                <option value="">Selecione um cliente...</option>
                {listaClientes.map(cliente => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nome} 
                    {cliente.Documentos && cliente.Documentos.length > 0 
                      ? ` (Doc: ${cliente.Documentos[0].numero})` 
                      : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='estadia-infos'>
            <div className='estadia-select'>
              <label htmlFor="room-type">Acomodação:</label>
              <select 
                id="room-type" 
                value={acomodacaoSelecionada}
                onChange={e => setAcomodacaoSelecionada(e.target.value)}
                required
              >
                <option value="">Selecione o quarto...</option>
                {listaAcomodacoes.map(quarto => (
                  <option key={quarto.id} value={quarto.id}>
                    {quarto.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className='estadia-input'>
              <label htmlFor="data-checkin">Data de Check-in:</label>
              <input 
                type="date" 
                id="data-checkin" 
                value={dataCheckin}
                onChange={e => setDataCheckin(e.target.value)}
                required 
              />
            </div>
            
            <div className='estadia-input'>
              <label htmlFor="data-checkout">Data de Check-out:</label>
              <input 
                type="date" 
                id="data-checkout" 
                value={dataCheckout}
                onChange={e => setDataCheckout(e.target.value)}
                required 
              />
            </div>
          </div>
        </div>
        
        <button className='estadia-button' type='submit'>
          Confirmar Hospedagem
        </button>
      </form>
    </>
  );
}