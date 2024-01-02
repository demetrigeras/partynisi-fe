import React, { useState, useEffect} from "react";
import { createAttendace, getAttendancesByUser, getAttendanceRequestsForHost } from "../services/attendance";
import { useParams } from "react-router-dom";

const Requests = ({user, profileData, getProfile, getEventsByUser, setEvents}) => { 

    const [userRequests, setUserRequests] = useState([]);
    const [hostEventRequests, setHostEventRequests] = useState([]);
    const [profile, setProfile] = useState(null);
    const { userId } = useParams();


    useEffect(() => {
        const fetchData = async () => {
          try {
            // Fetch profile data
            const profileData = await getProfile(userId || user.id);
            setProfile(profileData);
      
            // Fetch events
            const eventsData = await getEventsByUser(profileData.user);
            setEvents(eventsData);
      
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
      
        fetchData();
      }, [userId, user.id]);
    
    useEffect(() => {
    const fetchUserRequests = async () => {
      try {
        const requests = await getAttendancesByUser(user.id); // Assuming user.id is the current user's ID
        setUserRequests(requests);
        console.log("User requests fetched:", requests);
      } catch (error) {
        console.error("Error fetching user's attendance requests:", error);
      }
    };
  
    fetchUserRequests();
  }, [user]);

  

// useEffect(() => {
//   const fetchHostEventRequests = async () => {
//     if (user && user.id) {
//       try {
//         const hostRequests = await getAttendanceRequestsForHost(user.id);
//         setHostEventRequests(hostRequests);
//       } catch (error) {
//         console.error("Error fetching host event requests:", error);
//       }
//     }
//   };

//   if (user.id === profile.user) {
//     fetchHostEventRequests();
//   }
// }, [user, profile.user]);


return (
    <div className="Requests">
      {/* Check if user and profile are defined before accessing their properties */}
      {user && profile && user.id === profile.user && (
        <div className="user-requests">
          <h3>My Event Requests</h3>
          {userRequests.map((request) => (
            <div key={request._id} className="request-card">
              <p>Event: {request.event.title}</p>
              <p>Status: {request.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Requests;