import './totais.css'

export default function Totais(props) {
    return(
        <div className="card" style={{
            backgroundColor: props.cor
        }}>
            <span className="icone">
                <img src={props.icone} alt="" />
            </span>
            <span className="valores">
                <p className="titulo">
                    {props.titulo}
                </p>
                <p className="valor">
                    R$ {props.valor}
                </p>
            </span>
        </div>
    )
}