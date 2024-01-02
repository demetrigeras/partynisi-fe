import React, { useState, useEffect } from "react";
import Nav from "../components/Nav.jsx";
import { useNavigate } from "react-router-dom";
import { createProfile} from "../services/profile.js";
// import { getEventsByUser } from "../services/event.js";
import partyhpimg from "./cartooparty.jpeg"

const CreateProfile = ({ user }) => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    user: "",
    profilename: "",
    dob: "",
    bio: "",
    photo: "",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
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
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      navigate("/dionhp");
       
    }, 1000)
   
    console.log('Profile created:', userProfile);
  };

  return (
    <div className="createpage"style={{ 
      backgroundImage: `url(${partyhpimg})`,
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat', 
      width: '100vw', 
      height: '100vh', 
      position: 'absolute',
      top: '0',
      left: '0',
      overflow: 'hidden'
      }}>
        
    <div>
      {/* <Nav user={user} /> */}
      <h1 className="createprofileletter" >Create Profile</h1>
      <div className="Create-Profile-form">
      <form onSubmit={handleSubmit}>
        <div className="label-formss">
        <div className="form-group">
          <label>Profile Name:</label>
          <input
            type="text"
            name="profilename"
            value={profileData.profilename}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={profileData.dob}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Bio:</label>
          <textarea
            name="bio"
            value={profileData.bio}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Photo URL:</label>
          <input
            type="text"
            name="photo"
            value={profileData.photo}
            onChange={handleChange}
          />
          {showSuccessMessage && <p>Profile Created!</p>}
        </div>
        
        <div className="create-profile-buttons">
        <button className="create-profile-button" type="submit">Create Profile</button>
        </div>
        </div> 
      </form>
    
      </div>
    </div>
    </div>
  );
};

export default CreateProfile;
  
