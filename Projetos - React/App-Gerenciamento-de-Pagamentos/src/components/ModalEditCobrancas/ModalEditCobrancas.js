import './ModalEditCobrancas.css';
import iconCobrancaCinza from '../../assets/icon-cobranca-cinza.svg';
import iconFechar from '../../assets/icon-fechar.svg';
import useGlobal from '../../hooks/useGlobal';
import { useState } from 'react';
import iconCheckdVerde from '../../assets/cobrancas/icon-checked.svg';
import iconCheckdCinza from '../../assets/cobrancas/icon-check-cinza.svg';
import useRequests from '../../hooks/useRequests';
import useClients from '../../hooks/useClients';


function ModalEditCobrancas() {
    const { setAbriModalEditCobranca, setAbrirModalFeedbackAddCliente, cobrancaSelecionada } = useGlobal();

    const defaultValuesForm = {
        nome: cobrancaSelecionada.cliente_nome,
        descricao: cobrancaSelecionada.descricao,
        vencimento: cobrancaSelecionada.vencimento.slice(0, 10),
        valor: cobrancaSelecionada.valor
    };

    const [form, setForm] = useState(defaultValuesForm);
    const [statusCobranca, setStatusCobranca] = useState(cobrancaSelecionada.cobranca_status);
    const objErrors = {};
    const [errors, setErrors] = useState([]);
    const { carregarCobrancas, carregarClientes } = useClients();
    const requisicao = useRequests();

    function handleChange(target) {
        setForm({
            ...form,
            [target.name]: target.value
        });
    };

    async function handleSubmit(event) {
        event.preventDefault();

        setErrors(validarFormulario(form));

        if (Object.keys(validarFormulario(form)).length !== 0) {
            return;
        }

        const body = {
            cliente_nome: form.nome,
            descricao: form.descricao,
            vencimento: form.vencimento,
            valor: form.valor,
            cobranca_status: statusCobranca,
            cliente_id: cobrancaSelecionada.cliente_id
        }

        const resposta = await requisicao.put('cobrancas', body, cobrancaSelecionada.id);

        if (resposta) {
            setAbriModalEditCobranca(false);
            setAbrirModalFeedbackAddCliente('cobrancaEditada');
            setTimeout(() => setAbrirModalFeedbackAddCliente(false), 5000)
            carregarCobrancas();
            carregarClientes();
        }
    }

    function validarFormulario(values) {
        if (!values.descricao) {
            objErrors.descricao = 'Este campo deve ser preenchido'
        }

        if (!values.vencimento) {
            objErrors.vencimento = 'Este campo deve ser preenchido';
        }

        if (!values.valor) {
            objErrors.valor = 'Este campo deve ser preenchido'
        }

        return objErrors;
    }

    return (
        <main className='backdrop-modalEditCobranca'>
            <div className="container-modalEditCobranca">
                <div className="titulo-modalEditCobranca">
                    <img src={iconCobrancaCinza} alt="Icone de Cobrança" />
                    <p>Edição de Cobrança</p>
                    <img src={iconFechar} alt="Fechar" className='btn-fechar-modalEditCobranca' onClick={() => setAbriModalEditCobranca(false)} />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="label-modalEditCobranca">
                        <label htmlFor="nome">Nome*</label>
                        <input type="text"
                            name='nome'
                            disabled
                            value={form.nome}
                        />
                    </div>

                    <div className="label-descricao">
                        <label htmlFor="descricao">Descrição*</label>
                        <textarea
                            id="descricao"
                            name="descricao"
                            rows="3"
                            cols="40"
                            value={form.descricao}
                            onChange={(e) => handleChange(e.target)}
                            onBlur={(e) => !e.target.value ? setErrors({ ...errors, descricao: 'Este campo deve ser preenchido' }) : setErrors({ ...errors, descricao: false })}
                        >
                            Digite a descrição
                        </textarea>
                        {errors.descricao && <span className='erro-form'>{errors.descricao}</span>}
                    </div>

                    <div className="dividir-label">
                        <div className="label-modalEditCobranca">
                            <label htmlFor="vencimento">Vencimento:*</label>
                            <input
                                type="date"
                                name='vencimento'
                                placeholder='dd/mm/aaaa'
                                value={form.vencimento}
                                onChange={(e) => handleChange(e.target)}
                                onBlur={(e) => !e.target.value ? setErrors({ ...errors, vencimento: 'Este campo deve ser preenchido' }) : setErrors({ ...errors, vencimento: false })}
                            />
                            {errors.vencimento && <span className="erro-form">{errors.vencimento}</span>}
                        </div>

                        <div className="label-modalEditCobranca">
                            <label htmlFor="valor">Valor:*</label>
                            <input
                                type="number"
                                min="0.00"
                                max="1000000.00"
                                step="0.01"
                                name='valor'
                                placeholder='Digite o valor'
                                value={form.valor}
                                onChange={(e) => handleChange(e.target)}
                                onBlur={(e) => !e.target.value ? setErrors({ ...errors, valor: 'Este campo deve ser preenchido' }) : setErrors({ ...errors, valor: false })}
                            />
                            {errors.valor && <span className='erro-form'>{errors.valor}</span>}
                        </div>
                    </div>

                    <div >
                        <p>Status*</p>
                        <div className='statusCobranca'>
                            <img
                                src={statusCobranca === 'pago' ? iconCheckdVerde : iconCheckdCinza}
                                alt="icone"
                                onClick={() => setStatusCobranca(statusCobranca === 'pago' ? '' : 'pago')}
                            />
                            <p>Cobrança Paga</p>
                        </div>
                        <div className='statusCobranca'>
                            <img
                                src={statusCobranca === 'pendente' ? iconCheckdVerde : iconCheckdCinza}
                                alt="icone"
                                onClick={() => setStatusCobranca(statusCobranca === 'pendente' ? '' : 'pendente')}
                            />
                            <p>Cobrança Pendente</p>
                        </div>
                    </div>
                    <div className='buttons-cobranca'>
                        <button
                            onClick={() => setAbriModalEditCobranca(false)}
                            className='btn-cancelar-modalEditCobranca'
                        >
                            Cancelar
                        </button>
                        <button
                            className='btn-aplicar-modalEditCobranca'
                            disabled={errors.descricao || errors.valor || errors.vencimento}
                        >
                            Aplicar
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default ModalEditCobrancas;