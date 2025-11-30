import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormularioAcomodacao.css';

export default function FormularioAcomodacao() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [suites, setSuites] = useState('');
  const [camaSolteiro, setCamaSolteiro] = useState('');
  const [camaCasal, setCamaCasal] = useState('');
  const [garagem, setGaragem] = useState('');
  const [climatizacao, setClimatizacao] = useState('sim');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novaAcomodacao = {
      nome,
      descricao,
      suites: Number(suites),
      camaSolteiro: Number(camaSolteiro),
      camaCasal: Number(camaCasal),
      garagem: Number(garagem),
      climatizacao: climatizacao === 'sim'
    };

    try {
      const response = await fetch('http://localhost:3000/cadastro-acomodacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaAcomodacao)
      });

      if (response.ok) {
        alert('Acomodação cadastrada com sucesso!');
        navigate('/lista-acomodacoes'); 
      } else {
        alert('Erro ao cadastrar acomodação.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão.');
    }
  };

  return (
    <>
      <form className='formulario-acomodacao' onSubmit={handleSubmit}>
        <h2>Registrar Acomodação</h2>
        <div className='formulario-acomodacao-body'>
          
          <div className='acomodacao-input'>
            <label htmlFor="tipo-acomodacao">Tipo de Acomodação (Nome):</label>
            <input 
              type="text" 
              id="tipo-acomodacao" 
              placeholder='Ex: Solteiro Simples' 
              value={nome}
              onChange={e => setNome(e.target.value)}
              required 
            />
          </div>

          <div className='acomodacao-input'>
            <label htmlFor="descricao">Descrição:</label>
            <input 
              type="text" 
              id="descricao" 
              placeholder='Breve descrição do quarto' 
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              required 
            />
          </div>

          <div className='acomodacao-input'>
            <label htmlFor="suites">Suítes: </label>
            <input 
              type="number" 
              id="suites" 
              placeholder='2' 
              min={0} 
              value={suites}
              onChange={e => setSuites(e.target.value)}
              required 
            />
          </div>

          <div className='acomodacao-input'>
            <label htmlFor="singleBed">Camas de Solteiro:</label>
            <input 
              type="number" 
              id="singleBed" 
              placeholder='4' 
              min={0} 
              value={camaSolteiro}
              onChange={e => setCamaSolteiro(e.target.value)}
              required 
            />
          </div>

          <div className='acomodacao-input'>
            <label htmlFor="doubleBed">Camas de Casal:</label>
            <input 
              type="number" 
              id="doubleBed" 
              placeholder='1' 
              min={0} 
              value={camaCasal}
              onChange={e => setCamaCasal(e.target.value)}
              required 
            />
          </div>

          <div className='acomodacao-input'>
            <label htmlFor="garage">Garagem:</label>
            <input 
              type="number" 
              id="garage" 
              placeholder='1' 
              min={0} 
              value={garagem}
              onChange={e => setGaragem(e.target.value)}
              required 
            />
          </div>

          <div className='acomodacao-input'>
              <label htmlFor="climatizacao">Climatização: </label>
              <select 
                id="climatizacao" 
                value={climatizacao} 
                onChange={e => setClimatizacao(e.target.value)}
              >
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select> 
          </div>

        </div>
        <button className='acomodacao-button' type='submit'>
          Enviar
        </button>
      </form>
    </>
  );
}