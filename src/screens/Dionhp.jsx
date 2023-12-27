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
        <h2>
          Dion is a Party Scheduling app where you can create events and request
          to be a part of events
        </h2>
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
          <strong>See all other users displayed below:</strong>
          <ul>
            {profiles.map((profile) => (
              <li
                key={profile._id}
                onClick={() => navigate(`/profile/${profile.user}`)}
              >
                {profile.profilename}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dionhp;
