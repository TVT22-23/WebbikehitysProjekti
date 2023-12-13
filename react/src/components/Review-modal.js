import { Col, Container, Modal, Row } from "react-bootstrap";
import movie_poster from '../testikuvia/movie_poster.jpg';
import { useEffect, useState } from "react";
import { FaStar } from 'react-icons/fa';

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
    useEffect(() => {
        if (show) {
            // You can fetch data here if needed, or simply use the data passed through props
        }
    }, [show, id, review]);

    return (
        <Modal
            size="lg"
            className="reviewModal"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {review?.user_name} {id}
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
export default ModalReview
