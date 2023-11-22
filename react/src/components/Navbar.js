import {Link} from 'react-router-dom';
import { useContext } from "react";

function Navbar() {
    return(
<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">lits läts</a>
    </div>
    <ul class="nav navbar-nav">
      <li class="active">
      <Link to={''} className='nav-link'>Home</Link>
      </li>
      <li>
      <Link to={'/user'} className='nav-link'>User</Link>
      </li>
      <li>
      <Link to={'/auth'} className='nav-link'>Login</Link>
      </li>
      <li>
      <Link to={'/film'} className='nav-link'>Film</Link>
      </li>
      <li>
      <Link to={'/group'} className='nav-link'>Group</Link>
      </li>
      <li>
      <Link to={'/settings'} className='nav-link'>Settings</Link>
      </li>
    </ul>
    <form class="navbar-form navbar-left" action="/action_page.php">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Search" name="search"></input>
        <div class="input-group-btn">
          <button class="btn btn-default" type="submit">
            <i class="glyphicon glyphicon-search"></i>
          </button>
        </div>
      </div>
    </form>
  </div>
</nav>
    );
}
export { Navbar };