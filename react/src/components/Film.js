import { Link, Outlet, useParams } from "react-router-dom";
import { Col, Container, Image, Row, Form } from 'react-bootstrap';
import movie_poster from '../testikuvia/movie_poster.jpg';
import disney from '../testikuvia/disney.png'
import hbo from '../testikuvia/hbo.png'
import hulu from '../testikuvia/hulu.png'
import netflix from '../testikuvia/netflix.png'
import prime from '../testikuvia/prime.png'






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
        <div>leave a review</div>      
        <div class="review">
        <form>
          <textarea></textarea>
          <SubmitButton />
        </form>
        </div>    
        <div>Where to watch</div>          
        <WhereToWatch />
      </Col>        
      <Row> 
          <Col>
          similar movies
            <MovieGrid />
          </Col>
        </Row> 
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

function WhereToWatch(){
  return(
    <div>
      <p class="watch">
        <button className="whereButton">           
          <Image src={netflix} height={70}/>
        </button>
        <button className="whereButton">
          <Image src={disney} height={70}/>
        </button>
        <button className="whereButton">
          <Image src={prime} height={70}/>
        </button>
        <button className="whereButton"> 
          <Image src={hbo} height={70}/>
        </button>
        <button className="whereButton"> 
          <Image src={hulu} height={70}/>
        </button>
      </p>
    </div>
  )
}

function SubmitButton(){
  return(
    <div>
        <input type="button" class="button" value="add to a group"></input>
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

function MovieGrid() {
  return (
    <div className="borders">
      <Container>
        <Row>
          <Col className="headingColor">
          movie1
          <Image src={movie_poster} height={114} alt="movie_poster" thumbnail className="mr-2 my-2" />
          </Col>
          <Col>
          movie2
          <Image src={movie_poster} height={114} alt="movie_poster" thumbnail className="mr-2 my-2" />
          </Col>
          <Col>
          movie3
          <Image src={movie_poster} height={114} alt="movie_poster" thumbnail className="mr-2 my-2" />
          </Col>
          <Col>
          movie4
          <Image src={movie_poster} height={114} alt="movie_poster" thumbnail className="mr-2 my-2" />
          </Col>
        </Row>
      </Container>
    </div>
  )
}


export {Film, Crew, Cast};