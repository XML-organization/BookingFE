import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccommodationDTO } from '../model/AccommodationDTO';
import { useLoggedUser } from '../hooks/UseLoggedUserInformation';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

var loggedUser = useLoggedUser();

function Home() {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numOfGuests, setNumOfGuests] = useState("");
  const [accomodations, setAccomodations] = useState<AccommodationDTO[]>([]);
  const [noResults, setNoResults] = useState(false);
  const [clicked, setClicked] = useState(false);
  const userInformation = useLoggedUser();
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [hasReservation, setHasReservation] = useState(false)
  const [accommodationsId, setAccommodationsId] = useState<string[]>([]);
  const [currentAccomodationHostId, setCurrentAccommodationHostId] = useState("")
  const [wasRated, setWasRated] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("http://localhost:8000/accomodation/search", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        location: city,
        startDate: startDate,
        endDate: endDate,
        numOfGuests: numOfGuests
      }),
    })
      .then(res => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setAccomodations(data.accommodationsDTO);
        console.log("Updated accommodations:", accomodations);
        setClicked(true);
        setNoResults(data.accommodationsDTO.length === 0);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  const handleMakeReservation = (accommodation: AccommodationDTO): void => {
    fetch("http://localhost:8000/booking/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        id: generateUUID(),
        accomodationID: accommodation.id,
        userID: userInformation?.id,
        startDate: startDate,
        endDate: endDate,
        guestNumber: numOfGuests,
        status: "1"
      }),
    }).then((response) => {
      if (response.status === 200) {
        window.alert("Booking confirmed");
      } else {
        window.alert("Failed to confirm booking");
      }
    });
  };

  const generateUUID = (): string => {
    const uuid = uuidv4();
    return uuid;
  };

  const handleRateHost = async (accommodation: AccommodationDTO): Promise<void> => {
    setCurrentAccommodationHostId(accommodation.idHost)
    try {
      const response = await fetch("http://localhost:8000/accomodation/CheckIfGuestHasReservationInPast", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          "hostId": accommodation.idHost,
          "guestId": loggedUser?.id
        }),
      });
  
      const data = await response.json();
  
      if (data.hasReservation) {
        const wasRatedResponse = await fetch("http://localhost:8000/rating/wasGuestRatedHost", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            "hostId": accommodation.idHost,
            "guestId": loggedUser?.id
          }),
        });
  
        const wasRatedData = await wasRatedResponse.json();

        if(wasRatedData.wasRated){
          setWasRated(true)
        }else{
          setWasRated(false)
        }
        setShowModal(true);
      } else {
        alert("You dont have permission to rate this host!")
      }
   }catch (error) {
      console.error("Error:", error);
    }
  
  };
  

  const handleModalClose = (): void => {
    setShowModal(false);
    setIsEditing(true)
  };

  const handleModalSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    fetch("http://localhost:8000/rating/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        rating: rating,
        date: new Date().toISOString().substring(0, 10),
        raterId: loggedUser?.id,
        raterName: loggedUser?.name,
        raterSurname: loggedUser?.surname,
        userId: currentAccomodationHostId
      }),
    }).then((response) => {
      if (response.status === 200) {
        window.alert("Successfully");
      } else {
        window.alert("Some error occured, please try again");
      }
    });

    console.log("Rating:", rating);
    console.log("Comment:", comment);
    setShowModal(false);
  };

  const handleDeleteRating = async () => {
  const response = await fetch("http://localhost:8000/rating/delete", {
    method: "PUT",
    headers: {
      Accept: "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      hostId: currentAccomodationHostId,
      guestId: loggedUser?.id,
    }),
  });

  const data = await response.json();
  setWasRated(false)
  alert(data.message)
};

  
  const handleEditRating = () => {
    setWasRated(false)
  };

  return (
    <div>
      <blockquote className="blockquote text-center">
        <p className="mb-0">Search for accommodation:</p>
        <footer className="blockquote-footer">Enter all parameters!</footer>
      </blockquote>

      <form className="col-md-6 mx-auto" onSubmit={handleSubmit}>
        <table className="table table-striped" style={{ width: '110%', marginLeft: "auto", marginRight: "auto" }}>
          <tr>
            <th className="th-lg-percent">
              <label className="form-label">Location </label>
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
              <input className="form-control" id="city" onChange={handleInputChange} />
            </td>
            <td>&nbsp;&nbsp;</td>
            <td>
              <input type="date" className="form-control" id="startDate" onChange={handleInputChange} />
            </td>
            <td>&nbsp;&nbsp;</td>
            <td>
              <input type="date" className="form-control" id="endDate" onChange={handleInputChange} />
            </td>
            <td>&nbsp;&nbsp;</td>
            <td>
              <input type="number" defaultValue='1' min="1" className="form-control" onChange={handleInputChange} id="numOfGuests" />
            </td>
            <td>&nbsp;&nbsp;</td>
            <td>
              <button type="submit" className="btn btn-primary">Search</button>
            </td>
          </tr>
          <tr>&nbsp;</tr>
          <tr>&nbsp;</tr>
        </table>
      </form>

      {noResults && clicked && <div style={{ color: 'blue' }} >There are no accommodations for the given inputs!</div>}

      {clicked && (
        <div>
          <table className="table table-striped" style={{ width: '100%', alignItems: "center", marginLeft: "auto", marginRight: "auto" }}>
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
                  <td>{accomodation.name}</td>
                  <td>{accomodation.location}</td>
                  <td>{accomodation.wifi ? "Yes" : "No"}</td>
                  <td>{accomodation.kitchen ? "Yes" : "No"}</td>
                  <td>{accomodation.airCondition ? "Yes" : "No"}</td>
                  <td>{accomodation.freeParking ? "Yes" : "No"}</td>
                  <td>{accomodation.price ? "Yes" : "No"}</td>
                  <td>{accomodation.totalPrice}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => handleMakeReservation(accomodation)}
                    >
                      Reserve
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleRateHost(accomodation)}
                    >
                      Rate Host
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

{showModal && (
  <div className="modal" style={{ display: "block" }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">
            {wasRated ? "Thank you for rating!" : "Rate Host"}
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={handleModalClose}
          ></button>
        </div>
        <div className="modal-body">
          {wasRated ? (
            <>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteRating}
              >
                Delete Rating
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEditRating}
              >
                Edit Rating
              </button>
            </>
          ) : (
            <form onSubmit={handleModalSubmit}>
              <div className="mb-3">
                <label className="form-label">Rating:</label>
                <select
                  className="form-select"
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={handleModalClose}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default Home;
