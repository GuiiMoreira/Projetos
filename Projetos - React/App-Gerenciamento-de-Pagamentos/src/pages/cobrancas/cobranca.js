import useGlobal from "../../hooks/useGlobal";
import Layout from "../../components/Layout/Layout";
import iconCobrancaCinza from '../../assets/icon-cobranca-cinza.svg';
import iconLupa from '../../assets/icon-lupa.svg';
import iconFiltroRosa from '../../assets/icon-filtro-rosa.svg';
import './cobranca.css';
import TabelaCobrancas from "../../components/Cobrancas/TabelaCobrancas";
import ModalAddCobranca from "../../components/ModalAddCobrancas/ModalAddCobrancas";
import ModalEditCobrancas from "../../components/ModalEditCobrancas/ModalEditCobrancas";
import ModalExcluirCobrancas from "../../components/ModalExcluirCobrancas/ModalExcluirCobrancas";
import ModalDetalhesCobrancas from "../../components/ModalDetalhesCobrancas/ModalDetalhesCobrancas";
import ModalFeedbackClients from "../../components/ModalFeedbackClients/ModalFeedbackClients"
import { useState } from "react";


function Cobrancas() {
  const {
    abriModalAddCobranca,
    abriModalEditCobranca,
    abriModalExcluirCobranca,
    abrirModalFeedbackAddCliente,
    abriModalDetalhesCobranca
  } = useGlobal();
  const [ pesquisa, setPesquisa ] = useState('');

  return (
    <main>
      <Layout titulo='Cobranças' classe='cliente-header'>
        <section className="cobrancas-section-superior">
          <div className="titulo-section-superior">
            <img src={iconCobrancaCinza} alt="" />
            <p>Cobranças</p>
          </div>

          <div className="funcionalidades">
            <img className='btn-filtros-cobrancas' src={iconFiltroRosa} alt="Filtros" />
            <div className='pesquisa-cobrancas'>
              <input 
              type="text" 
              placeholder='Pesquisa'
              onChange={(e) => setPesquisa(e.target.value)}
              />
              <img src={iconLupa} alt="" />
            </div>
          </div>
        </section>

        <TabelaCobrancas 
          pesquisa={pesquisa}
        />
        {abriModalAddCobranca && <ModalAddCobranca />}
        {abriModalEditCobranca && <ModalEditCobrancas />}
        {abriModalExcluirCobranca && <ModalExcluirCobrancas />}
        {abriModalDetalhesCobranca && <ModalDetalhesCobrancas />}

        {abrirModalFeedbackAddCliente === 'cobrancaDeletada' && <ModalFeedbackClients class='visible-modal-feedback-addclientes' texto='Cobrança excluída com sucesso' />}
        {abrirModalFeedbackAddCliente === 'cobrancaEditada' && <ModalFeedbackClients class='visible-modal-feedback-addclientes' texto='Cobrança editada com sucesso' />}

      </Layout>
    </main>
  )
}

export default Cobrancas;