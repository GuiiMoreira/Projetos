import './App.css';
import Header from './components/Header/Header';
import backgroundVideo from './assets/praia-mar.mp4'


function App() {
  return (
    <div className="App">
      <Header />
      <video autoPlay loop muted className='background-home'>
        <source src={backgroundVideo} type='video/mp4'></source>
      </video>
      <div className="background-mask"></div>
      <div className="texto-home">
        <p className='texto-liquida'>Liquidação <span> Progressiva</span></p>
        <p className='texto-promo'>3 peças - 20%</p>
        <p className='texto-promo'>4 peças - 25%</p>
        <p className='texto-promo'>5 peças - 30%</p>
      </div>
      <div className="linha-transicao">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default App;
