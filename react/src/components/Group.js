import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import { NewsGrid, ReviewGrid } from './Home';
import prof_pic from '../testikuvia/prof_pic.jpg';
import { Col, Card } from 'react-bootstrap';
import ModalReview from './Review-modal'
import { accountId } from './Signals';


function Group() {
  const { groupId } = useParams();
  console.log(groupId);
  console.log("AccoundId in group: ", accountId.value);
  const [groupData, setGroupData] = useState(null);
  const [memberData, setMemberData] = useState(null);
  const [reviewData, setReviewData] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [requestData, setRequestData] = useState(null);
  const handleShowReviewModal = (review) => {
    setSelectedReview(review);
    setShowReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setSelectedReview(null);
    setShowReviewModal(false);
  };

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await axios.get(`/movieGroup/${groupId}`);
        setGroupData(response.data[0]);
      } catch (error) {
        console.error('Error fetching group data:', error);
      }
      
    };
    const fetchMemberData = async () => {
      try {
        const response = await axios.get(`/member/${groupId}`);
        setMemberData(response.data);
      } catch (error) {
        console.error('Error fetching member data:', error);
      }
    };
    const fetchReviewData = async () => {
      try {
        const response = await axios.get(`/review/group/${groupId}`)
        setReviewData(response.data);
      } catch (error) {
        console.error('Error fetching review data:', error);
      }
    }
    const fetchRequestData = async () => {
      try {
        const response = await axios.get(`/memberRequest/${groupId}`);
        const requestDataWithNames = await Promise.all(
          response.data.map(async (request) => {
            try {
              const accountIdInt = parseInt(request.account_accountid, 10);
              const accountResponse = await axios.get(`/account/${accountIdInt}`);
              const userArray = accountResponse.data;
              const senderName = userArray.length > 0 ? userArray[0].user_name : null;
              return senderName
                ? { ...request, senderName }  // Spread the existing request properties and add senderName
                : null;
            } catch (error) {
              console.error('Error fetching account data:', error);
              return null;
            }
          })
        );
    
        // Remove any entries that have null (sender name not found)
        const filteredRequestData = requestDataWithNames.filter(Boolean);
    
        setRequestData(filteredRequestData);
      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    };
    
        // Remove any entries that have null (sender name not found)
    fetchRequestData();
    fetchMemberData();
    fetchGroupData();
    fetchReviewData();
   
  }, [groupId]);
  if (!groupData) {
    return <div>Loading...</div>;
  }
  if (!memberData) {
    return <div>Loading...</div>;
  }
  if (!requestData) {
    return <div>Loading...</div>;
  }

  console.log("Testiiii", requestData);
  console.log("Request:", requestData);
  console.log("AccVal:", accountId.value, "Owner:", groupData.owner);

  
  console.log("Type of groupData.owner:", typeof groupData.owner);
  console.log("Type of accountId.value:", typeof accountId.value);
  if (groupData.owner && parseInt(groupData.owner, 10) === parseInt(accountId.value, 10)) {
    console.log("You are the owner");
    
  }
  const isGroupOwner =parseInt(groupData.owner, 10) === parseInt(accountId.value, 10);

  return (
    <div>
      <Container>
        <Row>
          <GroupName groupName={groupData.group_name} />
          <Members memberData={memberData} />
        </Row>
        <Row>
          <Row>
            <Col className="borders m-3">
              {groupData.description}
            </Col>
          </Row>
          <GeviewGrid reviewData={reviewData} openModal={handleShowReviewModal} />
          {selectedReview && (
            <ModalReview
              id={selectedReview.review_id}
              show={showReviewModal}
              handleClose={handleCloseReviewModal}
              review={selectedReview}
            />
          )}
        </Row>
        <Row>
          {isGroupOwner &&<MemberRequests memberRequests={requestData}/>}
        </Row>
         
      </Container>
    </div>
  );
}

function GroupName({ groupName }) {
  return (
    <div>
      <h class="groupBanner">{groupName}</h>
    </div>
  );
}

function Members({ memberData }) {
  console.log("Members: ", memberData);
  return (
    <div class="groupBanner">
      {memberData.map((member) => (
        <a key={member.member_id} href={`/user/${member.member_id}`}>
          <img className="member" src={prof_pic} alt={`Profile of ${member.member_id}`} />
        </a>
      ))}
    </div>
  );
}

function GeviewGrid({ reviewData, openModal }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const handleShow = (review) => {
    setSelectedReview(review);
    setShowModal(true);
  };

  const handleClose = () => {
    setSelectedReview(null);
    setShowModal(false);
  };

  return (
    <Container>
      <Row>
        {reviewData && reviewData.length > 0 ? (
          reviewData.map((review) => (
            <Col key={review.review_id}>
              <Card style={{ width: '200px', backgroundColor: '#414141', color: 'var(--fourth-color)' }}>
                {/* Use correct property names */}
                <Card.Title>{review.user_name}</Card.Title>
                <Card.Text>{review.text_review}</Card.Text>
                <button style={{ padding: '7px', width: 'fit-content' }} onClick={() => openModal(review)}>
                  Full review
                </button>
              </Card>
            </Col>
          ))) : (
          <Col>
            <p>No reviews available.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
}

function MemberRequests({ memberRequests }) {
  const handleActionClick = async (requestId, action) => {
    console.log(`Request ${requestId} - ${action}`);
    try {
      if (action === 'accept') {
        await axios.post(`/memberRequest/accept/${requestId}`);
        console.log(`Request ${requestId} accepted successfully.`);
      } else if (action === 'reject') {
        await axios.post(`/memberRequest/reject/${requestId}`);
        console.log(`Request ${requestId} rejected successfully.`);
      }
      // Optionally, you can handle state updates or perform other actions after accepting/rejecting.
    } catch (error) {
      console.error(`Error ${action}ing request ${requestId}:`, error);
    }
  }
  return (
    <div>
      <h>Member Requests</h>
      <Container>
        <Row>
          {memberRequests.map((request) => (
            <Col key={request.request_id}>
              <Card style={{ width: '200px', backgroundColor: '#414141', color: 'var(--fourth-color)' }}>
                <Card.Title>{`Request from ${request.senderName || 'Unknown Sender'}`}</Card.Title>
                {/* Add other details if needed */}
                <button
                  style={{ padding: '7px', width: 'fit-content', marginRight: '5px' }}
                  onClick={() => handleActionClick(request.request_id, 'accept')}
                >
                  Accept
                </button>
                <button
                  style={{ padding: '7px', width: 'fit-content' }}
                  onClick={() => handleActionClick(request.request_id, 'reject')}
                >
                  Reject
                </button>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Group;
export { GroupName };