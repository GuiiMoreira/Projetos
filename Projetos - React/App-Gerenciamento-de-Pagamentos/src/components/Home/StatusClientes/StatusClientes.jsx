import './statusClientes.css';

export default function ClientesHome(props) {
    const lista = [
        {
            nome: 'Cameron Willianson',
            vencimento: '21/10/2021',
            valor: '1000',
        },
        {
            nome: 'Savannah Nuyen',
            vencimento: '13/11/2021',
            valor: '5000',
        },
        {
            nome: 'Darlene Robertson',
            vencimento: '11/12/2021',
            valor: '500',
        },
        {
            nome: 'Marvin McKinney',
            vencimento: '21/10/2021',
            valor: '10000',
        },
    ]
    return (
        <div className="card-clientes-home">
            <div className="topo-tabela-clientes">
                <span className='clientes-home-esquerdo'><img src={props.icone} alt="" /> <p>{props.titulo}</p></span>
                <span className='clientes-home-direito' style={{width: '50px',
                height: '20px', backgroundColor: props.corBack, color: props.fontColor}}>
                    {lista.length < 10 && '0'}{lista.length}
                </span>
            </div>
            <div className="cabecalho-tabela-clientes-home">
                <p>Cliente</p>
                <p>Data de Venc.</p>
                <p>Valor</p>
            </div>
            {lista && lista.map((item) => {
                return (
                    <div className="linha-tabela-clientes-home">
                        <p className='nome-cliente'>{item.nome}</p>
                        <p>{item.vencimento}</p>
                        <p className='valor-cliente'>R$ {item.valor},00</p>
                    </div>
                )
            })}
            <div className="final-tabela-clientes-home">
                <p>Ver Todos</p>
            </div>
        </div>
    )
}