import React, { useState, useEffect} from "react";
import { createAttendace, getAttendancesByUser, getAttendancesByProfileName, updateAttendance } from "../services/attendance";
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

      const handleUpdateStatus = async (attendanceId, newStatus) => {
        try {
          const updatedAttendance = {
            
            status: newStatus,
          };
          await updateAttendance(attendanceId, updatedAttendance);
          // Update local state to reflect the change
          setProfileAttendances(profileAttendances.map(attendance => 
            attendance._id === attendanceId ? { ...attendance, status: newStatus } : attendance
          ));
        } catch (error) {
          console.error("Error updating attendance status:", error);
        }
      };
    
   

      return (
        <div>
            
            {user.id === profile?.user && 
            
                <div className="Requests">
                     <div className="titles">Your Requests to other Events</div>
                    {userRequests.map((request) => (
                        <div key={request._id} className="request-card">
                             <p>UserName:{request.username}</p>
                             <p>Profile for request:{request.profilename}</p>
                            <p>Event: {request.event?.title}</p>
                            <p>Status: {request.status}</p>
                            
                        </div>
                    ))}
                </div>
            }
            
            {user.id === profile?.user && (
                
   <div className="host-requests">
        <div className="titles">Requests to your Events</div>
        {profileAttendances.map((attendance) => (
            <div key={attendance._id} className="request-card">
                <p>Requester: {attendance.username}</p>
                <p>Event: {attendance.event?.title}</p>
                <p>Status: {attendance.status}</p>
                <button onClick={() => handleUpdateStatus(attendance._id, 'approved')}>Approve</button>
                <button onClick={() => handleUpdateStatus(attendance._id, 'rejected')}>Reject</button>
            </div>
        ))}
    </div>
)}
        </div>
    );
};

export default Requests;