import { Link, Outlet, useParams } from "react-router-dom";
import { Col, Container, Image, Row, Form } from 'react-bootstrap';
import movie_poster from '../testikuvia/movie_poster.jpg';

function Film() {

  const { filmID } = useParams();

  return(
    <Container>
    <Row>
        <Col >    
          <Image src={movie_poster} alt="movie_poster" className="imageframe"/>
            <p class="people">
              <div class="crew">
              <li>tää jätkä</li>
              <li>tää jätkä</li>
              <li>tää jätkä</li>
              <li>tää jätkä</li>
              <li>tää jätkä</li>
              <li>tää jätkä</li>
              </div>

              <div class="cast">
              <li>tää jätkä</li>
              <li>tää jätkä</li>
              <li>tää jätkä</li>
              <li>tää jätkä</li>
              <li>tää jätkä</li>
              <li>tää jätkä</li>
              </div>
            </p>
        </Col>
      <Col >
        <FilmInfo />      
        <div>
            <Link to={'cast'}>Cast  </Link>
            <Link to={'crew'}>Crew </Link>
        <Outlet/>
        </div>          
        <div class="review">
          sdfsdfsdf
        </div>
      </Col>

    </Row>
  </Container>

  )
}

function FilmInfo(){
  return(
    <div class="movieInfo" >
      <h1> _movie name_ </h1>
      <h> ohjooja </h>
      <br></br>
      <h> julukasu vuosj </h>
      <br></br>
      <p1>
      this film is a very big film, the biggest in the world, wow so good, what a great film
      lkjasldkj lkasjdlkajs dlaksjd alksjdlasdlkajsdlkaskdj alksdj saldjasldkajsld aklsjd 
      ihaskldja sdlkajsd lkasjd alksdjlaksjd lkasjd alksdjlaksd lkaj sdlkajs ldkja slkdjkasd
      lasjdlik ajsdlkjasdlkaj sldkjasolkdj alksjd lkajd lkasjd lkajs dlkaj ldks Jaskahkasjdh kashdjkashd kashdjkashd
      lkasjdlka sdlkj alskdj alksjdol aksjdlkasjd aksd
      </p1>
    </div>
  )
}

function Cast (){
  return(
    <div>
      <h4>People who acted in the movie</h4>
      <li>Kasper</li>
      <li>Jesper</li>
      <li>Niko</li>
    </div>
  )
}

function Crew (){
  return(
    <div>
      <h4>People Who made the movie</h4>
      <li>MAtti</li>
      <li>Jorma</li>
      <li>Jaska</li>
    </div>
  )
}


export {Film, Crew, Cast};