import { ChangeEvent, useEffect, useState } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import  { Accomodation } from '../model/Accomodation';
import { Booking } from '../model/Booking';
import { useLoggedUser } from '../hooks/UseLoggedUserInformation';
import { AccommodationDetails } from '../model/AccomodationDetails';


const loggedUser = useLoggedUser();
let user : string = loggedUser?.id!;

interface Flight {
  id: number;
  departure: string;
  destination: string;
  price: number;
  capacity: number;
  occupancy: number;
  date: string;
}

function CancelReservation(){
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [accomodations, setAccomodations] = useState<AccommodationDetails[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [viewFlights, setViewFlights] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isBuy, setIsBuy] = useState(false);
  const [departure, setDeparature] = useState("");
  const [destination, setDestination] = useState("");
  const [dateOfDeparature, setDateOfDeparature] = useState("");
  const [dateOfReturn, setDateOfReturn] = useState("");
  const [numberOfGest, setNumberOfGuest] = useState("");
  const [bookingLocation, setBookingLocation] = useState("");

  const [flightId, setFlightId] = useState(-1);
  const [tickets, setTickets] = useState(-1);
  const [maxCapacity, setMaxCapacity] = useState(1);
  



  useEffect(() => {
      onRender(); // Poziv metode onRender kada se komponenta učita
  }, []);

  useEffect(() => {
      console.log("Updated bookingsss:", bookings);
    }, [bookings]);

  const onRender = async (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      const response = await fetch("http://localhost:8000/booking/GetUserReservations/"+ user, {
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
    setIsLoading(false);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });

      const response_ac = await fetch("http://localhost:8000/accomodation/allAccomodation", {
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
    
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    };



const cancel = async (bookingId: string, e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
  fetch("http://localhost:8000/booking/canceledBooking/"+bookingId, {
    method: "PUT",
    headers: {
      Accept: "application/json",
    },
    credentials: "include",
    }).then((response) => {
      if (response.status === 200) {
      window.alert("Booking canceled");
      window.location.reload()
      navigate("/cancelReservation");
      } else {
      window.alert("Failed to canceled booking");
      }
      });
  };

  const ViewFlight=(booking: Booking):void=>{
    setIsClicked(true)
    
    setDeparature("")
    setDestination("")
    setDateOfDeparature(booking.startDate)
    setDateOfReturn(booking.endDate)
    setNumberOfGuest(booking.guestNumber)
    setBookingLocation(booking.accomodationID)
    
    accomodations.forEach((accommmodation)=>{
      if(accommmodation.id===booking.accomodationID){
        setBookingLocation(accommmodation.location)
      }
    
  })};

  const EnterNumberOfTickets=(flight: Flight):void=>{
    setIsBuy(true)
    setFlightId(flight.id)
    setMaxCapacity(flight.capacity)
    };


    const BuyTickets = async () => {
      window.alert("Successfully bought");
      window.location.reload();
      const response = await fetch("http://localhost:8082/buyTicketsExternal", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          user: loggedUser?.email,
          flightId: flightId,
          numberOfTickets: tickets,
        }),
      }).then((response) => {
      window.alert("Successfully bought");
        if (response.status === 200) {
          window.location.reload();
        } else {
          window.alert("Some error occured, please try again");
        }
      });

    }

  const SearchFlights = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const url = 
        "http://localhost:8082/findFlights?" +
        new URLSearchParams({
          destination,
          departure,
          dateOfDeparature,
          dateOfReturn,
          numberOfGest,
          bookingLocation
        });
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    }).then(res => res.json())
    .then((data) => {
      setFlights(data)
    console.log("Fetched data:", data);
    })
    .catch((error) => {
    console.error("Fetch error:", error);
    });
    setViewFlights(true)
    setIsClicked(false)
  }

  const handleDate = (d : string) => {
    const date = new Date(d);
    const formattedDate = date.toLocaleDateString('sr-SP', { year: 'numeric', month: 'numeric', day: 'numeric' });
    return formattedDate
   }
  



  return (
      <div id="bookingsTable">
        <blockquote className="blockquote text-center">
           <p className="mb-0">Your booking:</p>
        </blockquote>

           <div >
        <table className="table table-striped" style={{width: '100%', alignItems:"center", marginLeft : "auto", marginRight:  "auto"}}>
                       <thead className="thead-dark">
                           <tr>
                           <th scope="col">Start date</th>
                           <th scope="col">End date</th>
                           <th scope="col">Number of guests</th>
                           <th scope="col">Status</th>
                           <th scope="col">--</th>
                           <th scope="col">--</th>
                           
                           </tr>
                       </thead>
                       <tbody>
           {bookings.map((booking, index) => (
            <tr key={booking.id}>
              <td>{booking.startDate}</td>
              <td>{booking.endDate}</td>
              <td>{booking.guestNumber}</td>
              <td>{booking.status}</td>
              <td><button type="submit" className="btn btn-primary" onClick={() => cancel(booking.id)}>Cancel reservation</button></td>
              <td><button  className="btn btn-primary" onClick={()=>ViewFlight(booking)}>View flight</button></td>
              
            </tr>
          ))}
                          </tbody>
                   </table>
              {isClicked && <div>
                <br></br><br></br>
            <form onSubmit={SearchFlights}>
              <h4>{bookingLocation}</h4>
                <h6>Input departure </h6>
                <input
                className="form-control"
                id="name"
                type='text'
                max={5}
                min={1}
                value={departure}
                onChange={(event) => setDeparature(event.target.value)}
                required
              />
              <h6>Input destination</h6>
                <input
                className="form-control"
                id="name"
                type='text'
                max={5}
                min={1}
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                required
              />
              <br></br>
              <td><button type='submit' className="btn btn-primary">Search</button></td>
          </form>
                </div>}
                {
                  viewFlights && <div>

<table className="table table-striped">
        <thead>
          <tr>
            <th>Departure</th>
            <th>Destination</th>
            <th>Date</th>
            <th>Price</th>
            <th>Capacity</th>
            <th>Occupancy</th>
            <th>Buy</th>
          </tr>
        </thead>
        <tbody>
          {flights.map(flight => (
            <tr key={flight.id}>
              <td>{flight.departure}</td>
              <td>{flight.destination}</td>
              <td>{handleDate(flight.date)}</td>
              <td>${flight.price.toFixed(2)}</td>
              <td>{flight.capacity}</td>
              <td>{flight.occupancy}</td>
              <td><button className="btn btn-primary" onClick={()=>EnterNumberOfTickets(flight)}>Buy</button></td>
            </tr>
          ))}
        </tbody>
      </table>
                  </div>
                }
                {isBuy && <div>
                  <h6>Enter number of tickets:</h6>
                   <input
                className="form-control"
                id="name"
                type='number'
                max={maxCapacity}
                min={1}
                value={tickets}
                onChange={(event) => setTickets(Number(event.target.value))}
                required
              />
              <button className="btn btn-primary" onClick={()=>BuyTickets()}>Confirm</button>
                  </div>}
           </div>
      </div>
   )
  }
  
  export default CancelReservation;