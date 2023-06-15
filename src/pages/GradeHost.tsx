import { ChangeEvent, useEffect, useState } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import  { Accomodation } from '../model/Accomodation';
import { Booking } from '../model/Booking';
import { useLoggedUser } from '../hooks/UseLoggedUserInformation';
import { AccommodationDetails } from '../model/AccomodationDetails';
import { Card, Button, Row, Col } from "react-bootstrap";
import { Grade } from '../model/Grade';




let render : boolean =true


function GradeHost(){
  const loggedUser = useLoggedUser();
  let user : string = loggedUser?.id!;
  let userName : string = loggedUser?.name!;
  let userSurname : string = loggedUser?.surname!;


  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [accomodations, setAccomodations] = useState<AccommodationDetails[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isClick, setClick] = useState(false);
  const [grade, setGrade] = useState(0);
  const [averageGrade, setAverageGrade] = useState(0);
  const [currentGrade, setCurrentGrade] = useState("");
  const [deleteEditGradeID, setDeleteEditGradeID] = useState("");

  const [accomodationID, setaccomodationID] = useState("");

  const [canEditDelete, setCaneditDelete] = useState(false);
  const [showDelate, setShowDelate] = useState(true);
  const [name, setName] = useState("");
  const [locationa, setLocation] = useState("");

  const [displayAccomodations, setDisplayAccomodations] = useState<AccommodationDetails[]>([]);


  useEffect(() => {
    console.log("Updated accomodationsss:", accomodations);
    // onRender()
  });

  useEffect(() => {
    if (!isLoading) {
      onRender();
      setIsLoading(true)
      let display:AccommodationDetails[]= []
      console.log("=====",accomodations)
      console.log("==---",bookings)
      accomodations.forEach((accommodation)=>{
        bookings.forEach((booking)=>{
          if(accommodation.id===booking.accomodationID){
            display.push(accommodation)
          }
      })
    })
    const uniqueDisplay = Array.from(new Set(display));
    setDisplayAccomodations(uniqueDisplay) // Poziv metode onRender samo pri prvom učitavanju stranice
      setIsLoading(true); // Postavi flag varijablu na true
    

      console.log("=====",displayAccomodations)
    }
  
    // Opciono: Možete dodati povratnu funkciju (cleanup funkciju) ako je potrebno
    // Ova funkcija će se izvršiti pri uništavanju komponente
  }, [render]);

  
  const calculateAverageGrade=(grades: Grade[]):void=>{
    let sumOfGrades=0;
    let numberOfGrades = 0;
    grades.forEach((grade, index) => {
      sumOfGrades+=Number(grade.grade);
      numberOfGrades+=1;
    })
    let result = sumOfGrades/numberOfGrades
    if(isNaN(result)){
      setAverageGrade(0)
    }else{
      setAverageGrade(result)
    }
    
  }

  const isAlreadyGrade=(grades: Grade[]):void=>{
    grades.forEach((grade, index) => {
      if(grade.userId === user){
        setCaneditDelete(true)
        setCurrentGrade(grade.grade)
        setDeleteEditGradeID(grade.id)
      }
    })
    
  }

  
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
  
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
      setIsLoading(false);
      render = !true
     
    
      };

      const EditGrade = async () => {
        const response = await fetch("http://localhost:8000/accomodation/editGrade", {
          method: "PUT",
          headers: {
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            id: deleteEditGradeID,
            newGrade: currentGrade,
          }),
        }).then((response) => {
          if (response.status === 200) {
            window.alert("Successfully edited");
            window.location.reload();
          } else {
            window.alert("Some error occured, please try again");
          }
        });

      }

    const isClicked = async (accomodation:AccommodationDetails,e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
    const response = await fetch("http://localhost:8000/accomodation/gradesByAccomodation/"+ accomodation.id, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        })
    .then(res => res.json())
        .then((data) => {
          console.log("Fetched data:", data);
          setGrades(data.GradesByAccomodationId);
          console.log("View grades:", data.GradesByAccomodationId);
          console.log("Grades:", grades);
          calculateAverageGrade(data.GradesByAccomodationId)
          isAlreadyGrade(grades)
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });

      setClick(true)
      setName(accomodation.name)
      setLocation(accomodation.location)
      setaccomodationID(accomodation.id)
      calculateAverageGrade(grades)

    }


    const DeleteGrade = async (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
    const response = await fetch("http://localhost:8000/accomodation/deleteGrade/"+ deleteEditGradeID, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        }).then((response) => {
          if (response.status === 200) {
          window.alert("Grade delated");
          window.location.reload()
          navigate("/gradeHost");
          } else {
          window.alert("Failed to grade accommmodation");
          }
          });
          setCaneditDelete(false);
          setShowDelate(false)
    };



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = {
        accomodationId:accomodationID.toString(),
        userId: user.toString(),
        userName: userName,
        userSurname: userSurname,
        grade: grade.toString()
      };
      console.log("User",data.userId)
      
      fetch("http://localhost:8000/accomodation/gradeHost", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
  body: JSON.stringify(data),
})
  .then((response) => {
    if (response.status === 200 || response.status === 201) {
      window.alert("Grades host successfully");
      navigate("/gradeHost");
      window.location.reload()
      
    } else {
      window.alert("Failed to gradeHost");
    }
  })
  .catch((error) => {
    console.error("Error while grading host:", error);
  });
    }

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
          <tr>{ isClick && <div>

            <div className="col">

              

          <label className="form-label" htmlFor="name">
             Grade
          </label>
          {<h6>Location:  {name}</h6>}
          {<h6>Location:  {locationa}</h6>}
          { !canEditDelete &&<div> 
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

                    <td><button  className="btn btn-primary">Save</button></td>
                    
                  </form>
                  </div>}
                  {canEditDelete && <div>
                    <input
            className="form-control"
            id="name"
            type='number'
            max={5}
            min={1}
            value={currentGrade}
            onChange={(event) => setCurrentGrade(event.target.value)}
            required
          />
                    <button  className="btn btn-primary"  onClick={()=>EditGrade()}>Edit</button>
                    {showDelate && <span><button  className="btn btn-primary" onClick={()=>DeleteGrade()}>Delete</button></span>}
                  </div> }
                </div>
              </div>} 
            </tr>
          </tbody>
        </table>
        { isClick && <div>
        <table className="table table-striped" style={{width: '100%', alignItems:"center", marginLeft : "auto", marginRight:  "auto"}}>
                       <thead className="thead-dark">
                           <tr>
                           <th scope="col">User name</th>
                           <th scope="col">User Surname</th>
                           <th scope="col">Date</th>
                           <th scope="col">Grade</th>
                           
                           </tr>
                       </thead>
                       <tbody>
           {grades.map((grade, index) => (
            <tr key={grade.id}>
              <td>{grade.userName}</td>
              <td>{grade.userSurname}</td>
              <td>{grade.date}</td>
              <td>{grade.grade}</td>      
            </tr>
          ))
          }
          <tr>
            <h4>Average grade:</h4>
            <h5>{averageGrade}</h5>
          </tr>
                          </tbody>
                   </table>
                   </div>}
           </div>
      </div>
   )
  }
  
  export default GradeHost;

function setIsLoaded(arg0: boolean) {
  throw new Error('Function not implemented.');
}
