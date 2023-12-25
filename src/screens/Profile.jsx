import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import { getProfile } from '../services/profile.js';
import  EventCreationModal  from '../components/EventCreationModal.jsx' // Adjust the import path as needed

const Profilehp = ({ user }) => {
  const [profile, setProfile] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

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
      {/* Other component content */}
      <button className='create-event' onClick={handleOpenModal}>Create Event</button>
      {isModalOpen && <EventCreationModal closeModal={() => setIsModalOpen(false)} />}
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
