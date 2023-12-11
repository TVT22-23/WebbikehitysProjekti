import { useParams } from "react-router-dom";
import { Col, Container, Image, Row, Form, Card } from 'react-bootstrap';
import { GroupName } from "./Group"
import { useState } from "react";
import { Popup } from "./Popup"
import { jwtToken } from "./Signals";
import { NotLoggedIn } from "./User";
import axios from "axios";
 
const Groups = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateGroup = async () => {
      // You should include your secret key in the headers
      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      try {
        await axios.post('/movieGroup/create', {
          group_name: groupName,
          description: description,
        }, { headers });

          // Add any additional logic after creating the group (e.g., closing the popup)
          setButtonPopup(false);
      } catch (error) {
          console.error('Error creating group:', error);
      }
  };

  return (
      <div>
          <Row>
              <button className="groupBox" onClick={() => setButtonPopup(true)}>
                  Create group
              </button>
              <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                  <h3>Create group</h3>
                  <form>
                      <label>
                          Group name:
                          <input
                              type="text"
                              name="name"
                              value={groupName}
                              onChange={(e) => setGroupName(e.target.value)}
                          />
                      </label>
                      <Row>
                          <textarea
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                          >
                              Description
                          </textarea>
                      </Row>
                      <button type="button" onClick={handleCreateGroup}>
                          Create Group
                      </button>
                  </form>
              </Popup>
          </Row>
          <Row>
          <OwnGroupGrid/>
          </Row>
          <Row>
          <FindGroups/>
          </Row>
          
      </div>
  );
};



function OwnGroupGrid() {
  const groupID = "name";
  const [buttonPopup, setButtonPopup] = useState(false);

  return (
    <div>
      <Row>
        <a href="group" class="groupBox"> {groupID} </a>
        <a href="group" class="groupBox"> {groupID} </a>
        <a href="group" class="groupBox"> {groupID} </a>
        <a href="group" class="groupBox"> {groupID} </a>
        <a href="group" class="groupBox"> {groupID} </a>
        <a href="group" class="groupBox"> {groupID} </a>
        <a href="group" class="groupBox"> {groupID} </a>
        <a href="group" class="groupBox"> {groupID} </a>
      </Row>
    </div>
  )
}

function FindGroups() {
  const groupID = "name";
  return (
    <div>
      <Row>
        <div class="input-group rounded">
          <input type="search" class="form-control rounded w-25" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
          <span id="search-addon">
            <i class="fas fa-search"></i>
          </span>
        </div>
        <a href="group" class="groupBox">{groupID}</a>
        <a href="group" class="groupBox">{groupID}</a>
        <a href="group" class="groupBox">{groupID}</a>
        <a href="group" class="groupBox">{groupID}</a>
        <a href="group" class="groupBox">{groupID}</a>
        <a href="group" class="groupBox">{groupID}</a>

      </Row>
    </div>
  )
}

export default Groups;