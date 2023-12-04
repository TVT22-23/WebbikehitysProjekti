import { Col, Container, Modal, Row } from "react-bootstrap";

function ModalToGroup({ show, handleClose }) {

        return (
            //a modal view of the review when button is clicked
            <Modal size="lg" className="reviewModal"
            aria-labelledby="contained-modal-title-vcenter"
            centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Valitse ryhmä
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <button class="addToGroup" onClick={alert}>ryhmä mihinkä kuulun</button>
                            <button class="addToGroup">tääl sama</button>
                            <button class="addToGroup">ja tääl</button>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <button className="button" onClick={handleClose}>Close</button>
                </Modal.Footer>
            </Modal>
        );
    }

    export default ModalToGroup;