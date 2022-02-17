import { createContext } from 'react';
import  useClientsProvider  from '../hooks/useClientsProvider';

const CobrancasContext = createContext();

export function CobrancasProvider(props) {
    const cobrancasProvider = useClientsProvider();

    return (
        <CobrancasContext.Provider value={cobrancasProvider}>
            {props.children}
        </CobrancasContext.Provider>
    )
}

export default CobrancasContext;