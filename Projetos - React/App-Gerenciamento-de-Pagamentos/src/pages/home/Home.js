import './home.css';
import Menu from '../../components/menu/Menu'
import Header from '../../components/Header/Header'
import Totais from '../../components/Home/Totais/Totais';
import Cobrancas from '../../components/Home/Cobrancas/Cobrancas';
import ClientesHome from '../../components/Home/StatusClientes/StatusClientes';
import cobrancaPaga from '../../assets/home/cobrancaPaga.svg';
import cobrancaPrevista from '../../assets/home/cobrancaPrevista.svg';
import cobrancaVencida from '../../assets/home/cobrancaVencida.svg';
import clienteInadimplente from '../../assets/home/clientesInadimplentes.svg';
import clientesEmDia from '../../assets/home/clienteEmDia.svg'

function Home() {
    return (
        <main>
            <Header titulo='Resumo das cobranças' classname='home-header' />
            <Menu />
            <div className="conteudo">
                <div className="topo">
                    <Totais
                        valor={30000}
                        titulo={'Cobranças Pagas'}
                        cor={'#EEF6F6'}
                        icone={cobrancaPaga}
                    />
                    <Totais
                        valor={7000}
                        titulo={'Cobranças Vencidas'}
                        cor={'#FFEFEF'}
                        icone={cobrancaVencida}
                    />
                    <Totais
                        valor={10000}
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

                    />
                    <Cobrancas
                        titulo={'Cobranças Vencidas'}
                        corBack={'#FFEFEF'}
                        fontColor={'#971D1D'}
                    />
                    <Cobrancas
                        titulo={'Cobranças Previstas'}
                        corBack={'#FCF6DC'}
                        fontColor={'#C5A605'}
                    />
                </div>
                <div className="resumo-clientes">
                    <ClientesHome
                        titulo={'Clientes Inadimplentes'}
                        icone={clienteInadimplente}
                        corBack={'#FFEFEF'}
                        fontColor={'#971D1D'}
                    />
                    <ClientesHome
                        titulo={'Clientes em Dia'}
                        icone={clientesEmDia}
                        corBack={'#EEF6F6'}
                        fontColor={'#1FA7AF'}
                    />
                </div>
            </div>
        </main>
    );
}

export default Home;
