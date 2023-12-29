import Nav from "../components/Nav";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProfiles, getProfile } from "../services/profile.js";

const Dionhp = ({ user }) => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [profiles, setProfiles] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const fetchedProfiles = await getProfiles();
        setProfiles(fetchedProfiles);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    loadProfiles();
  }, []);

  //   useEffect(() => {
  //     const fetchProfileData = async () => {
  //       try {
  //         const fetchedProfile = await getProfile(userId);
  //         setProfile(fetchedProfile);
  //       } catch (error) {
  //         console.error('Error fetching profile:', error);
  //       }
  //     };

  //     fetchProfileData();
  //   }, [userId]);

  return (
    <div>
      <Nav user={user} />
      <div className="dion-screen">Welcome to Dion!</div>
      <div className="dion-description">
       
        <h3>
          Click on the create event button to Create Event on your Profile
        </h3>
        <button
          className="create-event"
          onClick={() => navigate(`/profile/${user.id}`)}
        >
          Create Event
        </button>
        <div className="Allusers">
          <strong>Click below on other users profiles to see what events they have listed:</strong>
       </div>
<div className="profile-container">
            {profiles.map((profile) => (
                <div className="profile-name"
                key={profile._id}
                onClick={() => navigate(`/profile/${profile.user}`)}
                >
                {profile.profilename}
                </div>  
            ))}
          </div>
        </div>
      </div>
    
  );
};

export default Dionhp;
