import { useEffect, useState } from "react";
import { LoginContext } from "./components/Contexts";
import { Login } from "./components/Auth";
import axios from "axios";
import { BrowserRouter, Link, Navigate, Outlet, Route, Routes, useNavigate, useParams } from "react-router-dom";

const persons = [
  { fname: 'Reima', lname: 'Raniska' },
  { fname: 'Renttu', lname: 'Rööperi' },
  { fname: 'Reiska', lname: 'Raineri' }
]

function App() {

  const [login, setLogin] = useState(false);

  return (
    <div>
      <Link to={''}>Home </Link>
      <Link to={'user'}>user</Link>
      <Routes>
        <Route path='' element={<Home />} />
        <Route path="user/:userID?" element={<User />} >
          <Route path="profile" element={<Profile />} />
          <Route path="blog" element={<Blog />} />
        </Route>
        <Route path="*" element={<h2>Page not found</h2>} />
      </Routes>
    </div>
  );
}

function Home() {

  const x = true;

  return (
    <div>
      <h1>Home</h1>
      {/* { x &&
        <Navigate to={'user'}/>
      } */}
    </div>
  )
}

function User() {

  const nav = useNavigate();

  const { userID } = useParams();

  return (
    <div>
      <h1>User with id {userID}</h1>
      <Link to={'profile'}>Profile  </Link>
      <Link to={'blog'}>Blog</Link>
      {/* <button onClick={()=> nav('/')}>Home</button> */}
      <Outlet/>
    </div>
  )
}

function Profile() {
  return (
    <div>
      User profile
    </div>
  )
}

function Blog() {
  return (
    <div>
      User blog
    </div>
  )
}
function PersonList() {

  const items = persons.map((p, i) => <li key={i}>{p.lname}</li>)

  return (
    <ul>
      {items}
    </ul>
  );
}

function PostExample() {



  useEffect(() => {

    const user = {
      username: 'rele',
      pw: 'sähkö'
    }

    axios.postForm('http://localhost:3001/user', user)
      .then(resp => console.log('onnistui'))
      .catch(error => console.log(error.message))

  }, []);

  return (
    <div>

    </div>
  );
}

function GetExample() {

  const [users, setUsers] = useState([])

  useEffect(() => {

    axios.get('https://random-data-api.com/api/v2/users?size=10')
      .then(resp => setUsers(resp.data.map(u => ({ email: u.email, avatar: u.avatar }))))
      .catch(error => console.log(error.message))
  }, []);



  return (
    <div>
      {
        users.map(u => <UserInfo email={u.email} avatar={u.avatar} />)
      }
    </div>
  )
}

function UserInfo({ email, avatar }) {
  return (
    <div>
      <h4>{email}</h4>
      <img src={avatar} height={80} alt="" />
    </div>
  )
}

function DataExample() {
  const [text, setText] = useState();
  const [texts, setTexts] = useState([]);

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => setTexts([...texts, text])}>Add text</button>
      <ul>
        {texts.map(t => <li>{t}</li>)}
      </ul>
    </div>
  )
}

export default App;
