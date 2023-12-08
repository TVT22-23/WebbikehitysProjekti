import { Card, CardText, Col, Container, Row } from "react-bootstrap";
import MovieGrid from "./movieGrid";
import movie_poster from "../testikuvia/movie_poster.jpg"
import ModalReview from "./Review-modal";
import ModalToGroup from "./AddToGroup-modal";
import { useState, useEffect } from "react";
import { MovieCard } from "./SearchFilms";
import { useNavigate } from "react-router";
import axios from "axios";



//home page
function Home() {

  return (
    <div>
      <Container>
        <h1 className="mt-4" style={{ color: '#CA3e47', borderBottom: '1px solid #CA3E47' }}>Welcome</h1>
        <Row>
          <Movies />
        </Row>
        <Row>
          <h3 className="my-4" style={{ color: '#CA3e47', borderBottom: '1px solid #CA3E47' }}>New reviews</h3>
          <ReviewGrid />
        </Row>
        <Row>
          <h3 className="mt-4" style={{ color: '#CA3e47', borderBottom: '1px solid #CA3E47' }}>News</h3>
          <NewsGrid />
        </Row>
      </Container>


    </div>
  )
}


function Movies({movie}){
  const [films, setFilms] = useState([]);

  const navigate = useNavigate();
  const handleMovieClick = (movieID) => {
    // Use navigate to go to the Film component with the clicked movieID
    navigate(`/film/${movieID}`);
  };
   // Add a guard clause to check if cutMovies is defined
   //if (!movie || movie.length === 0) {
  //  return;
  //}
  //const limitedMovies = movie.slice(0, 5);

  axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key=3972673c7c2bf3c70fc1b5593e956b47")
                    .then(resp =>
                        setFilms(resp.data.results.map(movie => ({
                            Rating: movie.vote_average,
                            movieID: movie.id,
                            Title: movie.title,
                            Poster: movie.poster_path
                        }))))
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });

  return(
    <div>
      <Container>
        <Row>          
          <h3 className="mt-4" style={{ color: '#CA3e47', borderBottom: '1px solid #CA3E47' }}>New</h3>
            {films.map((movie) => (
            //{films.map(movie =>
              <Col key={movie.movieID} onClick={() => handleMovieClick(movie.movieID)} style={{ width: 'fit-content' }}>
                <MovieCard
                  movieID={movie.movieID}
                  Title={movie.Title}
                  Poster={`https://image.tmdb.org/t/p/original${movie.Poster}`}
                  Rating={movie.Rating}
                />
              </Col>
              //)}
            ))}
            
        </Row>
        <Row>
          <h3 className="mt-4" style={{ color: '#CA3e47', borderBottom: '1px solid #CA3E47' }}>Most popular</h3>
            {films.map(movie =>
              <Col key={movie.movieID} onClick={() => handleMovieClick(movie.movieID)} style={{ width: 'fit-content' }}>
                <MovieCard
                  ID={movie.movieID}
                  Title={movie.Title}
                  Poster={`https://image.tmdb.org/t/p/original${movie.Poster}`}
                  Rating={movie.Rating}
                />      
              </Col>  
            )}
          </Row>
      </Container>
    </div>
  )
}

//review grid, displays reviews
function ReviewGrid() {

  const [showModal, setShowModal] = useState(false);
  const [reviewID, setReviewID] = useState(null);


  const handleShow = (id) => {
    setShowModal(true);
    setReviewID(id);
  };

  const handleClose = () => {
    setShowModal(false);
    setReviewID(null);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card style={{ width: '200px', backgroundColor:'#414141', color:'var(--fourth-color)' }}>
            <Card.Img variant="top" src={movie_poster} />
            <Card.Body>
              <Card.Title>Review Title</Card.Title>
              <Card.Text>
                This is the firs few sentences of the review. Full review open with the button.
              </Card.Text>
              <button style={{padding:'7px', width:'fit-content'}} onClick={() => handleShow(1)}>Full review</button>
              <ModalReview id={reviewID} show={showModal} handleClose={handleClose} />
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '200px', backgroundColor:'#414141', color:'var(--fourth-color)' }}>
            <Card.Img variant="top" src={movie_poster} />
            <Card.Body>
              <Card.Title>Review Title</Card.Title>
              <Card.Text>
                This is the firs few sentences of the review. Full review open with the button.
              </Card.Text>
              <button style={{padding:'7px', width:'fit-content'}} onClick={() => handleShow(2)}>Full review</button>
              <ModalReview id={reviewID} showModal={showModal} />
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '200px', backgroundColor:'#414141', color:'var(--fourth-color)' }}>
            <Card.Img variant="top" src={movie_poster} />
            <Card.Body>
              <Card.Title>Review Title</Card.Title>
              <Card.Text>
                This is the firs few sentences of the review. Full review open with the button.
              </Card.Text>
              <button style={{padding:'7px', width:'fit-content'}} onClick={() => handleShow(3)}>Full review</button>
              <ModalReview id={reviewID} showModal={showModal} closeModal={() => setShowModal} />
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '200px', backgroundColor:'#414141', color:'var(--fourth-color)' }}>
            <Card.Img variant="top" src={movie_poster} />
            <Card.Body>
              <Card.Title>Review Title</Card.Title>
              <Card.Text>
                This is the firs few sentences of the review. Full review open with the button.
              </Card.Text>
              <button style={{padding:'7px', width:'fit-content'}} onClick={() => handleShow(4)}>Full review</button>
              <ModalReview id={reviewID} showModal={showModal} closeModal={() => setShowModal} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

function NewsGrid() {
  const [showModal, setShowModal] = useState(false);
  const [reviewID, setReviewID] = useState(null);


  const handleShow = (id) => {
    setShowModal(true);
    setReviewID(id);
  };

  const handleClose = () => {
    setShowModal(false);
    setReviewID(null);
  };

  return (
    <Row style={{ alignItems: 'stretch' }}>
      <Col>
        <Card className="ms-3 pos" style={{ width: '400px', height: '240px' }}>
          <Card.Body>
            <Card.Title>News Title</Card.Title>
            <Card.Text>
              Summary of the news.
            </Card.Text>            
            <button className="groupAdd" style={{padding:'5px', width:'fit-content'}} onClick={() => handleShow(1)}>Add to group</button>
            <ModalToGroup id={reviewID} show={showModal} handleClose={handleClose} />
            <Card.Link href="#" className="position-absolute bottom-0 start-0 m-2 ">News Link</Card.Link>
              </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="ms-3 pos" style={{ width: '400px', height: '240px' }}>
          <Card.Body>              
            <Card.Title>News Title</Card.Title>
            <Card.Text>
              This summary is longer and so it will take more space on the card. And so I will write the lorem ipsum dontes rememberum mucheus elsius abutem lorem ipsum.
            </Card.Text>            
            <button className="groupAdd" onClick={() => handleShow(1)}>Add to group</button>
            <ModalToGroup id={reviewID} show={showModal} handleClose={handleClose} />
            <Card.Link href="#" className="position-absolute bottom-0 start-0 m-2">News Link</Card.Link>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default Home;
export { NewsGrid, ReviewGrid }
