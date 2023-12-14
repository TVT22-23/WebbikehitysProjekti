import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
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

  
  const isGroupOwner = groupData.owner_id === accountId.value;
  console.log("AccVal:", accountId.value, "Owner:", groupData.owner);
  
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
        {isGroupOwner && <MemberRequests/>}
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
        <a key={member.member_id} href={`/user/${member.account_accountid}`}>
          <img className="member" src={prof_pic} alt={`Profile of ${member.account_accountid}`} />
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

function MemberRequests(){
  return(
    <Container>
      <Row>
        <p>Liibalaaba request</p>
        <p>Liibalaaba request</p>
        <p>Liibalaaba request</p>
        <p>Liibalaaba request</p>
      </Row>
    </Container>
  )
}


export default Group;
export { GroupName };