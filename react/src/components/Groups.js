import { useParams } from "react-router-dom";
import { Col, Container, Image, Row, Form, Card } from 'react-bootstrap';
import { GroupName } from "./Group"
import { useState } from "react";
import {Popup} from "./Popup"
//const tmdb = require("../../../tmdb")
//tmdb.getDetails()
//require('dotenv').config();

function Groups() {
    return(
        <div>
        <Container>
            <h3 className="mt-4" style={{ color: '#CA3e47', borderBottom: '1px solid #CA3E47' }}>Omat ryhmät</h3>
          <Row>
            <OwnGroupGrid />
          </Row>
          <h3 className="mt-4" style={{ color: '#CA3e47', borderBottom: '1px solid #CA3E47' }}>Etsi ryhmiä</h3>
          <Row>
            <FindGroups />
          </Row>        
        </Container>

        </div>
    )
}

function OwnGroupGrid() {
    const groupID = "name";    
    const [buttonPopup, setButtonPopup] = useState(false);

    return(
        <div>
            <Row>
              <button class="groupBox" onClick={() => setButtonPopup(true)}>Create group</button>
                <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                  <h3>create group</h3>
                  <form>
                    <label>
                      Group name:
                      <input type="text" name="name" />
                    </label>
                  </form>
                </Popup>              
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