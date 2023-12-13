import React, { useState, useEffect } from "react";
import Draggable from 'react-draggable';
import { Container, Row, Col } from 'react-bootstrap';
import { MovieCard } from "./SearchFilms";
import axios from "axios";
import { Uname, accountId } from "./Signals";
import { useNavigate } from "react-router-dom";

function MovieGrid({ isDraggable, id }) {
  const [favMovieData, setFavMovieData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('favoriteMovie/get?fav_account_id=' + accountId)
      .then(resp => {
        const limit = Math.min(resp.data.length, 4);

        for (let i = 0; i < limit; i++) {
          getDataFromAPI(resp.data[i]);
        }

        if (limit < 4 ) {
          const left = 4 - limit;
          for (let i = 0; i < left; i++) {
            getDataFromAPI({movie_id: 600748}); //filler movie
          }
        }
      })
  }, []);

  function getDataFromAPI(id) {
    const movie_id= id.movie_id || id;
    axios.get(`https://api.themoviedb.org/3/movie/${encodeURIComponent(movie_id)}?api_key=3972673c7c2bf3c70fc1b5593e956b47`)
      .then(resp => {
        const movieData = {
          Rating: resp.data.vote_average,
          movieID: resp.data.id,
          Title: resp.data.title,
          Poster: resp.data.poster_path
        }
        setFavMovieData(prevData => [...prevData, movieData])
      })
  }

  const [position, setPosition] = useState({});

  useEffect(() => {
    const savedPosition = JSON.parse(localStorage.getItem(`${id}MovieGridPosition`)) || {};
    setPosition(savedPosition);
  }, [id]);

  const handleDrag = (e, data) => {
    // Update position state while dragging
    setPosition({ x: data.x, y: data.y });
  };

  return (
    <Draggable disabled={!isDraggable} onDrag={handleDrag} position={position}>
      <div className="borders movGrid">
        <Container>
          <h4>Favourite movies</h4>
          <Row >
            {favMovieData.map(f =>
              <Col key={f.movieID}>
                <MovieCard
                  ID={f.movieID}
                  Title={f.Title}
                  Poster={f.Poster}
                  Rating={f.Rating} />
              </Col>
            )}
          </Row>
        </Container>
      </div>
    </Draggable>
  );
}


function MovieGrid2({ isDraggable, id, userID }) {
  const [favMovieData, setFavMovieData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('favoriteMovie/get?fav_account_id=' + userID)
      .then(resp => {
        const limit = Math.min(resp.data.length, 4);

        for (let i = 0; i < limit; i++) {
          getDataFromAPI(resp.data[i]);
        }

        if (limit < 4 ) {
          const left = 4 - limit;
          for (let i = 0; i < left; i++) {
            getDataFromAPI({movie_id: 600748}); //filler movie
          }
        }
      })
  }, []);

  function getDataFromAPI(id) {
    const movie_id= id.movie_id || id;
    axios.get(`https://api.themoviedb.org/3/movie/${encodeURIComponent(movie_id)}?api_key=3972673c7c2bf3c70fc1b5593e956b47`)
      .then(resp => {
        const movieData = {
          Rating: resp.data.vote_average,
          movieID: resp.data.id,
          Title: resp.data.title,
          Poster: resp.data.poster_path
        }
        setFavMovieData(prevData => [...prevData, movieData])
      })
  }

  const [position, setPosition] = useState({});

  useEffect(() => {
    const savedPosition = JSON.parse(localStorage.getItem(`${id}MovieGridPosition2`)) || {};
    setPosition(savedPosition);
  }, [id]);

  const handleDrag = (e, data) => {
    // Update position state while dragging
    setPosition({ x: data.x, y: data.y });
  };

  useEffect(() => {
    // Save position data to local storage
    localStorage.setItem(`${id}MovieGridPosition`, JSON.stringify(position));
  }, [position, id]);

  return (
    <Draggable disabled={!isDraggable} onDrag={handleDrag} position={position}>
      <div className="borders movGrid">
        <Container>
          <h4>Favourite movies</h4>
          <Row >
            {favMovieData.map(f =>
              <Col key={f.movieID}>
                <MovieCard
                  ID={f.movieID}
                  Title={f.Title}
                  Poster={f.Poster}
                  Rating={f.Rating} />
              </Col>
            )}
          </Row>
        </Container>
      </div>
    </Draggable>
  );
}




export { MovieGrid, MovieGrid2};
