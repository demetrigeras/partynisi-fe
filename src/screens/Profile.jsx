import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import { getProfile } from '../services/profile.js';
import  EventCreationModal  from '../components/EventCreationModal.jsx' // Adjust the import path as needed
import { getEventsByUser , deleteEvent} from '../services/event.js';

const Profilehp = ({ user }) => {
  const [profile, setProfile] = useState(null);
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);





  const handleOpenModal = () => {
    setIsModalOpen(true);
  };


  useEffect(() => {
    const fetchProfileData = async () => {
      if (user && user.id) {
        try {
          const fetchedProfile = await getProfile(user.id);
          setProfile(fetchedProfile);
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
    };

    const fetchuserAllEvents = async () => {
      
      if (user && user.id) {
        const userEvents = await getEventsByUser(user.id);
        setEvents(userEvents);
        console.log('Events fetched:', userEvents); 
        console.log('user fetched:', user.id); 
      }
    };
    fetchuserAllEvents();
    fetchProfileData();
  }, [user]);

  const handleEventUpdated = (updatedEvent) => {
    if (isEditMode) {
      // Replace the event in the list with the updated one
      setEvents(events.map(event => event._id === updatedEvent._id ? updatedEvent : event));
    } else {
      // Add the new event to the list
      setEvents([...events, updatedEvent]);
    }
  };
  

    const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent(eventId);
      // Remove the event from the local state to update the UI
      setEvents(events.filter(event => event._id !== eventId));
      console.log('Event deleted');
    } catch (error) {
      console.error('Error deleting the event:', error);
    }
  };

  return (
    <div>
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
        <div className='modal-createevent'>
        <div>
      
      <button className='create-event' onClick={handleOpenModal}>Create Event</button>
      {isModalOpen && <EventCreationModal closeModal={() => setIsModalOpen(false)} />}
      {events.map(event => (
            <div key={event._id}>
              <p>Title: {event.title}</p>
              <p>Description: {event.description}</p>
              {/* Add other event details as needed */}
              <button onClick={() => handleOpenModal(event)}>Edit Event</button>
              <button onClick={() => handleDeleteEvent(event._id)}>Delete Event</button>
            </div>
          ))}
          {isModalOpen && (
            <EventCreationModal 
              closeModal={() => setIsModalOpen(false)}
              isEditMode={Boolean(currentEvent)}
              existingEventData={currentEvent}
              userId={user.id}
              onEventUpdated={handleEventUpdated}
            />
          )}
        </div>
    </div>
    
        </div>
        
      
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default Profilehp;
