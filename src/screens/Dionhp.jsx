import Nav from "../components/Nav";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProfiles, getProfile } from "../services/profile.js";
import partyhpimg from "./cartooparty.jpeg"
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
    <div className="partyhp">
      <Nav user={user} />
      <div className="dion-screen">Welcome to Dion!</div>
      <div className="dion-description">
       
        <h3>
          Go to your profile to create an event on your Profile page 
        </h3>
        <button
          className="create-event"
          onClick={() => navigate(`/profile/${user.id}`)}
        >
          Profile
        </button>
        <div className="Allusers">
          <strong>Click below on other users profiles to see what events they have listed:</strong>
       </div>
<div className="profile-container" style={{ 
      backgroundImage: `url(${partyhpimg})`,
      backgroundSize: 'cover', // Cover the entire space of the div
      // backgroundPosition: 'center', // Center the image
      backgroundRepeat: 'no-repeat', // Do not repeat the image
      width: '100vw', // Set width to full viewport width
      height: '100vh', // Set height to full viewport height
      position: 'relative', // Position it over the whole screen
      // top: '0',
      // left: '0',
      overflow: 'hidden'}}>
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
