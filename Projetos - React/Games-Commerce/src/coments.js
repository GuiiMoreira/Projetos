// const [gamesShooter, setGamesShooter] = useState([])
// const [gamesMMO, setGamesMMO] = useState([])
// const [gamesRacing, setGamesRacing] = useState([])

useEffect(() => {
    loadGames()
    // loadGamesShooter()
    // loadGamesMmorpg()
    // loadGamesRacing()
}, [])




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