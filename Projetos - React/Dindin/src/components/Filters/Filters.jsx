import React, { useState } from 'react'

export default function Filters({ transactionsData, loadTransaction, setTransactionsData, filtersCategory, setFiltersCategory }) {
    const startFiltersDay = [
        { nome: 'Segunda', selecionado: false },
        { nome: 'Terça', selecionado: false },
        { nome: 'Quarta', selecionado: false },
        { nome: 'Quinta', selecionado: false },
        { nome: 'Sexta', selecionado: false },
        { nome: 'Sábado', selecionado: false },
        { nome: 'Domingo', selecionado: false },
    ]
    const [minValueFilter, setMinValueFilter] = useState('')
    const [maxValueFilter, setMaxValueFilter] = useState('')
    const [filtersDay, setFiltersDay] = useState(startFiltersDay)


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

    return (
        <div className={`container-filters`}>
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
    )
}
