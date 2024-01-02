import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import { getProfile } from "../services/profile.js";
import EventCreationModal from "../components/EventCreationModal.jsx";
import { getEventsByUser, deleteEvent } from "../services/event.js";
import EventEditModal from "../components/EventEditModal.jsx";
import { createAttendace } from "../services/attendance.js";

const Profilehp = ({ user }) => {
  const [profile, setProfile] = useState(null);
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEventForEdit, setSelectedEventForEdit] = useState(null);

  const { userId } = useParams();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const fetchedProfile = await getProfile(userId);
        setProfile(fetchedProfile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfileData();
  }, [userId]);


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };


  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const fetchedProfile = await getProfile(userId);
        setProfile(fetchedProfile);
        const profileEvents = await getEventsByUser(fetchedProfile.user);
        setEvents(profileEvents);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfileData();
  }, [userId]);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (user && user.id) {
        try {
          const fetchedProfile = await getProfile(user.id);
          setProfile(fetchedProfile);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };

    const fetchuserAllEvents = async () => {
      if (user && user.id) {
        const userEvents = await getEventsByUser(user.id);
        setEvents(userEvents);
        console.log("Events fetched:", userEvents);
        console.log("user fetched:", user.id);
      }
    };
    fetchuserAllEvents();
    fetchProfileData();
  }, [user]);

  const handleEventUpdated = (updatedEvent) => {
    if (isEditMode) {
      setEvents(
        events.map((event) =>
          event._id === updatedEvent._id ? updatedEvent : event
        )
      );
    } else {
      setEvents([...events, updatedEvent]);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent(eventId);
      setEvents(events.filter((event) => event._id !== eventId));
      console.log("Event deleted");
    } catch (error) {
      console.error("Error deleting the event:", error);
    }
  };
  const handleOpenEditModal = (eventData) => {
    setSelectedEventForEdit(eventData);
    setIsEditModalOpen(true);
  };

  const handleRequestToAttend = async (eventId) => {
    try {
      const requestData = {
        event: eventId,
        user: user.id, 
        status: "pending",
      };
      await createAttendace(requestData);
    } catch (error) {
      console.error("Error requesting to attend:", error);
    }
  };

  return (
    <div>
      <Nav user={user} />
      <h1>Profile Page</h1>

{profile ? (
  <div className="profile-page-container">
    <div className="profile-section">
      <div className="profile-info">
        <img src={profile.photo}alt={profile.profilename || "Profile"} className="profile-img"/>
        <h2>User Name: {profile.profilename}</h2>
        <p><strong>Date of Birth:</strong>{" "}{new Date(profile.dob).toLocaleDateString()}</p>
        <p><strong>Bio:</strong> {profile.bio} </p>
      </div>

    {user.id === profile.user && (
      <div className="modal-createevent">
        <button className="create-event" onClick={handleOpenModal}> Create Event</button>
        {isModalOpen && (
          <EventCreationModal
            closeModal={() => setIsModalOpen(false)}
            isEditMode={Boolean(currentEvent)}
            existingEventData={currentEvent}
            userId={user.id}
          />
        )}
      </div>
    )}
  </div>{" "}
 
  <div className="events-section">
    {events.map((event) => (
      <div key={event._id} className="event-card">
        <p><strong>Title:</strong> {event.title}</p>
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Date and Time:</strong>{" "} {new Date(event.dateTime).toLocaleString()}</p>
      {user.id === profile.user && (
        <div className="event-actions">
          <button
            className="editmodal-deletebutton"
            onClick={() => handleOpenEditModal(event)}>
            Edit Event
          </button>
          <button
            className="editmodal-deletebutton"
            onClick={() => handleDeleteEvent(event._id)}>
            Delete Event
          </button>
        </div>
      
      )}
        {user.id !== profile.user && (
        <button className="request-attend-button"onClick={() => handleRequestToAttend(event._id)}>
          Request to Attend
        </button>
      )}
    </div>
  ))} 
</div> 

            {isEditModalOpen && (
              <EventEditModal
                closeModal={() => setIsEditModalOpen(false)}
                existingEventData={selectedEventForEdit}
                onEventUpdated={handleEventUpdated}
              />
            )}
          </div>
        // </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profilehp;
