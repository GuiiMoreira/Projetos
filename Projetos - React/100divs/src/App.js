import './App.css';
import BotaoMenuFechar from './components/BotaoMenuFechar/BotaoMenuFechar';
import DivTres from './components/DivTres/DivTres';
import Deserto from './components/Deserto/Deserto';
import Titulo from './components/Titulo/Titulo';
import Ondas from './components/Ondas/Ondas';
import SeguirCursor from './components/SeguirCursor/SeguirCursor';
import LetreiroHello from './components/LetreiroHello/LetreiroHello';

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
    </div>
  );
}

export default App;
