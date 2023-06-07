import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AccommodationDetails } from '../model/AccomodationDetails';

const AccommodationDetailsPage = () => {
  const { id } = useParams();
  const [accommodation, setAccommodation] = useState<AccommodationDetails | null>(null);

  useEffect(() => {
    const fetchAccommodationDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/accomodation/getOne/${id}`);
        const data = await response.json();
        const acc = new AccommodationDetails(
          data.id,
          data.name,
          data.location,
          data.wifi,
          data.kitchen,
          data.airCondition,
          data.freeParking,
          data.autoApproval,
          data.photos,
          data.minGuests,
          data.maxGuests,
          data.idHost,
          data.pricePerGuest
        );
        setAccommodation(acc);
        console.log(acc);
      } catch (error) {
        console.error('Error fetching accommodation details:', error);
      }
    };

    fetchAccommodationDetails();
  }, [id]);

  if (!accommodation) {
    return <div>Loading...</div>;
  }

  return (
    <div>
       <p>{accommodation.name}</p>
    </div>
  );
};

export default AccommodationDetailsPage;
