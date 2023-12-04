import axios from "axios";
import { useEffect, useState } from "react";
import { TokenContext } from "./Contexts";
import Login from "./Login";

function Authorization() {

    //login is controlled by token that is save to session storag.
    const [token, setToken] = useState(() => {
        const t = sessionStorage.getItem('token');
        return t === null || t === 'null' ? '' : t;
    });

    //Setting token for axios header as deafult.
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

    //Saving the token to session storage if it changes.
    useEffect(() => {
        sessionStorage.setItem('token', token);
    }, [token]);

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            <Login />
        </TokenContext.Provider>
    );
}

export default Authorization;
