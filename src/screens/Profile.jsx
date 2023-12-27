import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import { getProfile } from "../services/profile.js";
import EventCreationModal from "../components/EventCreationModal.jsx"; // Adjust the import path as needed
import { getEventsByUser, deleteEvent } from "../services/event.js";
import EventEditModal from "../components/EventEditModal.jsx"; // Adjust the import path as needed

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
    // Fetch the profile based on the URL parameter userId
    const fetchProfileData = async () => {
      try {
        const fetchedProfile = await getProfile(userId);
        setProfile(fetchedProfile);

        // Fetch events for the profile being viewed
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
      // Replace the event in the list with the updated one
      setEvents(
        events.map((event) =>
          event._id === updatedEvent._id ? updatedEvent : event
        )
      );
    } else {
      // Add the new event to the list
      setEvents([...events, updatedEvent]);
    }
  };
 

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent(eventId);
      // Remove the event from the local state to update the UI
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

  return (
    <>
      <Nav user={user} />
      <h1>Profile Page</h1>
      {profile ? (
        <div>
          <div>
            <h2>{profile.profilename}</h2>
            <p>Date of Birth: {new Date(profile.dob).toLocaleDateString()}</p>
            <p>Bio: {profile.bio}</p>
            <img src={profile.photo} alt={profile.profilename || "Profile"} />
          </div>

          <div>
            {events.map((event) => (
              <div key={event._id}>
                <p>Title: {event.title}</p>
                <p>Description: {event.description}</p>

                {user.id === profile.user && ( // Show CRUD buttons only for logged-in user's profile
                  <div>
                   <button onClick={() => handleOpenEditModal(event)}>
                      Edit Event
                    </button>
                    <button onClick={() => handleDeleteEvent(event._id)}>
                      Delete Event
                    </button>
                  </div>
                )}
              </div>
            ))}
            {isEditModalOpen && (
      <EventEditModal
        closeModal={() => setIsEditModalOpen(false)}
        existingEventData={selectedEventForEdit}
        onEventUpdated={handleEventUpdated}
      />
    )}
          </div>


          {user.id === profile.user && ( // Show create event button only for logged-in user's profile
            <div className="modal-createevent">
              <button className="create-event" onClick={handleOpenModal}>
                Create Event
              </button>
              {isModalOpen && (
                <EventCreationModal
                  closeModal={() => setIsModalOpen(false)}
                  isEditMode={Boolean(currentEvent)}
                  existingEventData={currentEvent}
                  userId={user.id}
                  // onEventUpdated={handleEventUpdated}
                />
              )}
            </div>
          )}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </>
  );
};

export default Profilehp;
