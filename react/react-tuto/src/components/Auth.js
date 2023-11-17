import { useContext } from "react";
import { LoginContext } from "./Contexts";

function Login() {

    const {login, setLogin} = useContext(LoginContext);
  
    const buttonLabel = login ? 'Logout' : 'Login';
  
    return (
      <div>
        {login ? <h2>Welocome!</h2> : <h2>Unauthorized</h2>}
        <button onClick={() => setLogin(!login)}>
          {buttonLabel}
        </button>
      </div>
    );
  }

  export {Login};