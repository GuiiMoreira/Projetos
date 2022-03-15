import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Cadastro from './pages/cadastro/cadastro';
import EscolherSenha from './pages/cadastro/escolherSenha';
import Success from './pages/cadastro/success';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { GlobalProvider } from './context/GlobalContext';
import useGlobal from './hooks/useGlobal';
import { Provider } from 'react-redux'
import store from './reduxContent/store/store';


function RotasProtegidas(props) {
  const { usuarioLogado } = useGlobal();
  return (
    <Route
      render={() => usuarioLogado ? (props.children) : (<Redirect to="/Login" />)}
    />
  )
}

function Routes() {
  return (
    <Router>
      <Provider store={store}>
        <Switch>
          <GlobalProvider>
            <Route path="/Cadastro" exact component={Cadastro} />
            <Route path="/Login" exact component={Login} />
            <Route path="/Escolhasenha" exact component={EscolherSenha} />
            <Route path="/Success" exact component={Success} />
            <RotasProtegidas>
              <Route path={['/', '/Home']} exact component={Home} />
            </ RotasProtegidas>
          </GlobalProvider>
        </Switch>
      </Provider>
    </Router>
  );
}

export default Routes;
