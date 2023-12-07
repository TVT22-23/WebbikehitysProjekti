import axios from "axios";
import { useState, useEffect } from "react";
import { Row, Image, Dropdown, Col, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SearchFilms() {
    const [films, setFilms] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [genres, setGenres] = useState([]);
    const navigate = useNavigate();
    const [otsikko, setOtsikko] = useState('');
    const [CurrentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState('');

    const getMovies = (url) => {
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const updatedFilms = data.results.map(f => ({
                    Rating: f.vote_average,
                    movieID: f.id,
                    Title: f.title,
                    Poster: f.poster_path
                }));

                setFilms(updatedFilms);
                //Set CurrentPage and total pages to be used.
                axios.get(url).then(resp => setCurrentPage(resp.data.page));
                axios.get(url).then(resp => setTotalPages(resp.data.total_pages));
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    };

    //Search movies with search input. If no search input, fetch by genre and order, else show trending movies.
    useEffect(() => {
        if (searchInput.trim() === '') {
            if (sortBy !== '' || genres.length > 0) {
                // Fetch movies based on genre and order
                const filterUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=${encodeURIComponent(sortBy)}&with_genres=${encodeURIComponent(genres)}&api_key=3972673c7c2bf3c70fc1b5593e956b47`;
                // Add &page= and currentPage to url end.
                getMovies(filterUrl + '&page=' + encodeURI(CurrentPage));
            } else {
                // Fetch trending movies
                axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key=3972673c7c2bf3c70fc1b5593e956b47")
                    .then(resp =>
                        setFilms(resp.data.results.map(f => ({
                            Rating: f.vote_average,
                            movieID: f.id,
                            Title: f.title,
                            Poster: f.poster_path
                        }))))
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            }
        } else {
            // Fetch movies based on search
            const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=3972673c7c2bf3c70fc1b5593e956b47&query=${encodeURIComponent(searchInput)}`;
            getMovies(searchUrl);
        }


    }, [searchInput, genres, sortBy, CurrentPage]);

    const handleMovieClick = (movieID) => {
        // Use navigate to go to the Film component with the clicked movieID
        navigate(`/film/${movieID}`);
    };

    function handleSetSortBy(by, menuTitle) {
        setSortBy(by);
        setOtsikko(menuTitle);
        setCurrentPage(1);
    };
    //Add selected genre to genres array, if it is there, it is removed. 
    //If genreId is "empty" empty the genres array
    function handleSetGenre(genreID) {
        if (genreID === 'empty') {
            setGenres([]);
        } else if (!genres.includes(genreID)) {
            setGenres([...genres, genreID]);
            setCurrentPage(1);
        } else {
            setGenres(prev => prev.filter(id => id !== genreID));
            setCurrentPage(1);
        };
    };

    function handleDecrementPage() {
        setCurrentPage(CurrentPage - 1);
        window.scrollTo(0, 0);
    };

    function handleIncrementPage() {
        setCurrentPage(CurrentPage + 1);
        window.scrollTo(0, 0);
    };

    return (
        <div>
            <Row>
                <Col lg={2}>
                </Col>
                <Col lg={4}>
                    <h2 className="mt-3" style={{ color: '#Ca3e47' }}>Search fo a movie</h2>
                    <p className="text-muted" style={{ fontSize: '15px' }}>Search by name or by genre</p>
                    <input className="mb-2 w-75 rounded " type="search" placeholder="Search..." onChange={(e) => setSearchInput(e.target.value)} />
                </Col>
                <Col>
                    {/* dropdown menu to choose how to sort films */}
                    <Dropdown>
                        <Dropdown.Toggle >
                            Order by {otsikko}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item ></Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSetSortBy('popularity.desc', 'popularity')}>popularity</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSetSortBy('vote_average.desc', 'highest rating')}>highest rating</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSetSortBy('vote_average.asc', 'lowest rating')}>lowest rating</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSetSortBy('release_date.desc', 'newest to oldest')}>newest to oldest</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSetSortBy('release.asc', 'oldest to newest')}>oldest to newest</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => handleSetSortBy('', '')}>Clear selection</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <div id="tags">
                {/* If genres includes the genreID of the tag give it class highlighted */}
                <div className={`tag ${genres.includes('28') ? 'highlighted' : ''}`} onClick={() => handleSetGenre('28')}>Action</div>
                <div className={`tag ${genres.includes('12') ? 'highlighted' : ''}`} onClick={() => handleSetGenre('12')}>Adventure</div>
                <div className={`tag ${genres.includes('16') ? 'highlighted' : ''}`} onClick={() => handleSetGenre('16')}>Animation</div>
                <div className={`tag ${genres.includes('35') ? 'highlighted' : ''}`} onClick={() => handleSetGenre('35')}>Comedy</div>
                <div className={`tag ${genres.includes('80') ? 'highlighted' : ''}`} onClick={() => handleSetGenre('80')}>Crime</div>
                <div className={`tag ${genres.includes('18') ? 'highlighted' : ''}`} onClick={() => handleSetGenre('18')}>Drama</div>
                <div className={`tag ${genres.includes('99') ? 'highlighted' : ''}`} onClick={() => handleSetGenre('99')}>Documentary</div>
                <div className={`tag ${genres.includes('10751') ? 'highlighted' : ''}`} onClick={() => handleSetGenre('10751')}>Family</div>
                <div className={`tag ${genres.includes('14') ? 'highlighted' : ''}`} onClick={() => handleSetGenre('14')}>Fantasy</div>
                <div className={`tag ${genres.includes('36') ? 'highlighted' : ''}`} onClick={() => handleSetGenre('36')}>History</div>
                <div className={`tag ${genres.includes('27') ? 'highlighted' : ''}`} onClick={() => handleSetGenre('27')}>Horror</div>
                <div className={`tag ${genres.includes('10402') ? 'highlighted' : ''}`} onClick={() => handleSetGenre('10402')}>Music</div>
                <div className={`tag ${genres.includes('9648') ? 'highlighted' : ''}`} onClick={() => handleSetGenre('9648')}>Mystery</div>
                <div className={`tag ${genres.includes('10749') ? 'highlighted' : ''}`} onClick={() => handleSetGenre('10749')}>Romance</div>
                <div className={`tag ${genres.includes('878') ? 'highlighted' : ''}`} onClick={() => handleSetGenre('878')}>Sci-fi</div>
                <div className={`tag ${genres.includes('10770') ? 'highlighted' : ''}`} onClick={() => handleSetGenre('10770')}>TV Movie</div>
                <div className={`tag ${genres.includes('53') ? 'highlighted' : ''}`} onClick={() => handleSetGenre('53')}>Thriller</div>
                <div className={`tag ${genres.includes('10752') ? 'highlighted' : ''}`} onClick={() => handleSetGenre('10752')}>War</div>
                <div className={`tag ${genres.includes('37') ? 'highlighted' : ''}`} onClick={() => handleSetGenre('37')}>Western</div>
                <div className="tag" style={{ backgroundColor: 'var(--secondary-color)' }} id="genreSlector" onClick={() => handleSetGenre('empty')}>Reset</div>
            </div>

            <Row style={{ justifyContent: 'center' }}>
                {films.map(f =>
                    <div key={f.movieID} onClick={() => handleMovieClick(f.movieID)} style={{ width: 'fit-content' }}>
                        <MovieCard
                            ID={f.movieID}
                            Title={f.Title}
                            Poster={f.Poster}
                            Rating={f.Rating}
                        />
                    </div>
                )}
            </Row>
            {/* If searching movies, hide this, if discovering with genres set this div visible and on click navigate pages.*/}
            {/* Disable next or previous div if last page or first page. On click increase or decrease current page value and change page*/}
            <div className={` ${searchInput.trim() !== '' ? 'page-selection-hidden' : 'page-selection'}`}>
                <div onClick={() => handleDecrementPage()} className={` ${CurrentPage === 1 ? 'select-page-disabled' : 'select-page'}`}> Previous</div>
                <div className="current-page" >{CurrentPage}</div>
                <div onClick={() => handleIncrementPage()} className={`${CurrentPage === totalPages ? 'select-page-disabled' : 'select-page '}`}>Next</div>
            </div>
        </div>
    );
}

//Results are shown here, ratings are color coded
function MovieCard({ ID, Title, Poster, Rating }) {
    const posterURL = 'https://image.tmdb.org/t/p/w500/';
    const oneDecimalRating = Rating.toFixed(1);
    function getColor(Rating) {
        if (Rating >= 8.0) {
            return 'green'
        } else if (Rating <= 7.9 && Rating >= 6.6) {
            return 'lightgreen'
        } else if (Rating <= 6.5 && Rating >= 5.2) {
            return 'yellow';
        } else if (Rating <= 5.1 && Rating >= 3.1) {
            return 'orange';
        } else if (Rating < 4) {
            return 'red'
        }
    }

    //if there is no poster, show this poster
    if (Poster === null) {
        Poster = 'tGX3YyPaYMbjiRwR5PjRsJW7GtM.jpg'
    }

    return (
        <div className="movie-card" key={ID}>
            <Image className="movie-card-img-top" src={`${posterURL}${Poster}`} height={300} alt='missing_poster' />
            <div className="movie-card-body">
                <h4 className="movie-card-title mt-0">{Title}</h4>
                <span className={getColor(oneDecimalRating)}>{oneDecimalRating}</span>
            </div>
        </div>
    )


}

export { SearchFilms, MovieCard };