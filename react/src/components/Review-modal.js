import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import movie_poster from '../testikuvia/movie_poster.jpg';
import { useEffect, useState } from "react";

//testi dataa
const mockReviews = [
    { id: 1, title: 'Movie 1', poster:  movie_poster , review: 'paska leffa' },
    { id: 2, title: 'Movie 2', poster:  movie_poster , review: 'paskempi leffa' },
    { id: 3, title: 'Movie 3', poster:  movie_poster , review: 'paskin leffa' },
    { id: 4, title: 'Movie 4', poster:  movie_poster , review: 'paske leffa' },
];

//Fetch reviews with the review id
//   useEffect(() => {
//     axios.get("https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies")
//         .then(resp => setReview(resp.data.map(f => ({ Title: f.Title, Text: f.Text, Poster: f.Poster }))))
//         .catch(error => {
//             console.error('error fetching data', error);
//         })
// }, []);

//fetches review data and 
function ModalReview({ id, show, handleClose }) {

    const [review, setReview] = useState(null);

        //when modal is shown review data is fetched
        useEffect(() => {
            if (show) {
                const foundReview = mockReviews.find((r) => r.id === id);
                setReview(foundReview);
            }

        }, [show, id]);

        return (
            //a modal view of the review when button is clicked
            <Modal size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {review?.title} {id}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col lg={4}>
                                <img src={review?.poster} alt={" why no show"} style={{ maxWidth: '100%' }} />
                            </Col>
                            <Col lg={8}>
                                <p> {review?.review}</p>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    export default ModalReview;