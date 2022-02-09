import './App.css';
import { useEffect, useState } from 'react'

function App() {
  const [games, setGames] = useState([])
  const [gamesShooter, setGamesShooter] = useState([])
  const [gamesMMO, setGamesMMO] = useState([])
  const [gamesRacing, setGamesRacing] = useState([])

  useEffect(() => {
    loadGames()
    loadGamesShooter()
    loadGamesMmorpg()
    loadGamesRacing()
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

      // console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function loadGamesShooter() {
    try {
      const response = await fetch("https://free-to-play-games-database.p.rapidapi.com/api/games?category=shooter", {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
          'x-rapidapi-key': '7cf34cf138msh78a7e144a11bdb5p186829jsn76fdd2b49c44'
        },
      })

      const data = await response.json()
      const gamesShooterInit = []

      for (let i = 0; i < 5; i++) {
        gamesShooterInit.push(data[i])
      }

      setGamesShooter(gamesShooterInit)
    } catch (error) {
      console.log(error)
    }
  }

  async function loadGamesMmorpg() {
    try {
      const response = await fetch("https://free-to-play-games-database.p.rapidapi.com/api/games?category=mmorpg", {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
          'x-rapidapi-key': '7cf34cf138msh78a7e144a11bdb5p186829jsn76fdd2b49c44'
        },
      })

      const data = await response.json()
      const gamesmmoInit = []

      for (let i = 0; i < 5; i++) {
        gamesmmoInit.push(data[i])
      }

      setGamesMMO(gamesmmoInit)
    } catch (error) {
      console.log(error)
    }
  }

  async function loadGamesRacing() {
    try {
      const response = await fetch("https://free-to-play-games-database.p.rapidapi.com/api/games?category=racing", {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
          'x-rapidapi-key': '7cf34cf138msh78a7e144a11bdb5p186829jsn76fdd2b49c44'
        },
      })

      const data = await response.json()
      const gamesRacingInit = []

      for (let i = 0; i < 5; i++) {
        gamesRacingInit.push(data[i])
      }

      setGamesRacing(gamesRacingInit)
      console.log(gamesRacingInit)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      <div className="header">
        <p>GuiGames</p>
      </div>
      <div className="background">
      </div>
      <div className="container-list">
        {gamesShooter.map(game =>
          <div className="container-game" key={game.id}>
            <img src={game.thumbnail} alt="" />
            <p>{game.title}</p>
            <p>{game.genre}</p>
            <p>{game.plataform}</p>
            <p>{game.short_description}</p>
          </div>
        )}
      </div>
      <div className="container-list">
        {gamesMMO.map(game =>
          <div className="container-game" key={game.id}>
            <img src={game.thumbnail} alt="" />
            <p>{game.title}</p>
            <p>{game.genre}</p>
            <p>{game.plataform}</p>
            <p>{game.short_description}</p>
          </div>
        )}
      </div>
      <div className="container-list">
        {gamesRacing.map(game =>
          <div className="container-game" key={game.id}>
            <img src={game.thumbnail} alt="" />
            <p>{game.title}</p>
            <p>{game.genre}</p>
            <p>{game.plataform}</p>
            <p>{game.short_description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
