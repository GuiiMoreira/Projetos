import './App.css';
import { useEffect, useState } from 'react'
import Header from './components/Header/Header';
import Bag from './components/Bag/Bag';
import Card from './components/Card/Card'

function App() {
  const [gamesBag, setGamesBag] = useState([]);
  const [games, setGames] = useState([])
  const [basketFinalPrice, setBasketFinalPrice] = useState(0);
  // const [gamesShooter, setGamesShooter] = useState([])
  // const [gamesMMO, setGamesMMO] = useState([])
  // const [gamesRacing, setGamesRacing] = useState([])

  useEffect(() => {
    loadGames()
    // loadGamesShooter()
    // loadGamesMmorpg()
    // loadGamesRacing()
  }, [])


  function handleBuyGame(game) {
    const priceValue = Number(game.price)
    const newBag = [...gamesBag];
    const gameInBag = newBag.find(
      ({ title }) => title === game.title,
    );

    if (gameInBag) {
      const priceGameInBag = Number(gameInBag.price)
      gameInBag.count++;
      setGamesBag(newBag);
      const newPrice = priceGameInBag + basketFinalPrice

      setBasketFinalPrice(newPrice);
      return;
    }

    newBag.push({
      title: game.title,
      backgroundImg: game.thumbnail,
      price: game.price,
      count: 1,
    });
    setGamesBag(newBag);

    const newPrice = priceValue + basketFinalPrice
    setBasketFinalPrice(newPrice);
  }

  function handleGameAdd(gameTitle) {
    const newBag = [...gamesBag];
    const gameInBag = newBag.find(
      ({ title }) => title === gameTitle,
    );

    gameInBag.count++;
    setGamesBag(newBag);
    const newPrice = Number(gameInBag.price) + basketFinalPrice
    setBasketFinalPrice(newPrice);
  }

  function handleGameRemove(gameTitle) {
    const newBag = [...gamesBag];
    const gameInBag = newBag.find(
      ({ title }) => title === gameTitle,
    );
    const newPrice =
      basketFinalPrice - Number(gameInBag.price)
    setBasketFinalPrice(newPrice);

    gameInBag.count--;
    if (gameInBag.count === 0) {
      setGamesBag(
        newBag.filter(({ title }) => title !== gameTitle),
      );
      return;
    }

    setGamesBag(newBag);
  }

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
      data.forEach(jogo => { jogo.price = (Math.random() * 100).toFixed(2) });

      setGames(data)
    } catch (error) {
      console.log(error)
    }
  }

  // async function loadGamesShooter() {
  //   try {
  //     const response = await fetch("https://free-to-play-games-database.p.rapidapi.com/api/games?category=shooter", {
  //       method: 'GET',
  //       headers: {
  //         'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
  //         'x-rapidapi-key': '7cf34cf138msh78a7e144a11bdb5p186829jsn76fdd2b49c44'
  //       },
  //     })

  //     const data = await response.json()
  //     const gamesShooterInit = []

  //     for (let i = 0; i < 5; i++) {
  //       gamesShooterInit.push(data[i])
  //     }

  //     setGamesShooter(gamesShooterInit)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // async function loadGamesMmorpg() {
  //   try {
  //     const response = await fetch("https://free-to-play-games-database.p.rapidapi.com/api/games?category=mmorpg", {
  //       method: 'GET',
  //       headers: {
  //         'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
  //         'x-rapidapi-key': '7cf34cf138msh78a7e144a11bdb5p186829jsn76fdd2b49c44'
  //       },
  //     })

  //     const data = await response.json()
  //     const gamesmmoInit = []

  //     for (let i = 0; i < 5; i++) {
  //       gamesmmoInit.push(data[i])
  //     }

  //     setGamesMMO(gamesmmoInit)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // async function loadGamesRacing() {
  //   try {
  //     const response = await fetch("https://free-to-play-games-database.p.rapidapi.com/api/games?category=racing", {
  //       method: 'GET',
  //       headers: {
  //         'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
  //         'x-rapidapi-key': '7cf34cf138msh78a7e144a11bdb5p186829jsn76fdd2b49c44'
  //       },
  //     })

  //     const data = await response.json()
  //     const gamesRacingInit = []

  //     for (let i = 0; i < 5; i++) {
  //       gamesRacingInit.push(data[i])
  //     }

  //     setGamesRacing(gamesRacingInit)
  //     console.log(gamesRacingInit)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <div className="App">
      <Header />
      <Bag
        gamesBag={gamesBag}
        finalPrice={basketFinalPrice}
        handleGameAdd={handleGameAdd}
        handleGameRemove={handleGameRemove} />
      <div className="cards">
        {games && games.slice(0, 20).map((game) => (
          <Card {...game} handleBuyGame={handleBuyGame} key={game.id} />
        ))}
      </div>
    </div>
  );
}

export default App;
