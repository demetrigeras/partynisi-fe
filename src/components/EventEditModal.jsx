import React, { useState, useEffect } from 'react';
import { updateEvent } from '../services/event';


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


const EventEditModal = ({ closeModal, existingEventData, onEventUpdated }) => {
  const [eventData, setEventData] = useState(existingEventData);

  useEffect(() => {
    setEventData(existingEventData); // Initialize form with existing event data
  }, [existingEventData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Logic to update the event
    const updatedEvent = await updateEvent(eventData._id, eventData);
    console.log('Event updated:', updatedEvent);
    onEventUpdated(updatedEvent);
    closeModal();
  };

  return (
    <div className="modal" style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <form onSubmit={handleSubmit}>
          <h2>Edit Event</h2>
          <input
            name="title"
            value={eventData.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <input
            name="dateTime"
            type="datetime-local"
            value={eventData.dateTime}
            onChange={handleChange}
          />
          <input
            name="location"
            value={eventData.location}
            onChange={handleChange}
            placeholder="Location"
          />
          <button type="submit">Update</button>
          <button onClick={closeModal}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EventEditModal;
