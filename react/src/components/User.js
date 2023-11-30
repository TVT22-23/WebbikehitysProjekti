import { useParams } from "react-router-dom";
import { Col, Container, Image, Row } from 'react-bootstrap';
import prof_pic from '../testikuvia/prof_pic.jpg';
import movie_poster from '../testikuvia/movie_poster.jpg';
import favact1 from '../testikuvia/favact1.jpg'
import favact2 from '../testikuvia/favact2.jpg'
import favact3 from '../testikuvia/favact3.jpg'
import favact4 from '../testikuvia/favact4.jpg'


//Profile/user page
function User() {


  return (
    <Container>
      <Row>
        <Col lg="auto">
          <ProfPic />
        </Col>
        <Col className="borders m-3">
          <p>this is where the description of this character goes, jorma is ismo laitela salilla</p>
        </Col>
      </Row>
      <Row>
        <Col >
          <MovieGrid />
          <p>here is where the users add favourite movies, such as all uunaturhapuros and maybe an anime movie and maybe the 7th harry potter film and 8th star wars movie</p>
        </Col>
      </Row>
      <Row>
        <Col >
          <FavActors />
        </Col>
      </Row>
    </Container>
  );
}

//profile pic to be added to User();
function ProfPic() {

  const { userID } = useParams();

  return (
    <div>
      <div>
        <Image src={prof_pic} height={200} rounded className=" my-2" />
      </div>
      <div className="profpic-body">
        <h4 className="profpic-heading">userid {userID} Jorma's Profilepic</h4>
      </div>
    </div>
  )
}


//displays movies, 4 in 1 row
function MovieGrid() {
  return (
    <div className="borders movGrid">
      <Container>
        <Row>
          <Col>
            <MovieCard />
          </Col>
          <Col>
            <MovieCard />
          </Col>
          <Col>
            <MovieCard />
          </Col>
          <Col>
            <MovieCard />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

//displays actors, 4 in 1 row
function FavActors() {
  return (

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
  )
}
function MovieCard({ID, Title, Poster, Rating}) {
  const posterURL = 'https://image.tmdb.org/t/p/w500/';

  return (
    <div className="movie-card"  key={ID}>
      <Image className="movie-card-img-top" src={`${posterURL}${Poster}`} height={300} alt="Title" />
      <div className="movie-card-body">
        <h4 className="movie-card-title mt-0">{Title}</h4>
        <span className="green">{Rating}</span>
      </div>
    </div>
  )
}


export { User, MovieGrid, MovieCard};