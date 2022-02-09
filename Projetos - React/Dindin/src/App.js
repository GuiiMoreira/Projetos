import setaFiltroDec from './assets/setaFiltroDec.svg'
import logoDindin from './assets/logoDindin.svg';
import filtro from './assets/filtro.svg'
import setaFiltro from './assets/setaFiltro.svg'
import lapis from './assets/lapis.svg'
import lixeira from './assets/lixeira.svg'
import closeBtn from './assets/closeBtn.svg'
import './App.css';
import { useEffect, useState } from 'react'

const startFiltersDay = [
  { nome: 'Segunda', selecionado: false },
  { nome: 'Terça', selecionado: false },
  { nome: 'Quarta', selecionado: false },
  { nome: 'Quinta', selecionado: false },
  { nome: 'Sexta', selecionado: false },
  { nome: 'Sábado', selecionado: false },
  { nome: 'Domingo', selecionado: false },
]

function App() {
  const [displayFilters, setDisplayFilters] = useState('hidden')
  const [displayModal, setDisplayModal] = useState('hidden')
  const [selectBtnCredit, setselectBtnCredit] = useState('')
  const [selectBtnDebit, setselectBtnDebit] = useState('select')
  const [transactionsData, setTransactionsData] = useState([])
  const [transactionType, setTransactionType] = useState('debit')
  const [transactionValue, setTransactionValue] = useState()
  const [transactionDate, setTransactionDate] = useState('')
  const [transactionDescription, setTransactionDescription] = useState('')
  const [transactionCategory, setTransactionCategory] = useState('')
  const [transactionBalanceIn, setTransactionBalanceIn] = useState('')
  const [transactionBalanceOut, setTransactionBalanceOut] = useState('')
  const [transactionBalanceTotal, setTransactionBalanceTotal] = useState('')
  const [transactionInEditing, setTransactionInEditing] = useState(false)
  const [orderDate, setOrderDate] = useState(false)
  const [orderDay, setOrderDay] = useState(false)
  const [orderValue, setOrderValue] = useState(false)
  const [minValueFilter, setMinValueFilter] = useState('')
  const [maxValueFilter, setMaxValueFilter] = useState('')
  const [filtersDay, setFiltersDay] = useState(startFiltersDay)
  const [filtersCategory, setFiltersCategory] = useState([])

  useEffect(() => {
    loadTransaction()
  }, [])

  useEffect(() => {
    loadResumeTransaction()
  }, [transactionsData])

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

  function loadResumeTransaction() {
    let balanceIn = 0
    let balanceOut = 0

    transactionsData.forEach(transaction => {
      if (transaction.type === 'credit') {
        balanceIn = balanceIn + Number(transaction.value)
      }

      if (transaction.type === 'debit') {
        balanceOut = balanceOut + Number(transaction.value)
      }
    })

    let balanceTotal = balanceIn - balanceOut
    setTransactionBalanceIn(balanceIn)
    setTransactionBalanceOut(balanceOut)
    setTransactionBalanceTotal(balanceTotal)
  }

  async function loadTransaction() {
    try {
      const response = await fetch("http://localhost:3333/transactions", {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      })
      const categories = []
      const data = await response.json()
      const newData = data.map(data => { return { ...data, displayModalDelete: 'hidden' } })

      newData.forEach(data => {
        if (categories.findIndex(category => category.nome === data.category) === -1 && categories.length <= 7) {
          categories.push({
            nome: data.category,
            selecionado: false
          })
        }
      })
      setFiltersCategory(categories)
      setTransactionsData(newData)
    } catch (error) {
      console.log(error)
    }
  }

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
        },
        body: JSON.stringify(body)
      })

      await response.json()

      setTransactionValue('')
      setTransactionDate('')
      setTransactionCategory('')
      setTransactionDescription('')
      setDisplayModal('hidden')

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
        },
        body: JSON.stringify(body)
      })

      await response.json()

      setTransactionValue('')
      setTransactionDate('')
      setTransactionCategory('')
      setTransactionDescription('')
      setDisplayModal('hidden')
      setTransactionInEditing(false)

      await loadTransaction()

    } catch (error) {
      console.log(error)
    }
  }

  async function handleDeleteTransaction(transactionId) {

    try {
      await fetch(`http://localhost:3333/transactions/${transactionId}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
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

  function handleClearFilter() {
    const newFiltersDay = [...startFiltersDay]
    newFiltersDay.forEach(filter => filter.selecionado = false)
    const newFiltersCategory = [...filtersCategory]
    newFiltersCategory.forEach(filter => filter.selecionado = false)

    setMinValueFilter('')
    setMaxValueFilter('')
    setFiltersDay(newFiltersDay)
    setFiltersCategory(newFiltersCategory)
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

  function formatar(dataAPI) {
    let data = new Date(dataAPI);
    const dataFormatada = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' })

    return dataFormatada;
  }

  function formatarDia(dia) {
    const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']

    return dias[dia + 1]
  }

  function showModalDelete(transactionID) {
    const newData = [...transactionsData]
    const transactionSelect = newData.find(transaction => transaction.id === transactionID)
    transactionSelect.displayModalDelete = ""
    setTransactionsData(newData)
  }

  function closeModalDelete(transactionID) {
    const newData = [...transactionsData]
    const transactionSelect = newData.find(transaction => transaction.id === transactionID)
    transactionSelect.displayModalDelete = "hidden"
    setTransactionsData(newData)
  }

  function handleSelectFilterDay(filterName) {
    const newFilters = [...startFiltersDay]
    const filterSelect = newFilters.find(filter => filter.nome === filterName)
    filterSelect.selecionado === true ? filterSelect.selecionado = false : filterSelect.selecionado = true
    setFiltersDay(newFilters)
  }

  function handleSelectFilterCategory(filterName) {
    const newFilters = [...filtersCategory]
    const filterSelect = newFilters.find(filter => filter.nome === filterName)
    filterSelect.selecionado === true ? filterSelect.selecionado = false : filterSelect.selecionado = true

    setFiltersCategory(newFilters)
  }

  function handleApplyFilter() {
    const newData = [...transactionsData]
    let filterActiveDay = []
    let filterActiveCategory = []
    let minValue = 0
    let maxValue = 999999999999999

    filtersDay.forEach(filter => filter.selecionado === true ? filterActiveDay.push(filter.nome) : '')
    filtersCategory.forEach(filter => filter.selecionado === true ? filterActiveCategory.push(filter.nome) : '')

    if (filterActiveCategory.length === 0 && filterActiveDay.length === 0 && minValueFilter === '' && maxValueFilter === '') {
      loadTransaction()
    }

    if (filterActiveCategory.length === 0) { newData.forEach(filter => filterActiveCategory.push(filter.category)) }
    if (filterActiveDay.length === 0) { newData.forEach(filter => filterActiveDay.push(filter.week_day)) }
    if (minValueFilter !== '') { minValue = minValueFilter }
    if (maxValueFilter !== '') { maxValue = maxValueFilter }

    const transactionFiltered = newData.filter(a => filterActiveDay.includes(a.week_day) && filterActiveCategory.includes(a.category) && Number(a.value) > minValue && Number(a.value) < maxValue)

    setTransactionsData(transactionFiltered)
  }

  return (
    <div className="App">
      <div className="container-header">
        <img src={logoDindin} alt="logo Dindin" />
        <p>Dindin</p>
      </div>

      <div className="container-body">
        <button onClick={() => displayFilters === 'hidden' ? setDisplayFilters('') : setDisplayFilters('hidden')} className="open-filters-button"><img src={filtro} alt="icone de filtro" /><p>Filtrar</p></button>

        <div className={`${displayFilters} container-filters`}>
          <div>
            <p className="title-filters">Dia da semana</p>
            <div className="week-filters">
              {filtersDay.map(filter =>
                <div className={filter.selecionado ? "container-chip" : "container-chip-off"} onClick={() => handleSelectFilterDay(filter.nome)}><p>{filter.nome}</p><p className="icon-filter">{filter.selecionado ? "x" : "+"}</p></div>
              )}
            </div>
          </div>
          <div>
            <p className="title-filters">Categoria</p>
            <div className="week-filters">
              {filtersCategory.map(filter =>
                <div className={filter.selecionado ? "container-chip" : "container-chip-off"} onClick={() => handleSelectFilterCategory(filter.nome)}><p>{filter.nome}</p><p className="icon-filter">{filter.selecionado ? "x" : "+"}</p></div>
              )}
            </div>
          </div>
          <div>
            <p className="title-filters">Valor</p>
            <div className="value-filters">
              <label htmlFor="min-value" >Min</label>
              <input type="number" id="min-value" onChange={(e) => setMinValueFilter(e.target.value)} value={minValueFilter} />
              <label htmlFor="max-value">Max</label>
              <input type="number" id="max-value" onChange={(e) => setMaxValueFilter(e.target.value)} value={maxValueFilter} />
            </div>
          </div>
          <div className="btns-geral-filter">
            <button className="btn-clear-filters" onClick={() => handleClearFilter()}>Limpar Filtros</button>
            <button className="btn-apply-filters" onClick={() => {
              handleApplyFilter()
            }}>Aplicar Filtros</button>
          </div>
        </div>

        <div className="resume-button">
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
            setDisplayModal("")
            setselectBtnCredit("")
            setselectBtnDebit("select")
          }}>Adicionar Registro</button>
        </div>

        <div className="table">
          <div className="table-head">
            <p className="column-title" id="date" onClick={() => handleOrderByDate()}>Data <img src={setaFiltro} className={orderDate === 'crescent' ? '' : 'hidden'} alt="" />
              <img src={setaFiltroDec} className={orderDate === 'decrescent' ? '' : 'hidden'} alt="" /></p>
            <p className="column-title" id="week-day" onClick={() => handleOrderByDay()}>Dia da Semana <img src={setaFiltro} className={orderDay === 'crescent' ? '' : 'hidden'} alt="" />
              <img src={setaFiltroDec} className={orderDay === 'decrescent' ? '' : 'hidden'} alt="" />
            </p>
            <p className="column-title description">Descrição</p>
            <p className="column-title">Categoria</p>
            <p className="column-title" id="value" onClick={() => handleOrderByValue()}>Valor<img src={setaFiltro} className={orderValue === 'crescent' ? '' : 'hidden'} alt="" />
              <img src={setaFiltroDec} className={orderValue === 'decrescent' ? '' : 'hidden'} alt="" /></p>
            <p className="column-title"></p>
          </div >
          <div className="table-body">
            {transactionsData.map(transaction =>
              <div className="table-line" key={transaction.id}>
                <p className="line-items">{formatar(transaction.date)}</p>
                <p className="line-items">{transaction.week_day}</p>
                <p className="line-items description">{transaction.description}</p>
                <p className="line-items">{transaction.category}</p>
                <p className={transaction.type === 'credit' ? 'in line-items' : 'out line-items'}>{`R$ ${Number(transaction.value).toFixed(2)}`}</p>
                <p className="line-items">
                  <img src={lapis} alt="edit-icon" className="edit-icon" onClick={() => {
                    setTransactionInEditing(transaction)
                    setDisplayModal('')
                  }} />
                  <img src={lixeira} alt="delete-icon" className="delete-icon" onClick={() => {
                    showModalDelete(transaction.id)
                  }} />
                </p>
                <div className={`${transaction.displayModalDelete} container-confirm-delete`}>
                  <p>Apagar item?</p>
                  <div className="btns-delete-cancel">
                    <button className={`btn-action-confirm-delete sim`} onClick={() => handleDeleteTransaction(transaction.id)}>Sim</button>
                    <button className={`btn-action-confirm-delete nao`} onClick={() => closeModalDelete(transaction.id)}>Não</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`backdrop ${displayModal}`}>
        <div className="modal-container">
          <div className="title-close">
            <p className="title-modal">{transactionInEditing ? 'Editar Registro' : 'Adicionar Registro'}</p>
            <img src={closeBtn} alt="close button" className="close-icon" onClick={() => {
              setDisplayModal("hidden")
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
    </div>
  );
}

export default App;
