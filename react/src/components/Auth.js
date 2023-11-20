import { useContext } from "react";
import { LoginContext} from "./Contexts"

function Login() {
    // const { login, setLogin } = useContext(LoginContext);

    // const buttonLabel = login ? 'logout' : 'login';

    return (
        <div>
            <h1>login</h1>
            {/* {login ? <h2>Welcome</h2> : <h2>unauthorized</h2>}
            <button onClick={() => setLogin(prev => !prev)}>{buttonLabel}</button> */}
        </div>
    );
}

export {Login};