import Header from '../Header/Header';
import Menu from '../menu/Menu';
import './Layout.css'

export default function Layout(props) {
    return (
        <div>
            <Header titulo={props.titulo} classname={props.classe} subclasse={props.subclasse} />
            <Menu />
            <div className="conteudoDaPagina">
                {props.children}
            </div>
        </div>
    )
}