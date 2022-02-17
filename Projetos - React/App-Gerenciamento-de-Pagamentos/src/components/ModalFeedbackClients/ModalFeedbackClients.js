import React from 'react';
import iconSucesso from '../../assets/icon-sucesso-addcliente.svg'
import iconFechar from '../../assets/icon-fechar.svg'
import './ModalFeedbackClients.css'
import useGlobal from '../../hooks/useGlobal';

export default function ModalFeedbackClients(props) {
    const { setAbrirModalFeedbackAddCliente } = useGlobal()

    return (
        <div className={props.class}>
            <div className='modal-feedback-clientes'>
                <img src={iconSucesso} alt="Sucesso" className='icon-sucesso-feedback-clientes' />
                <p>
                    {props.texto}
                </p>
                <img src={iconFechar} alt="Fechar" className='icon-fechar-feedback-clientes' onClick={() => setAbrirModalFeedbackAddCliente(false)} />
            </div>
        </div>
    )

}



