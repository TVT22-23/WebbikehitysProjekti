import React, { useState, useEffect } from "react";
import Draggable from 'react-draggable';
import { Container, Row, Col } from 'react-bootstrap';
import { MovieCard } from "./SearchFilms";
import axios from "axios";
import { accountId } from "./Signals";

function MovieGrid({ isDraggable, id }) {
  const [favMovieID, setFavMovieID] = useState([]);
  useEffect(() => {
    axios.get('/favoriteMovie/get?fav_account_id=' + accountId)
    .then(resp => {
      setFavMovieID(resp.data.map(f => ({
        ID: f.movieID
      })));
      console.log(favMovieID.ID);
      /*
      for(let i=0;i<4;i++){
        axios.get(`https://api.themoviedb.org/3/movie/${favMovieID[i]}?api_key=3972673c7c2bf3c70fc1b5593e956b47`)
        .then(resp => {
          console.log(resp.data);
        })
      }
      */
    })
  },[])
  const movieID = 1;
  const Poster = 'aAXit9k1rTBmmVbj6Zzm2nF5TDR.jpg';
  const Title = 'Decision to Leave';
  const Rating = 10;
  const [position, setPosition] = useState({});

  useEffect(() => {
    const savedPosition = JSON.parse(localStorage.getItem(`${id}MovieGridPosition`)) || {};
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
          <Row>
          <Col>
            <MovieCard    ID={movieID}
                            Title={Title}
                            Poster={Poster}
                            Rating={Rating}/>
          </Col>
          <Col>
          <MovieCard    ID={movieID}
                            Title={Title}
                            Poster={Poster}
                            Rating={Rating}/>
          </Col>
          <Col>
          <MovieCard    ID={movieID}
                            Title={Title}
                            Poster={Poster}
                            Rating={Rating}/>
          </Col>
          <Col>
          <MovieCard    ID={movieID}
                            Title={Title}
                            Poster={Poster}
                            Rating={Rating}/>
          </Col>
          </Row>
        </Container>
      </div>
    </Draggable>
  );
}

export default MovieGrid;