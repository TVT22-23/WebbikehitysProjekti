import { useEffect} from 'react';
// import { LoginContext } from './components/Contexts';
// import { Login } from './components/Auth';
import axios from 'axios';

// const persons = [
//   { fname: 'Elina', lname: 'Karisto' },
//   { fname: 'Antti', lname: 'Kivioja' },
//   { fname: 'Matti', lname: 'Raniska' }
// ];

function App() {

  // const [login, setLogin] = useState(false);

  return (
    // <LoginContext.Provider value={{ login: login, setLogin: setLogin }}>
    //   <h4>Arvo on {login.toString()}</h4>
    //   <Login />
    //   <PersonList />
    // // </LoginContext.Provider>
    // <GetExample />
    <PostExample />
  );
}


// function PersonList() {

//   const items = persons.map((p, i) => <li key={i}>{p.lname}</li>)

//   return (
//     <ul>
//       {items}
//     </ul>
//   )
// }

//kutsutaan omasta nodeservusta tätä taulukkona
function PostExample() {




  useEffect(() => {

    // const user = [
    //   {username: 'reijo', pw: 'raija123'},
    //   {username: 'raija', pw: 'reijo123'}
    // ]


    const user = {
      username: 'kakka',
      pw: 'kökkö'
    }

    axios.postForm('http://localhost:3001/user', user)
      .catch(error => console.log(error.message));
  }, []);

  return (
    <div>
      {

      }
    </div>
  );
}


// function UserInfo({ email, avatar }) {
//   return (
//     <div>
//       <h4>{email}</h4>
//       <img src={avatar} height={80} />
//     </div>
//   );
// }

export default App;
