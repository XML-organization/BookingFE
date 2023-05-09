import { useEffect } from "react";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import Navbar from "./Navbar";
import Home from "./pages/Home";
import CreateAccommodation from "./pages/CreateAccomodation";
import AccommodationAvailability from "./pages/AccommodationAvailability";




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
          <Route path="/availability" element={<AccommodationAvailability/>} />
        </Routes>
      </div>
    </>
  )
}

export default App;