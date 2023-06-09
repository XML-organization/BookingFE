import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoggedUser } from "../hooks/UseLoggedUserInformation";
import * as base64 from "base64-js";

function CreateAccommodation() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [minGuests, setMinGuests] = useState(0);
  const [maxGuests, setMaxGuests] = useState(0);
  const [wifi, setWifi] = useState(false);
  const [kitchen, setKitchen] = useState(false);
  const [aircondition, setAircondition] = useState(false);
  const [freeParking, setFreeParking] = useState(false);
  const [autoApproval, setAutoApproval] = useState(false);
  const [pricePerGuest, setPricePerGuest] = useState(false);
  const [image, setImage] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [nameError, setNameError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [guestsError, setGuestsError] = useState("");

  const navigate = useNavigate();
  var userInformation = useLoggedUser()
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    if (id === "name") {
      setName(value);
      if (!value.match(/^[a-zA-Z\s]*$/)) {
        setNameError("Please enter a valid name");
      } else {
        setNameError("");
      }
    }
    if (id === "location") {
      setLocation(value);
      if (!value.match(/^[a-zA-Z\s]*$/)) {
        setLocationError("Please enter a valid location");
      } else {
        setLocationError("");
      }
    }
    if (id === "minGuests") {
      setMinGuests(Number(value));
      if (Number(value) > maxGuests) {
        setGuestsError("Minimum guests cannot be greater than maximum guests");
      } else {
        setGuestsError("");
      }
    }
    if (id === "maxGuests") {
      setMaxGuests(Number(value));
      if (Number(value) < minGuests) {
        setGuestsError("Maximum guests cannot be less than minimum guests");
      } else {
        setGuestsError("");
      }
    }
    if (id === "wifi") {
      setWifi(checked);
    }
    if (id === "kitchen") {
      setKitchen(checked);
    }
    if (id === "autoApproval") {
      setAutoApproval(checked);
    }
    if (id === "pricePerGuest") {
      setPricePerGuest(checked);
    }
    if (id === "aircondition") {
      setAircondition(checked);
    }

    if (id === "freeParking") {
      setFreeParking(checked);
    }
    if (id === "image") {
      const file = e.target.files && e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result;
          if (result && typeof result === "object") {
            // Konvertujemo rezultat u Uint8Array
            const buffer = new Uint8Array(result);
            // Enkodiranje slike u base64
            const encodedImage = base64.fromByteArray(buffer);
            setImage(encodedImage);
          }
        };
        reader.readAsArrayBuffer(file);
      }
    }
    
    
    
    
    
    if (name && location && minGuests && maxGuests && !guestsError) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formValid) {
      window.alert("Please fill in all fields");
      return;
    }

    const data = {
      name: name,
      location: location,
      minGuests: minGuests.toString(),
      maxGuests: maxGuests.toString(),
      wifi: wifi,
      kitchen: kitchen,
      airCondition: aircondition,
      freeParking: freeParking,
      photos: image,
      iDHost: userInformation?.id,
      autoApproval: autoApproval,
      pricePerGuest: pricePerGuest
    };
    
    
    fetch("http://localhost:8000/accomodation/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //credentials: "include",
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 200 || response.status === 201) {
        window.alert("Accommodation created successfully");
        navigate("/viewAccomodation");
        } else {
        window.alert("Failed to create accommodation");
        }
        });
        };
        
        return (
          <div className="create-accommodation">
            <h1>Create Accommodation</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input className="form-control" type="text" id="name" value={name} onChange={handleInputChange} />
                {nameError && <p className="error">{nameError}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="location">Location:</label>
                <input className="form-control" type="text" id="location" value={location} onChange={handleInputChange} />
                {locationError && <p className="error">{locationError}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="minGuests">Minimum guests:</label>
                <input className="form-control" type="number" id="minGuests" value={minGuests} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="maxGuests">Maximum guests:</label>
                <input className="form-control" type="number" id="maxGuests" value={maxGuests} onChange={handleInputChange} />
                {guestsError && <p className="error">{guestsError}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="wifi">Wifi:</label>
                <input className="form-check-input" type="checkbox" id="wifi" checked={wifi} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="kitchen">Kitchen:</label>
                <input className="form-check-input" type="checkbox" id="kitchen" checked={kitchen} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="autoApproval">Auto Approval:</label>
                <input className="form-check-input" type="checkbox" id="autoApproval" checked={autoApproval} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="pricePerGuest">Price Per Guest:</label>
                <input className="form-check-input" type="checkbox" id="pricePerGuest" checked={pricePerGuest} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="aircondition">Air conditioning:</label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="aircondition"
                  checked={aircondition}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="freeParking">Free parking:</label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="freeParking"
                  checked={freeParking}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Image:</label>
                <input className="form-control" type="file" id="image" onChange={handleInputChange} />
              </div>
              <button className="btn btn-primary" type="submit">Create</button>
            </form>
          </div>
        );
        
        
        }
        
        export default CreateAccommodation;