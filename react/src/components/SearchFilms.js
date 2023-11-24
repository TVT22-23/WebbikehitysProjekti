import { useState, useEffect } from "react";
import axios from 'axios';
import { Col, Row } from "react-bootstrap";

function SearchFilms() {
    const [name, setName] = useState("")
    const [films, setFilms] = useState([]);
    const [nextID, setNextID] = useState(0);

    useEffect(() => {
        axios.get("https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies")
            .then(resp => setFilms(resp.data.map(f => ({ Title: f.Title, Year: f.Year, Poster: f.Poster }))))
            .catch(error => {
                console.error('error fetching data', error);
            })
    }, []);

    function addFilmToArray() {
        setFilms(prevFilms => [
            ...prevFilms, {
                id: nextID,
                name: name
            }
        ]);
        setNextID(prevID => prevID + 1);
        setName("");
    };

    return (
        <div className="ms-2 mt-2">
            <p>Films</p>
            <input
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <button onClick={addFilmToArray}>add film to array</button>
            <Row>
                <Col>
                    {films.map(f => <MovieInfo Title={f.Title} Year={f.Year} Poster={f.Poster} />)}
                </Col>
            </Row>
        </div>
    );
}

function MovieInfo({ Title, Year, Poster }) {
    return (
        <>
            <h4>{Title}</h4>
            <h3>{Year}</h3>
            <img src={Poster} height={80} alt="" />
        </>
    )
}


export default SearchFilms;