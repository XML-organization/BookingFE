import { useEffect } from "react";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import Navbar from "./Navbar";
import Home from "./pages/Home";
import CreateAccommodation from "./pages/CreateAccomodation";
import { Login } from "./pages/Login";
import Registration from "./pages/Registration";
import ChangePassword from "./pages/ChangePassword";
import UpdateUser from "./pages/UpdateUser";




function App(){
  useEffect(() => {
    document.title = "Airline";
  }, []);

  return (
    <>
      <Navbar/>
      <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/createAccomodation" element={<CreateAccommodation/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/registration" element={<Registration/>} />
          <Route path="/changePassword" element={<ChangePassword/>} />
          <Route path="/updateUser" element={<UpdateUser/>} />
        </Routes>
      </div>
    </>
  )
}

export default App;