import { useState } from "react";
import axios from "axios";
import { jwtToken } from "./Signals";



//login: post uname and pw and get jwtToken as response, if logged in display logged in
//if not logged in, display loginForm and create an account
function Login() {


    return (
        
        <div className="link-style">
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
        const formData = new FormData();
        formData.append('user_name', user_name);
        formData.append('password', password);
        
        axios.post('/account/login', formData)
        .then(resp => jwtToken.value = resp.data.jwtToken)
        .catch(error => console.log(error.response.data));
    }
    return (
        <div>
                <div className="link-style">
                    <input onChange={e => setUser_name(e.target.value)}></input>
                    <input onChange={e => setPassword(e.target.value)}></input>
                    <button onClick={login} >Login</button>
                </div>
            
        </div>
    );
}

export default Login;