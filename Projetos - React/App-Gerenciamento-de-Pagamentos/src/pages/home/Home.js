import './home.css';
import Menu from '../../components/menu/Menu';
import Header from '../../components/Header/Header';
import Totais from '../../components/Home/Totais/Totais';
import Cobrancas from '../../components/Home/Cobrancas/Cobrancas';
import ClientesHome from '../../components/Home/StatusClientes/StatusClientes';
import cobrancaPaga from '../../assets/home/cobrancaPaga.svg';
import cobrancaPrevista from '../../assets/home/cobrancaPrevista.svg';
import cobrancaVencida from '../../assets/home/cobrancaVencida.svg';
import clienteInadimplente from '../../assets/home/clientesInadimplentes.svg';
import clientesEmDia from '../../assets/home/clienteEmDia.svg';
import useClients from '../../hooks/useClients';
import useGlobal from '../../hooks/useGlobal';
import { useEffect } from 'react';
import { useState } from 'react';

function Home() {
  const { cobrancas } = useClients();
  const { token } = useGlobal();
  function verificarPendencia(data, status) {
    const dataAtual = new Date().getTime();
    const dataCobranca = new Date(data).getTime();

    if (status === 'pago') {
      return 'Pago';
    }

    if (dataCobranca - dataAtual > 0) {
      return 'Pendente';
    }

    if (dataCobranca - dataAtual < 0) {
      return 'Vencida';
    }
  }
  const pagas = cobrancas.map((cobranca) => {
    if (
      verificarPendencia(cobranca.vencimento, cobranca.cobranca_status) ===
      'Pago'
    ) {
      return +cobranca.valor;
    } else {
      return +0;
    }
  });
  const propsPagas = pagas.filter((value) => value > 0);
  const totalPagas = pagas.reduce((total, valor) => total + valor, 0);
  const resumoPagos = cobrancas.map((cobranca) => {
    if (
      verificarPendencia(cobranca.vencimento, cobranca.cobranca_status) ===
      'Pago'
    ) {
      return cobranca;
    } else {
      return undefined;
    }
  });
  const propsResumoPagos = resumoPagos.filter((value) => value !== undefined);
  const vencidas = cobrancas.map((cobranca) => {
    if (
      verificarPendencia(cobranca.vencimento, cobranca.cobranca_status) ===
      'Vencida'
    ) {
      return +cobranca.valor;
    } else {
      return +0;
    }
  });
  const propsVencidas = vencidas.filter((value) => value > 0);
  const totalVencidas = vencidas.reduce((total, valor) => total + valor, 0);
  const resumoVencidas = cobrancas.map((cobranca) => {
    if (
      verificarPendencia(cobranca.vencimento, cobranca.cobranca_status) ===
      'Vencida'
    ) {
      return cobranca;
    } else {
      return undefined;
    }
  });
  const propsResumoVencidas = resumoVencidas.filter(
    (value) => value !== undefined
  );

  const pendentes = cobrancas.map((cobranca) => {
    if (
      verificarPendencia(cobranca.vencimento, cobranca.cobranca_status) ===
      'Pendente'
    ) {
      return +cobranca.valor;
    } else {
      return +0;
    }
  });
  const propsPendentes = pendentes.filter((value) => value > 0);
  const totalPendentes = pendentes.reduce((total, valor) => total + valor, 0);
  const resumoPendentes = cobrancas.map((cobranca) => {
    if (
      verificarPendencia(cobranca.vencimento, cobranca.cobranca_status) ===
      'Pendente'
    ) {
      return cobranca;
    } else {
      return undefined;
    }
  });
  const propsResumoPendentes = resumoPendentes.filter(
    (value) => value !== undefined
  );
  const [todosClientes, setTodosClientes] = useState();
  const pegaClientes = async () => {
    try {
      const response = await fetch(
        `https://desafio-modulo-5.herokuapp.com/clientes/home`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();
      console.log(data);
      return setTodosClientes(data);
    } catch (error) {
      console.log(error);
    }
  };


  const clientesEmDiaArray = todosClientes && todosClientes.adimplentes;
  const clienteInadimplenteArray = todosClientes && todosClientes.inadimplentes;

  useEffect(() => {

    Promise.resolve(() => pegaClientes())
      .then((data) => setTodosClientes(data))
      .catch((e) => console.log({ e }));
    // eslint-disable-next-line
  }, []);

  return (
    <main>
      <Header titulo="Resumo das cobranças" classname="home-header" />
      <Menu />
      <div className="conteudo">
        <div className="topo">
          <Totais
            valor={totalPagas}
            titulo={'Cobranças Pagas'}
            cor={'#EEF6F6'}
            icone={cobrancaPaga}
          />
          <Totais
            valor={totalVencidas}
            titulo={'Cobranças Vencidas'}
            cor={'#FFEFEF'}
            icone={cobrancaVencida}
          />
          <Totais
            valor={totalPendentes}
            titulo={'Cobranças Previstas'}
            cor={'#FCF6DC'}
            icone={cobrancaPrevista}
          />
        </div>
        <div className="cobrancas">
          <Cobrancas
            titulo={'Cobranças Pagas'}
            corBack={'#EEF6F6'}
            fontColor={'#1FA7AF'}
            quantidade={propsPagas.length}
            resumo={propsResumoPagos}
          />
          <Cobrancas
            titulo={'Cobranças Vencidas'}
            corBack={'#FFEFEF'}
            fontColor={'#971D1D'}
            quantidade={propsVencidas.length}
            resumo={propsResumoVencidas}
          />
          <Cobrancas
            titulo={'Cobranças Previstas'}
            corBack={'#FCF6DC'}
            fontColor={'#C5A605'}
            quantidade={propsPendentes.length}
            resumo={propsResumoPendentes}
          />
        </div>
        <div className="resumo-clientes">
          <ClientesHome
            titulo={'Clientes Inadimplentes'}
            icone={clienteInadimplente}
            corBack={'#FFEFEF'}
            fontColor={'#971D1D'}
            tamanho={
              clienteInadimplenteArray && clienteInadimplenteArray.length
            }
            clientesHome={clienteInadimplenteArray}
          />
          <ClientesHome
            titulo={'Clientes em Dia'}
            icone={clientesEmDia}
            corBack={'#EEF6F6'}
            fontColor={'#1FA7AF'}
            tamanho={clientesEmDiaArray && clientesEmDiaArray.length}
            clientesHome={clientesEmDiaArray}
          />
        </div>
      </div>
    </main>
  );
}

export default Home;
