import { useEffect, useState } from 'react';
import type Cliente from '../../interface/Cliente';
import './FormularioEdicao.css';
import { useNavigate } from 'react-router-dom';

interface FormularioEdicaoProps {
  cliente: Cliente | null;
}

export default function FormularioEdicao({ cliente }: FormularioEdicaoProps) {
  const [nome, setNome] = useState('');
  const [nomeSocial, setNomeSocial] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [tipoCliente, setTipoCliente] = useState('Titular');
  
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');
  
  const [tipoDoc, setTipoDoc] = useState('CPF');
  const [numDoc, setNumDoc] = useState('');
  
  const [cpfTitular, setCpfTitular] = useState(''); // Estado para o CPF do pai

  const [novoDependente, setNovoDependente] = useState('');
  const [listaDependentes, setListaDependentes] = useState<{ nome: string }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cliente) {
      setNome(cliente.nome);
      setNomeSocial(cliente.nomeSocial || '');
      
      // Preencher o tipo
      if (cliente.tipo) {
        setTipoCliente(cliente.tipo);
      }

      if (cliente.dataNascimento) {
        const dataFormatada = new Date(cliente.dataNascimento).toISOString().split('T')[0];
        setDataNascimento(dataFormatada);
      }

      if (cliente.Endereco) {
        setRua(cliente.Endereco.rua);
        setNumero(cliente.Endereco.numero);
        setBairro(cliente.Endereco.bairro);
        setCidade(cliente.Endereco.cidade);
        setEstado(cliente.Endereco.estado);
        setCep(cliente.Endereco.cep);
      }

      if (cliente.Documentos && cliente.Documentos.length > 0) {
        setTipoDoc(cliente.Documentos[0].tipo);
        setNumDoc(cliente.Documentos[0].numero);
      }

      if (cliente.Dependentes) {
        setListaDependentes(cliente.Dependentes.map(d => ({ nome: d.nome })));
      }

      // (Opcional) Buscar o CPF do Responsável se ele tiver um pai vinculado
      // Isso exigiria que o backend enviasse "Responsavel" no GET /cliente/:id
      // Se não tiver, o campo vem vazio e o usuário preenche se quiser mudar.
    }
  }, [cliente]);

  const handleAddDependente = (e: React.MouseEvent) => {
    e.preventDefault();
    if (novoDependente.trim()) {
      setListaDependentes([...listaDependentes, { nome: novoDependente }]);
      setNovoDependente('');
    }
  };

  const handleRemoveDependente = (index: number) => {
    const novaLista = [...listaDependentes];
    novaLista.splice(index, 1);
    setListaDependentes(novaLista);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cliente) return;

    const dadosEndereco = tipoCliente === 'Titular' ? {
        rua, numero, bairro, cidade, estado, cep
    } : undefined;

    const corpoRequisicao = {
      nome,
      nomeSocial,
      tipo: tipoCliente,
      dataNascimento: new Date(dataNascimento),
      endereco: dadosEndereco,
      
      // Envia CPF do titular para atualizar o vínculo (se preenchido)
      cpfTitular: tipoCliente === 'Dependente' ? cpfTitular : undefined,

      documentos: [{ tipo: tipoDoc, numero: numDoc }],
      dependentes: listaDependentes
    };

    try {
      const response = await fetch(`http://localhost:3000/cliente/${cliente.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(corpoRequisicao)
      });

      if (response.ok) {
        alert('Cliente atualizado com sucesso!');
        navigate('/lista-clientes');
      } else {
        alert('Erro ao atualizar');
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão');
    }
  };

  return (
    <form className='formulario-edicao' onSubmit={handleSubmit}>
      <h2>Atualizar Cliente</h2>

      <div className='formulario-edicao-body'>

        <div className='edicao-input'>
          <label>Nome:</label>
          <input type='text' value={nome} onChange={e => setNome(e.target.value)} required />
        </div>

        <div className='edicao-input'>
          <label>Nome Social:</label>
          <input type='text' value={nomeSocial} onChange={e => setNomeSocial(e.target.value)} required />
        </div>

        <div className='edicao-input'>
          <label>Data de Nascimento:</label>
          <input type='date' value={dataNascimento} onChange={e => setDataNascimento(e.target.value)} required />
        </div>
        
        {/* SELECT PARA O TIPO DE CLIENTE */}
        <div className='flex flex-col items-center gap-2 w-full mb-4'>
          <label style={{color: 'white', alignSelf: 'flex-start'}}>Tipo de cliente: </label>
          <select
            value={tipoCliente}
            onChange={(e) => setTipoCliente(e.target.value)}
            style={{
                width: '100%', 
                padding: '8px', 
                borderRadius: '5px', 
                backgroundColor: '#333', 
                color: 'white', 
                border: '1px solid #555'
            }}
          >
            <option value="Titular">Titular</option>
            <option value="Dependente">Dependente</option>
          </select>
        </div>

        {/* SE FOR DEPENDENTE: CAMPO DE CPF DO PAI */}
        {tipoCliente === 'Dependente' && (
            <div className='edicao-input'>
                <label style={{color: '#ffca28'}}>CPF do Titular Responsável (para vincular):</label>
                <input 
                    type="text" 
                    value={cpfTitular} 
                    onChange={e => setCpfTitular(e.target.value)} 
                    placeholder="Digite o CPF do pai/mãe"
                />
            </div>
        )}

        {/* SE FOR TITULAR: MOSTRA ENDEREÇO */}
        {tipoCliente === 'Titular' && (
          <>
            <h3 style={{ width: '100%', color: '#fff', marginTop: '10px', marginBottom: '5px' }}>Endereço</h3>
            <div className='edicao-input'>
              <label>Rua:</label>
              <input type='text' value={rua} onChange={e => setRua(e.target.value)} required />
            </div>

            <div className='edicao-input'>
              <label>Número:</label>
              <input type='text' value={numero} onChange={e => setNumero(e.target.value)} required />
            </div>

            <div className='edicao-input'>
              <label>Bairro:</label>
              <input type='text' value={bairro} onChange={e => setBairro(e.target.value)} required />
            </div>
            <div className='edicao-input'>
              <label>Cidade:</label>
              <input type='text' value={cidade} onChange={e => setCidade(e.target.value)} required />
            </div>
            <div className='edicao-input'>
              <label>Estado (UF):</label>
              <input type='text' value={estado} onChange={e => setEstado(e.target.value)} maxLength={2} required />
            </div>
            <div className='edicao-input'>
              <label>CEP:</label>
              <input type='text' value={cep} onChange={e => setCep(e.target.value)} required />
            </div>
          </>
        )}

        <h3 style={{ width: '100%', color: '#fff', marginTop: '10px', marginBottom: '5px' }}>Documentos</h3>
        <div className='edicao-input'>
          <label htmlFor="document-type">Tipo de Documento:</label>
          <select id="document-type" value={tipoDoc} onChange={e => setTipoDoc(e.target.value)} required>
            <option value="CPF">CPF</option>
            <option value="RG">RG</option>
            <option value="Passaporte">Passaporte</option>
          </select>
        </div>

        <div className='edicao-input'>
          <label>Número do Documento:</label>
          <input type='text' value={numDoc} onChange={e => setNumDoc(e.target.value)} required />
        </div>

        {/* LISTA DE DEPENDENTES (SÓ SE FOR TITULAR) */}
        {tipoCliente === 'Titular' && (
          <div className='edicao-input-dependent'>
            <label htmlFor="dependent-name">Nome do dependente:</label>
            <div className='edicao-add-dependent'>
              <input
                id="dependent-name"
                type='text'
                placeholder='Nome do dependente'
                value={novoDependente}
                onChange={e => setNovoDependente(e.target.value)}
              />
              <button onClick={handleAddDependente}>
                Adicionar
              </button>
            </div>

            <div className='edicao-dependents-list'>
              {listaDependentes.map((dep, index) => (
                <div key={index} className='edit-dependent-card'>
                  <span>{dep.nome}</span>
                  <button type="button" onClick={() => handleRemoveDependente(index)}>X</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <button className='edicao-button' type="submit">
        Salvar Alterações
      </button>
    </form>
  );
}