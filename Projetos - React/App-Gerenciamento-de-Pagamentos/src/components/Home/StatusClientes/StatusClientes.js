import { Link } from 'react-router-dom';
import useClients from '../../../hooks/useClients';
import './statusClientes.css';

export default function ClientesHome(props) {

  const { setClientes } = useClients()

  return (
    <div className="card-clientes-home">
      <div className="topo-tabela-clientes">
        <span className="clientes-home-esquerdo">
          <img src={props.icone} alt="" /> <p>{props.titulo}</p>
        </span>
        <span
          className="clientes-home-direito"
          style={{
            width: '50px',
            height: '20px',
            backgroundColor: props.corBack,
            color: props.fontColor
          }}
        >
          {props.tamanho}
        </span>
      </div>
      <div className="cabecalho-tabela-clientes-home">
        <p>Cliente</p>
        <p>ID Cliente</p>
        <p>CPF</p>
      </div>
      {props.clientesHome && props.clientesHome.slice(0, 4).map((item) => {
          return (
            <div className="linha-tabela-clientes-home" key={item.id}>
              <p className="nome-cliente">{item.nome}</p>
              <p>{item.id}</p>
              <p className="valor-cliente">{item.cpf}</p>
            </div>
          );
        })}
      <div className="final-tabela-clientes-home">
        <p onClick={()=> {
          setClientes(()=> props.clientesHome)
        }}><Link to='/Clientes'>Ver Todos</Link></p>
      </div>
    </div>
  );
}
