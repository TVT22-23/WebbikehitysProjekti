import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { MovieGrid } from "./User";
import movie_poster from "../testikuvia/movie_poster.jpg"


//home page
function Home() {
  return (
    <div>
      <Container>
        <h1 className="mt-4" style={{ color: '#CA3e47', borderBottom: '1px solid #CA3E47' }}>Tervetuloa</h1>
        <Row>
          <h3 className="mt-4" style={{ color: '#CA3e47', borderBottom: '1px solid #CA3E47' }}>New</h3>
          <MovieGrid />
        </Row>
        <Row>
          <h3 className="mt-4" style={{ color: '#CA3e47', borderBottom: '1px solid #CA3E47' }}>Most popular</h3>
          <MovieGrid />
        </Row>
        <Row>
          <h3 className="my-4" style={{ color: '#CA3e47', borderBottom: '1px solid #CA3E47' }}>New reviews</h3>
          <ReviewGrid />
        </Row>
        <Row>
          <h3 className="mt-4" style={{ color: '#CA3e47', borderBottom: '1px solid #CA3E47' }}>News</h3>
          <NewsGrid />
        </Row>
      </Container>


    </div>
  )
}

//review grid, displays reviews
function ReviewGrid() {
  return (
    <Container>
      <Row>
        <Col>
          <Card style={{ width: '200px' }}>
            <Card.Img variant="top" src={movie_poster} />
            <Card.Body>
              <Card.Title>Review Title</Card.Title>
              <Card.Text>
                This is the firs few sentences of the review. Full review open with the button.
              </Card.Text>
              <Button variant="primary">Full review</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '200px' }}>
            <Card.Img variant="top" src={movie_poster} />
            <Card.Body>
              <Card.Title>Review Title</Card.Title>
              <Card.Text>
                This is the firs few sentences of the review. Full review open with the button.
              </Card.Text>
              <Button variant="primary">Full review</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '200px' }}>
            <Card.Img variant="top" src={movie_poster} />
            <Card.Body>
              <Card.Title>Review Title</Card.Title>
              <Card.Text>
                This is the firs few sentences of the review. Full review open with the button.
              </Card.Text>
              <Button variant="primary">Full review</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '200px' }}>
            <Card.Img variant="top" src={movie_poster} />
            <Card.Body>
              <Card.Title>Review Title</Card.Title>
              <Card.Text>
                This is the firs few sentences of the review. Full review open with the button.
              </Card.Text>
              <Button variant="primary">Full review</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

function NewsGrid() {
  return (
    <Row style={{alignItems:'stretch'}}>
      <Col>
        <Card className="ms-3" style={{ width: '400px', height:'200px' }}>
          <Card.Body>
            <Card.Title>News Title</Card.Title>
            <Card.Text>
              Summary of the news.
            </Card.Text>
            <Card.Link href="#" className="position-absolute bottom-0 start-0 m-2 ">News Link</Card.Link>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="ms-3 pos" style={{ width: '400px', height:'200px' }}>
          <Card.Body>
            <Card.Title>News Title</Card.Title>
            <Card.Text>
This summary is longer and so it will take more space on the card. And so I will write the lorem ipsum dontes rememberum mucheus elsius abutem lorem ipsum.
            </Card.Text>
            <Card.Link href="#" className="position-absolute bottom-0 start-0 m-2">News Link</Card.Link>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default Home;