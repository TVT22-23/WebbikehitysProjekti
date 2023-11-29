import { useParams } from "react-router-dom";
import { Col, Container, Image, Row, Form, Card } from 'react-bootstrap';
import { GroupName } from "./Group"
import { useState } from "react";
import {Popup} from "./Popup"

function Groups(){
    const [buttonPopup, setButtonPopup] = useState(false);
    return(
        <div>
        <Container>
            jou jou jou, mikäö meininki
            saatana taistwelu paska
            <h3 className="mt-4" style={{ color: '#CA3e47', borderBottom: '1px solid #CA3E47' }}>Omat ryhmät</h3>
          <Row>
            <OwnGroupGrid />
          </Row>
          <h3 className="mt-4" style={{ color: '#CA3e47', borderBottom: '1px solid #CA3E47' }}>Etsi ryhmiä</h3>
          <Row>
            <FindGroups />
          </Row>
        </Container>
        <button onClick={() => setButtonPopup(true)}>open popup</button>

        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            <h3>my popup</h3>
        </Popup>
        </div>
    )
}

function OwnGroupGrid(){
    const groupID = "name";
    return(
        <div>
            <Row>
              <a href="" class= "groupBox"> Create group </a>
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
            <div class="input-group rounded">
              <input type="search" class="form-control rounded w-25" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                <span id="search-addon">
                <i class="fas fa-search"></i>
                </span>
            </div>
              <a href="group" class= "groupBox">{groupID}</a>
              <a href="group" class= "groupBox">{groupID}</a>
              <a href="group" class= "groupBox">{groupID}</a>
              <a href="group" class= "groupBox">{groupID}</a>
              <a href="group" class= "groupBox">{groupID}</a>
              <a href="group" class= "groupBox">{groupID}</a>

            </Row>
        </div>
    )
}

export default Groups;