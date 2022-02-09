import btnAddPublicacao from '../../assets/btn-publicacao.png'

import './style.css';

function Footer() {

    return (
        <footer className="footer">
            {/* <img src={favorito} alt="" className="btn-add-publicacao" /> */}
            <img src={btnAddPublicacao} alt="" className="btn-add-publicacao" />
            {/* <img src={carrinho} alt="" className="btn-add-publicacao" /> */}
        </footer>
    );
}

export default Footer;