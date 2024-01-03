import React, { useState, useEffect} from "react";
import { createAttendace, getAttendancesByUser, getAttendanceRequestsForHost } from "../services/attendance";
import { useParams } from "react-router-dom";

const Requests = ({ user, userRequests, setUserRequests, hostEventRequests, setHostEventRequests, profile  }) => { 

    // const [userRequests, setUserRequests] = useState([]);
    // const [hostEventRequests, setHostEventRequests] = useState([]);
    // const [profile, setProfile] = useState(null);
    
    // const { userId } = useParams();

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
        const fetchHostEventRequests = async () => {
          try {
            const hostRequests = await getAttendanceRequestsForHost(user.id);
            setHostEventRequests(hostRequests); // Use setHostEventRequests to update state
            console.log("Host requests:", hostRequests);
          } catch (error) {
            console.error("Error fetching host event requests:", error);
          }
        };
        fetchHostEventRequests();
      }, [user, setHostEventRequests]); 


      return (
        <div>
            {user.id === profile?.user && 
                <div className="Requests">
                   
                    {userRequests.map((request) => (
                        <div key={request._id} className="request-card">
                             <h2>Your Requests</h2>
                            <p>User: {user.name}</p>
                            <p>Event: {request.event.title}</p>
                            <p>Status: {request.status}</p>
                        </div>
                    ))}
                </div>
            }
            
            <div className="host-requests">
                        {/* <h3>Requests to My Events</h3> */}
                        {hostEventRequests.map((request) => (
                            console.log("Request:", request, request.event.title),
                            <div key={request._id} className="request-card">
                                <p>User: {user.name}</p>
                               <p>Event: {request.event.title}</p>
                               <p>Requester: {request.user.name}</p>
                               <p>Status: {request.status}</p>
                                {/* Additional code to handle status update if needed */}
                            </div>
                        ))}
                    </div>
        </div>
    );
};

export default Requests;