import iconClienteCinza from '../../assets/icon-cliente-cinza.svg';
import iconFiltroRosa from '../../assets/icon-filtro-rosa.svg';
import iconLupa from '../../assets/icon-lupa.svg';
import Layout from '../../components/Layout/Layout';
import ModalAddCliente from '../../components/ModalAddCliente/ModalAddCliente';
import ModalFeedbackClients from '../../components/ModalFeedbackClients/ModalFeedbackClients';
import TabelaClientes from '../../components/TabelaClientes/TabelaClientes';
import useGlobal from '../../hooks/useGlobal';
import './clients.css';

function Clients() {
    const { abrirModalAddCliente, setAbrirModalAddCliente, abrirModalFeedbackAddCliente } = useGlobal()
    return (
        <main>
            <Layout titulo='Cliente' classe='cliente-header'>
                <section className='clientes-section-superior'>
                    <div className="titulo-section-superior">
                        <img src={iconClienteCinza} alt="" />
                        <p>Clientes</p>
                    </div>

                    <div className='funcionalidades'>
                        <button className='btn-adicionar-clientes' onClick={() => setAbrirModalAddCliente(true)}>+ Adicionar cliente</button>
                        <img className='btn-filtros-clientes' src={iconFiltroRosa} alt="Filtros" />
                        <div className='pesquisa-clientes'>
                            <input type="text" placeholder='Pesquisa' />
                            <img src={iconLupa} alt="" />
                        </div>
                    </div>
                </section>

                <TabelaClientes />
                {abrirModalAddCliente && <ModalAddCliente />}
                {abrirModalFeedbackAddCliente === true && <ModalFeedbackClients class='visible-modal-feedback-addclientes' texto='Cadastro concluído com sucesso' />}

                {abrirModalFeedbackAddCliente === 'editado' && <ModalFeedbackClients class='visible-modal-feedback-addclientes' texto='Edições do cadastro concluídas com sucesso' />}

                {abrirModalFeedbackAddCliente === 'cobrancas' && <ModalFeedbackClients class='visible-modal-feedback-addclientes' texto='Cobranca cadastrada com sucesso' />}
            </Layout>
        </main>
    );
}

export default Clients;
