import { useEffect } from "react";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import Navbar from "./Navbar";
import Home from "./pages/Home";
import CreateAccommodation from "./pages/CreateAccomodation";


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
          <Route path="/createAccomodation" element={<CreateAccommodation/>} />
        </Routes>
      </div>
    </>
  )
}

export default App;