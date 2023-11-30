import { useParams } from "react-router-dom";
import { Col, Container, Image, Row, Form, Card } from 'react-bootstrap';
import { NewsGrid, ReviewGrid } from "./Home";
import prof_pic from '../testikuvia/prof_pic.jpg';

function Group() {


    return (
       <div>
        <Container>
          <Row> 
            <GroupName />  
            <Members />
          </Row>
          <Row>
          <h3 className="my-4" style={{ color: '#CA3e47', borderBottom: '1px solid #CA3E47' }}>News</h3>
            <NewsGrid />
            <NewsGrid />
          </Row>
          <Row>
          <h3 className="my-4" style={{ color: '#CA3e47', borderBottom: '1px solid #CA3E47' }}>Reviews</h3>
            <ReviewGrid />
          </Row>
          </Container>
        </div>
    )
}

function GroupName() {
    const groupID = "name";
    return(
        <div>
            <h class="groupBanner"> {groupID} </h>
        </div>
    )
}

function Members() {
  return(
    <div class="groupBanner">
        <Image src={prof_pic} rounded className=" my-2" />

    </div>
  )
}

export default Group;
export { GroupName }