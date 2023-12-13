import { useParams, Link } from "react-router-dom";
import { Col, Container, Image, Row } from 'react-bootstrap';
import prof_pic from '../testikuvia/prof_pic.jpg';
import Draggable from 'react-draggable';
import React, { useEffect, useState } from "react";
import MovieGrid from "./movieGrid";
import { getArticle } from "../finnkino";
import { SharedUname, Uname, accountId, jwtToken } from "./Signals";
import axios from "axios";


//Profile/user page


function SharedUser() {
  const { userID } = useParams();
  const [position, setPosition] = useState({});
  const [isDraggable, setIsDraggable] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [desc, setDesc] = useState('empty');


  useEffect(() => {
    const savedPosition = JSON.parse(localStorage.getItem('textBoxPosition')) || {};
    setPosition(savedPosition);
    getArticle("https://www.finnkino.fi/xml/News")
      .then((data) => {
        console.log('Fetched News Data:', data);
        setNewsData(data);
      })
      .catch((error) => console.error("Error fetching news:", error));

    axios.get('/account/getUname?account_id=' + userID)
      .then(resp => {
        SharedUname.value = resp.data[0].user_name
      });
    }, [userID]);

    useEffect(() => {
      if (SharedUname !== ''){
        //get and set profile desc with SharedUname
        axios.get('/account/get?user_name=' + SharedUname)
        .then(resp => {
          const descript = resp.data[0].descpription;
          console.log(resp.data[0].description);
          setDesc(descript);
        })
      }
    },[])


  const handleDrag = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };
  useEffect(() => {
    // Save position data to local storage
    localStorage.setItem('textBoxPosition', JSON.stringify(position));
  }, [position]);
  return (
    <div>
        <Container>
          <Row>
            <Col >
            </Col>
          </Row>
          <Row>
            <Col lg="auto">
              <ProfPic isDraggable={isDraggable} ProfPic />
            </Col>
            <Draggable disabled={!isDraggable} onDrag={handleDrag} position={position}>
              <Col className="borders m-3">
                <p>{desc}</p>
              </Col>
            </Draggable>
          </Row>
          <Row>
            <Col >
              <MovieGrid isDraggable={isDraggable} id="userMovieGrid" />
            </Col>
          </Row>
          <Row>
            <Col >
              <ExtraBox ExtraBox isDraggable={isDraggable} newsData={newsData} />
            </Col>
          </Row>
          <Row>
            <Col className="link-style mt-4">
            </Col>
          </Row>
        </Container>
    </div>
  );
}

//profile pic to be added to User();
function ProfPic({ isDraggable }) {
  const [position, setPosition] = useState({});
  const [profPicture, setProfPicture] = useState([]);

  useEffect(() => {
    axios.get('/account/get?user_name=' + SharedUname)
      .then(resp => {
        const profPicString = resp.data[0].profile_picture.split(',');
        const byteArray = profPicString.map(byte => parseInt(byte, 10));
        const uint8Array = new Uint8Array(byteArray);
        const blob = new Blob([uint8Array], { type: 'image/jpeg' });
        setProfPicture(URL.createObjectURL(blob));

      })
  }, []);

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
          <Image src={profPicture} height={200} width={200} alt='loading' rounded className=" my-2" />
        </div>
        <div className="profpic-body">
          <h4 className="profpic-heading text-center">{SharedUname}'s profile</h4>
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


export { SharedUser};
