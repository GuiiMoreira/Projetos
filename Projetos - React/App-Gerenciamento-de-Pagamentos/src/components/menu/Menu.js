import { Link, useLocation } from 'react-router-dom';
import iconCobrancaCinza from '../../assets/icon-cobranca-cinza.svg';
import iconCobrancaRosa from '../../assets/icon-cobranca-rosa.svg';
import iconClienteRosa from '../../assets/icon-cliente-rosa.svg'
import iconHomeCinza from '../../assets/icon-home-cinza.svg'
import iconHomeRosa from '../../assets/icon-home-rosa.svg'
import iconClienteCinza from '../../assets/icon-cliente-cinza.svg'
import './menu.css'
import useGlobal from '../../hooks/useGlobal'



function Menu() {
    let location = useLocation();
    const { idCliente } = useGlobal()

    return (
        <nav className="menu">
            <Link to='/Home'>
                <div className={location.pathname === '/Home' ? 'opcao-menu rosa' : 'opcao-menu'}>
                    <img src={location.pathname === '/Home' ? iconHomeRosa : iconHomeCinza} alt="Home" className="icon-menu" />
                    <p >Home</p>
                </div>
            </Link>
            <Link to='/Clientes'>
                <div className={location.pathname === '/Clientes' || location.pathname === `/Clientes/cliente/${idCliente}` ? 'opcao-menu rosa' : 'opcao-menu'}>
                    <img src={location.pathname === '/Clientes' | location.pathname === `/Clientes/cliente/${idCliente}` ? iconClienteRosa : iconClienteCinza} alt="Cliente" className="icon-menu" />
                    <p>Cliente</p>
                </div>

            </Link>
            <Link to='/Cobrancas'>
                <div className={location.pathname === '/Cobrancas' ? 'opcao-menu rosa' : 'opcao-menu'}>
                    <img src={location.pathname === '/Cobrancas' ? iconCobrancaRosa : iconCobrancaCinza} alt="Cobrança" className="icon-menu" />
                    <p>Cobrança</p>
                </div>
            </Link>
        </nav>
    );
}

export default Menu;