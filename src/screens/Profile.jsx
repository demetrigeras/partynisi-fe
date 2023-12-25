import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import { getProfile } from '../services/profile.js';
import  EventCreationModal  from '../components/EventCreationModal.jsx' // Adjust the import path as needed
import { getEventsByUser } from '../services/event.js';
const Profilehp = ({ user }) => {
  const [profile, setProfile] = useState(null);
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);





  const handleOpenModal = () => {
    setIsModalOpen(true);
  };


  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     if (user && user.id) {
  //       const userEvents = await getEventsByUser(user.id);
  //       setEvents(userEvents);
  //       console.log('Events fetched:', userEvents);
  //     }
  //   };
  //   fetchEvents();
  // }, [user]);
  

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
      }
    };

    fetchProfileData();
    fetchuserAllEvents();
  }, [user]);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (user && user.id) {
        try {
          const fetchedProfile = await getProfile(user.id);
          setProfile(fetchedProfile);
        } catch (error) {
          console.error('Error fetching profile:', error);
          // Optionally, handle the error state in the UI as well
        }
      }
    };

    fetchProfileData();
  }, [user]);

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
              {/* Add other event details as needed */}
              <button onClick={() => handleOpenModal(event)}>Edit Event</button>
            </div>
          ))}
          {isModalOpen && (
            <EventCreationModal 
              closeModal={() => setIsModalOpen(false)}
              isEditMode={Boolean(currentEvent)}
              existingEventData={currentEvent}
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
