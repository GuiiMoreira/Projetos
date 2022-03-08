import React from 'react';
import MinusIcon from '../../assets/minus-icon.svg';
import PersonIllustration from '../../assets/person-illustration.svg';
import PlusIcon from '../../assets/plus-icon.svg';
import TrashIcon from '../../assets/trash-icon.svg';
import Button from '../Button/Buttton';
import './Bag.css';

export default function Bag({ gamesBag, finalPrice, handleGameAdd, handleGameRemove }) {
    const basketNotEmpty = gamesBag.length > 0;

    return (
        <div className={'bag'}>
            <h2 className="bag-title">Sacola</h2>
            <div className="bag-container">
                {
                    basketNotEmpty ?
                        (
                            gamesBag.map(({ title, backgroundImg, price, count }) => (
                                <div className="bag-game">
                                    <img src={backgroundImg} alt={title} />
                                    <div className="bag-game-info">
                                        <span className="bag-game-title">{title}</span>
                                        <span className="bag-game-price">R$ {price}</span>
                                    </div>
                                    <div className="bag-game-actions">
                                        <img src={PlusIcon} alt='adicionar' onClick={() => handleGameAdd(title)} />
                                        <span>{count}</span>
                                        {count > 1 ? <img src={MinusIcon} alt='diminuir' onClick={() => handleGameRemove(title)} /> : <img src={TrashIcon} alt='excluir' onClick={() => handleGameRemove(title)} />}
                                    </div>
                                </div>
                            ))
                        )
                        : (
                            <>
                                <h2>Sua sacola está vazia</h2>
                                <h3>Adicione jogos</h3>
                                <img src={PersonIllustration} alt='sacola vazia' className="bag-illustration" />
                            </>
                        )
                }
                {basketNotEmpty ? <Button text="Comprar" type="basket" price={finalPrice} /> : ''}
            </div>
        </div>
    );
}
