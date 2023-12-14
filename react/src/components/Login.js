import { useState } from "react";
import axios from "axios";
import { jwtToken, accountId, Uname } from "./Signals";
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

        //set Uname to signals to pass it to other components
        Uname.value = user_name
        //get accountId with username
        axios.get('/account/get?user_name=' + user_name)
            .then(resp => {
                accountId.value = resp.data[0].account_id;
                console.log(accountId.value);
            })
            .catch(error => {
                console.error('Error:', error.message);
            });

        axios.post('/account/login', loginData)
            .then(resp => {
                jwtToken.value = resp.data.jwtToken;
                accountId.value = resp.data.currentAccId;
               // console.log("JWT Token:", jwtToken.value); // Log the JWT token value
                console.log(accountId.value);
            })
            .catch(error => alert(error.message))
            
            
            axios.get('/account/get?user_name=' + Uname)
            .then(res => {
                if (res.data[0].layout === null) {
                    localStorage.setItem('extraBoxPosition', "{\"x\":4,\"y\":40}")
                    localStorage.setItem('profPicPosition', "{\"x\":-12,\"y\":25}")
                    localStorage.setItem('textBoxPosition', "{\"x\":-3,\"y\":3}")
                    localStorage.setItem('userMovieGridMovieGridPosition', "{\"x\":-249,\"y\":101}")
                } else {
                    localStorage.setItem('extraBoxPosition', res.data[0].layout.extraBoxPosition)
                    localStorage.setItem('profPicPosition', res.data[0].layout.profPicPosition)
                    localStorage.setItem('textBoxPosition', res.data[0].layout.textBoxPosition)
                    localStorage.setItem('userMovieGridMovieGridPosition', res.data[0].layout.userMovieGridMovieGridPosition)
                }
            })
            
        };

    // post new accounts uname, pass and email to endpoint as FormData
    function handleNewAccount() {
        handleClose();
        const newAccountData = new FormData();
        newAccountData.append('user_name', user_name);
        newAccountData.append('password', password);
        newAccountData.append('email', email);

        axios.post('/account/create', newAccountData)
            .then(resp => {
                alert('new account created');
            })
            .catch(error => alert('account creation failed, ', error.data))

        console.log(newAccountData);
    }

    return (
        // Inputs to username and password to login. On button click run login().
        <div className="login-page">
            <div className="link-style login-inputs">
                <h2 style={{ textAlign: 'center', margin: '2rem 1rem 2rem 1rem' }}>enter username and password</h2>
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
                        event.preventDefault();
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
                    <h2 className="my-5" >Welcome our dearly beloved {Uname}</h2>
                    <button onClick={() => jwtToken.value = ''}>Logout</button>
                </div>}
        </div>

    )
};


export default Login;