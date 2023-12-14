import { Link } from "react-router-dom";

function Navbar() {

return(
<div className="topnav">
  <Link to="/" className="active">Home</Link>
  <Link to="/user">Profile</Link>
  <Link to="/groups">Groups</Link>
  <Link to="/settings">Settings</Link>
  <Link to="/login">Login</Link>
  <Link to="/searchFilms">Search Films</Link>

</div>
    );
}
export { Navbar };