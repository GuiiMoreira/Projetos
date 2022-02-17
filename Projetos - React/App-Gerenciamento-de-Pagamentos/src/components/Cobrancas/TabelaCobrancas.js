import './TabelaCobrancas.css';
import iconOrdenar from '../../assets/icon-ordenar.svg';
import useClients from '../../hooks/useClients';
import iconEditar from '../../assets/cobrancas/icon-editar.svg';
import iconExcluir from '../../assets/cobrancas/icon-excluir-rosa.svg';


function TabelaCobrancas() {
  const { cobrancas } = useClients();

  function formatar(dataAPI) {
    let data = new Date(dataAPI);
    const dataFormatada = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' })

    return dataFormatada;
  }

  return (
    <section className='tabela-cobrancas'>
      <div className="cabecalho-tabela-cobrancas">
        <p><img src={iconOrdenar} alt="" /> Cliente</p>
        <p><img src={iconOrdenar} alt="" /> ID Cob.</p>
        <p>Valor</p>
        <p>Data de venc.</p>
        <p>Status</p>
        <p>Descrição</p>
        <p> </p>
      </div>

      {cobrancas.map((cobranca) => {
        return (
          <div className="linhas-tabela-cobrancas" key={cobranca.id}>
            <p>{cobranca.cliente_nome}</p>
            <p>{cobranca.id}</p>
            <p>{cobranca.valor}</p>
            <p>{formatar(cobranca.vencimento)}</p>
            <p>{cobranca.cobranca_status}</p>
            <p>{cobranca.descricao}</p>
            <p><button><img src={iconEditar} alt="" /></button> <button><img src={iconExcluir} alt="" /></button></p>
          </div>
        )
      })}
    </section>
  )
}

export default TabelaCobrancas;