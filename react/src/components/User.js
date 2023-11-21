import { Link, Outlet, Route, Routes, useParams } from "react-router-dom";

function User() {

  
    const { userID } = useParams();
  
    return (
      <div>
        <h1>User with id {userID}</h1>
        <Link to={'usettings'}> User Settings  </Link>
        <Link to={'gsettings'}>Group Settings </Link>
        <Outlet/>

      </div>
    )
  }

  function USettings() {
    return (
      <div>
        User settings
      </div>
    )
  }
  
  function GSettings() {
    return (
      <div>
        Group settings
      </div>
    )
  }

  export {User, GSettings, USettings};