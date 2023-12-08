import { useState } from "react";
import axios from "axios";
import { jwtToken } from "./Signals";
import { Button, Form, Modal } from "react-bootstrap";

function LoginForm() {

    const [show, setShow] = useState(false);
    const [user_name, setUser_name] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    
    //show or close the account creation modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function login() {
        //post user_name and password as formdata
        const loginData = new FormData();
        loginData.append('user_name', user_name);
        loginData.append('password', password);

        axios.post('/account/login', loginData)
            .then(resp => jwtToken.value = resp.data.jwtToken)
            .catch(error => console.log(error.data));
    };

    // post new accounts uname, pass and email to endpoint as FormData
    function handleNewAccount() {
        handleClose();
        const newAccountData = new FormData();
        newAccountData.append('user_name', user_name);
        newAccountData.append('password', password);
        newAccountData.append('email', email);

        axios.post('/account/create', newAccountData);

        console.log(newAccountData);
    }

    return (
        // Inputs to username and password to login. On button click run login().
        <div className="login-page">
            <div className="link-style login-inputs">
                <h2 style={{ textAlign: 'center', color: '#CA3E47', margin: '2rem 1rem 2rem 1rem' }}>enter username and password</h2>
                <input onChange={e => setUser_name(e.target.value)} placeholder="jyyseri"></input>
                <input type="password" onChange={e => setPassword(e.target.value)} placeholder="passu"></input>
                <p className="create-account-link" onClick={handleShow}> New user? Click here to create an account</p>
                <button onClick={login}>Login</button>
            </div>
    
            {/* username, pass and email are set here, on submit handleNewAccount is called */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create an account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={event => {
                        event.preventDefault()
                    }}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="ismo@poikaniKalleOn.com"
                                autoFocus
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                            <Form.Label>jyyseri nam</Form.Label>
                            <Form.Control
                                type="username"
                                placeholder="jyyyseri"
                                autoFocus
                                value={user_name}
                                onChange={e => setUser_name(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Passu</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="atleast a character long"
                                autoFocus
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className="mt-1" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" className="mt-1" onClick={handleNewAccount}>
                        Create account
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};


//login: post uname and pw and get jwtToken as response, if logged in display logged in
//if not logged in, display loginForm and create an account
function Login() {


    return (

        <div className="link-style login-page">
            {jwtToken.value.length === 0 ? <LoginForm /> :
                <div>
                    <h2 className="my-5" style={{ color: 'var(--fourth-color)' }}>Welcome our dearly beloved </h2>
                    <button onClick={() => jwtToken.value = ''}>Logout</button>
                </div>}
        </div>

    )
};


export default Login;