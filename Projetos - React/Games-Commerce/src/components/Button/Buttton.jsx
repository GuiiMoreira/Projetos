import React from 'react';
import './Button.css';

function Button({ onClickHandler, text, price, type }) {
    return (
        <button className={"price-button " + type} onClick={onClickHandler}>
            {text}
            <span className="price">R$ {price.toString().replace('.', ',')}</span>
        </button>
    );
}

export default Button;
