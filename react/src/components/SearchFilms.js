import axios from "axios";
import { useState, useEffect } from "react";
import { Row, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import missing_poster from "../testikuvia/poster_missing.jpg"

function SearchFilms() {
    const [films, setFilms] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();

    const getMovies = (url) => {
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
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    };

    useEffect(() => {
        if (searchInput.trim() === '') {
            // If the search input is empty, fetch trending movies
            axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key=3972673c7c2bf3c70fc1b5593e956b47")
                .then(resp => setFilms(resp.data.results.map(f => ({
                    Rating: f.vote_average,
                    movieID: f.id,
                    Title: f.title,
                    Poster: f.poster_path
                }))))
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        } else {
            // If there is a search input, fetch movies based on the search query
            const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchInput)}&api_key=3972673c7c2bf3c70fc1b5593e956b47`;
            getMovies(searchUrl);
        }
    }, [searchInput]);

    const handleMovieClick = (movieID) => {
        // Use navigate to go to the Film component with the clicked movieID
        navigate(`/film/${movieID}`);
    };

    return (
        <div>
            <h1>Films</h1>
            <input type="search" placeholder="Search movies..." onChange={(e) => setSearchInput(e.target.value)} />
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
        </div>
    );
}

//Results from api call are shown here, also ratings are color coded
function MovieCard({ ID, Title, Poster, Rating }) {
    const posterURL = 'https://image.tmdb.org/t/p/w500/';
    const oneDecimalRating = Rating.toFixed(1);
    function getColor(Rating) {
        if (Rating >= 8.0) {
            return 'green'
        } else if (Rating <= 7.9 && Rating >= 6.6) {
            return 'lightgreen'
        } else if (Rating <= 6.5 && Rating >= 5.1) {
            return 'yellow';
        } else if (Rating <= 5 && Rating >= 3.1) {
            return 'orange';
        } else if (Rating < 4) {
            return 'red'
        }
    }
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