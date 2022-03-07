import React from 'react';
import Button from '../Button/Buttton';
import './Card.css';

function Card({ title, price, thumbnail, handleBuyGame }) {

    const background = "linear-gradient(rgba(0, 0, 0, 0.3) 100%, rgba(0, 0, 0, 0.3)100%), url('" + thumbnail + "') no-repeat center / cover";

    return (
        <div className="game">
            <div className="game-card" style={{ background }}>

            </div>
            <div className="game-info">
                <h3 title={title}>{title}</h3>
            </div>
            <Button text="Comprar" type="game" price={price} onClickHandler={() => handleBuyGame({ title, thumbnail, price })} />
        </div>
    );
}

export default Card;