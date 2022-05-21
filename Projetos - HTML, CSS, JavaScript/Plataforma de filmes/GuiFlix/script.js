fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false').then(function (response) {
    const movieList = document.querySelector('.movies')
    const btnNext = document.querySelector('.btn-next')
    const btnPrevious = document.querySelector('.btn-prev')
    const btnNextgenre = document.querySelector('.btn-next-genre')
    const btnPreviousgenre = document.querySelector('.btn-prev-genre')
    const input = document.querySelector('input')
    const modal = document.querySelector('.modal')
    const btnTheme = document.querySelector('.btn-theme')
    const docBody = document.querySelector('body')
    const initialTheme = localStorage.getItem('theme')
    const modalImg = document.querySelector('.modal__img')
    const modalLink = document.querySelector('.modal__link')
    const divHighlight = document.querySelector('.highlight__img')
    const title = document.querySelector(".highlight__title")
    const userVote = document.querySelector(".highlight__rating")
    const genres = document.querySelector('.highlight__genres')
    const launch = document.querySelector('.highlight__launch')
    const description = document.querySelector('.highlight__description')
    const videoLink = document.querySelector('.highlight__video-link')
    const modalTitle = document.querySelector('.modal__title')
    const modalimg = document.querySelector('.modal__img')
    const modaldescription = document.querySelector('.modal__description')
    const modalaverage = document.querySelector('.modal__average')
    const modalGenres = document.querySelector('.modal__genres')
    const searchIcon = document.querySelector('.search-icon')
    const titleGenre = document.querySelector('.search-genre-title')
    const searchtitle = document.querySelector('.search-title')
    const moviesGenres = document.querySelector('.movies-genres')
    const select = document.querySelector('select')
    const arrow = document.querySelector('.seta-baixo')
    const promisedBody = response.json()
    promisedBody.then(function (body) {

        if (initialTheme === 'white') {
            whiteTheme()
        } else {
            blackTheme()

        }

        let page = 0
        listarFilmes(0, 18)
        highlightMovie()
        createSectionGenres()

        function createPage(i, body) {
            let page = 0
            const movie = body.results[i]
            const divMovie = document.createElement('div')
            const divInfo = document.createElement('div')
            const title = document.createElement('span')
            const divVote = document.createElement('div')
            const userVote = document.createElement('span')
            const estrela = document.createElement('img')
            if (window.screen.width > 800) {
                page = Math.trunc(i / 6)
            }

            divMovie.style.backgroundImage = `url(${movie.poster_path})`
            title.textContent = movie.title
            userVote.textContent = movie.vote_average
            estrela.setAttribute('src', './assets/estrela.svg')
            divMovie.setAttribute('data-page', `${page}`)
            divMovie.setAttribute('data-id', `${movie.id}`)

            divMovie.classList.add(`movie`)
            divInfo.classList.add('div-info')
            divVote.classList.add('div-vote')
            title.classList.add('movie__title')
            userVote.classList.add('movie__rating')

            divMovie.append(divInfo)
            divInfo.append(title, divVote)
            divVote.append(estrela, userVote)
            movieList.append(divMovie)

            if (divMovie.dataset.page !== '0') {
                divMovie.style.display = 'none'
            }
        }

        function createSectionGenres() {
            const genreId = {
                "Ação": 28,
                "Animação": 16,
                "Aventura": 12,
                "Comédia": 35,
                "Drama": 18,
                "Fantasia": 14,
                "Ficção Cientifica": 878,
                "Suspense": 53,
                "Terror": 27
            }

            fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false&with_genres=${genreId[select.value]}`).then(function (response) {
                const promisedBody = response.json()
                promisedBody.then(function (body) {
                    for (let i = 0; i < 18; i++) {
                        let page = 1
                        const movie = body.results[i]
                        const divMovie = document.createElement('div')
                        const divInfo = document.createElement('div')
                        const title = document.createElement('span')
                        const divVote = document.createElement('div')
                        const userVote = document.createElement('span')
                        const estrela = document.createElement('img')
                        if (window.screen.width > 800) {
                            page = Math.trunc(i / 6)
                        }

                        divMovie.style.backgroundImage = `url(${movie.poster_path})`
                        title.textContent = movie.title
                        userVote.textContent = movie.vote_average
                        estrela.setAttribute('src', './assets/estrela.svg')
                        divMovie.setAttribute('data-page', `${page}`)
                        divMovie.setAttribute('data-id', `${movie.id}`)
                        titleGenre.textContent = 'Filmes de ' + select.value

                        divMovie.classList.add(`movie-genre`)
                        divInfo.classList.add('div-info')
                        divVote.classList.add('div-vote')
                        title.classList.add('movie__title')
                        userVote.classList.add('movie__rating')

                        divMovie.append(divInfo)
                        divInfo.append(title, divVote)
                        divVote.append(estrela, userVote)
                        moviesGenres.append(divMovie)

                        if (divMovie.dataset.page !== '1') {
                            divMovie.style.display = 'none'
                        }
                    }
                    const newMoviesGenrelist = document.querySelectorAll('.movie-genre')
                    newMoviesGenrelist.forEach(movie => movie.addEventListener('click', openModal))
                })
            })
        }

        function selectGenre() {
            const moviesGenre = document.querySelectorAll('.movie-genre')
            console.log(moviesGenre)
            moviesGenre.forEach(movie => {
                movie.remove()
            })
            createSectionGenres()
        }

        function listarFilmes(start, end) {
            for (let i = start; i < end; i++) {
                createPage(i, body)
            }
        }

        function nextListMovie() {
            let movies = document.querySelectorAll('.movie')
            let currentPage = 0
            page++

            if (Math.trunc(movies.length / 6) !== 0) {
                currentPage = page % Math.trunc(movies.length / 6)
            }

            while (currentPage < 0) {
                currentPage = currentPage + Math.trunc(movies.length / 6)
            }

            movies.forEach(movie => {
                currentPage.toString() !== movie.dataset.page ? movie.style.display = 'none' : movie.style.display = 'inline'
            });

            movies.forEach(movie => movie.addEventListener('click', openModal))
        }

        function nextListMovieGenre() {
            let movies = document.querySelectorAll('.movie-genre')
            let currentPage = 0
            page++

            if (Math.trunc(movies.length / 6) !== 0) {
                currentPage = page % Math.trunc(movies.length / 6)
            }

            while (currentPage < 0) {
                currentPage = currentPage + Math.trunc(movies.length / 6)
            }

            movies.forEach(movie => {
                currentPage.toString() !== movie.dataset.page ? movie.style.display = 'none' : movie.style.display = 'inline'
            });

            movies.forEach(movie => movie.addEventListener('click', openModal))
        }

        function prevListMovie() {
            let movies = document.querySelectorAll('.movie')
            let currentPage = 0
            page--

            if (Math.trunc(movies.length / 6) !== 0) {
                currentPage = page % Math.trunc(movies.length / 6)
            }

            while (currentPage < 0) {
                currentPage = currentPage + Math.trunc(movies.length / 6)
            }

            movies.forEach(movie => {
                currentPage.toString() !== movie.dataset.page ? movie.style.display = 'none' : movie.style.display = 'inline'
            });

            movies.forEach(movie => movie.addEventListener('click', openModal))
        }

        function prevListMovieGenre() {
            let movies = document.querySelectorAll('.movie-genre')
            let currentPage = 0
            page--

            if (Math.trunc(movies.length / 6) !== 0) {
                currentPage = page % Math.trunc(movies.length / 6)
            }

            while (currentPage < 0) {
                currentPage = currentPage + Math.trunc(movies.length / 6)
            }

            movies.forEach(movie => {
                currentPage.toString() !== movie.dataset.page ? movie.style.display = 'none' : movie.style.display = 'inline'
            });

            movies.forEach(movie => movie.addEventListener('click', openModal))
        }

        function openInput() {
            input.classList.contains('show') ? input.classList.remove('show') : input.classList.add('show')
        }

        function searchMovie(event) {
            if (event.key !== 'Enter') {
                return
            }

            if (input.value) {
                fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=${input.value}`).then(function (response) {

                    const promisedBody = response.json()
                    promisedBody.then(function (body) {
                        let movies = document.querySelectorAll('.movie')
                        movies.forEach(movie => {
                            movie.remove()
                        })

                        for (let i = 0; i < body.results.length; i++) {
                            createPage(i, body)
                        }

                        searchtitle.textContent = "Resultado da pesquisa: " + input.value
                        input.classList.remove('show')
                        movies = document.querySelectorAll('.movie')
                        movies.forEach(movie => movie.addEventListener('click', openModal))
                        input.value = ''
                    })
                })
            } else {
                let movies = document.querySelectorAll('.movie')
                movies.forEach(movie => {
                    movie.remove()
                })
                listarFilmes(0, 20)

                searchtitle.textContent = 'Filmes em alta:'
                input.classList.remove('show')
                movies = document.querySelectorAll('.movie')
                movies.forEach(movie => movie.addEventListener('click', openModal))
            }
        }

        function highlightMovie() {
            fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${body.results[Math.floor(Math.random() * body.results.length)].id}?language=pt-BR`).then(function (response) {

                const promisedBody = response.json()
                promisedBody.then(function (body) {
                    divHighlight.style.backgroundImage = `url(${body.backdrop_path})`
                    divHighlight.style.backgroundSize = ('100vw')
                    const genresName = []
                    for (i = 0; i < body.genres.length; i++) {
                        genresName.push(body.genres[i].name)
                    }

                    title.textContent = body.title
                    userVote.textContent = body.vote_average
                    genres.textContent = genresName.join(', ')
                    launch.textContent = body.release_date
                    description.textContent = body.overview

                    fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${body.id}/videos?language=pt-BR`).then(function (response) {
                        const promisedBody = response.json()
                        promisedBody.then(function (body) {
                            videoLink.href = 'https://www.youtube.com/watch?v=' + body.results[0].key
                        })
                    })
                })
            })
        }

        const newMoviesGenres = document.querySelectorAll('.movie-genre')
        const newMoviesList = document.querySelectorAll('.movie')
        function openModal(event) {
            modal.classList.remove('hidden')
            fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${event.target.dataset.id}?language=pt-BR`).then(function (response) {
                const promisedBody = response.json()
                promisedBody.then(function (body) {

                    modalImg.setAttribute('data-id', `${event.target.dataset.id}`)
                    modalTitle.textContent = body.title
                    modalimg.src = body.backdrop_path
                    modaldescription.textContent = body.overview
                    modalaverage.textContent = body.vote_average

                    for (i = 0; i < body.genres.length; i++) {
                        const spanGenre = document.createElement('span')
                        spanGenre.classList.add('modal__genre')
                        spanGenre.textContent = body.genres[i].name
                        modalGenres.append(spanGenre)
                    }

                    fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${event.target.dataset.id}/videos?language=pt-BR`).then(function (response) {
                        const promisedBody = response.json()
                        promisedBody.then(function (body) {
                            if (body.results[0]) {
                                modalLink.href = 'https://www.youtube.com/watch?v=' + body.results[0].key
                                modalLink.target = '_blank'
                            } else {
                                modalLink.href = '#'
                                modalLink.target = ''
                            }
                        })
                    })
                })
            })
        }

        function closeModal() {
            modal.classList.add('hidden')
            const spanModal = document.querySelectorAll('.modal__genre')
            spanModal.forEach(span => {
                span.remove()
            })
        }

        function blackTheme() {
            localStorage.setItem('theme', 'black')
            docBody.style.setProperty('--background-color', '#000')
            docBody.style.setProperty('--highlight-background', '#454545')
            docBody.style.setProperty('--color', '#fff')
            docBody.style.setProperty('--highlight-color', 'rgba(255, 255, 255, 0.7)')
            docBody.style.setProperty('--highlight-description', '#fff')
            docBody.style.setProperty('--shadow-color', '0px 4px 8px rgba(255, 255, 255, 0.15)')
            docBody.style.setProperty('--input-border-color', '#fff')
            btnTheme.setAttribute('src', './assets/dark-mode.svg')
            btnPrevious.setAttribute('src', './assets/seta-esquerda-branca.svg')
            btnNext.setAttribute('src', './assets/seta-direita-branca.svg')
            btnPreviousgenre.setAttribute('src', './assets/seta-esquerda-branca.svg')
            btnNextgenre.setAttribute('src', './assets/seta-direita-branca.svg')
            searchIcon.setAttribute('src', './assets/lupa-branca.svg')
            arrow.setAttribute('src', './assets/seta-baixo-branca.svg')
        }

        function whiteTheme() {
            localStorage.setItem('theme', 'white')
            docBody.style.setProperty('--background-color', '#fff')
            docBody.style.setProperty('--highlight-background', '#fff')
            docBody.style.setProperty('--color', '#000')
            docBody.style.setProperty('--highlight-color', 'rgba(0, 0, 0, 0.7)')
            docBody.style.setProperty('--highlight-description', '#000')
            docBody.style.setProperty('--shadow-color', '0px 4px 8px rgba(0, 0, 0, 0.15)')
            docBody.style.setProperty('--input-border-color', '#979797')
            btnTheme.setAttribute('src', './assets/light-mode.svg')
            btnPrevious.setAttribute('src', './assets/seta-esquerda-preta.svg')
            btnNext.setAttribute('src', './assets/seta-direita-preta.svg')
            btnPreviousgenre.setAttribute('src', './assets/seta-esquerda-preta.svg')
            btnNextgenre.setAttribute('src', './assets/seta-direita-preta.svg')
            searchIcon.setAttribute('src', './assets/lupa.svg')
            arrow.setAttribute('src', './assets/seta-baixo-preta.svg')
        }

        function changeTheme() {
            docBody.style.getPropertyValue('--background-color') === '#000' ? whiteTheme() : blackTheme()
        }

        function traillerYt(event) {
            event.stopPropagation()
        }

        select.addEventListener('change', selectGenre)
        searchIcon.addEventListener('click', openInput)
        btnTheme.addEventListener('click', changeTheme)
        btnNext.addEventListener('click', nextListMovie)
        btnPrevious.addEventListener('click', prevListMovie)
        btnNextgenre.addEventListener('click', nextListMovieGenre)
        btnPreviousgenre.addEventListener('click', prevListMovieGenre)
        input.addEventListener('keydown', searchMovie)
        newMoviesGenres.forEach(movie => movie.addEventListener('click', openModal))
        newMoviesList.forEach(movie => movie.addEventListener('click', openModal))
        modal.addEventListener('click', closeModal)
        modalImg.addEventListener('click', traillerYt)
    })
})