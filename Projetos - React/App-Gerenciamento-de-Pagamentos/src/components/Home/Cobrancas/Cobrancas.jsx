import './cobrancas.css';


export default function CobrancasHome(props) {
    const lista = [
        {
            nome: 'João Vicente Pereira',
            id_cobranca:'13',
            valor: '10000'
        },
        {
            nome: 'Adriana Alvares',
            id_cobranca:'16',
            valor: '20000'
        },
        {
            nome: 'Gabriela Souza Lopes',
            id_cobranca:'23',
            valor: '5000'
        },
        {
            nome: 'Carlos Miranda Lopes',
            id_cobranca:'33',
            valor: '15000'
        },
    ]

    return(
        <div className="card-cobrancas">
            <div className="titulo-tabela">
                <span>{props.titulo}</span>
                <span className='cobrancas-home-direito' style={{width: '50px',
                height: '20px', backgroundColor: props.corBack, color: props.fontColor}}>
                    {lista.length < 10 && '0'}{lista.length}
                </span>
            </div>
            <div className="cabecalho-tabela">
                <p>Cliente</p>
                <p>ID da Cob.</p>
                <p>Valor</p>
            </div>
            {lista && lista.map((item) => {
                return (
                    <div className="linha-tabela">
                        <p className='nome-cliente'>{item.nome}</p>
                        <p>{item.id_cobranca}</p>
                        <p className='valor-cliente'>R$ {item.valor},00</p>
                    </div>
                )
            })}
            <div className="final-tabela">
                <p>Ver Todos</p>
            </div>
        </div>
    )
}