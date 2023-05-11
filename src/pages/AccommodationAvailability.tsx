import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface Slot {
  date_from: string;
  date_to: string;
  price: number;
}

interface Reservation {
  date_from: string;
  date_to: string;
}

function AccommodationAvailability() {
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [availability, setAvailability] = useState<Slot[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [newSlot, setNewSlot] = useState<Slot>({ date_from: '', date_to: '', price: 0 });

  useEffect(() => {
    async function fetchAvailability() {
      const slots: Slot[] = [
        {
          date_from: '2023-05-01',
          date_to: '2023-05-10',
          price: 200,
        },
        {
          date_from: '2023-05-08',
          date_to: '2023-05-14',
          price: 250,
        },
        {
          date_from: '2023-05-15',
          date_to: '2023-05-21',
          price: 300,
        },
      ];
  
      const reservations: Reservation[] = [
        {
          date_from: '2023-05-01',
          date_to: '2023-05-04',
        },
        {
          date_from: '2023-05-09',
          date_to: '2023-05-14',
        },
      ];
  
      setAvailability(slots);
      setReservations(reservations);
    }
  
    fetchAvailability();
  }, []);

 
  function tileContent({ date }: { date: Date }) {      
    const dateString = date.toISOString().substring(0, 10);
    const slot = availability.find((slot) => {  
      return slot.date_from <= dateString && slot.date_to > dateString;
    });
    const reservation = reservations.find((reservation) => {
      return reservation.date_from <= dateString && reservation.date_to > dateString;
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
    if (newSlot.date_from >= newSlot.date_to) {
      alert('Invalid date range. "From" date should be before "To" date.');
      setNewSlot({ date_from: '', date_to: '', price: 0 });
      return;
    }
    
    const overlappingSlots = availability.filter((slot) => {
      return (
        (slot.date_from <= newSlot.date_from && newSlot.date_from < slot.date_to) ||
        (newSlot.date_from <= slot.date_from && slot.date_from < newSlot.date_to)
      );
    });
  
    if (overlappingSlots.length > 0) {
      // Postoje preklapajući slotovi
      const updatedAvailability = availability.map((slot) => {
        const isOverlapping = overlappingSlots.some((overlappingSlot) => {
          return slot.date_from === overlappingSlot.date_from && slot.date_to === overlappingSlot.date_to;
        });
  
        if (isOverlapping) {
          // Ažuriramo cenu samo na preklapajućim slotovima koji nisu rezervisani
          const isReserved = reservations.some((reservation) => {
            return (
              (reservation.date_from <= slot.date_from && slot.date_from < reservation.date_to) ||
              (slot.date_from <= reservation.date_from && reservation.date_from < slot.date_to)
            );
          });
  
          if (!isReserved) {
            return { ...slot, price: newSlot.price };
          } else {
            alert('Accommodation is already reserved. Cannot change the price.');
          }
        }
  
        return slot;
      });
  
      setAvailability(updatedAvailability);
      setNewSlot({ date_from: '', date_to: '', price: 0 });
    } else {
      // Nema preklapajućih slotova, dodajemo novi slot
      fetch('http://localhost:8000/accomodation/addSlot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSlot),
      })
        .then((response) => {
          if (response.ok) {
            alert('The accommodation price has been changed.');
            setAvailability([...availability, newSlot]);
            setNewSlot({ date_from: '', date_to: '', price: 0 });
          } else {
            alert('Error occurred while adding a new slot.');
          }
        })
        .catch((error) => {
          alert('Error occurred while adding a new slot.');
          console.error(error);
        });
    }
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
              value={newSlot.date_from}
              onChange={(e) => setNewSlot({ ...newSlot, date_from: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="date"
              placeholder="To"
              value={newSlot.date_to}
              onChange={(e) => setNewSlot({ ...newSlot, date_to: e.target.value })}
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
