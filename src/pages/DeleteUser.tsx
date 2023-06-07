import { ChangeEvent, useEffect, useState } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import  { Accomodation } from '../model/Accomodation';
import { Booking } from '../model/Booking';
import { useLoggedUser } from '../hooks/UseLoggedUserInformation';
import { UserType } from '../model/User';

let noResults = false;
let clicked = true;

const loggedUser = useLoggedUser();
let user : string = loggedUser?.email!;
let userProfile : UserType = loggedUser?.role!;

function DeleteUser(){
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [accommodations, setAccommodations] = useState<Accomodation[]>([]);
const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //     onRender(); // Poziv metode onRender kada se komponenta učita
  // }, []);

  // useEffect(() => {
  //     console.log("Updated bookingsss:", bookings);
  //   }, [bookings]);

  // const onRender = async (e?: React.FormEvent<HTMLFormElement>) => {
  //     e?.preventDefault();
  //     const response = await fetch("http://localhost:8000/booking/getAllReservation?userId="+ user, {
  //         method: "GET",
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //         credentials: "include",
  //       })
  //   .then(res => res.json())
  //       .then((data) => {
  //         console.log("Fetched data:", data);
  //         setBookings(data.bookings);
  //         console.log("View bookings:", bookings);
  //   setIsLoading(false);
  //       })
  //       .catch((error) => {
  //         console.error("Fetch error:", error);
  //       });
  //   };

  if (userProfile == UserType.Host){
    useEffect(() => {
      fetch(`http://localhost:8000/accomodation/` + user, {
        method: "GET",
      })
        .then(response => response.json())
        .then(data => {
          console.log(data); // Log the entire data object
          setAccommodations(data.accomodations);
        })
        .catch(error => console.log(error));
    }, []);
  }
  if (userProfile == UserType.Guest){
     useEffect(() => {
      onRender(); // Poziv metode onRender kada se komponenta učita
  }, []);

  useEffect(() => {
      console.log("Updated bookingsss:", bookings);
    }, [bookings]);
    const onRender = async (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      const response = await fetch("http://localhost:8000/booking/getAllReservation?userId="+ user, {
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
          console.log("View bookings:", bookings);
    setIsLoading(false);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    };


  }


const cancel = async (userId: string, e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      const loggedUser = useLoggedUser();
      console.log(loggedUser?.email)
  fetch("http://localhost:8000/user/deleteUser/"+ loggedUser?.email, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
    credentials: "include",
    }).then((response) => {
      if(userProfile == UserType.Host){
        if(accommodations.length == 0){
          if (response.status === 200) {
            window.alert("Account deleted");
            navigate("/");
            } else {
            window.alert("Failed to delete account");
            }
        }
      }
      if(userProfile == UserType.Guest){
        if(bookings.length == 0){
          if (response.status === 200) {
            window.alert("Account deleted");
            navigate("/");
            } else {
            window.alert("Failed to delete account");
            }
        }
      }     
      });
  };


  return (
    <div>
        <h3>Do you want delete your account?</h3>
        <button type="submit" className="btn btn-primary" onClick={() => cancel(user)}> Delete account</button>
      </div>
   )
  }
  
  export default DeleteUser;