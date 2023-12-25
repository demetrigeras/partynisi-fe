import React, { useState, useEffect } from "react";
import Nav from "../components/Nav.jsx";
import { useNavigate } from "react-router-dom";
import { createProfile } from "../services/profile.js";

const CreateProfile = ({ user }) => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    user: "",
    profilename: "",
    dob: "",
    bio: "",
    photo: "",
  });

  useEffect(() => {
    // Set user ID when the component mounts and the user prop is available
    if (user && user.id) {
      setProfileData((prevData) => ({ ...prevData, user: user.id }));
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSubmit =  async (event) => {
    event.preventDefault();
    console.log('Submitting profile:', profileData)
    const userProfile = await createProfile(profileData);
    navigate("/dionhp");
    console.log('Profile created:', userProfile);
    // Here you would usually send the data to your server
  };
// const handleSubmit = async (e) => {
//     e.preventDefault();
//     // console.log('Submitting profile:', ProfileData);
//     try {
//       const userProfile = await createProfile(ProfileData);
//       console.log('Profile created:', userProfile);
//       navigate('/dionhp');
//     } catch (error) {
//       console.error('Error creating profile:', error);
//     }
//   };

  return (
    <div>
      <Nav user={user} />
      <h1>Create Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Profile Name:</label>
          <input
            type="text"
            name="profilename"
            value={profileData.profilename}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={profileData.dob}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Bio:</label>
          <textarea
            name="bio"
            value={profileData.bio}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Photo URL:</label>
          <input
            type="text"
            name="photo"
            value={profileData.photo}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};

export default CreateProfile;
