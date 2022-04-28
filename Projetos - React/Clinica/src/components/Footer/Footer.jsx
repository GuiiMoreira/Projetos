import React from 'react'
import "./Footer.css"
import iconInstagram from "../../assets/footer/instagram-icon.png"
import iconFacebook from "../../assets/footer/facebook-icon.png"


export default function Footer() {
    return (
        <div className='footer'>
            <div>
                <p>Siga nossas redes sociais:</p>
                <div className='flex'>
                    <img className='icon mgt-10' src={iconInstagram} alt="" />
                    <img className='icon' src={iconFacebook} alt="" />
                </div>
            </div>
            <div>
                <p>Fale conosco</p>
                <p>(00) 0000-0000</p>
            </div>
        </div>
    )
}
