import React, { useState, useEffect} from "react";
import { createAttendace, getAttendancesByUser, getAttendancesByProfileName } from "../services/attendance";
import { useParams } from "react-router-dom";

const Requests = ({ user, userRequests, setUserRequests, hostEventRequests, setHostEventRequests, profile  }) => { 

    const [profileAttendances, setProfileAttendances] = useState([]);

    useEffect(() => {
        const fetchUserRequests = async () => {
          try {
            const requests = await getAttendancesByUser(user.id);
            setUserRequests(requests); // Use setUserRequests to update state
            console.log("Requests fetched:", requests);
          } catch (error) {
            console.error("Error fetching user's attendance requests:", error);
          }
        };
        fetchUserRequests();
      }, [user, setUserRequests]); // Include setUserRequests in the dependency array

      useEffect(() => {
        const fetchProfileAttendances = async () => {
          try {
            const attendances = await getAttendancesByProfileName(profile.profilename);
            setProfileAttendances(attendances);
            console.log("Profile attendances fetched:", attendances);
          } catch (error) {
            console.error("Error fetching attendances by profile name:", error);
          }
        };
    
        if (profile?.profilename) {
          fetchProfileAttendances();
        }
      }, [profile?.profilename]);
    
   

      return (
        <div>
            {user.id === profile?.user && 
                <div className="Requests">
                   
                    {userRequests.map((request) => (
                        <div key={request._id} className="request-card">
                             <h2>Your Requests</h2>
                             <p>Profile:{profile.profilename}</p>
                            <p>User: {user.name}</p>
                            <p>Event: {request.event.title}</p>
                            <p>Status: {request.status}</p>
                        </div>
                    ))}
                </div>
            }
           <div className="host-requests">
        <h2>Requests to Your Events</h2>
        {profileAttendances.map((attendance) => (
          <div key={attendance._id} className="request-card">
            <p>Profile:{attendance.user.name}</p>
            <p>Event: {attendance.event.title}</p>
            <p>Status: {attendance.status}</p>
            {/* Additional logic to display the requester's name, if needed */}
          </div>
        ))}
      </div>
        </div>
    );
};

export default Requests;