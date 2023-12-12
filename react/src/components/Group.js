import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import { NewsGrid, ReviewGrid } from './Home';
import prof_pic from '../testikuvia/prof_pic.jpg';

function Group() {
  const { groupId } = useParams();
  console.log(groupId);
  const [groupData, setGroupData] = useState(null);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await axios.get(`/movieGroup/${groupId}`); // Replace with your API endpoint
        setGroupData(response.data[0]);
      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    };

    fetchGroupData();
  }, [groupId]);
  if (!groupData) {
    return <div>Loading...</div>; // You can render a loading indicator or handle the loading state
  }
  console.log("data: ", groupData);
  return (
    <div>
      <Container>
        <Row>
          <GroupName groupName={groupData.group_name} />
          <Members />
        </Row>
        {/* Rest of your component */}
      </Container>
    </div>
  );
}

function GroupName({ groupName }) {
  console.log("NAme:",groupName);
  return (
    <div>
      <h class="groupBanner">{groupName}</h>
    </div>
  );
}

function Members() {
  return (
    <div class="groupBanner">
      <a href="user">
        <img class="member" src={prof_pic} alt="Profile" />
      </a>
      {/* Add more member components based on your data */}
    </div>
  );
}

export default Group;
export { GroupName };