import { useState } from "react";
import { useLoggedUser } from "../hooks/UseLoggedUserInformation";
import { ResponseMessage } from "../model/ResponseMessage";


interface RegistrationProps {
  onSubmit: (username: string, email: string, password: string) => void;
}

interface MyComponentState {
    selectedOption: { value: string; label: string } | null;
}

function ChangePassword () {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatedNewPassword, setRepeatedNewPassword] = useState("");

  //errors
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [repeatedNewPasswordError, setRepeatedNewPasswordError] = useState("");

  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    setOldPasswordError("")
    setNewPasswordError("")
    setRepeatedNewPasswordError("")

    if ((!oldPassword || oldPassword === "") || (!newPassword || newPassword === "") || (!repeatedNewPassword || repeatedNewPassword === "")) {
      if(!oldPassword || oldPassword === ""){
        setOldPasswordError("Old password is required");
      }
      if(!newPassword || newPassword === ""){
        setNewPasswordError("New password is required");
      }

      if(!repeatedNewPassword || repeatedNewPassword === ""){
        setRepeatedNewPasswordError("Old password is required");
      }
      return
    }

    if(newPassword != repeatedNewPassword){
      setRepeatedNewPasswordError("Passwords do not match")
      return
    }

    var user = useLoggedUser();
    console.log(user)
  
    fetch("http://localhost:8000/user/change", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + user?.accessToken,
      },
      credentials: "include",
      body: JSON.stringify({
        "email": user?.email,
        "new_password": newPassword,
        "old_password": oldPassword
      }),
    }).then(res => res.json())
    .then(data => {
      const message: ResponseMessage = data

      alert(message.message)
    })
  };

  return (
    <form className="col-md-6 mx-auto" onSubmit={handleSubmit}>
        <blockquote className="blockquote text-center">
          <p className="mb-0">Change password</p>
        </blockquote>
        <div className="mb-3">
            <label className="form-label">Old password</label>
            <input type="password" className="form-control" 
                  id="password" value={oldPassword}
                  onChange={(event) => setOldPassword(event.target.value)}/>
                  {oldPasswordError && <div className="text-danger">{oldPasswordError}</div>}
        </div>
        <div className="mb-3">
            <label className="form-label">New password</label>
            <input type="password" className="form-control" 
                  id="password1" value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}/>
                  {newPasswordError && <div className="text-danger">{newPasswordError}</div>}
        </div>
        <div className="mb-3">
            <label className="form-label">Repeat new password</label>
            <input type="password" className="form-control" 
                  id="password2" value={repeatedNewPassword}
                  onChange={(event) => setRepeatedNewPassword(event.target.value)}/>
                  {repeatedNewPasswordError && <div className="text-danger">{repeatedNewPasswordError}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Confirm</button>
    </form>
  );
};

export default ChangePassword;
