import { Link, Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Col, Container, Image, Row, Form, Card, Button } from 'react-bootstrap';
import ModalReview from "./Review-modal";
import movie_poster from '../testikuvia/movie_poster.jpg';
import disney from '../testikuvia/disney.png'
import hbo from '../testikuvia/hbo.png'
import hulu from '../testikuvia/hulu.png'
import netflix from '../testikuvia/netflix.png'
import prime from '../testikuvia/prime.png'
import ModalToGroup from "./AddToGroup-modal";
import { useNavigate } from "react-router-dom";
import { MovieCard } from "./SearchFilms";
import { FaStar } from 'react-icons/fa'
import axios from "axios";
import { accountId, jwtToken } from "./Signals";
import { NotLoggedIn } from "./User";


function Film() {
  const { filmID } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [watchProviders, setWatchProviders] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([]);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (reviewId, reviewData) => {
    setSelectedReviewId(reviewId);
    setSelectedReview(reviewData);
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setSelectedReviewId(null);
    setSelectedReview(null);
    setIsModalOpen(false);
  };
  const handleReviewChange = (event) => {
    setReviewText(event.target.value);
  };
  const handleSaveReview = () => {
    console.log("Value: ", jwtToken.value);
    const reviewData = {
      text_review: reviewText,
      rating: 8.5,
      recommend: null,
      movie_id: filmID,
    };
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
    };

    axios.post('/review/addReview', reviewData, { headers })
      .then((response) => {

        console.log('Review saved successfully:', response.data);
      })
      .catch((error) => {

        console.error('Error saving review:', error);
      });
  };
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
  const getWatchProviders = (url) => {
    fetch(url).then(res => res.json()).then(data => {
      if ("FI" in data.results) {
        const fiData = data.results.FI;
        setWatchProviders(fiData.flatrate);
      }
      else {
        console.log("no data awailable");
      }
    })
      .catch(error => {
        console.error("Error fetching providers:", error);
      });

  }

  function handleAddFavourites() {
    const favMovies = new FormData();
    favMovies.append('fav_account_id', accountId);
    favMovies.append('movie_id', filmID);

    axios.post('favoriteMovie/create', favMovies)
  }

  function handleDeleteFavourites() {
    axios.delete('favoriteMovie/deleteSpecific/' + accountId + '/' + filmID);
  }

  useEffect(() => {
    if (!filmID) {
      return; // Don't proceed if filmID is undefined
    }
    console.log("Fetching reviews for film ID:", filmID);
    // Fetch movie details using the filmID
    fetch(`https://api.themoviedb.org/3/movie/${filmID}?api_key=3972673c7c2bf3c70fc1b5593e956b47`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
        getWatchProviders(`https://api.themoviedb.org/3/movie/${filmID}/watch/providers?api_key=3972673c7c2bf3c70fc1b5593e956b47`)
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
    axios.get(`/review/movie/${filmID}`)
      .then((response) => {
        console.log("Reviews:", response.data);
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
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
          <Button onClick={handleAddFavourites}>Add to favourites</Button>
          <Button onClick={handleDeleteFavourites}>Delete from favourites</Button>
        </Col>

        <Col>
          <FilmInfo movie={movie} />
          <div>Leave a review</div>

          <div>
            {/* if user is not logged in and there is no jwtToken, show NotLoggedIn */}
            {jwtToken.value.length === 0 ? <NotLoggedIn /> :
              <div className="review">
                <form>
                  <textarea value={reviewText} onChange={handleReviewChange}></textarea>
                </form>
                <Row>
                  <Rating />
                  <SubmitButton onSaveReview={handleSaveReview} />
                  <AddToGroupButton />
                  <Col />
                </Row>
              </div>
            }
          </div>

          <div>
            <h4>Where to watch</h4>
            <p className="watch">
              {watchProviders && watchProviders.map(provider => (
                <button key={provider.provider_id} className="whereButton">
                  <Image src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} height={70} alt={provider.provider_name} />
                </button>
              ))}
            </p>
          </div>
        </Col>
        <Row>
          <Col>
            <div>
              <h4>Similar Movies</h4>
              <MovieGrid similarMovies={similarMovies} />
            </div>
            <MovieGrid />
          </Col>
        </Row>
        <Col>
          <div>
            <h4>Reviews</h4>
            <div className="reviews">
            <ReviewGrid openModal={openModal} reviews={reviews} />
            <ModalReview id={selectedReviewId} show={isModalOpen} handleClose={closeModal} review={selectedReview} />
          </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

function Rating() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (

    <div className="">
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => setRating(currentRating)}
            />
            <FaStar
              className='star'
              size={50}
              color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  )
}

function FilmInfo({ movie }) {
  return (
    <div className="movieInfo">
      <h1>{movie.title}</h1> {/* Replace with actual property from your API */}
      <h1>Director: {movie.director}</h1> {/* Replace with actual property from your API */}
      <br />
      <br />
      <p>{movie.overview}</p> {/* Replace with actual property from your API */}
    </div>
  );
}

function WhereToWatch() {
  return (
    <div>
      <p className="watch">
        <button className="whereButton">
          <Image src={netflix} height={70} />
        </button>
        <button className="whereButton">
          <Image src={disney} height={70} />
        </button>
        <button className="whereButton">
          <Image src={prime} height={70} />
        </button>
        <button className="whereButton">
          <Image src={hbo} height={70} />
        </button>
        <button className="whereButton">
          <Image src={hulu} height={70} />
        </button>
      </p>
    </div>
  )
}

function Review() {
  return (
    <div className="review">
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

function SubmitButton({ onSaveReview }) {
  return (
    <div>
      <input
        type="button"
        className="button"
        value="Save Review"
        onClick={onSaveReview}
      />
    </div>
  );
}


function AddToGroupButton() {
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
    <div>
      <button className="button" onClick={() => handleShow(1)}>Add to a group</button>
      <ModalToGroup id={reviewID} show={showModal} handleClose={handleClose} />
    </div>
  )
}

function Cast() {
  return (
    <div>
      <h4>People who acted in the movie</h4>
      <li>Kasper</li>
      <li>Jesper</li>
      <li>Niko</li>
    </div>
  )
}

function Crew() {
  return (
    <div>
      <h4>People Who made the movie</h4>
      <li>MAtti</li>
      <li>Jorma</li>
      <li>Jaska</li>
    </div>
  )
}


function MovieGrid({ similarMovies }) {
  const navigate = useNavigate();
  const handleMovieClick = (movieID) => {
    // Use navigate to go to the Film component with the clicked movieID
    navigate(`/film/${movieID}`);
  };
  // Add a guard clause to check if similarMovies is defined
  if (!similarMovies || similarMovies.length === 0) {
    return;
  }

  // Limit the display to only 4 similar movies
  const limitedSimilarMovies = similarMovies.slice(0, 4);

  return (
    <div className="borders">
      <Container>
        <Row>
          {limitedSimilarMovies.map((movie) => (
            <Col key={movie.id} onClick={() => handleMovieClick(movie.id)} style={{ width: 'fit-content' }} className="headingColor">

              <MovieCard
                ID={movie.id}
                Title={movie.title}
                Poster={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                Rating={movie.vote_average}

              />


            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

function ReviewGrid({ reviews }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const handleShow = (review) => {
    setSelectedReview(review);
    setShowModal(true);
  };

  const handleClose = () => {
    setSelectedReview(null);
    setShowModal(false);
  };

  return (
    <Container>
      <Row>
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <Col key={review.review_id}>
              <Card style={{ display: 'flex', float: 'left', overflow: 'hidden', width: '200px', height: '230px', padding: '10px', marginTop: '10px', marginBottom: '10px', backgroundColor: '#414141', color: 'var(--fourth-color)' }}>
                {/* Use correct property names */}
                <Card.Title>{review.user_name}</Card.Title>
                <Card.Text>{review.text_review}</Card.Text>
                <button className="position-absolute bottom-0 start-0 m-2" style={{ borderRadius: '10px', padding: '7px', width: 'fit-content' }} onClick={() => handleShow(review)}>
                  Full review
                </button>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>No reviews available.</p>
          </Col>
        )}
      </Row>
      {selectedReview && (
        <ModalReview id={selectedReview.review_id} show={showModal} handleClose={handleClose} review={selectedReview} />
      )}
    </Container>
  );
}

export { Film, Crew, Cast, MovieGrid };
