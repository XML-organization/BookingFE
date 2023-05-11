import { useState } from "react";
import { UserType } from "../model/User";
import { ResponseMessage } from "../model/ResponseMessage";


interface RegistrationProps {
  onSubmit: (username: string, email: string, password: string) => void;
}

interface MyComponentState {
    selectedOption: { value: string; label: string } | null;
}

function Registration () {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [userType, setUserType] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    
    var role
    if(userType === "Host"){
        role = UserType.Host
    }else{
        role = UserType.Guest
    }
  
    fetch("http://localhost:8000/user/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //credentials: "include",
      body: JSON.stringify({
        "email": email,
        "password": password,
        "role": role,
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

  const handleCertificateTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    setUserType(value);

    console.log(value)
  }

  return (
    <form className="col-md-6 mx-auto" onSubmit={handleSubmit}>
        <blockquote className="blockquote text-center">
          <p className="mb-0">Register as new user</p>
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
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" 
                  id="password" value={password}
                  onChange={(event) => setPassword(event.target.value)}/>
        </div>
        <div className="mb-3">
            <label className="form-label">Repeat password</label>
            <input type="password" className="form-control" 
                  id="password1" value={password1}
                  onChange={(event) => setPassword1(event.target.value)}/>
        </div>
        <div className="mb-3">
            <label className="form-label">Select user type</label>
            <select id="role" className="form-select" value={userType} onChange={(e) => handleCertificateTypeChange(e)} required>
                <option value="Guest">Guest</option>
                <option value="Host">Host</option>
            </select>
        </div>
        <button type="submit" className="btn btn-primary">Confirm</button>
    </form>
  );
};

export default Registration;
