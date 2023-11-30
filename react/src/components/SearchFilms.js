import axios from "axios";
import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";

function SearchFilms() {
    const [films, setFilms] = useState([]);
    const [showMovies, setShowMovies] = useState(true);
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key=3972673c7c2bf3c70fc1b5593e956b47")
            .then(resp => setFilms(resp.data.results.map(f => ({ movieID: f.id, Title: f.title, Poster: f.poster_path }))))
            .catch(error => {
                console.error('error fetching data', error);
            })
    }, []);

    useEffect(() => {
        axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key=3972673c7c2bf3c70fc1b5593e956b47")
            .then(resp => {
                resp.data.results.map(f => console.log(({movieID: f.id, Title: f.title, Poster: f.poster_path})));
            })
    }, [])


    const filteredMovies = films.filter((f) => {
        return f.Title.toLowerCase().includes(searchInput.toLowerCase())
    })

    return (
        <div className="ms-2 mt-2">
            <h1>Films</h1>
            <input type="search" placeholder="search movies..." onChange={(e) => setSearchInput(e.target.value)} />
            <Row>
                {showMovies &&
                    filteredMovies.map(f =>
                        <MovieInfo
                            ID={f.movieID}
                            Title={f.Title}
                            Poster={f.Poster}
                        />)}
            </Row>
        </div>
    );
}

function MovieInfo({ ID, Title, Poster }) {
    console.log(ID);
    console.log(Poster);
    console.log(Title);
    const posterURL = 'https://image.tmdb.org/t/p/w500/';
    return (
        <>
            <Col key={ID}>
                <img src={`${posterURL}${Poster}`}height={200} alt="Poster not available" />
                <p>{Title}</p>
            </Col>
        </>
    )
}


export default SearchFilms;