import { useParams } from "react-router-dom";
import { Col, Container, Image, Row } from 'react-bootstrap';
import prof_pic from '../testikuvia/prof_pic.jpg';
import favact1 from '../testikuvia/favact1.jpg'
import favact2 from '../testikuvia/favact2.jpg'
import favact3 from '../testikuvia/favact3.jpg'
import favact4 from '../testikuvia/favact4.jpg'
import { MovieCard } from "./SearchFilms";
import movie_poster from "../testikuvia/movie_poster.jpg"
import Draggable from 'react-draggable';
import React, {useEffect, useState} from "react";
import MovieGrid from "./movieGrid";


//Profile/user page


function User() {
  const [position, setPosition] = useState({});
  const [isDraggable, setIsDraggable] = useState(true);
  const toggleDraggable = () => {
    setIsDraggable((prevIsDraggable) => !prevIsDraggable); // Toggle the draggable state
  };

  useEffect(() => {
    const savedPosition = JSON.parse(localStorage.getItem('textBoxPosition')) || {};
    setPosition(savedPosition);
  }, []);

  const handleDrag = (e, data) => {
    // Update position state while dragging
    setPosition({ x: data.x, y: data.y });
  };
  useEffect(() => {
    // Save position data to local storage
    localStorage.setItem('textBoxPosition', JSON.stringify(position));
  }, [position]);
  return (
    <Container>
      <Row>
        <Col >
          <button onClick={toggleDraggable}>Edit profile</button>
        </Col>
      </Row>
      <Row>
        <Col lg="auto">
          <ProfPic isDraggable={isDraggable} />
        </Col>
        <Draggable disabled={!isDraggable} onDrag={handleDrag} position={position}>
        <Col className="borders m-3">
          <p>this is where the description of this character goes, jorma is ismo laitela salilla</p>
        </Col>
        </Draggable>
      </Row>
      <Row>
        <Col >
          <MovieGrid isDraggable={isDraggable} id="userMovieGrid"/>
        </Col>
      </Row>
      <Row>
        <Col >
          <ExtraBox isDraggable={isDraggable}/>
        </Col>
      </Row>
    </Container>
  );
}

//profile pic to be added to User();
function ProfPic({ isDraggable }) {
  const [position, setPosition] = useState({});
  const { userID } = useParams();

  useEffect(() => {
    const savedPosition = JSON.parse(localStorage.getItem('profPicPosition')) || {};
    setPosition(savedPosition);
  }, []);

  const handleDrag = (e, data) => {
    // Update position state while dragging
    setPosition({ x: data.x, y: data.y });
  };
  useEffect(() => {
    // Save position data to local storage
    localStorage.setItem('profPicPosition', JSON.stringify(position));
  }, [position]);

  return (
    <Draggable disabled={!isDraggable} onDrag={handleDrag} position={position}>
    <div>
      <div>
        <Image src={prof_pic} height={200} rounded className=" my-2" />
      </div>
      <div className="profpic-body">
        <h4 className="profpic-heading">userid {userID} Jorma's Profilepic</h4>
      </div>
    </div>
    </Draggable>
  )
}


//displays movies, 4 in 1 row

function ExtraBox({ isDraggable }) {
  const [position, setPosition] = useState({});
  useEffect(() => {
    const savedPosition = JSON.parse(localStorage.getItem('extraBoxPosition')) || {};
    setPosition(savedPosition);
  }, []);

  const handleDrag = (e, data) => {
    // Update position state while dragging
    setPosition({ x: data.x, y: data.y });
  };
  useEffect(() => {
    // Save position data to local storage
    localStorage.setItem('extraBoxPosition', JSON.stringify(position));
  }, [position]);

  return (
    <Draggable disabled={!isDraggable} onDrag={handleDrag} position={position}>
    <div className="borders">
      <Container>
        <Row>
          <Col>
            movie1
            <Image src={favact1} height={114} alt="movie_poster" thumbnail className="my-2" />
          </Col>
          <Col>
            movie2
            <Image src={favact2} height={114} alt="movie_poster" thumbnail className="my-2" />
          </Col>
          <Col>
            movie3
            <Image src={favact3} height={114} alt="movie_poster" thumbnail className="my-2" />
          </Col>
          <Col>
            movie4
            <Image src={favact4} height={114} alt="movie_poster" thumbnail className="my-2" />
          </Col>
        </Row>
      </Container>
    </div>
    </Draggable>
  )
}
export { User };
