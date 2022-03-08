import React from 'react'
import BagMenu from '../BagMenu/BagMenu'
import SearchInput from '../SearchInput/SearchInput'
import './Menu.css'


export default function Menu({ gamesBag, finalPrice, handleGameAdd, handleGameRemove, setGameName, gameName }) {
    return (
        <div className='menu'>
            <p className='fechar'>x</p>
            <BagMenu gamesBag={gamesBag}
                finalPrice={finalPrice}
                handleGameAdd={handleGameAdd}
                handleGameRemove={handleGameRemove} />
            <SearchInput setGameName={setGameName} menu='yes-menu' gameName={gameName} />

        </div>
    )
}
