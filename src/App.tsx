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
import AccommodationDetailsPage from "./pages/AccommodationDetailsPage";
import HostRatings from "./pages/HostRatings";
import CancelReservationPage from "./pages/CancelReservation";
import DeleteUser from "./pages/DeleteUser";
import Notifications from "./pages/Notifications";
import NotificationSettings from "./pages/NotificationSettings";


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
          <Route path="/accomodationDetails/:id" element={<AccommodationDetailsPage/>} />
          <Route path="/hostRatings" element={<HostRatings/>} />
          <Route path="/cancelReservation" element={<CancelReservationPage/>} />
          <Route path="/delete" element={<DeleteUser/>} />
          <Route path="/notifications" element={<Notifications/>}/>
          <Route path="/settings" element={<NotificationSettings/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App;