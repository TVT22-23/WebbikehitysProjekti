import { useParams } from "react-router-dom";
import { Col, Container, Image, Row, Form, Card } from 'react-bootstrap';
import { NewsGrid, ReviewGrid } from "./Home";

function Group() {


    return (
       <div>
          <Row> 
            <h1>Group with id </h1>
            <GroupName />  
          </Row>
          <Row>
          <h3 className="my-4" style={{ color: '#CA3e47', borderBottom: '1px solid #CA3E47' }}>Saved reviews</h3>
            <NewsGrid />
            <NewsGrid />
          </Row>
          <Row>
          <h3 className="my-4" style={{ color: '#CA3e47', borderBottom: '1px solid #CA3E47' }}>News</h3>
            <ReviewGrid />
          </Row>
        </div>
    )
}

function GroupName() {
    const {groupID} = useParams();
    return(
        <div>
            <h class="groupBanner"> Group {groupID} </h>
        </div>
    )
}

export default Group;