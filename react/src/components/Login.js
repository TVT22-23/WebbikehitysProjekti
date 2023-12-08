import { useState } from "react";
import axios from "axios";
import { jwtToken } from "./Signals";



//login: post uname and pw and get jwtToken as response, if logged in display logged in
//if not logged in, display loginForm and create an account
function Login() {


    return (

        <div className="link-style login-page">
            {jwtToken.value.length === 0 ? <LoginForm /> :
                <button onClick={() => jwtToken.value = ''}>Logout</button>}
        </div>

    )
}

function LoginForm() {
    const [user_name, setUser_name] = useState('');
    const [password, setPassword] = useState('');

    function login() {
        //send user_name and password as formdata
        const loginData = new FormData();
        loginData.append('user_name', user_name);
        loginData.append('password', password);

        axios.post('/account/login', loginData)
            .then(resp => jwtToken.value = resp.data.jwtToken)
            .catch(error => console.log(error.response));
    }
    return (

        <div className="login-page">
            <div className="link-style login-inputs">
                <h2 style={{ textAlign: 'center', color: '#CA3E47', margin: '2rem 1rem 1rem 1rem' }}>enter username and password</h2>
                <input onChange={e => setUser_name(e.target.value)} placeholder="jyyseri"></input>
                <input type="password" onChange={e => setPassword(e.target.value)} placeholder="passu"></input>
                <button onClick={login}>Login</button>
            </div>

        </div>
    );
}

export default Login;