import { useState, useEffect  } from "react";
import { LoginResponse, UserType } from "../model/User";
import { ResponseMessage } from "../model/ResponseMessage";
import { useLoggedUser } from "../hooks/UseLoggedUserInformation";


interface RegistrationProps {
  onSubmit: (username: string, email: string, password: string) => void;
}

interface MyComponentState {
    selectedOption: { value: string; label: string } | null;
}

var userInformation = useLoggedUser()

function UpdateUser () {

  const [name, setName] = useState(userInformation?.name);
  const [surname, setSurname] = useState(userInformation?.surname);
  const [email, setEmail] = useState(userInformation?.email);
  const [country, setCountry] = useState(userInformation?.country);
  const [city, setCity] = useState(userInformation?.city);
  const [street, setStreet] = useState(userInformation?.street);
  const [number, setNumber] = useState(userInformation?.number);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
  
    fetch("http://localhost:8000/user/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        "id": userInformation?.id,
        "email": email,
        "name": name,
        "surname": surname,
        "country": country,
        "city": city,
        "street": street,
        "number": number
      }),
    }).then(response => response.json())
      .then(data => {
        var message: ResponseMessage = data

        alert(message.message)
      })
  };

  return (
    <form className="col-md-6 mx-auto" onSubmit={handleSubmit}>
        <blockquote className="blockquote text-center">
          <p className="mb-0">Edit user</p>
        </blockquote>
        <div className="mb-3">
            <label className="form-label">Name</label>
            <input  className="form-control"  
                    id="name" value={name}
                    onChange={(event) => setName(event.target.value)}/>
        </div>
        <div className="mb-3">
            <label className="form-label">Surname</label>
            <input  className="form-control" 
                    id="surname"  value={surname}
                    onChange={(event) => setSurname(event.target.value)}/>
        </div>
        <div className="mb-3">
            <label className="form-label">Country</label>
            <input  className="form-control" 
                    id="country"  value={country}
                    onChange={(event) => setCountry(event.target.value)}/>
        </div>
        <div className="mb-3">
            <label className="form-label">City</label>
            <input  className="form-control" 
                    id="city"  value={city}
                    onChange={(event) => setCity(event.target.value)}/>
        </div>
        <div className="mb-3">
            <label className="form-label">Street</label>
            <input  className="form-control" 
                    id="street"  value={street}
                    onChange={(event) => setStreet(event.target.value)}/>
        </div>
        <div className="mb-3">
            <label className="form-label">Number</label>
            <input  className="form-control" 
                    id="number"  value={number}
                    onChange={(event) => setNumber(event.target.value)}/>
        </div>
        <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" aria-describedby="emailHelp"
                    id="email"  value={email}
                    onChange={(event) => setEmail(event.target.value)}/>
        </div>
        <button type="submit" className="btn btn-primary">Confirm</button>
    </form>
  );
};

export default UpdateUser;
