import { Col, Container, Modal, Row, Image } from "react-bootstrap";
import movie_poster from '../testikuvia/movie_poster.jpg';
import { useEffect, useState } from "react";
import { FaStar } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

//testi dataa


//Fetch reviews with the review id
//   useEffect(() => {
//     axios.get("https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies")
//         .then(resp => setReview(resp.data.map(f => ({ Title: f.Title, Text: f.Text, Poster: f.Poster }))))
//         .catch(error => {
//             console.error('error fetching data', error);
//         })
// }, []);

//fetches review data
function ModalReview({ id, show, handleClose, review }) {
    // No need for local state, use the review prop directly

    // When modal is shown, review data is fetched
    const [path, setPath] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        if (show) {
            fetchMovieData(review.movie_id)
                .then(movieData => {
                    setPath(movieData.poster_path);
                    console.log(path);

                    // You can use the movie data as needed, perhaps to display additional information
                })
            // You can fetch data here if needed, or simply use the data passed through props
        }
    }, [show, id, review]);
    console.log('Final path:', path);
    return (
        <Modal
            size="lg"
            className="reviewModal"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
            onHide={handleClose}
        >
            <button onClick={() => navigate(`/film/${review.movie_id}`)} style={{ backgroundColor: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }}>
                {path && <Image src={`https://image.tmdb.org/t/p/w200${path}`} alt="movie_poster" className="imageframe" />}
            </button>

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    A review by {review?.user_name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col lg={8}>
                            <p> {review?.text_review}</p>
                            <StarRating rating={review?.rating} />
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <button className="button" onClick={handleClose}>
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    );
}
function StarRating({ rating }) {
    return (
        <div className="star-rating">
            {[...Array(5)].map((_, index) => (
                <FaStar
                    key={index}
                    size={20}
                    color={index + 1 <= rating ? "#ffc107" : "#e4e5e9"}
                />
            ))}
        </div>
    );
}

async function fetchMovieData(movieId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=3972673c7c2bf3c70fc1b5593e956b47`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movie data:', error);
        throw error;
    }
}
export default ModalReview
