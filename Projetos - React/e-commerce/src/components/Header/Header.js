import React from 'react';
import IconPesquisarBranco from '../../assets/icon-search-white.png'
import IconUsuarioBranco from '../../assets/icon-user-white.png'
import IconSacolaBranco from '../../assets/icon-bag-white.png'
import IconFavoritosBranco from '../../assets/icon-favorite-white.png'



import './Header.css'

export default function Header() {
    return (
        <header>
            <div className="aviso-header">
                <p>Aproveite Frete grátis em compras acima de R$ 200,00.</p>
            </div>
            <div className='menu-header'>
                <p className='logo-header'>Gui'Store</p>
                <nav className='menu-filtros-header'>
                    <p>Masculino</p>
                    <p>Feminino</p>
                    <p>Infatil</p>
                    <p>Calçados</p>
                    <p>Promoção</p>
                </nav>
                <div className='menu-user-header'>
                    <img src={IconPesquisarBranco} alt="Pesquisar" />
                    <img src={IconFavoritosBranco} alt="Pesquisar" />
                    <img src={IconUsuarioBranco} alt="Usuario" />
                    <img src={IconSacolaBranco} alt="Pesquisar" />
                </div>
            </div>

        </header>
    );
}
