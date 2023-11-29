import { useParams } from "react-router-dom";
import { Col, Container, Image, Row, Form, Card } from 'react-bootstrap';
import { GroupName } from "./Group"

function Groups(){
    return(
        <div>
        <Container>
            jou jou jou, mikäö meininki
            saatana taistwelu paska
          <Row>
            <OwnGroupGrid />
          </Row>
          <Row>
            <FindGroups />
          </Row>
        </Container>
        </div>
    )
}

function OwnGroupGrid(){
    const groupID = "name";
    return(
        <div>
            <Row>
              <a href="group" class= "groupBox"> {groupID} </a>
              <a href="group" class= "groupBox"> {groupID} </a>
              <a href="group" class= "groupBox"> {groupID} </a>
              <a href="group" class= "groupBox"> {groupID} </a>
              <a href="group" class= "groupBox"> {groupID} </a>
              <a href="group" class= "groupBox"> {groupID} </a>
              <a href="group" class= "groupBox"> {groupID} </a>
              <a href="group" class= "groupBox"> {groupID} </a>

            </Row>
        </div>
    )
}

function FindGroups() {
    const groupID = "name";
    return(
        <div>
            <Row>
              <a href="group" class= "groupBox">{groupID}</a>
            </Row>
        </div>
    )
}

export default Groups;