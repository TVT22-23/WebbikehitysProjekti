import { Link } from "react-router-dom";

function Navbar() {

return(
<div className="topnav">
  
  <Link to="/" className="active">Home</Link>
  <Link to="/user">User</Link>
  <Link to="/film">Films</Link>
  <Link to="/group">Group</Link>
  <Link to="/settings">Settings</Link>
  <Link to="/login">Login</Link>
  <Link to="/searchFilms">Search Films</Link>

  <div className="search-container">
    <form action="/action_page.php">
      <input type="text" placeholder="Search.." name="search"></input>
      <button type="submit">search</button>
    </form>
  </div>
</div>
    );
}
export { Navbar };