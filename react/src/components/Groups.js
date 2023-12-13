import { Link, useParams } from "react-router-dom";
import { Col, Container, Image, Row, Form, Card,} from 'react-bootstrap';
import { GroupName } from "./Group"
import { useEffect, useState } from "react";
import { Popup } from "./Popup"
import { jwtToken, } from "./Signals";
import { NotLoggedIn } from "./User";
import axios from "axios";
import { accountId } from "./Signals";



const Groups = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
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

  const filterGroups = groupsData.filter(group => {
    return ownGroups.some(ownGroup => ownGroup.group_groupid === group.group_id);   
  });

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
        <OwnGroupGrid filteredGroups={filterGroups} />
      </Row>
      <Row>
        <FindGroups groupsData={groupsData} ownGroups={ownGroups} />
      </Row>

    </div>
  );
};



function OwnGroupGrid({ filteredGroups }) {
  return (
    <div>
      <Row>
        {filteredGroups.map((group) => (
          <Link to={`/group/${group.group_id}`} className="groupBox" key={group.group_id}>
            {group.group_name}
          </Link>
        ))}
      </Row>
    </div>
  );
}

function FindGroups({groupsData, ownGroups}) {
  const [searchInput, setSearchInput] = useState('');
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get('/moviegroup/');
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = groupsData.filter(
      (group) =>
        group.group_name.toLowerCase().includes(searchInput.toLowerCase()) &&
        !ownGroups.some((ownGroup) => ownGroup.group_groupid === group.group_id)
    );
      setFilteredGroups(filtered);
  }, [searchInput, groups]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Row>
        <a></a>
      </Row>
      <Row>
        <div class="input-group rounded">
          <input type="search" class="form-control rounded w-25" placeholder="Search" aria-label="Search" aria-describedby="search-addon" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
          <span id="search-addon">
            <i class="fas fa-search"></i>
          </span>
        </div>
      </Row>
      <Row>
      {filteredGroups.map((group) => (
          <div key={group.group_id} className="groupBox">
          <span>{group.group_name}</span>
          <button onClick={() => handleRequestToJoin(group.group_id)}>Send Request</button>
        </div>
        ))}
      </Row>
    </div>
  )
}
function handleRequestToJoin(groupId){
  axios.post(`/memberRequest/create/${accountId.value}/${groupId}`);
  console.log("request sent!!!!");
}

export default Groups;