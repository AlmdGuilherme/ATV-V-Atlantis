import { useState } from 'react';
import './Formulario.css';
import { useNavigate } from 'react-router-dom';

export default function Formulario() {
  const [nome, setNome] = useState('');
  const [nomeSocial, setNomeSocial] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  
  const [tipoCliente, setTipoCliente] = useState('Titular');

  const [tipoDoc, setTipoDoc] = useState('CPF');
  const [numDoc, setNumDoc] = useState('');
  const [dataExpedicao, setDataExpedicao] = useState('');

  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');
  const [cpfTitular, setCpfTitular] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dadosEndereco = tipoCliente === 'Titular' ? {
      rua, numero, bairro, cidade, estado, cep
    } : undefined;

    const corpoRequisicao = {
      nome,
      nomeSocial,
      tipo: tipoCliente,
      dataNascimento: new Date(dataNascimento),
      endereco: dadosEndereco,
      cpfTitular: tipoCliente === 'Dependente' ? cpfTitular : undefined,
      documentos: [
        {
          tipo: tipoDoc,
          numero: numDoc,
          dataEmissao: new Date(dataExpedicao)
        }
      ],
      dependentes: []
    };

    console.log("Enviando Tipo:", tipoCliente);

    try {
      const response = await fetch('http://localhost:3000/cadastro-cliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(corpoRequisicao)
      });

      if (response.ok) {
        alert('Cliente cadastrado com sucesso!');
        navigate('/lista-clientes');
      } else {
        const errorData = await response.json();
        alert(`Erro ao cadastrar: ${errorData.error || 'Verifique os dados.'}`);
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão com o servidor.');
    }
  };

  return (
    <>
      <form className='formulario-cliente' onSubmit={handleSubmit}>
        <div className='form-body'>
          <div className='flex gap-2'>
            <div className='formulario-personal-infos'>
              <div className='formulario-input'>
                <label htmlFor="username">Nome: </label>
                <input
                  type="text"
                  id='username'
                  placeholder='Ex: Pedro Alvares Cabral'
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  required
                />
              </div>
              <div className='formulario-input'>
                <label htmlFor="socialname">Nome Social: </label>
                <input
                  type="text"
                  id='socianame'
                  placeholder='Ex: Pedrinho'
                  value={nomeSocial}
                  onChange={e => setNomeSocial(e.target.value)}
                  required
                />
              </div>
              <div className='formulario-input'>
                <label htmlFor="birthdate">Data de Nascimento: </label>
                <input
                  type="date"
                  id='birthdate'
                  value={dataNascimento}
                  onChange={e => setDataNascimento(e.target.value)}
                  required
                />
              </div>

              <div className='client-type'>
                <label>Tipo de cliente: </label>
                <div className='formulario-radios' style={{display: 'flex', gap: '20px'}}>
                  
                  <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer', color: 'white'}}>
                    <input
                      type="radio"
                      name="tipoCliente"
                      checked={tipoCliente === 'Titular'}
                      onChange={() => setTipoCliente('Titular')}
                      style={{marginRight: '5px'}}
                    />
                    Titular
                  </label>

                  <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer', color: 'white'}}>
                    <input
                      type="radio"
                      name="tipoCliente"
                      checked={tipoCliente === 'Dependente'}
                      onChange={() => setTipoCliente('Dependente')}
                      style={{marginRight: '5px'}}
                    />
                    Dependente
                  </label>

                </div>
              </div>
              
              {tipoCliente === 'Dependente' && (
                <div className='formulario-input' style={{ marginTop: '15px' }}>
                  <label style={{color: '#ffca28'}}>CPF do Titular Responsável:</label>
                  <input
                    type="text"
                    placeholder="Digite o CPF do titular"
                    value={cpfTitular}
                    onChange={e => setCpfTitular(e.target.value)}
                    required
                  />
                </div>
              )}
            </div>

            <div className='formulario-document-infos'>
              <label>Tipo de documento:</label>
              <div className='client-document'>
                <div>
                  <input
                    type="radio"
                    name="selected-document"
                    checked={tipoDoc === 'CPF'}
                    onChange={() => setTipoDoc('CPF')}
                  />
                  <label>CPF</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="selected-document"
                    checked={tipoDoc === 'RG'}
                    onChange={() => setTipoDoc('RG')}
                  />
                  <label>RG</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="selected-document"
                    checked={tipoDoc === 'Passaporte'}
                    onChange={() => setTipoDoc('Passaporte')}
                  />
                  <label>Passaporte</label>
                </div>
              </div>

              <div className='formulario-input'>
                <label htmlFor="document">Número do Documento: </label>
                <input
                  type="text"
                  id='document'
                  placeholder='Apenas números'
                  value={numDoc}
                  onChange={e => setNumDoc(e.target.value)}
                  required
                />
              </div>
              <div className='formulario-input'>
                <label htmlFor="expeditiondate">Data de Expedição: </label>
                <input
                  type="date"
                  id='expeditiondate'
                  value={dataExpedicao}
                  onChange={e => setDataExpedicao(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          
          {tipoCliente === 'Titular' && (
            <div className='formulario-personal-infos-address'>
              <h3 style={{ color: 'white', marginBottom: '10px' }}>Endereço</h3>
              <div className='formulario-input'>
                <label>Rua:</label>
                <input type="text" value={rua} onChange={e => setRua(e.target.value)} required />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div className='formulario-input' style={{ flex: 1 }}>
                  <label>Número:</label>
                  <input type="text" value={numero} onChange={e => setNumero(e.target.value)} required />
                </div>
                <div className='formulario-input' style={{ flex: 2 }}>
                  <label>Bairro:</label>
                  <input type="text" value={bairro} onChange={e => setBairro(e.target.value)} required />
                </div>
              </div>
              <div className='formulario-input'>
                <label>Cidade:</label>
                <input type="text" value={cidade} onChange={e => setCidade(e.target.value)} required />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div className='formulario-input' style={{ flex: 1 }}>
                  <label>Estado (UF):</label>
                  <input type="text" value={estado} onChange={e => setEstado(e.target.value)} maxLength={2} required />
                </div>
                <div className='formulario-input' style={{ flex: 2 }}>
                  <label>CEP:</label>
                  <input type="text" value={cep} onChange={e => setCep(e.target.value)} required />
                </div>
              </div>
            </div>
          )}

        </div>
        <button className='form-button' type='submit'>
          Enviar
        </button>
      </form>
    </>
  );
}