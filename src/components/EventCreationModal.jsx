import React, { useState } from 'react';
import {createEvent} from '../services/event.js'

const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };
  

  const modalContentStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
    width: '70%',  // Adjust width as needed
    height: '80%', // Adjust height as needed
    overflow: 'auto', // Add scrollbars if content overflows
  };



const EventCreationModal = ({ closeModal }) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    dateTime: '',
    location: '',
    // host will be set based on the logged-in user
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newEvent = await createEvent(eventData);
    console.log('Event created:', newEvent);
    // Logic to create the event
    // After creating the event, you can close the modal:
    closeModal();
  };

  return (
    <div className="modal">
         <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
      <form onSubmit={handleSubmit}>
        <h2>Create Event</h2>
        {/* Event form inputs */}
        <input name="title" value={eventData.title} onChange={handleChange} placeholder="Title" />
        <textarea name="description" value={eventData.description} onChange={handleChange} placeholder="Description" />
        <input name="dateTime" type="datetime-local" value={eventData.dateTime} onChange={handleChange} />
        <input name="location" value={eventData.location} onChange={handleChange} placeholder="Location" />
        <button type="submit">Create</button>
        <button onClick={closeModal}>Cancel</button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default EventCreationModal;
