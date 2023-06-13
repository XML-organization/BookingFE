import { ChangeEvent, useEffect, useState } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import  { Accomodation } from '../model/Accomodation';
import { Booking } from '../model/Booking';
import { useLoggedUser } from '../hooks/UseLoggedUserInformation';
import { AccommodationDetails } from '../model/AccomodationDetails';
import { Card, Button, Row, Col } from "react-bootstrap";



const loggedUser = useLoggedUser();
let user : string = loggedUser?.id!;
let userName : string = loggedUser?.name!;
let userSurname : string = loggedUser?.surname!;


function GradeHost(){
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [accomodations, setAccomodations] = useState<AccommodationDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClick, setClick] = useState(false);
  const [grade, setGrade] = useState(0);

  const [accomodationID, setaccomodationID] = useState("");


  const [name, setName] = useState("");
  const [locationa, setLocation] = useState("");

  const [displayAccomodations, setDisplayAccomodations] = useState<AccommodationDetails[]>([]);


  useEffect(() => {
    console.log("Updated accomodationsss:", accomodations);
    onRender()
  }, [accomodations, bookings]);


  
  const onRender = async (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      const response = await fetch("http://localhost:8000/booking/getFinishedReservations/"+ user, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        })
    .then(res => res.json())
        .then((data) => {
          console.log("Fetched data:", data);
          setBookings(data.reservations);
          console.log("View bookings:", bookings);
    // setIsLoading(false);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });

        const accommodationsResponse = await fetch("http://localhost:8000/accomodation/allAccomodation", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
  }).then(res => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setAccomodations(data.accomodations);
        console.log("View bookings:", accomodations);
  // setIsLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
     
      let display:AccommodationDetails[]= []
      accomodations.forEach((accommodation)=>{
        bookings.forEach((booking)=>{
          if(accommodation.id==booking.accomodationID){
            display.push(accommodation)
          }
      })
    })
    const uniqueDisplay = Array.from(new Set(display));
    setDisplayAccomodations(uniqueDisplay)
    
      };


    const isClicked =(accomodation:AccommodationDetails):void=>{
      setClick(true)
      setName(accomodation.name)
      setLocation(accomodation.location)
      setaccomodationID(accomodation.id)
    }



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      const data = {
        iD:accomodationID,
        userId: user,
        userName: userName,
        userSurname: userSurname,
        grade: grade
      };
      
      
      fetch("http://localhost:8000/accomodation/gradeHost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //credentials: "include",
        body: JSON.stringify(data),
      }).then((response) => {
        if (response.status === 200 || response.status === 201) {
          window.alert("Grades host successfully");
          navigate("/gradeHost");
          } else {
          window.alert("Failed to gradeHost");
          }
          });
          };


  return (
      <div id="bookingsTable">
        <blockquote className="blockquote text-center">
           <p className="mb-0">#Your booking:</p>
        </blockquote>

           <div >
        <table className="table table-striped" style={{width: '100%', alignItems:"center", marginLeft : "auto", marginRight:  "auto"}}>
                       <thead className="thead-dark">
                           <tr>
                           <th scope="col">Name</th>
                           <th scope="col">Location</th>
                           <th scope="col">Photo</th>
                           <th scope="col">--</th>
                           
                           </tr>
                       </thead>
                       <tbody>
           {displayAccomodations?.map((accomodation, index) => (
            <tr key={accomodation.id}>
              <td>{accomodation.name}</td>
              <td>{accomodation.location}</td>
              <td>
              <Card.Img
              variant="top"
              src={`data:image/jpeg;base64,${accomodation.photos}`}
              style={{ height: "150px", width:"150px" }} 
            />
            </td>
              <td><button  className="btn btn-primary" onClick={() => isClicked(accomodation)}>Grade</button></td>
            </tr>
            
            
          ))}
          <tr>{isClick && <div>

            <div className="col">
          <label className="form-label" htmlFor="name">
             Grade
          </label>
          {<h6>Location:  {name}</h6>}
          {<h6>Location:  {locationa}</h6>}
          <form onSubmit={handleSubmit}>
          <input
            className="form-control"
            id="name"
            type='number'
            max={5}
            min={1}
            value={grade}
            onChange={(event) => setGrade(Number(event.target.value))}
            required
          />
          <td><button type='submit' className="btn btn-primary">Save</button></td>
          </form>
        </div>
            </div>} </tr>
                          </tbody>
                   </table>
           </div>
      </div>
   )
  }
  
  export default GradeHost;