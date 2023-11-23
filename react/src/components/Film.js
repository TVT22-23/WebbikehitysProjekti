import { Link, Outlet, useParams } from "react-router-dom";

function Film() {

  const { filmID } = useParams();

  return (
    <div>
      <h1>Here is so much info about the film with id {filmID}</h1>
       <Link to={'cast'}>Cast  </Link>
        <Link to={'crew'}>Crew </Link>
        <Outlet/>
    </div>
  )
}

function Ui(){
  return (
    <div>
      <h1>asdasdasd</h1>
    </div>
  )
}

function Cast (){
  return(
    <div>
      <h4>People who acted in the movie</h4>
      <li>Kasper</li>
      <li>Jesper</li>
      <li>Niko</li>
    </div>
  )
}

function Crew (){
  return(
    <div>
      <h4>People Who made the movie</h4>
      <li>MAtti</li>
      <li>Jorma</li>
      <li>Jaska</li>
    </div>
  )
}


export {Film, Ui, Crew, Cast};