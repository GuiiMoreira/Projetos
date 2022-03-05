import iconFechar from '../../assets/icon-fechar.svg'
import iconAlert from '../../assets/cobrancas/icon-alert.svg'
import useGlobal from '../../hooks/useGlobal';
import useRequests from '../../hooks/useRequests';
import useClients from '../../hooks/useClients';

import './ModalExcluirCobrancas.css'


function ModalExcluirCobrancas() {
    const { setAbriModalExcluirCobranca, cobrancaSelecionada, setAbrirModalFeedbackAddCliente } = useGlobal()
    const { carregarCobrancas, carregarClientes } = useClients();

    const requisicao = useRequests()

    async function handleDelete() {
        const resposta = await requisicao.del('cobrancas', cobrancaSelecionada.id);

        if (resposta) {
            carregarCobrancas();
            carregarClientes();
            setAbriModalExcluirCobranca(false);
            setAbrirModalFeedbackAddCliente('cobrancaDeletada');
            setTimeout(() => setAbrirModalFeedbackAddCliente(false), 5000)
        }
    }

    return (
        <div className='backdrop-modalAlertaExcluir'>
            <div className='container-alerta-excluir'>
                <img className='icon-fechar' src={iconFechar} alt="" onClick={() => setAbriModalExcluirCobranca(false)} />
                <img className='icon-alerta' src={iconAlert} alt="" />
                <p className='txt-excluir'>Tem certeza que deseja excluir esta cobrança?</p>
                <div className='btns-exclusao'>
                    <button className='btn-cancelar-excluir' onClick={() => setAbriModalExcluirCobranca(false)}>Não</button>
                    <button className='btn-confirmar-excluir' onClick={() => handleDelete()}>Sim</button>
                </div>
            </div>
        </div>
    );
}

export default ModalExcluirCobrancas;
