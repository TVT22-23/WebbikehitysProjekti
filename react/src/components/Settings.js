import { Col, Form, Row, Button } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { jwtToken } from "./Signals";
import { NotLoggedIn } from "./User";
import { useState } from "react";
import axios from 'axios';


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

    const [user_name, setUser_name] = useState('');
    const [description, setDescription] = useState('');
    const [profpic, setProfpic] = useState(null);

    function handleSettingChanges() {
        const reader = new FileReader();
        reader.onload = function (event) {
            const arrayBuffer = event.target.result;
            const byteArray = new Uint8Array(arrayBuffer);

            const newUserSettings = new FormData();
            newUserSettings.append('user_name', user_name);
            newUserSettings.append('description', description);
            newUserSettings.append('profile_picture', byteArray);
            // newUserSettings.append('account_id'), accountId;

            axios.post('account/update', newUserSettings)

            console.log([...newUserSettings]);
        };
        if (profpic) {
            reader.readAsArrayBuffer(profpic);
        }
    }
    return (
        <div className="link-style">

            <h1 className="mt-3">User settings</h1>
            <Form onSubmit={event => {
                event.preventDefault();
            }}>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label> Change username</Form.Label>
                            <Form.Control
                                type="username"
                                placeholder={user_name}
                                autoFocus
                                value={user_name}
                                onChange={e => setUser_name(e.target.value)}
                            />

                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Label>Change profile picture</Form.Label>
                        <Form.Control
                            type="file"
                            placeholder="profile picture"
                            autoFocus
                            accept="image/*"
                            onChange={e => setProfpic(e.target.files[0])}
                        />
                    </Col>
                </Row>
                <Row className="mt-2">

                    <Form.Group>
                        <Form.Label>Change profile's description</Form.Label>
                        <Form.Control className="m-0 mb-3 borders" style={{ background: '#414141', color: 'white' }}
                            as="textarea"
                            maxLength="200" rows={3}
                            value={description}
                            autoFocus
                            onChange={e => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" className="mt-1" onClick={handleSettingChanges}> Save Changes</Button>
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
        <div className="link-style">
            <h1 className="mt-3"> Groups settings</h1>
            <Form onSubmit={handleSubmit}>

                <Form.Group>
                    <Form.Label> Profile's description</Form.Label>
                    <Form.Control className="m-0 borders" as="textarea" maxLength="200" rows={3} />
                </Form.Group>
                <Row>
                    <Col>
                        <button >Create  group</button>
                    </Col>
                    <Col>
                        <button >Remove  group</button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button >Join  group</button>
                    </Col>
                    <Col>
                        <button >Leave  group</button>
                    </Col>
                    <Col>
                        <button >Invite user to group</button>
                    </Col>
                </Row>
                <button type="submit" >Save changes</button>
            </Form>
        </div>
    )
}

export { GSettings, USettings, Settings };