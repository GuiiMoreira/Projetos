import './ModalPesquisaNotFound.css';
import iconPesquisaNotFound from '../../assets/icon-notfound-pesquisa.svg';
import iconPesquisaNotFound2 from '../../assets/icon-notfound2.svg';


function PesquisaNotFound() {
  return(
    <section className='tabela-cobrancas'>
      <div className='naoEncontrado'>
        <div className="icones">
          <img className='iconeEsquerda' src={iconPesquisaNotFound} alt="lupa com x" />
          <img className='iconeDireita' src={iconPesquisaNotFound2} alt="usuario com x" />
        </div>
        <p className='mensagemNaoEncontrado'>Nenhum resultado foi encontrado!</p>
        <span className='avisoNaoEncontrado'>Verifique se escrita está correta</span>
      </div>

    </section>
  )
}

export default PesquisaNotFound;