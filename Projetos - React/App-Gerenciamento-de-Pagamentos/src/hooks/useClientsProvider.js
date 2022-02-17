import { useEffect, useState } from 'react';
import useRequests from './useRequests';
import useGlobal from './useGlobal';

function useClientsProvider() {
    const requisicao = useRequests();
    const [clientes, setClientes] = useState([]);
    const { token } = useGlobal();
    const [ cobrancas, setCobrancas ] = useState([]);

    useEffect(() => {
        if (token) {
            carregarClientes();
        } // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (token) {
          carregarCobrancas();
        } // eslint-disable-next-line
      }, []);
    

    async function carregarClientes() {
        const result = await requisicao.get('clientes');
        setClientes(result);
    }

    async function carregarCobrancas() {
        const result = await requisicao.get('cobrancas');
        setCobrancas(result);
      };

    return {
        clientes,
        carregarClientes,
        cobrancas,
        carregarCobrancas
    }
}

export default useClientsProvider;