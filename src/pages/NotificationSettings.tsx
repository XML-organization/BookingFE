import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useLoggedUser } from '../hooks/UseLoggedUserInformation';

const NotificationSettings = () => {
  const [requestCreated, setRequestCreated] = useState(false);
  const [reservationCanceled, setReservationCanceled] = useState(false);
  const [hostGraded, setHostGraded] = useState(false);
  const [accommodationGraded, setAccommodationGraded] = useState(false);
  const [statusChange, setStatusChange] = useState(false);
  const [reservationReply, setReservationReply] = useState(false);

  const userInformation = useLoggedUser();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    switch (name) {
      case 'requestCreated':
        setRequestCreated(checked);
        break;
      case 'reservationCanceled':
        setReservationCanceled(checked);
        break;
      case 'hostGraded':
        setHostGraded(checked);
        break;
      case 'accommodationGraded':
        setAccommodationGraded(checked);
        break;
      case 'statusChange':
        setStatusChange(checked);
        break;
      case 'reservationReply':
        setReservationReply(checked);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    fetch('http://localhost:8000/personal/settings/update', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        "id": userInformation?.id,
        "userID": userInformation?.id,
        "RequestCreated": requestCreated,
        "ReservationCanceled": reservationCanceled,
        "HostGraded": hostGraded,
        "AccommodationGraded": accommodationGraded,
        "StatusChange": statusChange,
        "ReservationReply": reservationReply,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });

    console.log('Notifikacija pročitana');
    console.log('requestCreated:', requestCreated);
    console.log('reservationCanceled:', reservationCanceled);
    console.log('hostGraded:', hostGraded);
    console.log('accommodationGraded:', accommodationGraded);
    console.log('statusChange:', statusChange);
    console.log('reservationReply:', reservationReply);
  };

  return (
    <div className="container">
      <h1>Forma za prikupljanje informacija</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="requestCreated"
            checked={requestCreated}
            onChange={handleChange}
          />
          <label className="form-check-label">
            Request Created
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="reservationCanceled"
            checked={reservationCanceled}
            onChange={handleChange}
          />
          <label className="form-check-label">
            Reservation Canceled
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="hostGraded"
            checked={hostGraded}
            onChange={handleChange}
          />
          <label className="form-check-label">
            Host Graded
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="accommodationGraded"
            checked={accommodationGraded}
            onChange={handleChange}
          />
          <label className="form-check-label">
            Accommodation Graded
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="statusChange"
            checked={statusChange}
            onChange={handleChange}
          />
          <label className="form-check-label">
            Status Change
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="reservationReply"
            checked={reservationReply}
            onChange={handleChange}
          />
          <label className="form-check-label">
            Reservation Reply
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Notification Settings
        </button>
      </form>
    </div>
  );
};

export default NotificationSettings;
