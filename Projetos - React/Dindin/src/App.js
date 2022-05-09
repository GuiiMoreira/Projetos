import filtro from './assets/filtro.svg'
import './App.css';
import { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import Filters from './components/Filters/Filters'
import Resume from './components/Resume/Resume'
import TableTansaction from './components/TableTransactions/TableTansaction'
import ModalTransactions from './components/ModalTransactions/ModalTransactions';

function App() {
  const [openFilters, setOpenFilters] = useState(false)
  const [displayModal, setDisplayModal] = useState(false)
  const [selectBtnCredit, setselectBtnCredit] = useState('')
  const [selectBtnDebit, setselectBtnDebit] = useState('select')
  const [transactionsData, setTransactionsData] = useState([])
  const [transactionBalanceIn, setTransactionBalanceIn] = useState('')
  const [transactionBalanceOut, setTransactionBalanceOut] = useState('')
  const [transactionBalanceTotal, setTransactionBalanceTotal] = useState('')
  const [transactionInEditing, setTransactionInEditing] = useState(false)
  const [filtersCategory, setFiltersCategory] = useState([])


  useEffect(() => {
    loadTransaction()
  }, [])

  useEffect(() => {
    loadResumeTransaction()
  }, [transactionsData])



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



  return (
    <div className="App">
      <Header />

      <div className="container-body">
        <button onClick={() => setOpenFilters(!openFilters)} className="open-filters-button">
          <img src={filtro} alt="icone de filtro" />
          <p>Filtrar</p>
        </button>

        {openFilters && <Filters
          loadTransaction={loadTransaction}
          setTransactionsData={setTransactionsData}
          transactionsData={transactionsData}
          filtersCategory={filtersCategory}
          setFiltersCategory={setFiltersCategory}
        />}

        <Resume
          transactionBalanceIn={transactionBalanceIn}
          transactionBalanceOut={transactionBalanceOut}
          transactionBalanceTotal={transactionBalanceTotal}
          setDisplayModal={setDisplayModal}
          setselectBtnCredit={setselectBtnCredit}
          setselectBtnDebit={setselectBtnDebit}
        />

        <TableTansaction
          transactionsData={transactionsData}
          setTransactionsData={setTransactionsData}
          loadTransaction={loadTransaction}
          setTransactionInEditing={setTransactionInEditing}
          setDisplayModal={setDisplayModal}
        />
      </div>

      {displayModal && <ModalTransactions
        transactionInEditing={transactionInEditing}
        loadTransaction={loadTransaction}
        setDisplayModal={setDisplayModal}
        setselectBtnCredit={setselectBtnCredit}
        setselectBtnDebit={setselectBtnDebit}
        selectBtnCredit={selectBtnCredit}
        selectBtnDebit={selectBtnDebit}
        setTransactionInEditing={setTransactionInEditing}
      />}


    </div>
  );
}

export default App;
