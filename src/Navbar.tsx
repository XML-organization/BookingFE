import { Link, useNavigate  } from 'react-router-dom';
import { useLoggedUser } from "./hooks/UseLoggedUserInformation";
  

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = async () => {

      /*await fetch("http://localhost:8082/logout", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    }).then(res => {*/
      localStorage.setItem('loggedUser', "")
      navigate("/login");
    /*})*/
    };

    const handleButtonClick = () => {
      navigate("/registration");
    };

    const stylesRight = {
        marginLeft: 'auto',
      };

    const stylesLeft  = {
        marginRight: 'auto',
      };

    const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
    }

    const loggedUser = useLoggedUser()

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={navStyle}>
      <ul className="navbar-nav mr-auto" style={stylesLeft}>
        <li className="nav-item active">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        {loggedUser != null && (
        <li className="nav-item active">
          <Link className="nav-link" to="/updateUser">Edit profile</Link>
        </li>)}
        {loggedUser != null && (
        <li className="nav-item active">
          <Link className="nav-link" to="/ChangePassword">Change password</Link>
        </li>)}
      </ul>
      <ul className="navbar-nav mr-auto" style={stylesRight}>
        <li className="nav-item active" >
          {loggedUser == null ? (
            <Link className="nav-link" to="/login">Login</Link>

          ) : (
            //<Link className="nav-link" to="/logout">Logout</Link>
            <button className="btn btn-light" type="submit" onClick={handleLogout}>Logout</button>
          )}
        </li>
        <li className="nav-item active" >
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={handleButtonClick}>Register</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;