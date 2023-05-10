import { ChangeEvent, useState } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import  { Accomodation } from '../model/Accomodation';

let noResults = false;
let clicked = true;

function Home(){
    const navigate = useNavigate();

    const [city, setCity] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [numOfGuests, setNumOfGuests] = useState("");

    const [accomodations, setAccomodations] = useState<Accomodation[]>([]);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        if (id === "city") {
          setCity(value);
        }
        if (id === "startDate") {
          setStartDate(value);
        }
        if (id === "endDate") {
          setEndDate(value);
        }
        if (id === "numOfGuests") {
          setNumOfGuests(value);
        }
      };

      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        //e.preventDefault();
        /*const url =
          "http://localhost:8082//booking/create?" +
          new URLSearchParams({
            destination,
            departure,
            date,
            capacity,
          });
        fetch(url)
          .then((response) => response.json())
          .then((data) => setFlights(data));*/
          clicked = true;
      };

      if (accomodations.length === 0){
        noResults = true;
      }else{
        noResults = false;
      }

    function hendleMakeReservation(): void {
        throw new Error('Function not implemented.');
    }

    return (
       <div>
         <blockquote className="blockquote text-center">
            <p className="mb-0">Search for accommodation:</p>
            <footer className="blockquote-footer">Enter all parameters!</footer>
         </blockquote>

        <form className="col-md-6 mx-auto" onSubmit={handleSubmit}>
            <table className="table table-striped" style={{width: '110%', marginLeft : "auto", marginRight: "auto"}}>
                    <tr>
                        <th className="th-lg-percent">
                        <label className="form-label">City </label>
                        </th>
                        <th>&nbsp;&nbsp;</th>
                        <th className="th-lg-percent">
                        <label className="form-label">Start date </label>
                        </th>
                        <th>&nbsp;&nbsp;</th>
                        <th className="th-lg-percent">
                        <label className="form-label">End date</label>
                        </th>
                        <th>&nbsp;&nbsp;</th>
                        <th className="th-lg-percent">
                        <label className="form-label">Number of guests</label>
                        </th >
                        <th>&nbsp;&nbsp;</th>
                    </tr>
                    <tr>
                        <td> 
                            <input  className="form-control" id="city" onChange={(e) => handleInputChange(e)} />
                        </td>
                        <td>&nbsp;&nbsp;</td>

                        <td>
                            <input type="date"   className="form-control" id="startDate" onChange={(e) => handleInputChange(e)} />
                        </td>
                        <td>&nbsp;&nbsp;</td>

                        <td>
                            <input type="date"   className="form-control" id="endDate" onChange={(e) => handleInputChange(e)} />
                        </td>
                        <td>&nbsp;&nbsp;</td>

                        <td>
                            
                            <input type="number" defaultValue='1' min="1" className="form-control" onChange={(e) => handleInputChange(e)} id="numOfGuests" />
                        </td>
                        <td>&nbsp;&nbsp;</td>
                        <td>
                        
                        </td>
                        <button type="submit" className="btn btn-primary">Search</button>
                    </tr>
                    <tr>&nbsp;</tr>
                    <tr>&nbsp;</tr>
                </table>
            </form>

            {noResults && clicked && <div style={{ color: 'blue' }} >There are no accomodations for given inputs!</div>}

            {clicked && <div >
                <table className="table table-striped">
                    <table className="table table-striped" style={{width: '100%', alignItems:"center", marginLeft : "auto", marginRight:  "auto"}}>
                        <thead className="thead-dark">
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Location</th>
                            <th scope="col">Wifi</th>
                            <th scope="col">Kitchen</th>
                            <th scope="col">AirCondition</th>
                            <th scope="col">FreeParking</th>
                            <th scope="col">Price for a night</th>
                            <th scope="col">Total price</th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {accomodations.map((accomodation, index) => (
                            <tr key={accomodation.name}>
                                <td>{accomodation.location}</td>
                                <td>{accomodation.wifi}</td>
                                <td>{accomodation.kitchen}</td>
                                <td>{accomodation.airCondition}</td>
                                <td>{accomodation.freeParking}</td>
                                <td>{accomodation.price}</td>
                                <td>{accomodation.totalPrice}</td>
                                <td><button type="submit" className="btn btn-primary" onClick={() => hendleMakeReservation()}>RESERVE</button></td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </table>
            </div>}
       </div>

       

    )
  }
  
  export default Home;