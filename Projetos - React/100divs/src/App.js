import './App.css';
import BotaoMenuFechar from './components/BotaoMenuFechar/BotaoMenuFechar';
import DivTres from './components/DivTres/DivTres';
import Deserto from './components/Deserto/Deserto';
import Titulo from './components/Titulo/Titulo';
import Ondas from './components/Ondas/Ondas';
import SeguirCursor from './components/SeguirCursor/SeguirCursor';
import LetreiroHello from './components/LetreiroHello/LetreiroHello';
import DivProx from './components/DivProx/DivProx';
import ProfileCard from './components/ProfileCard/ProfileCard';
import NotificationCard from './components/NotificationCard/NotificationCard';

function App() {
  return (
    <div className="App">
      <Titulo />
      <div className="flex">
        <BotaoMenuFechar />
        <DivTres />
        <Deserto />
        <Ondas />
        <LetreiroHello />
        <SeguirCursor />
      </div>
      <DivProx />
      <div className="flex">
        <ProfileCard />
        <NotificationCard />
      </div>
    </div>
  );
}

export default App;
