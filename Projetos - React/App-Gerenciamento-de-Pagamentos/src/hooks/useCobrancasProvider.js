import { useEffect, useState } from "react";
import useRequests from "./useRequests";
import useGlobal from "./useGlobal";

function useCobrancasProvider() {
  const requisicao = useRequests();
  const [ cobrancass, setCobrancas ] = useState(['ola']);
  const { token } = useGlobal();

  useEffect(() => {
    if (token) {
      carregarCobrancas();
    }
  }, []);

  async function carregarCobrancas() {
    const result = await requisicao.get('cobrancas');
    setCobrancas(result);
  };

  return {
    cobrancass,
    carregarCobrancas
  };
}

export default useCobrancasProvider;