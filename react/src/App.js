// import { useEffect, useState } from "react";
// import axios from "axios";
import { Route, Routes } from "react-router-dom";
import { GSettings, USettings, User } from "./components/User";
import { Login } from "./components/Auth";
import { NavbarContext } from "./components/Contexts";
import { Navbar } from "./components/Navbar";
import Group from "./components/Group";
import Home from "./components/Home";
import { Film, Cast, Crew } from "./components/Film";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css'


// const persons = [
//   { fname: 'Reima', lname: 'Raniska' },
//   { fname: 'Renttu', lname: 'Rööperi' },
//   { fname: 'Reiska', lname: 'Raineri' }
// ]

function App() {

  const valueForContext = 'Hello world';
  return (
    <div className="background-size">
      <NavbarContext.Provider value = {valueForContext}>
        <Navbar />
      </NavbarContext.Provider>
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='/film/:filmID?' element={<Film />} >
          <Route path='cast' element={<Cast />} />
          <Route path='crew' element={<Crew />} />
        </Route>
        <Route path='/group/:groupID?' element={<Group />} />
        <Route path='/login' element={<Login />} />
        <Route path="/user/:userID?" element={<User />} >
          <Route path="usettings" element={<USettings />} />
          <Route path="gsettings" element={<GSettings />} />
        </Route>
        <Route path="*" element={<h2>Page not found</h2>} />
      </Routes>
    </div>
  );
}

// function PersonList() {

//   const items = persons.map((p, i) => <li key={i}>{p.lname}</li>)

//   return (
//     <ul>
//       {items}
//     </ul>
//   );
// }

// function PostExample() {



//   useEffect(() => {

//     const user = {
//       username: 'rele',
//       pw: 'sähkö'
//     }

//     axios.postForm('http://localhost:3001/user', user)
//       .then(resp => console.log('onnistui'))
//       .catch(error => console.log(error.message))

//   }, []);

//   return (
//     <div>

//     </div>
//   );
// }

// function GetExample() {

//   const [users, setUsers] = useState([])

//   useEffect(() => {

//     axios.get('https://random-data-api.com/api/v2/users?size=10')
//       .then(resp => setUsers(resp.data.map(u => ({ email: u.email, avatar: u.avatar }))))
//       .catch(error => console.log(error.message))
//   }, []);



//   return (
//     <div>
//       {
//         users.map(u => <UserInfo email={u.email} avatar={u.avatar} />)
//       }
//     </div>
//   )
// }

// function UserInfo({ email, avatar }) {
//   return (
//     <div>
//       <h4>{email}</h4>
//       <img src={avatar} height={80} alt="" />
//     </div>
//   )
// }

// function DataExample() {
//   const [text, setText] = useState();
//   const [texts, setTexts] = useState([]);

//   return (
//     <div>
//       <input value={text} onChange={e => setText(e.target.value)} />
//       <button onClick={() => setTexts([...texts, text])}>Add text</button>
//       <ul>
//         {texts.map(t => <li>{t}</li>)}
//       </ul>
//     </div>
//   )
// }

export default App;
