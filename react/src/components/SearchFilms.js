import axios from "axios";
import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { MovieCard } from "./User";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SearchFilms() {
    const [films, setFilms] = useState([]);
    const [showMovies, setShowMovies] = useState(true);
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
        <div className="ms-2 mt-2">
          <h1>Films</h1>
          <input type="search" placeholder="Search movies..." onChange={(e) => setSearchInput(e.target.value)} />
          <Row className="gx-0">
            {films.map(f =>
              <div key={f.movieID} onClick={() => handleMovieClick(f.movieID)}>
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

export default SearchFilms;