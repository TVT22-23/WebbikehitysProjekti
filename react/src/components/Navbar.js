import { useContext } from "react";

function Navbar() {

return(
<div class="topnav">
  <a class="active" href="">Home</a>
  <a href="user">User</a>
  <a href="login">Login</a>
    <a href="film">Film</a>
  <a href="group">Group</a>
  <a href="settings">Settings</a>

  <div class="search-container">
    <form action="/action_page.php">
      <input type="text" placeholder="Search.." name="search"></input>
      <button type="submit">search</button>
    </form>
  </div>
</div>
    );
}
export { Navbar };