import { useState, useEffect } from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';
import { FiBell, FiBellOff } from 'react-icons/fi';
import '../App.css';
import { useLoggedUser } from '../hooks/UseLoggedUserInformation';
import { PersonalMessage } from '../model/PersonalMessage';

var userInformation = useLoggedUser()

function Notifications() {
  const [showModal, setShowModal] = useState(false);
  const [incomingNotification, setIncomingNotification] = useState(false);
  const [notificationList, setNotificationList] = useState<PersonalMessage[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Pozovite funkciju za dohvaćanje notifikacija s BE-a
    if (userInformation != null){
      fetchNotifications();
    }
  }, []);

  const fetchNotifications = async () => {
    const response = await fetch("http://localhost:8000/personal/message/get/" + userInformation?.id, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    })
    .then(res => res.json())
        .then((data) => {
          console.log("Fetched data:", data);
          setNotificationList(data.notifications);
          setShow(true);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
  };

  const toggleShow = () => {
    setShowModal(!showModal);
  };

  const handleNotificationRead = (notificationId : string) => {
    fetch("http://localhost:8000/personal/message/update", {
			method: "POST",
			headers: {
			  Accept: "application/json",
			},
			credentials: "include",
      body: JSON.stringify({
        "notificationID": notificationId,
      }),
		  }).then(response => console.log(response))
      console.log('Notifikacija pročitana');
  };

  const renderList = (
    <>
      {show && (
        <>
          {notificationList.length > 0 ? (
            notificationList.map((notification, index) => (
              <ListGroup.Item key={index}>
                {notification.text}
                <button
                  className="read-button"
                  onClick={() => handleNotificationRead(notification.id)}
                >
                  <FiBell className="icon" size={20} color="#008000" />
                </button>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>
              No notifications available.
            </ListGroup.Item>
          )}
        </>
      )}
    </>
  );

  return (
    <>
      <li className="nav-item active" onClick={toggleShow}>
        <a className="nav-link">
          {notificationList.length > 0 ? (
            <FiBell className="icon" size={25} color="red" />
          ) : (
            <FiBellOff className="icon" size={25} color="#d88a3f" />
          )}
        </a>
      </li>

      <Modal show={showModal} onHide={toggleShow} tabIndex="-1">
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {show && (<ListGroup style={{ minWidth: '22rem' }} variant="flush">
            {renderList}
          </ListGroup>)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleShow}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Notifications;
