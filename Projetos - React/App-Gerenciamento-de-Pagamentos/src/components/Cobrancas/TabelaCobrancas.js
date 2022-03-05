import './TabelaCobrancas.css';
import iconOrdenar from '../../assets/icon-ordenar.svg';
import useClients from '../../hooks/useClients';
import iconEditar from '../../assets/cobrancas/icon-editar.svg';
import iconExcluir from '../../assets/cobrancas/icon-excluir-rosa.svg';
import useGlobal from '../../hooks/useGlobal';
import { useEffect, useState, useMemo } from 'react';
import PesquisaNotFound from '../ModalPesquisaNotFound/ModalPesquisaNotFound';

function TabelaCobrancas(props) {
  const { cobrancas } = useClients();
  const { setAbriModalEditCobranca, setCobrancaSelecionada, setAbriModalExcluirCobranca, setAbriModalDetalhesCobranca } = useGlobal();
  const [ ordenaNome, setOrdenarNome ] = useState(false);
  const [ ordenarId, setOrdenarId ] = useState(false);
  const { pesquisa } = props;
  const [ notFound, setNotFound ] = useState(false);

  const resultadoPesquisa = useMemo(() => {
    return cobrancas && cobrancas.filter(
      cobranca => cobranca.cliente_nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
      cobranca.id.toString().includes(pesquisa.toLowerCase())
    )
  },[pesquisa, cobrancas]);

  function ordernarNome() {

    if( ordenaNome === true){
      resultadoPesquisa.sort((a, b) => {
        return a.cliente_nome.toLowerCase().localeCompare(b.cliente_nome.toLowerCase());
      });
      setOrdenarNome(!ordenaNome);
    };
    
    if( ordenaNome === false){
      resultadoPesquisa.sort((a, b) => {
        return b.cliente_nome.toLowerCase().localeCompare(a.cliente_nome.toLowerCase());
      });
      setOrdenarNome(!ordenaNome);
    };
  }
  
  function ordernarID() {
    if( ordenarId === true){
      resultadoPesquisa.sort((a, b) => {
        return a.id - b.id;
      });
      setOrdenarId(!ordenarId);
    };
    
    if( ordenarId === false){
      resultadoPesquisa.sort((a, b) => {
        return b.id - a.id;
      });
      setOrdenarId(!ordenarId);
    };
  };

  function verificaPesquisa() {
    if (pesquisa.length !== 0) {
      if (resultadoPesquisa.length > 0) {
        setNotFound(false);
      } else {
        setNotFound(true);
      }

      if (pesquisa.length === 0) {
        setNotFound(false);
      }
    };
  };

  useEffect(()=> {
    verificaPesquisa();
    // eslint-disable-next-line
  }, [cobrancas, pesquisa]);

  function formatar(dataAPI) {
    let data = new Date(dataAPI);
    const dataFormatada = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' })

    return dataFormatada;
  };

  function verificarPendencia(data, status) {
    const dataAtual = new Date().getTime()
    const dataCobranca = new Date(data).getTime()

    if (status === 'pago') {
      return 'Pago'
    }

    if (dataCobranca - dataAtual > 0) {
      return 'Pendente'
    }

    if (dataCobranca - dataAtual < 0) {
      return 'Vencida'
    }
  }

  return (
    <section className='tabela-cobrancas'>
      <div className="cabecalho-tabela-cobrancas">
        <p><button onClick={() => ordernarNome()}><img src={iconOrdenar} alt="" /></button>Cliente</p>
        <p> <button onClick={() => ordernarID()}><img src={iconOrdenar} alt="" /></button> ID Cob.</p>
        <p>Valor</p>
        <p>Data de venc.</p>
        <p>Status</p>
        <p>Descrição</p>
        <p> </p>
      </div>

      {!notFound && resultadoPesquisa.map((cobranca) => {
        return (
          <div className="linhas-tabela-cobrancas" key={cobranca.id} >
            <p onClick={() => {
              setCobrancaSelecionada(cobranca)
              setAbriModalDetalhesCobranca(true)
            }}>{cobranca.cliente_nome}</p>
            <p onClick={() => {
              setCobrancaSelecionada(cobranca)
              setAbriModalDetalhesCobranca(true)
            }}>{cobranca.id}</p>
            <p onClick={() => {
              setCobrancaSelecionada(cobranca)
              setAbriModalDetalhesCobranca(true)
            }}>{cobranca.valor}</p>
            <p onClick={() => {
              setCobrancaSelecionada(cobranca)
              setAbriModalDetalhesCobranca(true)
            }}>{formatar(cobranca.vencimento)}</p>
            <div className='coluna-status' onClick={() => {
              setCobrancaSelecionada(cobranca)
              setAbriModalDetalhesCobranca(true)
            }}>
              <p className={"cobranca-" + verificarPendencia(cobranca.vencimento, cobranca.cobranca_status)}>{verificarPendencia(cobranca.vencimento, cobranca.cobranca_status)}</p>
            </div>
            <p onClick={() => {
              setCobrancaSelecionada(cobranca)
              setAbriModalDetalhesCobranca(true)
            }}>{cobranca.descricao}</p>
            <p><button><img src={iconEditar} alt="" onClick={() => {
              setCobrancaSelecionada(cobranca)
              setAbriModalEditCobranca(true)
            }} /></button><button><img src={iconExcluir} alt=""
              onClick={() => {
                setCobrancaSelecionada(cobranca)
                setAbriModalExcluirCobranca(true)
              }} /></button></p>
          </div>
        )
      })}

      {notFound && <PesquisaNotFound />}
    </section>
  )
}

export default TabelaCobrancas;