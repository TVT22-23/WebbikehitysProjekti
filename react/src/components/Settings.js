import { Col, Form, Row } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { jwtToken } from "./Signals";
import { NotLoggedIn } from "./User";

function Settings() {
    return (
        <div>
            {/* if user is not logged in and there is no jwtToken, show NotLoggedIn */}
            {jwtToken.value.length === 0 ? <NotLoggedIn /> :
                <Row className="m-2">
                    <Col className="link-style">
                        <Link to={'usettings'} >User Settings</Link>
                    </Col>
                    <Col className="link-style">
                        <Link to={'gsettings'} >Group Settings</Link>
                    </Col>
                    <Outlet />
                </Row>
            }
        </div>
    )
}

//Usersettings function to be added to User()
function USettings() {

    const handleSubmit = (e) => {
        console.log(e);
        //form save to database?
    }

    return (
        <div>

            <h1 className="mt-3">User settings</h1>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group className="">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="jorma@maikkimaa.com" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Label>Change profile picture</Form.Label>
                        <Form.Control type="file" />
                    </Col>
                </Row>
                <Row>

                    <Form.Group>
                        <Form.Label> Profile's description</Form.Label>
                        <Form.Control className="m-0 mb-3 borders" style={{ background: '#414141', color: 'white' }} as="textarea" maxLength="200" rows={3} />
                    </Form.Group>
                    <button type="submit" className="button-style">Save changes</button>
                </Row>
            </Form>
        </div >
    )
}


//Group settings to be added to User()
function GSettings() {

    const handleSubmit = (e) => {
        console.log(e);
        //form save to database?
    }

    return (
        <div>
            <h1 className="mt-3"> Groups settings</h1>
            <Form onSubmit={handleSubmit}>

                <Form.Group>
                    <Form.Label> Profile's description</Form.Label>
                    <Form.Control className="m-0 borders" as="textarea" maxLength="200" rows={3} />
                </Form.Group>
                <Row>
                    <Col>
                        <button className="link-style">Create  group</button>
                    </Col>
                    <Col>
                        <button className="link-style">Remove  group</button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button className="link-style">Join  group</button>
                    </Col>
                    <Col>
                        <button className="link-style">Leave  group</button>
                    </Col>
                    <Col>
                        <button className="link-style">Invite user to group</button>
                    </Col>
                </Row>
                <button type="submit" className="link-style">Save changes</button>
            </Form>
        </div>
    )
}

export { GSettings, USettings, Settings };