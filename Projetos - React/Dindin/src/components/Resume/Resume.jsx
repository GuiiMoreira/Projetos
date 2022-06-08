import React from 'react'
import './Resume.css'

export default function Resume({
    transactionBalanceIn,
    transactionBalanceOut,
    transactionBalanceTotal,
    setDisplayModal,
    setselectBtnCredit,
    setselectBtnDebit
}) {
    return (
        <div className="resume">
            <div className="container-resume">
                <p className="title-resume">Resumo</p>
                <div className="balance-info">
                    <p>Entrada</p>
                    <p className="in">{`R$ ${transactionBalanceIn}`}</p>
                </div>
                <div className="balance-info">
                    <p>Saída</p>
                    <p className="out">{`R$ ${transactionBalanceOut}`}</p>
                </div>
                <div className="balance-info result">
                    <p>Saldo</p>
                    <p className="balance">{`R$ ${transactionBalanceTotal}`}</p>
                </div>
            </div>
            <button className="btn-add" onClick={() => {
                setDisplayModal(true)
                setselectBtnCredit("")
                setselectBtnDebit("select")
            }}>Adicionar Registro</button>
        </div>
    )
}
