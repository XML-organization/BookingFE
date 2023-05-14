import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { useParams } from 'react-router-dom';
import { Booking } from '../model/Booking';

interface Slot {
  startDate: string;
  endDate: string;
  price: number;
}

interface Reservation {
  startDate: string;
  endDate: string;
}

function AccommodationAvailability() {
   const { accommodationId } = useParams<{ accommodationId: string }>();
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [availability, setAvailability] = useState<Slot[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [newSlot, setNewSlot] = useState<Slot>({ startDate: '', endDate: '', price: 0 });

  useEffect(() => {
    fetch(`http://localhost:8000/booking/reservation/` + accommodationId, {
      method: "GET",
    })
      .then(response => response.json())
      .then(data => {
        console.log(data); 
        setBookings(data.reservations);
      })
      .catch(error => console.log(error));

    fetch(`http://localhost:8000/accomodation/availability/` + accommodationId, {
      method: "GET",
    })
      .then(response => response.json())
      .then(data => {
        console.log(data); 
        // Conversion of prices to numeric format
        const availabilities = data.availabilities.map((availability: Slot) => ({
          ...availability,
          price: Number(availability.price),
        }));
        setAvailability(availabilities);
      })
      .catch(error => console.log(error));
  
  }, []);

 
  function tileContent({ date }: { date: Date }) {      
    const dateString = date.toISOString().substring(0, 10);
    const slot = availability.find((slot) => {  
      return slot.startDate <= dateString && slot.endDate > dateString;
    });
    const reservation = bookings.find((reservation) => {
      return reservation.startDate <= dateString && reservation.endDate > dateString;
    });
    
    if (slot) {
      if (reservation) {
        return <p style={{ color: 'grey' }}>{`$${slot.price}`}</p>;
      } else {
        return <p style={{ color: 'green' }}>{`$${slot.price}`}</p>;
      }
    }else {
        return <p style={{ backgroundColor: 'lightgray', borderRadius: '10%', padding: '3px'}}></p>;
    }
    return null;
  }

  function handleCalendarChange(value: any, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setCalendarDate(value);
  }

  function handleAddSlot() {
    if (newSlot.startDate >= newSlot.endDate) {
      alert('Invalid date range. "From" date should be before "To" date.');
      setNewSlot({ startDate: '', endDate: '', price: 0 });
      return;
    }
    
    const overlappingReservations = bookings.filter((reservation) => {
      return (
        (reservation.startDate <= newSlot.startDate && newSlot.startDate < reservation.endDate) ||
        (newSlot.startDate <= reservation.startDate && reservation.startDate < newSlot.endDate)
      );
    });
  
    if (overlappingReservations.length > 0) {
      alert('There are overlapping reservations. Cannot add the new slot.');
      return;
    }
  
    const data = {
      startDate: newSlot.startDate,
      endDate: newSlot.endDate,
      price: newSlot.price.toString(),
      accomodationId: accommodationId,
    };
  
    // No overlapping reservations, add a new slot
    fetch('http://localhost:8000/accomodation/addAvailability/' + accommodationId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          alert('The accommodation price has been changed.');
          setAvailability([...availability, { ...newSlot }]);
          setNewSlot({ startDate: '', endDate: '', price: 0 });
          window.location.reload()
        } else {
          alert('Error occurred while adding a new slot.');
        }
      })
      .catch((error) => {
        alert('Error occurred while adding a new slot.');
        console.error(error);
      });
  }
  
  
  
  
  
  
  
  

  return (
    <div className="container">
      <h1 className="text-center mb-4">Add Available Slots in Accommodation</h1>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="mb-3">
            <input
              className="form-control"
              type="date"
              placeholder="From"
              value={newSlot.startDate}
              onChange={(e) => setNewSlot({ ...newSlot, startDate: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="date"
              placeholder="To"
              value={newSlot.endDate}
              onChange={(e) => setNewSlot({ ...newSlot, endDate: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="number"
              placeholder="Price"
              value={newSlot.price}
              onChange={(e) => setNewSlot({ ...newSlot, price: +e.target.value })}
            />
          </div>
          <button className="btn btn-primary mb-3" onClick={handleAddSlot}>ADD</button>
        </div>
        <div className="col-lg-6">
          <div className="text-center">
            <Calendar
              value={calendarDate}
              onChange={handleCalendarChange}
              tileContent={tileContent}
              calendarType="Hebrew"
              minDetail="year"
              showNeighboringMonth={true}
              prev2Label="<<"
              next2Label=">>"
              formatShortWeekday={(locale, date) => {
                const day = date.getDay();
                const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                return weekdays[day];
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
  

}

export default AccommodationAvailability;
