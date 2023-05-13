import { useEffect } from "react";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import Navbar from "./Navbar";
import Home from "./pages/Home";
import CreateAccommodation from "./pages/CreateAccomodation";
import AccommodationAvailability from "./pages/AccommodationAvailability";
import { Login } from "./pages/Login";
import Registration from "./pages/Registration";
import ChangePassword from "./pages/ChangePassword";
import UpdateUser from "./pages/UpdateUser";
import ViewBookingRequests from "./pages/ViewBookingRequests";
import AccommodationsPage from "./pages/ViewAccomodations";


function App(){
  useEffect(() => {
    document.title = "Bookify";
  }, []);

  return (
    <>
      <Navbar/>
      <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/viewBookings" element={<ViewBookingRequests/>} />
          <Route path="/createAccomodation" element={<CreateAccommodation/>} />
          <Route path="/availability" element={<AccommodationAvailability/>} />
          <Route path="/viewAccomodation" element={<AccommodationsPage/>} />
          <Route path="/availability/:accommodationId" element={<AccommodationAvailability />} />
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