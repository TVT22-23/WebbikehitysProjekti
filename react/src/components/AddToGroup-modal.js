import axios from "axios";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { jwtToken } from "./Signals";


function ModalToGroup({ show, handleClose, onAddToGroup}) {
    const [groupsData, setGroupsData] = useState([]);
    const [ownGroups, setOwnGroups] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/movieGroup/');
                setGroupsData(response.data);
                console.log("All groups: ", response.data);
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };
        const fetchOwnGroups = async () => {
            try {
                const ownGroupsResponse = await axios.get(`/member/groups`, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                });
                setOwnGroups(ownGroupsResponse.data);
                console.log("Own groups: ", ownGroupsResponse.data);
            } catch (error) {
                console.error('Error fetching own groups:', error);
            }
        }


        fetchData();
        fetchOwnGroups();

    }, []);

    const filteredGroups = groupsData.filter(group => {
        return ownGroups.some(ownGroup => ownGroup.group_groupid === group.group_id);
    });

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
                        {filteredGroups.map((group) => (
                            <button
                                key={group.group_id}className="addToGroup" onClick={() => onAddToGroup(group.group_id)}>{group.group_name}
                            </button>
                        ))}
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