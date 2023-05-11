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
  
  //errors
  const [nameError, setNameError] = useState("");
  const [surnameError, setSurnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password1Error, setPassword1Error] = useState("");
  const [countryError, setCountryError] = useState("");
  const [cityError, setCityError] = useState("");
  const [streetError, setStreetError] = useState("");
  const [numberError, setNumberError] = useState("");
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    
    setNameError("")
    setSurnameError("")
    setEmailError("")
    setPasswordError("")
    setPassword1Error("")
    setCountryError("")
    setCityError("")
    setStreetError("")
    setNumberError("")

    var role
    if(userType === "Host"){
        role = UserType.Host
    }else{
        role = UserType.Guest
    }

    if ((!email || email === "") || (!password || password === "") || (!name || name === "") || (!surname || surname === "")
          || (!password1 || password1 === "") || (!country || country === "") || (!city || city === "") || (!street || street === "")
          || (!number || number === "")) {
      if(!email || email === ""){
        setEmailError("Email is required");
      }else{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
          setEmailError("Invalid email format");
        }
      }
      if(!password || password === ""){
        setPasswordError("Password is required");
      }

      if(!name || name === ""){
        setNameError("Name is required")
      }

      if(!name || name === ""){
        setSurnameError("Surname is required")
      }

      if(!password1 || password1 === ""){
        setPassword1Error("You must repate password")
      }

      if(!country || country === ""){
        setCountryError("Country is required")
      }

      if(!city || city === ""){
        setCityError("City is required")
      }

      if(!street || street === ""){
        setStreetError("Street is required")
      }

      if(!number || number === ""){
        setNumberError("Number is required")
      }
      return
    }

    if(password != password1){
      alert("Password do not match!")
    }
  
    fetch("http://localhost:8000/autentification/registration", {
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
            <label className="form-label">Name*</label>
            <input  className="form-control"  
                    id="name" value={name}
                    onChange={(event) => setName(event.target.value)}/>
                    {nameError && <div className="text-danger">{nameError}</div>}
        </div>
        <div className="mb-3">
            <label className="form-label">Surname*</label>
            <input  className="form-control" 
                    id="surname"  value={surname}
                    onChange={(event) => setSurname(event.target.value)}/>
                    {surnameError && <div className="text-danger">{surnameError}</div>}
        </div>
        <div className="mb-3">
            <label className="form-label">Email address*</label>
            <input type="text" className="form-control" aria-describedby="emailHelp"
                    id="email"  value={email}
                    onChange={(event) => setEmail(event.target.value)}/>
                    {emailError && <div className="text-danger">{emailError}</div>}
        </div>
        <div className="mb-3">
            <label className="form-label">Country*</label>
            <input  className="form-control" 
                    id="country"  value={country}
                    onChange={(event) => setCountry(event.target.value)}/>
                    {countryError && <div className="text-danger">{countryError}</div>}
        </div>
        <div className="mb-3">
            <label className="form-label">City*</label>
            <input  className="form-control" 
                    id="city"  value={city}
                    onChange={(event) => setCity(event.target.value)}/>
                    {cityError && <div className="text-danger">{cityError}</div>}
        </div>
        <div className="mb-3">
            <label className="form-label">Street*</label>
            <input  className="form-control" 
                    id="street"  value={street}
                    onChange={(event) => setStreet(event.target.value)}/>
                    {streetError && <div className="text-danger">{streetError}</div>}
        </div>
        <div className="mb-3">
            <label className="form-label">Number*</label>
            <input  className="form-control" 
                    id="number"  value={number}
                    onChange={(event) => setNumber(event.target.value)}/>
                    {numberError && <div className="text-danger">{numberError}</div>}
        </div>
        <div className="mb-3">
            <label className="form-label">Password*</label>
            <input type="password" className="form-control" 
                  id="password" value={password}
                  onChange={(event) => setPassword(event.target.value)}/>
                  {passwordError && <div className="text-danger">{passwordError}</div>}
        </div>
        <div className="mb-3">
            <label className="form-label">Repeat password*</label>
            <input type="password" className="form-control" 
                  id="password1" value={password1}
                  onChange={(event) => setPassword1(event.target.value)}/>
                  {password1Error && <div className="text-danger">{password1Error}</div>}
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
