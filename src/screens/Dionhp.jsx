import Nav from "../components/Nav";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProfiles, getProfile } from "../services/profile.js";
import crowd from "./ballons.jpeg"
const Dionhp = ({ user }) => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [profiles, setProfiles] = useState([]);
  // const [profile, setProfile] = useState(null);

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



  return (
    <div className="partyhp"style={{ 
      backgroundImage: `url(${crowd})`,
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
      <Nav user={user} />
      <div className="dion-screen" >Welcome to Dion!</div>
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
        <div className="profile-container" >
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
