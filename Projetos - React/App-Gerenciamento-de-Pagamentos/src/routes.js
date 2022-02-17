import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { ClientsProvider } from './context/ClientsContext';
import { GlobalProvider } from './context/GlobalContext';
import useGlobal from './hooks/useGlobal';
import Cadastro from './pages/cadastro/cadastro';
import EscolherSenha from './pages/cadastro/escolherSenha';
import Success from './pages/cadastro/success';
import ClienteDetalhado from './pages/clienteDetalhado/clienteDetalhado';
import Clients from './pages/clients/Clients';
import Home from './pages/home/Home';
import Login from './pages/login/login';
import Cobrancas from './pages/cobrancas/cobranca';

function Routes() {

  function RotasProtegidas(props) {
    const { token } = useGlobal();
    return (
      <Route
        render={() => token ? (props.children) : (<Redirect to="/Login" />)}
      />
    )
  }

  return (
    <Router>
      <Switch>
        <GlobalProvider>
          <Route path="/Cadastro" exact component={Cadastro} />
          <Route path="/Login" exact component={Login} />
          <Route path="/Escolhasenha" exact component={EscolherSenha} />
          <Route path="/Success" exact component={Success} />
          <RotasProtegidas>
            <ClientsProvider>
              <Route path={['/', '/Home']} exact component={Home} />
              <Route path="/Clientes" exact component={Clients} />
              <Route path="/Clientes/cliente/:id" exact component={ClienteDetalhado} />
              <Route path="/Cobrancas" exact component={Cobrancas} />
            </ClientsProvider>
          </RotasProtegidas>
        </GlobalProvider>
      </Switch>
    </Router>
  );
}

export default Routes;
