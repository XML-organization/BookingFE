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
      //const response = await fetch('/api/availability');
      // const data = await response.json();
      // setAvailability(data);
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
    setAvailability([...availability, newSlot]);
    setNewSlot({ date_from: "", date_to: "", price: 0 });
  }

  return (
    <div>
    <div>
        <input type="text" placeholder="From" value={newSlot.date_from} onChange={(e) => setNewSlot({ ...newSlot, date_from: e.target.value })} />
        <input type="text" placeholder="To" value={newSlot.date_to} onChange={(e) => setNewSlot({ ...newSlot, date_to: e.target.value })} />
        <input type="number" placeholder="Cena" value={newSlot.price} onChange={(e) => setNewSlot({ ...newSlot, price: +e.target.value })} />
        <button onClick={handleAddSlot}>ADD</button>
    </div>
    <div>
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
  );
}

export default AccommodationAvailability;
