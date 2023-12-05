import { Link, Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Col, Container, Image, Row, Form } from 'react-bootstrap';
import movie_poster from '../testikuvia/movie_poster.jpg';
import disney from '../testikuvia/disney.png'
import hbo from '../testikuvia/hbo.png'
import hulu from '../testikuvia/hulu.png'
import netflix from '../testikuvia/netflix.png'
import prime from '../testikuvia/prime.png'
import { useNavigate } from "react-router-dom";





function Film() {
  const { filmID } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const getActors = (url) => {
    return fetch(url)
      .then(res => res.json())
      .then(data => {
        const actors = data.cast.slice(0, 5);
        const director = data.crew.find(crew => crew.job === 'Director');

        return {
          actors,
          director: director ? director.name : null
        };
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    // Fetch movie details using the filmID
    fetch(`https://api.themoviedb.org/3/movie/${filmID}?api_key=3972673c7c2bf3c70fc1b5593e956b47`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
        getActors(`https://api.themoviedb.org/3/movie/${filmID}/credits?api_key=3972673c7c2bf3c70fc1b5593e956b47`)
        .then(({ actors, director }) => {
          setMovie(prevState => ({
            ...prevState,
            actors,
            director
          }));
        });
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });

      fetch(`https://api.themoviedb.org/3/movie/${filmID}/similar?api_key=3972673c7c2bf3c70fc1b5593e956b47`)
      .then((response) => response.json())
      .then((data) => {
        // Update state with the fetched similar movies
        setSimilarMovies(data.results);
        
      })
      .catch((error) => {
        console.error("Error fetching similar movies:", error);
      });
  }, [filmID]);

  if (!movie) {

    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie_poster" className="imageframe" />
          <div className="people">
            <div className="crew">
              <h4>Director</h4>
              <li>{movie.director}</li>
            </div>
            <div className="cast">
            <h4>Cast</h4>
          <ul>
            {movie.actors && movie.actors.map(actor => (
              <li key={actor.id}>{actor.name}</li>
            ))}
          </ul>
            </div>
          </div>
        </Col>
        <Col>
          <FilmInfo movie={movie} />
          <div>Leave a review</div>
          <Review />
          <div>Where to watch</div>
          <WhereToWatch />
        </Col>
        <Row>
          <Col>
            <div>Similar movies
            <h4>Similar Movies</h4>
            {/* Use the SimilarMovieGrid component */}
            <MovieGrid similarMovies={similarMovies} />
            </div>
            <MovieGrid />
          </Col>
        </Row>
      </Row>
    </Container>
  );
}

function FilmInfo({ movie }) {
  return (
    <div className="movieInfo">
      <h1>{movie.title}</h1> {/* Replace with actual property from your API */}
      <h>Director: {movie.director}</h> {/* Replace with actual property from your API */}
      <br />
      <h>Release Year: {movie.release_year}</h> {/* Replace with actual property from your API */}
      <br />
      <p1>{movie.overview}</p1> {/* Replace with actual property from your API */}
    </div>
  );
}

function WhereToWatch(){
  return(
    <div>
      <p className="watch">
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

function Review(){
  return(
      <div class="review">
        <form>
          <textarea></textarea>
        </form>
        <Row>
        <SubmitButton />
        <AddToGroupButton />
        </Row>
    </div>
  )
}

function SubmitButton(){
  return(
    <div>
        <input type="button" class="button" value="save review"></input>
    </div>
  )
}

function AddToGroupButton(){
  return(
    <div>
        <input type="button" class="button" value="add to a group"></input>
    </div>
  )
}

function Cast(){
  return(
    <div>
      <h4>People who acted in the movie</h4>
      <li>Kasper</li>
      <li>Jesper</li>
      <li>Niko</li>
    </div>
  )
}

function Crew(){
  return(
    <div>
      <h4>People Who made the movie</h4>
      <li>MAtti</li>
      <li>Jorma</li>
      <li>Jaska</li>
    </div>
  )
}


function MovieGrid({ similarMovies }) {
  // Add a guard clause to check if similarMovies is defined
  if (!similarMovies || similarMovies.length === 0) {
    return <p>No similar movies available.</p>;
  }

  // Limit the display to only 5 similar movies
  const limitedSimilarMovies = similarMovies.slice(0, 5);

  return (
    <div className="borders">
      <Container>
        <Row>
          {limitedSimilarMovies.map((movie) => (
            <Col key={movie.id} className="headingColor">
              {movie.title}
              <Image
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                height={114}
                alt={movie.title}
                thumbnail
                className="mr-2 my-2"
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export {Film, Crew, Cast};
