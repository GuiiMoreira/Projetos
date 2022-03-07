import React from 'react';
import './Button.css';

function Button({ onClickHandler, text, price, type }) {
    const precoFormatado = price.toString().replace('.', ',')
    const index = precoFormatado.indexOf(',')
    const finalPrice = precoFormatado.slice(0, index + 3)

    return (
        <button className={"price-button " + type} onClick={onClickHandler}>
            {text}
            <span className="price">R$ {finalPrice}</span>
        </button>
    );
}

export default Button;
