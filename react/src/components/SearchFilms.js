import { useState, useEffect } from "react";
import axios from 'axios';
import { Col, Row } from "react-bootstrap";

function SearchFilms() {
    const [films, setFilms] = useState([]);
    const [showMovies, setShowMovies] = useState(true);
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        axios.get("https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies")
            .then(resp => setFilms(resp.data.map(f => ({ Title: f.Title, Year: f.Year, Poster: f.Poster }))))
            .catch(error => {
                console.error('error fetching data', error);
            })
    }, []);

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
                            key={f.Title}
                            Title={f.Title}
                            Year={f.Year}
                            Poster={f.Poster}
                        />)}
            </Row>
        </div>
    );
}

function MovieInfo({ Title, Year, Poster }) {
    return (
        <>
            <Col key={Title}>
                <img src={Poster} height={120} alt="Poster not available" />
                <p>{Title} {Year}</p>
            </Col>
        </>
    )
}


export default SearchFilms;