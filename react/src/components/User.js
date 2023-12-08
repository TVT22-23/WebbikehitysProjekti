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
import { getArticle } from "../finnkino";


//Profile/user page


function User() {
  const [position, setPosition] = useState({});
  const [isDraggable, setIsDraggable] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const toggleDraggable = () => {
    setIsDraggable((prevIsDraggable) => !prevIsDraggable); // Toggle the draggable state
  };

  useEffect(() => {
    const savedPosition = JSON.parse(localStorage.getItem('textBoxPosition')) || {};
    setPosition(savedPosition);
    getArticle("https://www.finnkino.fi/xml/News")
    .then((data) => {
      console.log('Fetched News Data:', data);
      setNewsData(data);
    })
    .catch((error) => console.error("Error fetching news:", error));
}, []);


  const handleDrag = (e, data) => {
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
          <ExtraBox ExtraBox isDraggable={isDraggable} newsData={newsData} />
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

function ExtraBox({ isDraggable, newsData }) {
  const [position, setPosition] = useState({});
  useEffect(() => {
    const savedPosition = JSON.parse(localStorage.getItem("extraBoxPosition")) || {};
    setPosition(savedPosition);
  }, []);

  const handleDrag = (e, data) => {
    // Update position state while dragging
    setPosition({ x: data.x, y: data.y });
  };

  useEffect(() => {
    // Save position data to local storage
    localStorage.setItem("extraBoxPosition", JSON.stringify(position));
  }, [position]);

  // Show only the 4 newest news articles
  const latestNews = newsData.slice(0, 4);

  // Handle image click
  const handleImageClick = (articleURL) => {
    // Open the third-party URL in a new tab
    window.open(articleURL, '_blank');
  };

  return (
    <Draggable disabled={!isDraggable} onDrag={handleDrag} position={position}>
      <div className="borders">
        <Container>
          <Row>
            {latestNews.map((newsItem, index) => (
              <Col key={index}>
                <Image
                  src={newsItem.imageURL}
                  alt="News Image"
                  thumbnail
                  className="my-2"
                  onClick={() => handleImageClick(newsItem.articleUrl)}
                  style={{ cursor: "pointer" }}
                />
                <h5>{newsItem.title}</h5>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </Draggable>
  );
}


export { User };
