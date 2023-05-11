import React, { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RequestMessage } from "../model/ResponseMessage";
import { LoginResponse } from "../model/User";
import { useLoggedUser } from "../hooks/UseLoggedUserInformation";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  var loginResponse: LoginResponse

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    // Reset error messages
    setEmailError("");
    setPasswordError("");

    // Email and password required validation
    if (!email) {
      setEmailError("Email is required");
    }
    if (!password) {
      setPasswordError("Password is required");
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      setEmailError("Invalid email format");
    }



    // If there are errors, don't submit the form
    if (emailError || passwordError) {
      setEmailError(emailError)
      setPasswordError(passwordError)
      return;
    }

    // Send form data to server
    await fetch("http://localhost:8000/autentification/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        "email": email,
        "password": password
      }),
    }).then(res => res.json())
      .then(data => {

        loginResponse = data
        alert(loginResponse.message)

        if(loginResponse.message === "Login successful!"){ 
          localStorage.setItem('loggedUser', JSON.stringify(loginResponse));
        }
    })

  };

  useEffect(() => {
    setPasswordError("");
  }, [password]);

  useEffect(() => {
    setEmailError("");
  }, [email]);

  return (
    <div className="d-flex align-items-center justify-content-center" style={{height: "60vh"}}>
      <form className="col-md-6" onSubmit={handleSubmit}>
          <blockquote className="blockquote text-center">
            <p className="mb-0">Login</p>       
          </blockquote>
          <div className="mb-3">
              <label className="form-label">Email </label>
              <input  className="form-control"
                      id="departure" value={email}
                      onChange={(event) => setEmail(event.target.value)} />
              {emailError && <div className="text-danger">{emailError}</div>}
          </div>
          <div className="mb-3">
              <label className="form-label">Password </label>
              <input  className="form-control" 
                      type={password}
                      id="destination" value={password}
                      onChange={(event) => setPassword(event.target.value)}/>
              {passwordError && <div className="text-danger">{passwordError}</div>}
          </div>
          <button type="submit" className="btn btn-primary">Confirm</button>
      </form>
    </div>
  );
}