import React, { useState } from 'react'
import lapis from '../../assets/lapis.svg'
import lixeira from '../../assets/lixeira.svg'
import setaFiltro from '../../assets/setaFiltro.svg'
import setaFiltroDec from '../../assets/setaFiltroDec.svg'
import './TableTransaction.css'

export default function TableTransaction({
    transactionsData,
    setTransactionsData,
    loadTransaction,
    setDisplayModal,
    setTransactionInEditing
}) {
    const [orderDate, setOrderDate] = useState(false)
    const [orderDay, setOrderDay] = useState(false)
    const [orderValue, setOrderValue] = useState(false)
    const token = localStorage.getItem('token')

    function showModalDelete(transactionID) {
        const newData = [...transactionsData]
        const transactionSelect = newData.find(transaction => transaction.id === transactionID)
        transactionSelect.displayModalDelete = ''
        setTransactionsData(newData)
    }

    function closeModalDelete(transactionID) {
        const newData = [...transactionsData]
        const transactionSelect = newData.find(transaction => transaction.id === transactionID)
        transactionSelect.displayModalDelete = 'hidden'
        setTransactionsData(newData)
    }

    function formatar(dataAPI) {
        let data = new Date(dataAPI);
        const dataFormatada = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' })

        return dataFormatada;
    }

    async function handleDeleteTransaction(transactionId) {
        try {
            await fetch(`http://localhost:3333/transactions/${transactionId}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
            await loadTransaction()
        } catch (error) {
            console.log(error)
        }
    }

    function handleOrderByDate() {
        setOrderDay('')
        setOrderValue('')

        if (!orderDate || orderDate === 'decrescent') {
            setOrderDate('crescent')

            const dataOrderCrescentByDate = transactionsData.sort((transaction, nextTransaction) => new Date(transaction.date) - new Date(nextTransaction.date))

            setTransactionsData(dataOrderCrescentByDate)
        } else {
            setOrderDate('decrescent')

            const dataOrderDecrescentByDate = transactionsData.sort((transaction, nextTransaction) => new Date(nextTransaction.date) - new Date(transaction.date))
            setTransactionsData(dataOrderDecrescentByDate)
        }
    }

    function handleOrderByDay() {
        setOrderDate('')
        setOrderValue('')

        if (!orderDay || orderDay === 'decrescent') {
            setOrderDay('crescent')

            const dataOrderCrescentByDay = transactionsData.sort((transaction, nextTransaction) => new Date(transaction.date).getDay() - new Date(nextTransaction.date).getDay())

            setTransactionsData(dataOrderCrescentByDay)
        } else {
            setOrderDay('decrescent')

            const dataOrderDecrescentByDay = transactionsData.sort((transaction, nextTransaction) => new Date(nextTransaction.date).getDay() - new Date(transaction.date).getDay())
            setTransactionsData(dataOrderDecrescentByDay)
        }
    }

    function handleOrderByValue() {
        setOrderDate('')
        setOrderDay('')

        if (!orderValue || orderValue === 'decrescent') {
            setOrderValue('crescent')

            const dataOrderCrescentByValue = transactionsData.sort((transaction, nextTransaction) => transaction.value - nextTransaction.value)

            setTransactionsData(dataOrderCrescentByValue)
        } else {
            setOrderValue('decrescent')

            const dataOrderDecrescentByValue = transactionsData.sort((transaction, nextTransaction) => nextTransaction.value - transaction.value)
            setTransactionsData(dataOrderDecrescentByValue)
        }
    }

    return (
        <div className='table'>
            <div className='table-head'>
                <p className='column-title' id='date' onClick={() => handleOrderByDate()}>Data <img src={setaFiltro} className={orderDate === 'crescent' ? '' : 'hidden'} alt='' />
                    <img src={setaFiltroDec} className={orderDate === 'decrescent' ? '' : 'hidden'} alt='' /></p>
                <p className='column-title' id='week-day' onClick={() => handleOrderByDay()}>Dia da Semana <img src={setaFiltro} className={orderDay === 'crescent' ? '' : 'hidden'} alt='' />
                    <img src={setaFiltroDec} className={orderDay === 'decrescent' ? '' : 'hidden'} alt='' />
                </p>
                <p className='column-title description'>Descrição</p>
                <p className='column-title'>Categoria</p>
                <p className='column-title' id='value' onClick={() => handleOrderByValue()}>Valor<img src={setaFiltro} className={orderValue === 'crescent' ? '' : 'hidden'} alt='' />
                    <img src={setaFiltroDec} className={orderValue === 'decrescent' ? '' : 'hidden'} alt='' /></p>
                <p className='column-title'></p>
            </div >
            <div className='table-body'>
                {transactionsData.map(transaction =>
                    <div className='table-line' key={transaction.id}>
                        <p className='line-items'>{formatar(transaction.date)}</p>
                        <p className='line-items'>{transaction.week_day}</p>
                        <p className='line-items description'>{transaction.description}</p>
                        <p className='line-items'>{transaction.category}</p>
                        <p className={transaction.type === 'credit' ? 'in line-items' : 'out line-items'}>{`R$ ${Number(transaction.value).toFixed(2)}`}</p>
                        <p className='line-items'>
                            <img src={lapis} alt='edit-icon' className='edit-icon' onClick={() => {
                                setTransactionInEditing(transaction)
                                setDisplayModal(true)
                            }} />
                            <img src={lixeira} alt='delete-icon' className='delete-icon' onClick={() => {
                                showModalDelete(transaction.id)
                            }} />
                        </p>
                        <div className={`${transaction.displayModalDelete} container-confirm-delete`}>
                            <p>Apagar item?</p>
                            <div className='btns-delete-cancel'>
                                <button className={`btn-action-confirm-delete sim`} onClick={() => handleDeleteTransaction(transaction.id)}>Sim</button>
                                <button className={`btn-action-confirm-delete nao`} onClick={() => closeModalDelete(transaction.id)}>Não</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
