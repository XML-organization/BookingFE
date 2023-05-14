import { ChangeEvent, useEffect, useState } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import  { Accomodation } from '../model/Accomodation';
import { Booking } from '../model/Booking';
import { useLoggedUser } from '../hooks/UseLoggedUserInformation';

var userInformation = useLoggedUser()

function ViewBookingRequests(){
    const navigate = useNavigate();
    const [bookings, setBookings] = useState<Booking[]>([]);
	const [isLoading, setIsLoading] = useState(true);
 
    useEffect(() => {
        onRender(); // Poziv metode onRender kada se komponenta učita
    }, []);

    useEffect(() => {
        console.log("Updated bookingsss:", bookings);
      }, [bookings]);

    const onRender = async (e?: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        const response = await fetch("http://localhost:8000/booking/getAllPending/" + userInformation?.id, {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
            credentials: "include",
          })
		  .then(res => res.json())
          .then((data) => {
            console.log("Fetched data:", data);
            setBookings(data.bookings);
            console.log("Updated bookings:", bookings);
			setIsLoading(false);
          })
          .catch((error) => {
            console.error("Fetch error:", error);
          });
      };

	const accept = async (booking: Booking, e?: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
		fetch("http://localhost:8000/booking/confirm", {
			method: "POST",
			headers: {
			  Accept: "application/json",
			},
			credentials: "include",
			body: JSON.stringify(booking),
		  }).then((response) => {
			  if (response.status === 200) {
			  window.alert("Booking confirmed");
			  navigate("/viewBookings");
			  } else {
			  window.alert("Failed to confirm booking");
			  }
			  });
    };

	const decline = async (booking: Booking, e?: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
		fetch("http://localhost:8000/booking/decline", {
			method: "POST",
			headers: {
			  Accept: "application/json",
			},
			credentials: "include",
			body: JSON.stringify(booking),
		  }).then((response) => {
			  if (response.status === 200) {
			  window.alert("Booking decline");
			  navigate("/viewBookings");
			  } else {
			  window.alert("Failed to decline booking");
			  }
			  });
    };

    return (
        <div id="bookingsTable">
          <blockquote className="blockquote text-center">
             <p className="mb-0">All booking requests:</p>
             <footer className="blockquote-footer">choose wisely!</footer>
          </blockquote>
 
             <div >
					<table className="table table-striped" style={{width: '100%', alignItems:"center", marginLeft : "auto", marginRight:  "auto"}}>
                         <thead className="thead-dark">
                             <tr>
                             <th scope="col">Booking ID</th>
							 <th scope="col">Accomodation ID</th>
                             <th scope="col">Start date</th>
                             <th scope="col">End date</th>
                             <th scope="col">Number of guests</th>
                             <th scope="col">Status</th>
                             <th scope="col"></th>
                             <th scope="col"></th>
                             </tr>
                         </thead>
                         <tbody>
						 {bookings.map((booking, index) => (
							<tr key={booking.id}>
								<td>{booking.id}</td>
								<td>{booking.accomodationID}</td>
								<td>{booking.startDate}</td>
								<td>{booking.endDate}</td>
								<td>{booking.guestNumber}</td>
								<td>{booking.status}</td>
								<td>
									<button type="submit" className="btn btn-primary" onClick={() => accept(booking)}>
										Accept
									</button>
								</td>
								<td>
									<button type="submit" className="btn btn-primary" onClick={() => decline(booking)}>
										Decline
									</button>
								</td>
							</tr>
						))}
                            </tbody>
                     </table>
             </div>
        </div>
     )
}

export default ViewBookingRequests;