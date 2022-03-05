import iconFechar from '../../assets/icon-fechar.svg'
import iconDetalhes from '../../assets/cobrancas/icon-detalhes.svg'
import useGlobal from '../../hooks/useGlobal';
import './ModalDetalhesCobrancas.css'


function ModalDetalhesCobrancas() {
    const { cobrancaSelecionada, setAbriModalDetalhesCobranca } = useGlobal()
    const data = new Date(cobrancaSelecionada.vencimento)

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
        <div className='backdrop-modalDetalhes'>
            <div className='container-detalhes'>
                <img className='icon-fechar-detalhes' src={iconFechar} alt="" onClick={() => setAbriModalDetalhesCobranca(false)} />
                <div className="titulo-detalhes">
                    <img className='icon-detalhes' src={iconDetalhes} alt="" />
                    <p>Detalhes da Cobrança</p>
                </div>
                <p className='label-detalhes'>Nome</p>
                <p className='nome-detalhes'>{cobrancaSelecionada.cliente_nome}</p>
                <p className='label-detalhes'>Descrição</p>
                <p className='descricao-detalhes'>{cobrancaSelecionada.descricao}</p>
                <div className='div-flex-detalhes'>
                    <div className='div-menor-detalhes'>
                        <p className='label-detalhes'>Vencimento</p>
                        <p>{(data.getDate() + 1) + "/" + (data.getMonth() + 1) + "/" + data.getFullYear()}</p>
                    </div>
                    <div className='div-menor-detalhes'>
                        <p className='label-detalhes'>Valor</p>
                        <p>{cobrancaSelecionada.valor}</p>
                    </div>
                </div>
                <div className='div-flex-detalhes'>
                    <div className='div-menor-detalhes'>
                        <p className='label-detalhes'>ID cobranças</p>
                        <p>{cobrancaSelecionada.id}</p>
                    </div>
                    <div className='div-menor-detalhes'>
                        <p className='label-detalhes'>Status</p>
                        <p className={"detalhes-status cobranca-" + verificarPendencia(cobrancaSelecionada.vencimento, cobrancaSelecionada.cobranca_status)}>
                            {verificarPendencia(cobrancaSelecionada.vencimento, cobrancaSelecionada.cobranca_status)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalDetalhesCobrancas;
