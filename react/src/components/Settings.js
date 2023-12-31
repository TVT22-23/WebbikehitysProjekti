import { Col, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Uname, accountId, jwtToken } from "./Signals";
import { NotLoggedIn } from "./User";
import { useState, useEffect } from "react";
import axios from 'axios';

function Settings() {

    return (
        <div>
            {/* if user is not logged in and there is no jwtToken, show NotLoggedIn */}
            {jwtToken.value.length === 0 ? <NotLoggedIn prompt={'see account settings'} /> :
                <Row className="m-2">
                    <USettings />
                </Row>
            }
        </div>
    )
}

//Usersettings function to be added to User()
function USettings() {

    const [NewUser_name, setNewUser_name] = useState(Uname);
    const [description, setDescription] = useState('Add you own damn description');
    const [profpic, setProfpic] = useState([]);
    const navigate = useNavigate();


    //get and set desc
    useEffect(() => {
        axios.get('/account/get?user_name=' + Uname)
            .then(resp => {
                setDescription(resp.data[0].description);
                console.log(resp.data[0]);
            })
    }, [])


    function handleDeleteUser() {
        axios.delete('account/delete/' + Uname)
            .then(resp => {
                navigate(`/`);
                jwtToken.value = '';
                alert('account ' + Uname + ' deleted')
            })
    }

    async function handleSettingChanges() {
        const reader = new FileReader();
        reader.onload = async function (event) {
            const byteArray = new Uint8Array(event.target.result);


            const newUserSettings = new FormData();
            newUserSettings.append('user_name', NewUser_name);
            newUserSettings.append('profile_picture', byteArray);
            newUserSettings.append('description', description);
            newUserSettings.append('account_id', accountId);

            try {
                await axios.post('account/update', newUserSettings);
                console.log('Update successful');
                alert('User settings updated succesfully')
            } catch (error) {
                console.error('Error updating settings:', error);
            }
        };


        reader.readAsArrayBuffer(profpic);
    }

    return (
        <div className="link-style">

            <h1 className="mt-3">User settings</h1>
            <p style={{color:'#2b2b2b'}}>Always select your profile picture or suffer the consequences</p>
            <Form onSubmit={event => {
                event.preventDefault();
            }}>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label> Change username</Form.Label>
                            <Form.Control
                                type="username"
                                placeholder={NewUser_name}
                                autoFocus
                                value={NewUser_name}
                                onChange={e => setNewUser_name(e.target.value)}
                            />

                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Label>Change profile picture</Form.Label>
                        <Form.Control
                            type="file"
                            placeholder="profile picture"
                            autoFocus
                            accept=".jpg, .jpeg"
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
                            onChange={e => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" className="mt-1" onClick={handleSettingChanges}> Save Changes</Button>
                    <Button onClick={handleDeleteUser}>Delete user</Button>
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