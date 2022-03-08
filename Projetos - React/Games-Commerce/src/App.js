import './App.css';
import { useEffect, useState, useMemo } from 'react'
import Header from './components/Header/Header';
import Bag from './components/Bag/Bag';
import Card from './components/Card/Card'
import Menu from './components/Menu/Menu'


function App() {
  const [gamesBag, setGamesBag] = useState([]);
  const [games, setGames] = useState([])
  const [menu, setMenu] = useState(false)
  const [basketFinalPrice, setBasketFinalPrice] = useState(0);
  const [gameName, setGameName] = useState('');
  const [page, setPage] = useState(0);

  useEffect(() => {
    loadGames()
  }, [])

  async function loadGames() {
    try {
      const response = await fetch("https://free-to-play-games-database.p.rapidapi.com/api/games", {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
          'x-rapidapi-key': '7cf34cf138msh78a7e144a11bdb5p186829jsn76fdd2b49c44'
        },
      })

      const data = await response.json()
      data.forEach(jogo => { jogo.price = Number((Math.random() * 100).toFixed(2)) });

      setGames(data)
    } catch (error) {
      console.log(error)
    }
  }

  const resultadoPesquisa = useMemo(() => {
    return games && games.filter(
      game => game.title.toLowerCase().includes(gameName.toLowerCase())
    )
  }, [gameName]);


  function handleBuyGame(game) {
    const priceValue = game.price
    const newBag = [...gamesBag];
    const gameInBag = newBag.find(
      ({ title }) => title === game.title,
    );

    if (gameInBag) {
      const priceGameInBag = gameInBag.price
      gameInBag.count++;
      setGamesBag(newBag);
      const newPrice = priceGameInBag + Number(basketFinalPrice)

      setBasketFinalPrice(`${newPrice}`);
      return;
    }

    newBag.push({
      title: game.title,
      backgroundImg: game.thumbnail,
      price: game.price,
      count: 1,
    });
    setGamesBag(newBag);

    const newPrice = priceValue + Number(basketFinalPrice)
    setBasketFinalPrice(`${newPrice}`);
  }

  function handleGameAdd(gameTitle) {
    const newBag = [...gamesBag];
    const gameInBag = newBag.find(
      ({ title }) => title === gameTitle,
    );

    gameInBag.count++;
    setGamesBag(newBag);
    const newPrice = gameInBag.price + Number(basketFinalPrice)
    setBasketFinalPrice(`${newPrice}`);
  }

  function handleGameRemove(gameTitle) {
    const newBag = [...gamesBag];
    const gameInBag = newBag.find(
      ({ title }) => title === gameTitle,
    );
    const newPrice =
      basketFinalPrice - gameInBag.price
    setBasketFinalPrice(`${newPrice}`);

    gameInBag.count--;
    if (gameInBag.count === 0) {
      setGamesBag(
        newBag.filter(({ title }) => title !== gameTitle),
      );
      return;
    }

    setGamesBag(newBag);
  }

  return (
    <div className="App">
      <Header setGameName={setGameName} setMenu={setMenu} menu={menu} gameName={gameName} />

      <Bag
        gamesBag={gamesBag}
        finalPrice={basketFinalPrice}
        handleGameAdd={handleGameAdd}
        handleGameRemove={handleGameRemove} />

      <div className="cards">
        {gameName ? resultadoPesquisa.slice(0, 20).map((game) => (
          <Card {...game} handleBuyGame={handleBuyGame} key={game.id} />
        )) :
          games.slice(page * 20, page * 20 + 20).map((game) => (
            <Card {...game} handleBuyGame={handleBuyGame} key={game.id} />
          ))}
      </div>

      {!gameName && <div className="nav-pages">
        {page > 0 && <p className='next-page' onClick={() => {
          setPage(page - 1)
          window.scroll(0, 0)
        }}>
          {'< Página anterior'}
        </p>}
        <p className='next-page'>{page + 1}</p>
        {page < (games.length / 20) - 1 && <p className='next-page'
          onClick={() => {
            setPage(page + 1)
            window.scroll(0, 0)
          }}>
          {'Próxima página >'}
        </p>}
      </div>}

      {menu && <Menu gamesBag={gamesBag}
        finalPrice={basketFinalPrice}
        handleGameAdd={handleGameAdd}
        handleGameRemove={handleGameRemove}
        setGameName={setGameName}
        gameName={gameName} />}
    </div>
  );
}

export default App;
