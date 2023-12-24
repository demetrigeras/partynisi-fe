import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import { getProfile } from '../services/profile'; // Adjust the import path as needed

const Profilehp = ({ user }) => {
  const [profile, setProfile] = useState(null);

   
  return (
    <div>
      <Nav user={user} />
      <h1>Profile Page</h1>
      {profile ? (
        <div>
          <h2>{profile.profilename}</h2>
          <p>Date of Birth: {profile.dob}</p>
          <p>Bio: {profile.bio}</p>
          <img src={profile.photo} alt={profile.profilename} />
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default Profilehp;