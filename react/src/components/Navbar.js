
function Navbar() {

return(
<div className="topnav">
  <a className="active" href="/" >Home</a>

  <a href="user">User</a>
  <a href="film">Films</a>
  <a href="groups">Groups</a>
  <a href="settings">Settings</a>
  <a href="login">Login</a>
  <a href="searchFilms">Search Films</a>

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