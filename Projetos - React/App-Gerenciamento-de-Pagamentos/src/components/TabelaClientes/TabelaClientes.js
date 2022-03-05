import './TabelaClientes.css'
import ModalAddCobrancas from '../ModalAddCobrancas/ModalAddCobrancas'
import iconCriarCobranca from '../../assets/icon-criarcobranca-rosa.svg'
import iconOrdenar from '../../assets/icon-ordenar.svg'
import useClients from '../../hooks/useClients';
import { Link } from 'react-router-dom';
import useGlobal from '../../hooks/useGlobal';
import { useState, useEffect, useMemo } from 'react';
import PesquisaNotFound from '../ModalPesquisaNotFound/ModalPesquisaNotFound';

function TabelaClientes(props) {
    const { clientes, cobrancas } = useClients();
    const { setIdCliente, setAbriModalAddCobranca, abriModalAddCobranca } = useGlobal();
    const [clienteCobranca, setClienteCobranca] = useState({});
    const [ ordenar, setOrdenar ] = useState(false);
    const { pesquisa } = props;
    const [ notFound, setNotFound ] = useState(false);

    const resultadoPesquisa = useMemo(() => {
        return clientes && clientes.filter(
            cliente => cliente.nome.toLowerCase().includes(pesquisa.toLowerCase())
             ||
            cliente.cpf.toLowerCase().includes(pesquisa.toLowerCase()) ||
            cliente.email.toLowerCase().includes(pesquisa.toLowerCase())
        )
    },[pesquisa, clientes]);

    function ordenaNome() {

        if( ordenar === true){
            resultadoPesquisa.sort((a, b) => {
              return a.nome.toLowerCase().localeCompare(b.nome.toLowerCase());
            });
            setOrdenar(!ordenar);
        };
          
        if( ordenar === false){
            resultadoPesquisa.sort((a, b) => {
              return b.nome.toLowerCase().localeCompare(a.nome.toLowerCase());
            });
            setOrdenar(!ordenar);
        };
    }

    
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
        verificaPesquisa()
        // eslint-disable-next-line
    }, [clientes, pesquisa]);

    function verificarInadimplente(id) {
        const newData = new Date().getTime()
        const cobrancasFiltradas = cobrancas.filter(cobranca => cobranca.cliente_id === id && cobranca.cobranca_status !== 'pago')

        if (cobrancasFiltradas.length === 0) {
            return 'Em dia'
        }

        const cobrancasFiltradasPorVencimento = cobrancasFiltradas.filter(cobranca => newData - new Date(cobranca.vencimento).getTime() > 0)


        if (cobrancasFiltradasPorVencimento.length === 0) {
            return 'Em dia'
        }

        if (cobrancasFiltradasPorVencimento.length !== 0) {
            return 'Inadimplente'
        }

    }

    return (
        <section className='tabela-clientes'>
            <div className="cabecalho-tabela-clientes">
                <p><button onClick={() => ordenaNome()}><img src={iconOrdenar} alt="" /></button> Clientes</p>
                <p>CPF</p>
                <p>E-mail</p>
                <p>Telefone</p>
                <p>Status</p>
                <p>Criar Cobrança</p>
            </div>

            {!notFound && resultadoPesquisa.map((cliente) => {
                return (
                    <div className="linhas-tabela-clientes" key={cliente.id}>
                        <p onClick={() => setIdCliente(cliente.id)}><Link to={`/Clientes/cliente/${cliente.id}`}>{cliente.nome}</Link></p>
                        <p>{cliente.cpf}</p>
                        <p>{cliente.email}</p>
                        <p>{cliente.telefone}</p>
                        <p><span className={verificarInadimplente(cliente.id) === 'Inadimplente' ? 'cliente-inadimplente' : 'cliente-em-dia'}>{verificarInadimplente(cliente.id)}</span></p>
                        <p><img src={iconCriarCobranca} alt="Criar Cobrança" onClick={() => {
                            setClienteCobranca({
                                id: cliente.id,
                                nome: cliente.nome
                            });
                            setAbriModalAddCobranca(true);
                        }} /></p>
                    </div>
                )
            })}

            {notFound && <PesquisaNotFound />}

            {abriModalAddCobranca &&
                <ModalAddCobrancas
                    cliente={clienteCobranca}
                />
            }
        </section>
    );
}

export default TabelaClientes;
