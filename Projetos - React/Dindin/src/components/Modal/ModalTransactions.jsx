import React, { useEffect, useState } from 'react'
import closeBtn from '../../assets/closeBtn.svg'
import './ModalTransactions.css'

export default function ModalTransactions({
    setTransactionInEditing,
    transactionInEditing,
    setselectBtnDebit,
    setselectBtnCredit,
    loadTransaction,
    setDisplayModal,
    selectBtnDebit,
    selectBtnCredit
}) {
    const [transactionType, setTransactionType] = useState('debit')
    const [transactionValue, setTransactionValue] = useState()
    const [transactionDate, setTransactionDate] = useState('')
    const [transactionDescription, setTransactionDescription] = useState('')
    const [transactionCategory, setTransactionCategory] = useState('')
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (transactionInEditing) {
            setTransactionValue(transactionInEditing.value)
            setTransactionDate(transactionInEditing.date)
            setTransactionDescription(transactionInEditing.description)
            setTransactionCategory(transactionInEditing.category)
            setTransactionType(transactionInEditing.type)

            if (transactionInEditing.type === "credit") {
                setselectBtnDebit('')
                setselectBtnCredit('select')
            } else {
                setselectBtnDebit('select')
                setselectBtnCredit('')
            }
            return
        }

        setTransactionValue('')
        setTransactionDate('')
        setTransactionDescription('')
        setTransactionCategory('')
        setTransactionType('debit')

    }, [transactionInEditing])


    async function handleRegisterTransaction() {
        if (!transactionValue || !transactionDate || !transactionCategory || !transactionDescription) return

        const weekDay = new Date(transactionDate)

        const body = {
            date: transactionDate,
            week_day: formatarDia(weekDay.getDay()),
            value: transactionValue,
            category: transactionCategory,
            description: transactionDescription,
            type: transactionType
        }

        try {
            const response = await fetch(" http://localhost:3333/transactions", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(body)
            })

            await response.json()

            setTransactionValue('')
            setTransactionDate('')
            setTransactionCategory('')
            setTransactionDescription('')
            setDisplayModal(false)
            loadTransaction()

        } catch (error) {
            console.log(error)
        }
    }

    async function handleEditTransaction() {
        if (!transactionValue || !transactionDate || !transactionCategory || !transactionDescription) return
        const weekDay = new Date(transactionDate)

        const body = {
            date: transactionDate,
            week_day: formatarDia(weekDay.getDay()),
            value: transactionValue,
            category: transactionCategory,
            description: transactionDescription,
            type: transactionType
        }

        try {
            const response = await fetch(`http://localhost:3333/transactions/${transactionInEditing.id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(body)
            })

            await response.json()

            setTransactionValue('')
            setTransactionDate('')
            setTransactionCategory('')
            setTransactionDescription('')
            setDisplayModal(false)
            setTransactionInEditing(false)
            await loadTransaction()

        } catch (error) {
            console.log(error)
        }
    }


    function selectButton() {
        if (selectBtnCredit === "select") {
            setselectBtnCredit('')
            setselectBtnDebit('select')
            setTransactionType('debit')
        } else {
            setselectBtnCredit('select')
            setselectBtnDebit('')
            setTransactionType('credit')
        }
    }

    function formatarDia(dia) {
        const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']

        return dias[dia + 1]
    }

    return (
        <div className={`backdrop`}>
            <div className="modal-container">
                <div className="title-close">
                    <p className="title-modal">{transactionInEditing ? 'Editar Registro' : 'Adicionar Registro'}</p>
                    <img src={closeBtn} alt="close button" className="close-icon" onClick={() => {
                        setDisplayModal(false)
                        setTransactionInEditing(false)
                    }} />
                </div>
                <div className="btns-modal">
                    <button id="credit-button" className={`btn-credit ${selectBtnCredit}`} onClick={() => selectButton()}>Entrada</button>
                    <button id="debit-button" className={`btn-debit ${selectBtnDebit}`} onClick={() => selectButton()}>Saída</button>
                </div>
                <div className="form-items">
                    <label htmlFor="value">Valor</label>
                    <input type="number" name="value" onChange={(e) => setTransactionValue(e.target.value)} value={transactionValue} />
                    <label htmlFor="category">Categoria</label>
                    <input type="text" name="category" onChange={(e) => setTransactionCategory(e.target.value)} value={transactionCategory} />
                    <label htmlFor="date">Data</label>
                    <input type="date" name="date" onChange={(e) => setTransactionDate(e.target.value)} value={transactionDate} />
                    <label htmlFor="description">Descrição</label>
                    <input type="text" name="description" onChange={(e) => setTransactionDescription(e.target.value)} value={transactionDescription} />
                </div>
                <button onClick={() => transactionInEditing ? handleEditTransaction() : handleRegisterTransaction()} className="btn-insert">Confirmar</button>
            </div>
        </div>
    )
}
