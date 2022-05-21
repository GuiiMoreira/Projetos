import './App.css';
import BotaoMenuFechar from './components/BotaoMenuFechar/BotaoMenuFechar';
import Japao from './components/Japao/Japao';
import Deserto from './components/Deserto/Deserto';
import Titulo from './components/Titulo/Titulo';
import Ondas from './components/Ondas/Ondas';
import SeguirCursor from './components/SeguirCursor/SeguirCursor';
import LetreiroHello from './components/LetreiroHello/LetreiroHello';
import DivProx from './components/DivProx/DivProx';
import ProfileCard from './components/ProfileCard/ProfileCard';
import NotificationCard from './components/NotificationCard/NotificationCard';
import Calculadora from './components/Calculadora/Calculadora';
import CelulaEt from './components/CelulaEt/CelulaEt';
import Pokedex from './components/Pokedex/Pokedex'
import JogoDaVelha from './components/JogoDaVelha/JogoDaVelha';

function App() {
  return (
    <div className="App">
      <Titulo />
      <div className="flex">
        <BotaoMenuFechar />
        <Japao />
        <Deserto />
        <Ondas />
        <LetreiroHello />
        <SeguirCursor />
        <ProfileCard />
        <Calculadora />
        <NotificationCard />
        <CelulaEt />
        <Pokedex />
        <JogoDaVelha />
      </div>
      <DivProx />
    </div>
  );
}

export default App;
