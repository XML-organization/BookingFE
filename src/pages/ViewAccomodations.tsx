import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoggedUser } from "../hooks/UseLoggedUserInformation";
import { Card, Button, Row, Col } from "react-bootstrap";

interface Accommodation {
  id: string;
  name: string;
  location: string;
  wifi: boolean;
  kitchen: boolean;
  airCondition: boolean;
  freeParking: boolean;
  autoApproval: boolean;
  photos: string;
  minGuests: number;
  maxGuests: number;
  idHost: string;
  pricePerGuest: boolean;
}

function AccommodationsPage() {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const userInformation = useLoggedUser();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/accomodation/` + userInformation?.id, {
      method: "GET",
    })
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log the entire data object
        setAccommodations(data.accomodations);
      })
      .catch(error => console.log(error));
  }, []);

  const handleCreateSlot = (accommodationId: string) => {
    navigate(`/availability/${accommodationId}`);

  };

  return (
    <div>
      <h1>Accommodations</h1>
      <Row>
        {accommodations.map(accommodation => (
          <Col md={4} key={accommodation.id}>
            <Card className="mb-4">
              <Card.Img
                variant="top"
                src={`data:image/jpeg;base64,${accommodation.photos}`}
                style={{ height: "300px" }} 
              />
              <Card.Body>
                <Card.Title>{accommodation.name}</Card.Title>
                <Card.Text>
                  <strong>Location:</strong> {accommodation.location}
                </Card.Text>
                <Card.Text>
                  <strong>Minimum Guests:</strong> {accommodation.minGuests}
                </Card.Text>
                <Card.Text>
                  <strong>Maximum Guests:</strong> {accommodation.maxGuests}
                </Card.Text>
                <Card.Text>
                  <strong>WiFi:</strong> {accommodation.wifi ? "Yes" : "No"}
                </Card.Text>
                <Card.Text>
                  <strong>Kitchen:</strong> {accommodation.kitchen ? "Yes" : "No"}
                </Card.Text>
                <Card.Text>
                  <strong>Air Conditioning:</strong>{" "}
                  {accommodation.airCondition ? "Yes" : "No"}
                </Card.Text>
                <Card.Text>
                  <strong>Free Parking:</strong>{" "}
                  {accommodation.freeParking ? "Yes" : "No"}
                </Card.Text>
                <Card.Text>
                  <strong>Auto Approval:</strong>{" "}
                  {accommodation.autoApproval ? "Yes" : "No"}
                </Card.Text>
                <Card.Text>
                  <strong>Price Per Guest:</strong>{" "}
                  {accommodation.pricePerGuest ? "Yes" : "No"}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleCreateSlot(accommodation.id)}
                >
                  Create Slot
                </Button>             
                 </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default AccommodationsPage;
